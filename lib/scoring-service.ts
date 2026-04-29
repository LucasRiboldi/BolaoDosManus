import { GroupBet, KnockoutBet, Match } from "@/lib/types";
import { SCORING_SYSTEM } from "@/lib/world-cup-data";

export class ScoringService {
  /**
   * Calcula pontos para uma aposta de fase de grupos
   * Regras:
   * - 10 pontos: Acerto exato do placar (ex: 2-1)
   * - 5 pontos: Acerto do vencedor mas placar errado
   * - 5 pontos: Acerto de empate mas gols errados
   * - 0 pontos: Errou
   */
  static calculateGroupBetPoints(bet: GroupBet, match: Match): number {
    // Se a partida ainda não terminou, retorna 0
    if (!match.homeGoals || match.awayGoals === undefined) {
      return 0;
    }

    // Acerto exato do placar
    if (bet.homeGoals === match.homeGoals && bet.awayGoals === match.awayGoals) {
      return SCORING_SYSTEM.EXACT_RESULT;
    }

    // Determina o resultado da aposta
    const betResult = this.getMatchResult(bet.homeGoals, bet.awayGoals);
    // Determina o resultado real
    const actualResult = this.getMatchResult(match.homeGoals, match.awayGoals);

    // Acerto do resultado (vencedor ou empate)
    if (betResult === actualResult) {
      return SCORING_SYSTEM.CORRECT_WINNER;
    }

    return 0;
  }

  /**
   * Calcula pontos para uma aposta de mata-mata
   * Regras:
   * - 10 pontos: Acerto do vencedor
   * - 0 pontos: Errou
   */
  static calculateKnockoutBetPoints(bet: KnockoutBet, winner: string): number {
    if (bet.winnerTeam === winner) {
      return SCORING_SYSTEM.KNOCKOUT_WINNER;
    }
    return 0;
  }

  /**
   * Determina o resultado de uma partida
   * Retorna: "home" (vitória do mandante), "away" (vitória do visitante), "draw" (empate)
   */
  private static getMatchResult(homeGoals: number, awayGoals: number): string {
    if (homeGoals > awayGoals) {
      return "home";
    } else if (awayGoals > homeGoals) {
      return "away";
    } else {
      return "draw";
    }
  }

  /**
   * Calcula pontos totais de um usuário
   */
  static calculateTotalPoints(groupBets: GroupBet[], knockoutBets: KnockoutBet[]): {
    groupPoints: number;
    knockoutPoints: number;
    totalPoints: number;
  } {
    const groupPoints = groupBets.reduce((sum, bet) => sum + (bet.points || 0), 0);
    const knockoutPoints = knockoutBets.reduce((sum, bet) => sum + (bet.points || 0), 0);

    return {
      groupPoints,
      knockoutPoints,
      totalPoints: groupPoints + knockoutPoints,
    };
  }
}
