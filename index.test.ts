import { describe, expect, test } from "bun:test";
import { RegexMatcher } from ".";

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
