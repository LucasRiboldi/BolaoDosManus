import { Group, Team, Match, KnockoutMatch } from "./types";

export const GROUPS: Record<string, Group> = {
  A: {
    name: "A",
    teams: [
      { name: "México", flag: "🇲🇽", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "África do Sul", flag: "🇿🇦", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "Coreia do Sul", flag: "🇰🇷", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "República Tcheca", flag: "🇨🇿", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    ],
    matches: [
      { id: "A1", homeTeam: "México", awayTeam: "África do Sul", homeTeamFlag: "🇲🇽", awayTeamFlag: "🇿🇦", date: new Date("2026-06-11T18:00:00Z"), group: "A", status: "pending", phase: "groups" },
      { id: "A2", homeTeam: "Coreia do Sul", awayTeam: "República Tcheca", homeTeamFlag: "🇰🇷", awayTeamFlag: "🇨🇿", date: new Date("2026-06-11T21:00:00Z"), group: "A", status: "pending", phase: "groups" },
      { id: "A3", homeTeam: "República Tcheca", awayTeam: "África do Sul", homeTeamFlag: "🇨🇿", awayTeamFlag: "🇿🇦", date: new Date("2026-06-18T18:00:00Z"), group: "A", status: "pending", phase: "groups" },
      { id: "A4", homeTeam: "México", awayTeam: "Coreia do Sul", homeTeamFlag: "🇲🇽", awayTeamFlag: "🇰🇷", date: new Date("2026-06-24T21:00:00Z"), group: "A", status: "pending", phase: "groups" },
      { id: "A5", homeTeam: "México", awayTeam: "República Tcheca", homeTeamFlag: "🇲🇽", awayTeamFlag: "🇨🇿", date: new Date("2026-06-24T21:00:00Z"), group: "A", status: "pending", phase: "groups" },
      { id: "A6", homeTeam: "África do Sul", awayTeam: "Coreia do Sul", homeTeamFlag: "🇿🇦", awayTeamFlag: "🇰🇷", date: new Date("2026-06-24T21:00:00Z"), group: "A", status: "pending", phase: "groups" },
    ],
  },
  B: {
    name: "B",
    teams: [
      { name: "Canadá", flag: "🇨🇦", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "Bósnia e Herzegovina", flag: "🇧🇦", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "Suíça", flag: "🇨🇭", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "Catar", flag: "🇶🇦", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    ],
    matches: [
      { id: "B1", homeTeam: "Canadá", awayTeam: "Bósnia e Herzegovina", homeTeamFlag: "🇨🇦", awayTeamFlag: "🇧🇦", date: new Date("2026-06-12T18:00:00Z"), group: "B", status: "pending", phase: "groups" },
      { id: "B2", homeTeam: "Suíça", awayTeam: "Catar", homeTeamFlag: "🇨🇭", awayTeamFlag: "🇶🇦", date: new Date("2026-06-12T21:00:00Z"), group: "B", status: "pending", phase: "groups" },
      { id: "B3", homeTeam: "Suíça", awayTeam: "Bósnia e Herzegovina", homeTeamFlag: "🇨🇭", awayTeamFlag: "🇧🇦", date: new Date("2026-06-19T18:00:00Z"), group: "B", status: "pending", phase: "groups" },
      { id: "B4", homeTeam: "Canadá", awayTeam: "Catar", homeTeamFlag: "🇨🇦", awayTeamFlag: "🇶🇦", date: new Date("2026-06-24T18:00:00Z"), group: "B", status: "pending", phase: "groups" },
      { id: "B5", homeTeam: "Bósnia e Herzegovina", awayTeam: "Catar", homeTeamFlag: "🇧🇦", awayTeamFlag: "🇶🇦", date: new Date("2026-06-24T18:00:00Z"), group: "B", status: "pending", phase: "groups" },
      { id: "B6", homeTeam: "Canadá", awayTeam: "Suíça", homeTeamFlag: "🇨🇦", awayTeamFlag: "🇨🇭", date: new Date("2026-06-24T18:00:00Z"), group: "B", status: "pending", phase: "groups" },
    ],
  },
  C: {
    name: "C",
    teams: [
      { name: "Brasil", flag: "🇧🇷", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "Marrocos", flag: "🇲🇦", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "Escócia", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "Haiti", flag: "🇭🇹", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    ],
    matches: [
      { id: "C1", homeTeam: "Brasil", awayTeam: "Marrocos", homeTeamFlag: "🇧🇷", awayTeamFlag: "🇲🇦", date: new Date("2026-06-13T18:00:00Z"), group: "C", status: "pending", phase: "groups" },
      { id: "C2", homeTeam: "Escócia", awayTeam: "Haiti", homeTeamFlag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", awayTeamFlag: "🇭🇹", date: new Date("2026-06-13T21:00:00Z"), group: "C", status: "pending", phase: "groups" },
      { id: "C3", homeTeam: "Brasil", awayTeam: "Haiti", homeTeamFlag: "🇧🇷", awayTeamFlag: "🇭🇹", date: new Date("2026-06-19T21:00:00Z"), group: "C", status: "pending", phase: "groups" },
      { id: "C4", homeTeam: "Escócia", awayTeam: "Marrocos", homeTeamFlag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", awayTeamFlag: "🇲🇦", date: new Date("2026-06-19T18:00:00Z"), group: "C", status: "pending", phase: "groups" },
      { id: "C5", homeTeam: "Brasil", awayTeam: "Escócia", homeTeamFlag: "🇧🇷", awayTeamFlag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", date: new Date("2026-06-24T21:00:00Z"), group: "C", status: "pending", phase: "groups" },
      { id: "C6", homeTeam: "Marrocos", awayTeam: "Haiti", homeTeamFlag: "🇲🇦", awayTeamFlag: "🇭🇹", date: new Date("2026-06-24T21:00:00Z"), group: "C", status: "pending", phase: "groups" },
    ],
  },
  D: {
    name: "D",
    teams: [
      { name: "Argentina", flag: "🇦🇷", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "Irã", flag: "🇮🇷", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "Vietnã", flag: "🇻🇳", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "Peru", flag: "🇵🇪", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    ],
    matches: [
      { id: "D1", homeTeam: "Argentina", awayTeam: "Irã", homeTeamFlag: "🇦🇷", awayTeamFlag: "🇮🇷", date: new Date("2026-06-14T18:00:00Z"), group: "D", status: "pending", phase: "groups" },
      { id: "D2", homeTeam: "Vietnã", awayTeam: "Peru", homeTeamFlag: "🇻🇳", awayTeamFlag: "🇵🇪", date: new Date("2026-06-14T21:00:00Z"), group: "D", status: "pending", phase: "groups" },
      { id: "D3", homeTeam: "Argentina", awayTeam: "Vietnã", homeTeamFlag: "🇦🇷", awayTeamFlag: "🇻🇳", date: new Date("2026-06-20T18:00:00Z"), group: "D", status: "pending", phase: "groups" },
      { id: "D4", homeTeam: "Peru", awayTeam: "Irã", homeTeamFlag: "🇵🇪", awayTeamFlag: "🇮🇷", date: new Date("2026-06-20T21:00:00Z"), group: "D", status: "pending", phase: "groups" },
      { id: "D5", homeTeam: "Argentina", awayTeam: "Peru", homeTeamFlag: "🇦🇷", awayTeamFlag: "🇵🇪", date: new Date("2026-06-25T21:00:00Z"), group: "D", status: "pending", phase: "groups" },
      { id: "D6", homeTeam: "Vietnã", awayTeam: "Irã", homeTeamFlag: "🇻🇳", awayTeamFlag: "🇮🇷", date: new Date("2026-06-25T21:00:00Z"), group: "D", status: "pending", phase: "groups" },
    ],
  },
  E: {
    name: "E",
    teams: [
      { name: "Espanha", flag: "🇪🇸", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "Itália", flag: "🇮🇹", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "Paraguai", flag: "🇵🇾", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "Guiné Equatorial", flag: "🇬🇶", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    ],
    matches: [
      { id: "E1", homeTeam: "Espanha", awayTeam: "Itália", homeTeamFlag: "🇪🇸", awayTeamFlag: "🇮🇹", date: new Date("2026-06-15T18:00:00Z"), group: "E", status: "pending", phase: "groups" },
      { id: "E2", homeTeam: "Paraguai", awayTeam: "Guiné Equatorial", homeTeamFlag: "🇵🇾", awayTeamFlag: "🇬🇶", date: new Date("2026-06-15T21:00:00Z"), group: "E", status: "pending", phase: "groups" },
      { id: "E3", homeTeam: "Espanha", awayTeam: "Paraguai", homeTeamFlag: "🇪🇸", awayTeamFlag: "🇵🇾", date: new Date("2026-06-21T18:00:00Z"), group: "E", status: "pending", phase: "groups" },
      { id: "E4", homeTeam: "Guiné Equatorial", awayTeam: "Itália", homeTeamFlag: "🇬🇶", awayTeamFlag: "🇮🇹", date: new Date("2026-06-21T21:00:00Z"), group: "E", status: "pending", phase: "groups" },
      { id: "E5", homeTeam: "Espanha", awayTeam: "Guiné Equatorial", homeTeamFlag: "🇪🇸", awayTeamFlag: "🇬🇶", date: new Date("2026-06-25T18:00:00Z"), group: "E", status: "pending", phase: "groups" },
      { id: "E6", homeTeam: "Itália", awayTeam: "Paraguai", homeTeamFlag: "🇮🇹", awayTeamFlag: "🇵🇾", date: new Date("2026-06-25T18:00:00Z"), group: "E", status: "pending", phase: "groups" },
    ],
  },
  F: {
    name: "F",
    teams: [
      { name: "França", flag: "🇫🇷", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "Holanda", flag: "🇳🇱", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "Polônia", flag: "🇵🇱", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "Uruguai", flag: "🇺🇾", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    ],
    matches: [
      { id: "F1", homeTeam: "França", awayTeam: "Holanda", homeTeamFlag: "🇫🇷", awayTeamFlag: "🇳🇱", date: new Date("2026-06-16T18:00:00Z"), group: "F", status: "pending", phase: "groups" },
      { id: "F2", homeTeam: "Polônia", awayTeam: "Uruguai", homeTeamFlag: "🇵🇱", awayTeamFlag: "🇺🇾", date: new Date("2026-06-16T21:00:00Z"), group: "F", status: "pending", phase: "groups" },
      { id: "F3", homeTeam: "França", awayTeam: "Polônia", homeTeamFlag: "🇫🇷", awayTeamFlag: "🇵🇱", date: new Date("2026-06-22T18:00:00Z"), group: "F", status: "pending", phase: "groups" },
      { id: "F4", homeTeam: "Uruguai", awayTeam: "Holanda", homeTeamFlag: "🇺🇾", awayTeamFlag: "🇳🇱", date: new Date("2026-06-22T21:00:00Z"), group: "F", status: "pending", phase: "groups" },
      { id: "F5", homeTeam: "França", awayTeam: "Uruguai", homeTeamFlag: "🇫🇷", awayTeamFlag: "🇺🇾", date: new Date("2026-06-25T21:00:00Z"), group: "F", status: "pending", phase: "groups" },
      { id: "F6", homeTeam: "Holanda", awayTeam: "Polônia", homeTeamFlag: "🇳🇱", awayTeamFlag: "🇵🇱", date: new Date("2026-06-25T21:00:00Z"), group: "F", status: "pending", phase: "groups" },
    ],
  },
  G: {
    name: "G",
    teams: [
      { name: "Alemanha", flag: "🇩🇪", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "Dinamarca", flag: "🇩🇰", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "Sérvia", flag: "🇷🇸", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "Tailândia", flag: "🇹🇭", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    ],
    matches: [
      { id: "G1", homeTeam: "Alemanha", awayTeam: "Dinamarca", homeTeamFlag: "🇩🇪", awayTeamFlag: "🇩🇰", date: new Date("2026-06-17T18:00:00Z"), group: "G", status: "pending", phase: "groups" },
      { id: "G2", homeTeam: "Sérvia", awayTeam: "Tailândia", homeTeamFlag: "🇷🇸", awayTeamFlag: "🇹🇭", date: new Date("2026-06-17T21:00:00Z"), group: "G", status: "pending", phase: "groups" },
      { id: "G3", homeTeam: "Alemanha", awayTeam: "Sérvia", homeTeamFlag: "🇩🇪", awayTeamFlag: "🇷🇸", date: new Date("2026-06-23T18:00:00Z"), group: "G", status: "pending", phase: "groups" },
      { id: "G4", homeTeam: "Tailândia", awayTeam: "Dinamarca", homeTeamFlag: "🇹🇭", awayTeamFlag: "🇩🇰", date: new Date("2026-06-23T21:00:00Z"), group: "G", status: "pending", phase: "groups" },
      { id: "G5", homeTeam: "Alemanha", awayTeam: "Tailândia", homeTeamFlag: "🇩🇪", awayTeamFlag: "🇹🇭", date: new Date("2026-06-26T21:00:00Z"), group: "G", status: "pending", phase: "groups" },
      { id: "G6", homeTeam: "Dinamarca", awayTeam: "Sérvia", homeTeamFlag: "🇩🇰", awayTeamFlag: "🇷🇸", date: new Date("2026-06-26T21:00:00Z"), group: "G", status: "pending", phase: "groups" },
    ],
  },
  H: {
    name: "H",
    teams: [
      { name: "Portugal", flag: "🇵🇹", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "Bélgica", flag: "🇧🇪", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "Turquia", flag: "🇹🇷", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "Geórgia", flag: "🇬🇪", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    ],
    matches: [
      { id: "H1", homeTeam: "Portugal", awayTeam: "Bélgica", homeTeamFlag: "🇵🇹", awayTeamFlag: "🇧🇪", date: new Date("2026-06-18T21:00:00Z"), group: "H", status: "pending", phase: "groups" },
      { id: "H2", homeTeam: "Turquia", awayTeam: "Geórgia", homeTeamFlag: "🇹🇷", awayTeamFlag: "🇬🇪", date: new Date("2026-06-19T21:00:00Z"), group: "H", status: "pending", phase: "groups" },
      { id: "H3", homeTeam: "Bélgica", awayTeam: "Geórgia", homeTeamFlag: "🇧🇪", awayTeamFlag: "🇬🇪", date: new Date("2026-06-22T18:00:00Z"), group: "H", status: "pending", phase: "groups" },
      { id: "H4", homeTeam: "Turquia", awayTeam: "Portugal", homeTeamFlag: "🇹🇷", awayTeamFlag: "🇵🇹", date: new Date("2026-06-22T21:00:00Z"), group: "H", status: "pending", phase: "groups" },
      { id: "H5", homeTeam: "Bélgica", awayTeam: "Turquia", homeTeamFlag: "🇧🇪", awayTeamFlag: "🇹🇷", date: new Date("2026-06-26T18:00:00Z"), group: "H", status: "pending", phase: "groups" },
      { id: "H6", homeTeam: "Geórgia", awayTeam: "Portugal", homeTeamFlag: "🇬🇪", awayTeamFlag: "🇵🇹", date: new Date("2026-06-26T18:00:00Z"), group: "H", status: "pending", phase: "groups" },
    ],
  },
  I: {
    name: "I",
    teams: [
      { name: "Japão", flag: "🇯🇵", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "Austrália", flag: "🇦🇺", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "Síria", flag: "🇸🇾", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
      { name: "Omã", flag: "🇴🇲", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
    ],
    matches: [
      { id: "I1", homeTeam: "Japão", awayTeam: "Austrália", homeTeamFlag: "🇯🇵", awayTeamFlag: "🇦🇺", date: new Date("2026-06-20T18:00:00Z"), group: "I", status: "pending", phase: "groups" },
      { id: "I2", homeTeam: "Síria", awayTeam: "Omã", homeTeamFlag: "🇸🇾", awayTeamFlag: "🇴🇲", date: new Date("2026-06-20T21:00:00Z"), group: "I", status: "pending", phase: "groups" },
      { id: "I3", homeTeam: "Japão", awayTeam: "Síria", homeTeamFlag: "🇯🇵", awayTeamFlag: "🇸🇾", date: new Date("2026-06-23T18:00:00Z"), group: "I", status: "pending", phase: "groups" },
      { id: "I4", homeTeam: "Omã", awayTeam: "Austrália", homeTeamFlag: "🇴🇲", awayTeamFlag: "🇦🇺", date: new Date("2026-06-23T21:00:00Z"), group: "I", status: "pending", phase: "groups" },
      { id: "I5", homeTeam: "Japão", awayTeam: "Omã", homeTeamFlag: "🇯🇵", awayTeamFlag: "🇴🇲", date: new Date("2026-06-26T21:00:00Z"), group: "I", status: "pending", phase: "groups" },
      { id: "I6", homeTeam: "Austrália", awayTeam: "Síria", homeTeamFlag: "🇦🇺", awayTeamFlag: "🇸🇾", date: new Date("2026-06-26T21:00:00Z"), group: "I", status: "pending", phase: "groups" },
    ],
  },
};

// Knockout bracket structure (32 teams, 8 best third-place teams)
export const KNOCKOUT_BRACKET: Record<string, KnockoutMatch[]> = {
  round32: Array.from({ length: 16 }, (_, i) => ({
    id: `R32_${i + 1}`,
    round: "round32" as const,
    matchNumber: i + 1,
    status: "pending" as const,
  })),
  round16: Array.from({ length: 8 }, (_, i) => ({
    id: `R16_${i + 1}`,
    round: "round16" as const,
    matchNumber: i + 1,
    status: "pending" as const,
  })),
  quarterfinal: Array.from({ length: 4 }, (_, i) => ({
    id: `QF_${i + 1}`,
    round: "quarterfinal" as const,
    matchNumber: i + 1,
    status: "pending" as const,
  })),
  semifinal: Array.from({ length: 2 }, (_, i) => ({
    id: `SF_${i + 1}`,
    round: "semifinal" as const,
    matchNumber: i + 1,
    status: "pending" as const,
  })),
  final: [
    {
      id: "FINAL",
      round: "final" as const,
      matchNumber: 1,
      status: "pending" as const,
    },
  ],
};

// Sistema de pontuação
export const SCORING_SYSTEM = {
  EXACT_RESULT: 10, // Acerto exato do placar (ex: 2-1)
  CORRECT_WINNER: 5, // Acerto do vencedor mas placar errado
  CORRECT_DRAW: 5, // Acerto de empate mas gols errados
  KNOCKOUT_WINNER: 10, // Acerto do vencedor no mata-mata
};
