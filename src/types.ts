export type MatchStatus = "scheduled" | "live" | "finished";

export type CupMatch = {
  id: string;
  apiFixtureId?: number;
  group: string;
  round: string;
  homeTeam: string;
  awayTeam: string;
  homeFlag?: string;
  awayFlag?: string;
  kickoff: string;
  status: MatchStatus;
  homeGoals?: number | null;
  awayGoals?: number | null;
};

export type Prediction = {
  id: string;
  userId: string;
  matchId: string;
  homeGoals: number;
  awayGoals: number;
  createdAt: Date;
  updatedAt: Date;
};

export type AppUser = {
  id: string;
  name: string;
  email: string;
  totalPoints: number;
  exactScores: number;
  correctResults: number;
  role: "user" | "admin";
  createdAt: Date;
};

export type RankingEntry = {
  userId: string;
  userName: string;
  totalPoints: number;
  exactScores: number;
  correctResults: number;
  position: number;
};

export type BettingSettings = {
  locked: boolean;
  updatedAt?: Date;
  updatedBy?: string;
};
