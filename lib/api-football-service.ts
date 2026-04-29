/**
 * Serviço para integração com API-Football
 * Documentação: https://www.api-football.com/documentation
 */

const API_KEY = process.env.EXPO_PUBLIC_API_FOOTBALL_KEY;
const BASE_URL = "https://v3.football.api-sports.io";

export interface FootballMatch {
  id: number;
  fixture: {
    id: number;
    date: string;
    timestamp: number;
    timezone: string;
    week: number | null;
    status: {
      long: string;
      short: string;
      elapsed: number | null;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    round: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
    };
    away: {
      id: number;
      name: string;
      logo: string;
    };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  score: {
    halftime: {
      home: number | null;
      away: number | null;
    };
    fulltime: {
      home: number | null;
      away: number | null;
    };
    extratime: {
      home: number | null;
      away: number | null;
    };
    penalty: {
      home: number | null;
      away: number | null;
    };
  };
}

export class APIFootballService {
  /**
   * Busca todas as partidas de um torneio
   */
  static async getLeagueMatches(leagueId: number, season: number) {
    try {
      const response = await fetch(
        `${BASE_URL}/fixtures?league=${leagueId}&season=${season}`,
        {
          headers: {
            "x-apisports-key": API_KEY || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.response as FootballMatch[];
    } catch (error) {
      console.error("Erro ao buscar partidas:", error);
      throw error;
    }
  }

  /**
   * Busca detalhes de uma partida específica
   */
  static async getMatchDetails(fixtureId: number) {
    try {
      const response = await fetch(`${BASE_URL}/fixtures?id=${fixtureId}`, {
        headers: {
          "x-apisports-key": API_KEY || "",
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.response[0] as FootballMatch;
    } catch (error) {
      console.error("Erro ao buscar detalhes da partida:", error);
      throw error;
    }
  }

  /**
   * Busca partidas por data
   */
  static async getMatchesByDate(date: string) {
    try {
      const response = await fetch(`${BASE_URL}/fixtures?date=${date}`, {
        headers: {
          "x-apisports-key": API_KEY || "",
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.response as FootballMatch[];
    } catch (error) {
      console.error("Erro ao buscar partidas por data:", error);
      throw error;
    }
  }

  /**
   * Busca informações de um time
   */
  static async getTeamInfo(teamId: number) {
    try {
      const response = await fetch(`${BASE_URL}/teams?id=${teamId}`, {
        headers: {
          "x-apisports-key": API_KEY || "",
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.response[0];
    } catch (error) {
      console.error("Erro ao buscar informações do time:", error);
      throw error;
    }
  }

  /**
   * Busca informações de um torneio
   */
  static async getLeagueInfo(leagueId: number, season: number) {
    try {
      const response = await fetch(
        `${BASE_URL}/leagues?id=${leagueId}&season=${season}`,
        {
          headers: {
            "x-apisports-key": API_KEY || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.response[0];
    } catch (error) {
      console.error("Erro ao buscar informações do torneio:", error);
      throw error;
    }
  }

  /**
   * Valida a chave da API
   */
  static async validateApiKey(): Promise<boolean> {
    try {
      const response = await fetch(`${BASE_URL}/status`, {
        headers: {
          "x-apisports-key": API_KEY || "",
        },
      });

      return response.ok;
    } catch (error) {
      console.error("Erro ao validar chave da API:", error);
      return false;
    }
  }
}
