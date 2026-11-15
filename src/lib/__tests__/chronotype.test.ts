import { describe, expect, it } from "vitest";
import { CHRONOTYPES, MAX_SCORE, MIN_SCORE, QUESTIONS, answeredCount, emptyAnswers, lateness, quizScore, shareText, typeForScore } from "../chronotype";

describe("chronotype quiz", () => {
  it("has 8 questions with 4 options each and unique ids", () => {
    expect(QUESTIONS).toHaveLength(8);
    for (const q of QUESTIONS) expect(q.options).toHaveLength(4);
    expect(new Set(QUESTIONS.map((q) => q.id)).size).toBe(QUESTIONS.length);
    expect([MIN_SCORE, MAX_SCORE]).toEqual([8, 32]);
  });

  it("returns null until every question is answered", () => {
    const a = emptyAnswers();
    expect(quizScore(a)).toBeNull();
    a[0] = 2;
    expect(answeredCount(a)).toBe(1);
    expect(quizScore(a)).toBeNull();
  });

  it("scores all-earliest as early bird, all-latest as night owl", () => {
    expect(quizScore(QUESTIONS.map(() => 0))).toBe(8);
    expect(typeForScore(8)).toBe("early");
    expect(quizScore(QUESTIONS.map(() => 3))).toBe(32);
    expect(typeForScore(32)).toBe("owl");
  });

  it("band edges", () => {
    expect(typeForScore(15)).toBe("early");
    expect(typeForScore(16)).toBe("between");
    expect(typeForScore(24)).toBe("between");
    expect(typeForScore(25)).toBe("owl");
  });

  it("rejects out-of-range answers", () => {
    expect(quizScore(QUESTIONS.map(() => 4))).toBeNull();
    expect(quizScore([0, 1, 2])).toBeNull();
  });

  it("lateness maps 8..32 to 0..100", () => {
    expect(lateness(8)).toBe(0);
    expect(lateness(20)).toBe(50);
    expect(lateness(32)).toBe(100);
  });

  it("share text names the type and score", () => {
    expect(shareText("owl", 27)).toContain("Night owl (27 of 32");
    expect(CHRONOTYPES.between.name).toBe("In between");
  });
});
