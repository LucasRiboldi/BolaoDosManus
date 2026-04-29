import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase";
import { AppUser, BettingSettings, CupMatch, Prediction, RankingEntry } from "../types";

function toDate(value: unknown): Date {
  if (value instanceof Timestamp) return value.toDate();
  if (value instanceof Date) return value;
  if (typeof value === "string") return new Date(value);
  return new Date();
}

function mapUser(id: string, data: Record<string, any>): AppUser {
  return {
    id,
    name: data.name || "Apostador",
    email: data.email || "",
    totalPoints: data.totalPoints || 0,
    exactScores: data.exactScores || 0,
    correctResults: data.correctResults || 0,
    role: data.role === "admin" || data.isAdmin ? "admin" : "user",
    createdAt: toDate(data.createdAt),
  };
}

function mapMatch(id: string, data: Record<string, any>): CupMatch {
  return {
    id,
    apiFixtureId: data.apiFixtureId,
    group: data.group || "Copa 2026",
    round: data.round || data.group || "Copa 2026",
    homeTeam: data.homeTeam,
    awayTeam: data.awayTeam,
    homeFlag: data.homeFlag,
    awayFlag: data.awayFlag,
    kickoff: data.kickoff,
    status: data.status || "scheduled",
    homeGoals: data.homeGoals ?? null,
    awayGoals: data.awayGoals ?? null,
  };
}

export async function ensureUserProfile(userId: string, email: string, name: string): Promise<AppUser> {
  const userRef = doc(db, "users", userId);
  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    return mapUser(snapshot.id, snapshot.data());
  }

  const userData = {
    name,
    email,
    role: "user",
    isAdmin: false,
    totalPoints: 0,
    exactScores: 0,
    correctResults: 0,
    createdAt: Timestamp.now(),
  };

  await setDoc(userRef, userData);
  await setDoc(doc(db, "rankings", userId), {
    userName: name,
    totalPoints: 0,
    exactScores: 0,
    correctResults: 0,
    createdAt: Timestamp.now(),
  });
  return mapUser(userId, userData);
}

export async function getUserProfile(userId: string): Promise<AppUser | null> {
  const snapshot = await getDoc(doc(db, "users", userId));
  return snapshot.exists() ? mapUser(snapshot.id, snapshot.data()) : null;
}

export function subscribeRanking(callback: (ranking: RankingEntry[]) => void) {
  return onSnapshot(collection(db, "rankings"), (snapshot) => {
    const ranking = snapshot.docs
      .map((rankingDoc) => {
        const data = rankingDoc.data();
        return {
          userId: rankingDoc.id,
          userName: data.userName || data.name || "Apostador",
          totalPoints: data.totalPoints || 0,
          exactScores: data.exactScores || 0,
          correctResults: data.correctResults || 0,
          position: 0,
        };
      })
      .sort((a, b) => b.totalPoints - a.totalPoints || b.exactScores - a.exactScores);

    ranking.forEach((entry, index) => {
      entry.position = index + 1;
    });

    callback(ranking);
  });
}

export function subscribeBettingSettings(callback: (settings: BettingSettings) => void) {
  return onSnapshot(doc(db, "settings", "bets"), (snapshot) => {
    if (!snapshot.exists()) {
      callback({ locked: false });
      return;
    }

    const data = snapshot.data();
    callback({
      locked: Boolean(data.locked),
      updatedAt: data.updatedAt?.toDate?.(),
      updatedBy: data.updatedBy,
    });
  });
}

export async function setBettingLocked(locked: boolean, updatedBy: string) {
  await setDoc(
    doc(db, "settings", "bets"),
    {
      locked,
      updatedBy,
      updatedAt: Timestamp.now(),
    },
    { merge: true },
  );
}

export async function getMatchesFromFirestore(): Promise<CupMatch[]> {
  const snapshot = await getDocs(query(collection(db, "matches"), orderBy("kickoff", "asc")));
  return snapshot.docs.map((matchDoc) => mapMatch(matchDoc.id, matchDoc.data()));
}

export async function upsertMatches(matches: CupMatch[]) {
  const batch = writeBatch(db);
  matches.forEach((match) => {
    batch.set(doc(db, "matches", match.id), match, { merge: true });
  });
  await batch.commit();
}

export function subscribeUserPredictions(userId: string, callback: (predictions: Prediction[]) => void) {
  const predictionsQuery = query(collection(db, "predictions"), where("userId", "==", userId));

  return onSnapshot(predictionsQuery, (snapshot) => {
    callback(
      snapshot.docs.map((predictionDoc) => {
        const data = predictionDoc.data();
        return {
          id: predictionDoc.id,
          userId: data.userId,
          matchId: data.matchId,
          homeGoals: data.homeGoals,
          awayGoals: data.awayGoals,
          createdAt: toDate(data.createdAt),
          updatedAt: toDate(data.updatedAt),
        };
      }),
    );
  });
}

export async function savePredictions(userId: string, matches: CupMatch[], drafts: Record<string, string>) {
  const settingsSnap = await getDoc(doc(db, "settings", "bets"));
  if (settingsSnap.exists() && settingsSnap.data().locked) {
    throw new Error("As apostas estao travadas pelo administrador.");
  }

  const batch = writeBatch(db);
  const now = Timestamp.now();

  matches.forEach((match) => {
    const homeValue = drafts[`${match.id}:home`];
    const awayValue = drafts[`${match.id}:away`];
    if (homeValue === undefined || awayValue === undefined || homeValue === "" || awayValue === "") return;

    const predictionId = `${userId}_${match.id}`;
    batch.set(
      doc(db, "predictions", predictionId),
      {
        userId,
        matchId: match.id,
        homeGoals: Number.parseInt(homeValue, 10),
        awayGoals: Number.parseInt(awayValue, 10),
        createdAt: now,
        updatedAt: now,
      },
      { merge: true },
    );
  });

  await batch.commit();
}
