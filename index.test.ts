import { describe, expect, test } from "bun:test";

describe("RegexMatcher", () => {
  // @ts-ignore
  let matcher: RegexMatcher;

  describe("Basic character matching", () => {
    test("Exact string match", () => {
      matcher = new RegexMatcher("abc");
      expect(matcher.match("abc")).toBe(true);
      expect(matcher.match("abcd")).toBe(false);
      expect(matcher.match("ab")).toBe(false);
    });

    test("Dot wildcard", () => {
      matcher = new RegexMatcher("a.c");
      expect(matcher.match("abc")).toBe(true);
      expect(matcher.match("a1c")).toBe(true);
      expect(matcher.match("abbc")).toBe(false);
      expect(matcher.match("ac")).toBe(false);
    });
  });

  describe("Star operator", () => {
    test("Zero or more occurrences", () => {
      matcher = new RegexMatcher("ab*c");
      expect(matcher.match("ac")).toBe(true);
      expect(matcher.match("abc")).toBe(true);
      expect(matcher.match("abbc")).toBe(true);
      expect(matcher.match("abbbc")).toBe(true);
      expect(matcher.match("abd")).toBe(false);
    });

    test("Star with dot", () => {
      matcher = new RegexMatcher("a.*c");
      expect(matcher.match("ac")).toBe(true);
      expect(matcher.match("abc")).toBe(true);
      expect(matcher.match("abbc")).toBe(true);
      expect(matcher.match("a123c")).toBe(true);
      expect(matcher.match("abd")).toBe(false);
    });
  });

  describe("Plus operator", () => {
    test("One or more occurrences", () => {
      matcher = new RegexMatcher("ab+c");
      expect(matcher.match("abc")).toBe(true);
      expect(matcher.match("abbc")).toBe(true);
      expect(matcher.match("abbbc")).toBe(true);
      expect(matcher.match("ac")).toBe(false);
      expect(matcher.match("abd")).toBe(false);
    });

    test("Plus with dot", () => {
      matcher = new RegexMatcher("a.+c");
      expect(matcher.match("abc")).toBe(true);
      expect(matcher.match("abbc")).toBe(true);
      expect(matcher.match("a123c")).toBe(true);
      expect(matcher.match("ac")).toBe(false);
      expect(matcher.match("abd")).toBe(false);
    });
  });

  describe("Question mark operator", () => {
    test("Zero or one occurrence", () => {
      matcher = new RegexMatcher("ab?c");
      expect(matcher.match("ac")).toBe(true);
      expect(matcher.match("abc")).toBe(true);
      expect(matcher.match("abbc")).toBe(false);
      expect(matcher.match("abd")).toBe(false);
    });

    test("Question mark with dot", () => {
      matcher = new RegexMatcher("a.?c");
      expect(matcher.match("ac")).toBe(true);
      expect(matcher.match("abc")).toBe(true);
      expect(matcher.match("a1c")).toBe(true);
      expect(matcher.match("abbc")).toBe(false);
    });
  });

  describe("Complex patterns", () => {
    test("Combination of operators", () => {
      matcher = new RegexMatcher("a.*b+c?d");
      expect(matcher.match("abcd")).toBe(true);
      expect(matcher.match("abbd")).toBe(true);
      expect(matcher.match("abbcd")).toBe(true);
      expect(matcher.match("aXYZbbcd")).toBe(true);
      expect(matcher.match("ad")).toBe(false);
      expect(matcher.match("acd")).toBe(false);
      expect(matcher.match("abcde")).toBe(false);
    });

    test("Multiple wildcards", () => {
      matcher = new RegexMatcher(".*a+b?c.*");
      expect(matcher.match("abc")).toBe(true);
      expect(matcher.match("aabc")).toBe(true);
      expect(matcher.match("aac")).toBe(true);
      expect(matcher.match("xyzaabcdef")).toBe(true);
      expect(matcher.match("xyzaadef")).toBe(false);
      expect(matcher.match("xyzbbcdef")).toBe(false);
    });
  });

  describe("Edge cases", () => {
    test("Empty string and pattern", () => {
      matcher = new RegexMatcher("");
      expect(matcher.match("")).toBe(true);
      expect(matcher.match("a")).toBe(false);
    });

    test("Pattern longer than string", () => {
      matcher = new RegexMatcher("abcd");
      expect(matcher.match("abc")).toBe(false);
    });

    test("String longer than pattern", () => {
      matcher = new RegexMatcher("abc");
      expect(matcher.match("abcd")).toBe(false);
    });

    test("Only wildcards", () => {
      matcher = new RegexMatcher(".*");
      expect(matcher.match("")).toBe(true);
      expect(matcher.match("abc")).toBe(true);
      expect(matcher.match("123")).toBe(true);
    });
  });
});
