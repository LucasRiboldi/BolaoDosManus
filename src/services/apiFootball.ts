import { CupMatch } from "../types";

type ApiFootballFixture = {
  fixture: {
    id: number;
    date: string;
    status: {
      short: string;
    };
  };
  league: {
    round: string;
  };
  teams: {
    home: {
      name: string;
      logo?: string;
    };
    away: {
      name: string;
      logo?: string;
    };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
};

function normalizeStatus(status: string): CupMatch["status"] {
  if (["FT", "AET", "PEN"].includes(status)) return "finished";
  if (["1H", "2H", "HT", "ET", "BT", "P"].includes(status)) return "live";
  return "scheduled";
}

export async function fetchWorldCupMatchesFromApi(): Promise<CupMatch[]> {
  const apiKey = import.meta.env.VITE_API_FOOTBALL_KEY as string | undefined;
  if (!apiKey) return [];

  const response = await fetch("https://v3.football.api-sports.io/fixtures?league=1&season=2026", {
    headers: {
      "x-apisports-key": apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`API-Football respondeu ${response.status}`);
  }

  const payload = (await response.json()) as { response?: ApiFootballFixture[] };
  const fixtures = payload.response ?? [];

  return fixtures.map((item) => ({
    id: `api_${item.fixture.id}`,
    apiFixtureId: item.fixture.id,
    group: item.league.round || "Copa 2026",
    round: item.league.round || "Copa 2026",
    homeTeam: item.teams.home.name,
    awayTeam: item.teams.away.name,
    homeFlag: item.teams.home.logo,
    awayFlag: item.teams.away.logo,
    kickoff: item.fixture.date,
    status: normalizeStatus(item.fixture.status.short),
    homeGoals: item.goals.home,
    awayGoals: item.goals.away,
  }));
}
