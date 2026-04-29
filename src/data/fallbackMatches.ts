import { CupMatch } from "../types";

const groupNames = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

const teamsByGroup: Record<string, string[]> = Object.fromEntries(
  groupNames.map((groupName) => [
    groupName,
    [
      `Grupo ${groupName} - Time 1`,
      `Grupo ${groupName} - Time 2`,
      `Grupo ${groupName} - Time 3`,
      `Grupo ${groupName} - Time 4`,
    ],
  ]),
);

function makeDate(matchIndex: number) {
  const date = new Date(Date.UTC(2026, 5, 11, 16 + (matchIndex % 4) * 2, 0, 0));
  date.setUTCDate(date.getUTCDate() + Math.floor(matchIndex / 4));
  return date.toISOString();
}

export const FALLBACK_MATCHES: CupMatch[] = groupNames.flatMap((groupName, groupIndex) => {
  const [teamOne, teamTwo, teamThree, teamFour] = teamsByGroup[groupName];
  const pairings = [
    [teamOne, teamTwo],
    [teamThree, teamFour],
    [teamOne, teamThree],
    [teamFour, teamTwo],
    [teamFour, teamOne],
    [teamTwo, teamThree],
  ];

  return pairings.map(([homeTeam, awayTeam], matchIndex) => {
    const absoluteIndex = groupIndex * 6 + matchIndex;
    return {
      id: `${groupName}${matchIndex + 1}`,
      group: groupName,
      round: "Fase de grupos",
      homeTeam,
      awayTeam,
      kickoff: makeDate(absoluteIndex),
      status: "scheduled",
    };
  });
});

export const FALLBACK_NOTE =
  "Tabela provisoria: importe ou cadastre a tabela oficial no Firestore quando a API retornar os jogos finais.";
