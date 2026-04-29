import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  writeBatch,
  Timestamp,
} from "firebase/firestore";
import { GroupBet, KnockoutBet, Match, RankingEntry } from "@/lib/types";
import { ScoringService } from "@/lib/scoring-service";

/**
 * Serviço de cálculo automático de pontos
 * Sincroniza resultados com apostas e atualiza pontuação
 */

export class AutoScoringService {
  /**
   * Calcula pontos para uma aposta de grupos e atualiza no Firestore
   */
  static async calculateAndUpdateGroupBet(match: Match) {
    try {
      // Se a partida não tem resultado, não calcula
      if (match.homeGoals === null || match.awayGoals === undefined) {
        return;
      }

      // Buscar todas as apostas para esta partida
      const betsRef = collection(db, "groupBets");
      const q = query(betsRef, where("matchId", "==", match.id));
      const snapshot = await getDocs(q);

      const batch = writeBatch(db);
      const usersToUpdate = new Set<string>();

      // Calcular pontos para cada aposta
      snapshot.forEach((betDoc) => {
        const bet = betDoc.data() as GroupBet;
        const points = ScoringService.calculateGroupBetPoints(bet, match);

        // Atualizar aposta com pontos
        batch.update(betDoc.ref, {
          points,
          updatedAt: Timestamp.now(),
        });

        usersToUpdate.add(bet.userId);
      });

      await batch.commit();

      // Atualizar ranking dos usuários afetados
      for (const userId of usersToUpdate) {
        await this.updateUserRanking(userId);
      }

      console.log(`Pontos calculados para partida ${match.id}`);
    } catch (error) {
      console.error("Erro ao calcular pontos:", error);
    }
  }

  /**
   * Calcula pontos para uma aposta de mata-mata e atualiza no Firestore
   */
  static async calculateAndUpdateKnockoutBet(matchId: string, winner: string) {
    try {
      // Buscar todas as apostas para esta partida
      const betsRef = collection(db, "knockoutBets");
      const q = query(betsRef, where("matchId", "==", matchId));
      const snapshot = await getDocs(q);

      const batch = writeBatch(db);
      const usersToUpdate = new Set<string>();

      // Calcular pontos para cada aposta
      snapshot.forEach((betDoc) => {
        const bet = betDoc.data() as KnockoutBet;
        const points = ScoringService.calculateKnockoutBetPoints(bet, winner);

        // Atualizar aposta com pontos
        batch.update(betDoc.ref, {
          points,
          updatedAt: Timestamp.now(),
        });

        usersToUpdate.add(bet.userId);
      });

      await batch.commit();

      // Atualizar ranking dos usuários afetados
      for (const userId of usersToUpdate) {
        await this.updateUserRanking(userId);
      }

      console.log(`Pontos calculados para partida ${matchId}`);
    } catch (error) {
      console.error("Erro ao calcular pontos:", error);
    }
  }

  /**
   * Atualiza o ranking de um usuário baseado em suas apostas
   */
  static async updateUserRanking(userId: string) {
    try {
      // Buscar todas as apostas de grupos do usuário
      const groupBetsRef = collection(db, "groupBets");
      const groupQuery = query(groupBetsRef, where("userId", "==", userId));
      const groupSnapshot = await getDocs(groupQuery);

      let groupPoints = 0;
      groupSnapshot.forEach((doc) => {
        const bet = doc.data() as GroupBet;
        groupPoints += bet.points || 0;
      });

      // Buscar todas as apostas de mata-mata do usuário
      const knockoutBetsRef = collection(db, "knockoutBets");
      const knockoutQuery = query(knockoutBetsRef, where("userId", "==", userId));
      const knockoutSnapshot = await getDocs(knockoutQuery);

      let knockoutPoints = 0;
      knockoutSnapshot.forEach((doc) => {
        const bet = doc.data() as KnockoutBet;
        knockoutPoints += bet.points || 0;
      });

      const totalPoints = groupPoints + knockoutPoints;

      // Atualizar documento do usuário
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        groupPoints,
        knockoutPoints,
        totalPoints,
        updatedAt: Timestamp.now(),
      });

      // Recalcular ranking global
      await this.recalculateGlobalRanking();

      console.log(`Ranking atualizado para usuário ${userId}: ${totalPoints} pontos`);
    } catch (error) {
      console.error("Erro ao atualizar ranking do usuário:", error);
    }
  }

  /**
   * Recalcula o ranking global de todos os usuários
   */
  static async recalculateGlobalRanking() {
    try {
      // Buscar todos os usuários
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);

      // Criar array com usuários e seus pontos
      const users: Array<{
        id: string;
        totalPoints: number;
        name: string;
        email: string;
      }> = [];

      snapshot.forEach((doc) => {
        const user = doc.data();
        users.push({
          id: doc.id,
          totalPoints: user.totalPoints || 0,
          name: user.name,
          email: user.email,
        });
      });

      // Ordenar por pontos (decrescente)
      users.sort((a, b) => b.totalPoints - a.totalPoints);

      // Atualizar posição de cada usuário
      const batch = writeBatch(db);

      users.forEach((user, index) => {
        const userRef = doc(db, "users", user.id);
        batch.update(userRef, {
          position: index + 1,
          updatedAt: Timestamp.now(),
        });
      });

      await batch.commit();

      console.log("Ranking global recalculado");
    } catch (error) {
      console.error("Erro ao recalcular ranking global:", error);
    }
  }

  /**
   * Sincroniza resultados da API com apostas e calcula pontos
   * Deve ser chamado periodicamente ou quando resultados são atualizados
   */
  static async syncResultsAndCalculatePoints(matches: Match[]) {
    try {
      for (const match of matches) {
        // Se a partida tem resultado, calcular pontos
        if (match.homeGoals !== null && match.awayGoals !== undefined) {
          await this.calculateAndUpdateGroupBet(match);
        }
      }

      console.log("Sincronização de resultados concluída");
    } catch (error) {
      console.error("Erro ao sincronizar resultados:", error);
    }
  }
}
