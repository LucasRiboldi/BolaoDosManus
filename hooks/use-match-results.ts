import { useCallback, useEffect, useState } from "react";
import { APIFootballService, FootballMatch } from "@/lib/api-football-service";
import { useFirestore } from "@/hooks/use-firestore";
import { Match } from "@/lib/types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function useMatchResults() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateUserPoints } = useFirestore();

  /**
   * Sincroniza resultados da API-Football com Firestore
   * Copa 2026: League ID = 1 (World Cup), Season = 2026
   */
  const syncMatchResults = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Validar chave da API
      const isValid = await APIFootballService.validateApiKey();
      if (!isValid) {
        throw new Error("Chave da API-Football inválida");
      }

      // Buscar partidas da Copa 2026
      // Nota: Você pode precisar ajustar o league ID conforme a API retorna para Copa 2026
      const matches = await APIFootballService.getLeagueMatches(1, 2026);

      // Processar cada partida
      for (const apiMatch of matches) {
        // Verificar se a partida tem resultado
        if (apiMatch.goals.home !== null && apiMatch.goals.away !== null) {
          // Atualizar partida no Firestore
          const matchId = `match_${apiMatch.fixture.id}`;
          const matchRef = doc(db, "matches", matchId);

          await updateDoc(matchRef, {
            homeGoals: apiMatch.goals.home,
            awayGoals: apiMatch.goals.away,
            status: apiMatch.fixture.status.short,
            updatedAt: new Date(),
          }).catch(() => {
            // Se o documento não existe, criar um novo
            // Isso será tratado em outro lugar
          });
        }
      }

      console.log(`Sincronizados ${matches.length} resultados`);
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao sincronizar resultados";
      setError(errorMessage);
      console.error("Erro ao sincronizar:", errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Busca resultado de uma partida específica
   */
  const getMatchResult = useCallback(async (fixtureId: number) => {
    try {
      const match = await APIFootballService.getMatchDetails(fixtureId);
      return match;
    } catch (err) {
      console.error("Erro ao buscar resultado:", err);
      throw err;
    }
  }, []);

  /**
   * Sincroniza automaticamente a cada 5 minutos
   */
  useEffect(() => {
    // Sincronizar na primeira vez
    syncMatchResults();

    // Configurar sincronização periódica
    const interval = setInterval(() => {
      syncMatchResults();
    }, 5 * 60 * 1000); // 5 minutos

    return () => clearInterval(interval);
  }, [syncMatchResults]);

  return {
    loading,
    error,
    syncMatchResults,
    getMatchResult,
  };
}
