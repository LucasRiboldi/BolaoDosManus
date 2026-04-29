import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import {
  CalendarDays,
  CheckCircle2,
  Lock,
  LockOpen,
  LogOut,
  Medal,
  RefreshCw,
  Save,
  Shield,
  Trophy,
  UserPlus,
} from "lucide-react";
import { auth } from "./firebase";
import { FALLBACK_MATCHES, FALLBACK_NOTE } from "./data/fallbackMatches";
import { fetchWorldCupMatchesFromApi } from "./services/apiFootball";
import {
  ensureUserProfile,
  getMatchesFromFirestore,
  getUserProfile,
  savePredictions,
  setBettingLocked,
  subscribeBettingSettings,
  subscribeRanking,
  subscribeUserPredictions,
  upsertMatches,
} from "./services/firestore";
import { AppUser, BettingSettings, CupMatch, Prediction, RankingEntry } from "./types";

type AuthMode = "login" | "register";

function formatKickoff(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function scoreKey(matchId: string, side: "home" | "away") {
  return `${matchId}:${side}`;
}

function normalizeScore(value: string) {
  return value.replace(/\D/g, "").slice(0, 2);
}

function RankingCard({
  ranking,
  currentUserId,
  compact = false,
}: {
  ranking: RankingEntry[];
  currentUserId?: string;
  compact?: boolean;
}) {
  const visibleRanking = compact ? ranking.slice(0, 6) : ranking;

  return (
    <section className="panel ranking-panel">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">Ranking em tempo real</p>
          <h2>Classificacao dos apostadores</h2>
        </div>
        <Medal size={22} />
      </div>

      {visibleRanking.length === 0 ? (
        <div className="empty-state">Nenhum apostador cadastrado ainda.</div>
      ) : (
        <div className="ranking-list">
          {visibleRanking.map((entry) => (
            <div
              key={entry.userId}
              className={`ranking-row ${entry.userId === currentUserId ? "current-user" : ""}`}
            >
              <div className="rank-position">{entry.position}</div>
              <div className="rank-user">
                <strong>{entry.userName}</strong>
                <span>
                  {entry.exactScores} exatos | {entry.correctResults} resultados
                </span>
              </div>
              <div className="rank-points">
                <strong>{entry.totalPoints}</strong>
                <span>pts</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function AuthScreen({
  ranking,
  onSignedIn,
}: {
  ranking: RankingEntry[];
  onSignedIn: (firebaseUser: FirebaseUser) => Promise<void>;
}) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      window.alert("Preencha email e senha.");
      return;
    }

    if (mode === "register" && !name.trim()) {
      window.alert("Preencha seu nome.");
      return;
    }

    setLoading(true);
    try {
      const credential =
        mode === "register"
          ? await createUserWithEmailAndPassword(auth, email.trim(), password)
          : await signInWithEmailAndPassword(auth, email.trim(), password);

      await ensureUserProfile(
        credential.user.uid,
        credential.user.email || email.trim(),
        name.trim() || credential.user.email?.split("@")[0] || "Apostador",
      );
      await onSignedIn(credential.user);
    } catch (error: any) {
      window.alert(error.message || "Nao foi possivel autenticar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-shell">
      <section className="hero-panel">
        <div className="brand-pill">
          <Trophy size={16} />
          Bolao dos Manus
        </div>
        <h1>Copa do Mundo 2026</h1>
        <p>
          Palpites de placar, ranking automatico e trava de edicao para fechar o bolao no
          momento certo.
        </p>
      </section>

      <form className="panel auth-card" onSubmit={handleSubmit}>
        <div className="tabs">
          <button type="button" className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>
            Entrar
          </button>
          <button
            type="button"
            className={mode === "register" ? "active" : ""}
            onClick={() => setMode("register")}
          >
            Criar conta
          </button>
        </div>

        {mode === "register" && (
          <label>
            Nome
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Seu nome" />
          </label>
        )}

        <label>
          Email
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="seu@email.com"
            type="email"
            autoComplete="email"
          />
        </label>

        <label>
          Senha
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="minimo 6 caracteres"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />
        </label>

        <button className="primary-button" disabled={loading} type="submit">
          {mode === "register" ? <UserPlus size={18} /> : <CheckCircle2 size={18} />}
          {loading ? "Aguarde..." : mode === "register" ? "Criar e entrar" : "Entrar"}
        </button>
      </form>

      <RankingCard ranking={ranking} compact />
    </main>
  );
}

function LoggedInApp({
  user,
  ranking,
  settings,
  matches,
  predictions,
  onReloadMatches,
  onImportApiMatches,
}: {
  user: AppUser;
  ranking: RankingEntry[];
  settings: BettingSettings;
  matches: CupMatch[];
  predictions: Prediction[];
  onReloadMatches: () => Promise<void>;
  onImportApiMatches: () => Promise<void>;
}) {
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [adminBusy, setAdminBusy] = useState(false);
  const isAdmin = user.role === "admin";

  useEffect(() => {
    const nextDrafts: Record<string, string> = {};
    predictions.forEach((prediction) => {
      nextDrafts[scoreKey(prediction.matchId, "home")] = String(prediction.homeGoals);
      nextDrafts[scoreKey(prediction.matchId, "away")] = String(prediction.awayGoals);
    });
    setDrafts(nextDrafts);
  }, [predictions]);

  const predictionMap = useMemo(
    () => new Map(predictions.map((prediction) => [prediction.matchId, prediction])),
    [predictions],
  );

  const completedDrafts = matches.filter((match) => {
    const home = drafts[scoreKey(match.id, "home")];
    const away = drafts[scoreKey(match.id, "away")];
    return home !== undefined && home !== "" && away !== undefined && away !== "";
  }).length;

  async function handleSave() {
    if (settings.locked) {
      window.alert("O admin travou o envio e a edicao das apostas.");
      return;
    }

    setSaving(true);
    try {
      await savePredictions(user.id, matches, drafts);
      window.alert("Apostas salvas no Firestore.");
    } catch (error: any) {
      window.alert(error.message || "Erro ao salvar apostas.");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleLock() {
    const nextLocked = !settings.locked;
    const confirmed = window.confirm(
      nextLocked
        ? "Travar envio e edicao de apostas para todos os usuarios?"
        : "Reabrir envio e edicao de apostas?",
    );
    if (!confirmed) return;

    setAdminBusy(true);
    try {
      await setBettingLocked(nextLocked, user.id);
    } finally {
      setAdminBusy(false);
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Copa 2026</p>
          <h1>Palpites de placar</h1>
        </div>
        <button className="icon-button" onClick={() => signOut(auth)} aria-label="Sair">
          <LogOut size={20} />
        </button>
      </header>

      <section className="status-grid">
        <div className="stat-card">
          <span>Preenchidos</span>
          <strong>
            {completedDrafts}/{matches.length}
          </strong>
        </div>
        <div className={`stat-card ${settings.locked ? "danger" : "success"}`}>
          <span>{settings.locked ? "Travado" : "Aberto"}</span>
          <strong>{settings.locked ? <Lock size={24} /> : <LockOpen size={24} />}</strong>
        </div>
      </section>

      <section className="panel action-panel">
        <div>
          <h2>{user.name}</h2>
          <p>{user.totalPoints} pontos no ranking</p>
        </div>
        <button className="primary-button" onClick={handleSave} disabled={saving || settings.locked}>
          <Save size={18} />
          {settings.locked ? "Edicao travada" : saving ? "Salvando..." : "Salvar palpites"}
        </button>
      </section>

      {isAdmin && (
        <section className="panel admin-panel">
          <div>
            <p className="eyebrow">Admin</p>
            <h2>Controle do bolao</h2>
            <p>Este botao trava ou reabre o envio e edicao para todos os apostadores.</p>
          </div>
          <div className="admin-actions">
            <button className={settings.locked ? "success-button" : "danger-button"} onClick={handleToggleLock}>
              <Shield size={18} />
              {adminBusy ? "Atualizando..." : settings.locked ? "Reabrir apostas" : "Travar apostas"}
            </button>
            <button className="secondary-button" onClick={onImportApiMatches}>
              <RefreshCw size={18} />
              Importar API
            </button>
          </div>
        </section>
      )}

      <section className="match-list">
        <div className="section-title-row">
          <div>
            <p className="eyebrow">Jogos</p>
            <h2>Tabela da Copa</h2>
          </div>
          <button className="small-button" onClick={onReloadMatches}>
            <RefreshCw size={16} />
            Atualizar
          </button>
        </div>

        {matches.map((match) => {
          const prediction = predictionMap.get(match.id);
          return (
            <article className="match-card" key={match.id}>
              <div className="match-meta">
                <span>{match.group}</span>
                <span>
                  <CalendarDays size={14} />
                  {formatKickoff(match.kickoff)}
                </span>
              </div>

              <div className="score-row">
                <div className="team">
                  {match.homeFlag?.startsWith("http") ? <img src={match.homeFlag} alt="" /> : null}
                  <strong>{match.homeTeam}</strong>
                </div>

                <div className="score-inputs">
                  <input
                    inputMode="numeric"
                    value={drafts[scoreKey(match.id, "home")] ?? ""}
                    onChange={(event) =>
                      setDrafts((current) => ({
                        ...current,
                        [scoreKey(match.id, "home")]: normalizeScore(event.target.value),
                      }))
                    }
                    disabled={settings.locked}
                    placeholder="0"
                  />
                  <span>x</span>
                  <input
                    inputMode="numeric"
                    value={drafts[scoreKey(match.id, "away")] ?? ""}
                    onChange={(event) =>
                      setDrafts((current) => ({
                        ...current,
                        [scoreKey(match.id, "away")]: normalizeScore(event.target.value),
                      }))
                    }
                    disabled={settings.locked}
                    placeholder="0"
                  />
                </div>

                <div className="team right">
                  {match.awayFlag?.startsWith("http") ? <img src={match.awayFlag} alt="" /> : null}
                  <strong>{match.awayTeam}</strong>
                </div>
              </div>

              <div className="match-footer">
                <span>{match.round}</span>
                <span className={prediction ? "saved-pill" : "pending-pill"}>
                  {prediction ? "Salvo" : "Pendente"}
                </span>
              </div>
            </article>
          );
        })}
      </section>

      <RankingCard ranking={ranking} currentUserId={user.id} />
    </main>
  );
}

export default function App() {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [settings, setSettings] = useState<BettingSettings>({ locked: false });
  const [matches, setMatches] = useState<CupMatch[]>(FALLBACK_MATCHES);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [booting, setBooting] = useState(true);

  async function loadMatches() {
    const firestoreMatches = await getMatchesFromFirestore();
    setMatches(firestoreMatches.length > 0 ? firestoreMatches : FALLBACK_MATCHES);
  }

  async function handleImportApiMatches() {
    try {
      const apiMatches = await fetchWorldCupMatchesFromApi();
      if (!apiMatches.length) {
        window.alert(FALLBACK_NOTE);
        return;
      }

      await upsertMatches(apiMatches);
      setMatches(apiMatches);
      window.alert(`${apiMatches.length} jogos importados para o Firestore.`);
    } catch (error: any) {
      window.alert(error.message || "Nao foi possivel importar da API-Football.");
    }
  }

  async function loadSignedInUser(user: FirebaseUser) {
    const profile = await getUserProfile(user.uid);
    setAppUser(
      profile ??
        (await ensureUserProfile(user.uid, user.email || "", user.email?.split("@")[0] || "Apostador")),
    );
  }

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        await loadSignedInUser(user);
      } else {
        setAppUser(null);
      }
      setBooting(false);
    });

    const unsubscribeRanking = subscribeRanking(setRanking);
    const unsubscribeSettings = subscribeBettingSettings(setSettings);
    loadMatches().catch(() => setMatches(FALLBACK_MATCHES));

    return () => {
      unsubscribeAuth();
      unsubscribeRanking();
      unsubscribeSettings();
    };
  }, []);

  useEffect(() => {
    if (!firebaseUser) {
      setPredictions([]);
      return;
    }

    return subscribeUserPredictions(firebaseUser.uid, setPredictions);
  }, [firebaseUser]);

  if (booting) {
    return (
      <div className="loading-screen">
        <Trophy size={34} />
        <span>Carregando bolao...</span>
      </div>
    );
  }

  if (!firebaseUser || !appUser) {
    return <AuthScreen ranking={ranking} onSignedIn={loadSignedInUser} />;
  }

  return (
    <LoggedInApp
      user={appUser}
      ranking={ranking}
      settings={settings}
      matches={matches}
      predictions={predictions}
      onReloadMatches={loadMatches}
      onImportApiMatches={handleImportApiMatches}
    />
  );
}
