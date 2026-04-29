import { describe, expect, it } from "vitest";
import { FALLBACK_MATCHES } from "../src/data/fallbackMatches";

describe("fallback matches", () => {
  it("creates the group-stage fixture skeleton", () => {
    expect(FALLBACK_MATCHES).toHaveLength(72);
    expect(new Set(FALLBACK_MATCHES.map((match) => match.id)).size).toBe(72);
  });

  it("keeps all matches fillable by users", () => {
    expect(FALLBACK_MATCHES.every((match) => match.homeTeam && match.awayTeam)).toBe(true);
    expect(FALLBACK_MATCHES.every((match) => match.status === "scheduled")).toBe(true);
  });
});
