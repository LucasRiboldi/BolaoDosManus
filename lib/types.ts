// User types
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  totalPoints: number;
}

// Match types
export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamFlag: string;
  awayTeamFlag: string;
  date: Date;
  group: string;
  status: "pending" | "live" | "finished";
  homeGoals?: number;
  awayGoals?: number;
  phase: "groups" | "knockout";
}

// Bet types
export interface GroupBet {
  id: string;
  userId: string;
  matchId: string;
  homeGoals: number;
  awayGoals: number;
  createdAt: Date;
  updatedAt: Date;
  confirmed: boolean;
  points?: number;
}

export interface KnockoutBet {
  id: string;
  userId: string;
  matchId: string;
  winnerTeam: string;
  createdAt: Date;
  updatedAt: Date;
  confirmed: boolean;
  points?: number;
}

// Ranking types
export interface RankingEntry {
  userId: string;
  userName: string;
  totalPoints: number;
  groupPoints: number;
  knockoutPoints: number;
  position: number;
}

// Group types
export interface Group {
  name: string;
  teams: Team[];
  matches: Match[];
}

export interface Team {
  name: string;
  flag: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

// Knockout bracket types
export interface KnockoutMatch {
  id: string;
  round: "round32" | "round16" | "quarterfinal" | "semifinal" | "final";
  matchNumber: number;
  homeTeam?: string;
  awayTeam?: string;
  winner?: string;
  date?: Date;
  status: "pending" | "live" | "finished";
}

export interface KnockoutBracket {
  round32: KnockoutMatch[];
  round16: KnockoutMatch[];
  quarterfinal: KnockoutMatch[];
  semifinal: KnockoutMatch[];
  final: KnockoutMatch[];
}
