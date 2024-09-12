export class RegexMatcher {
  private pattern: string;
  private text: string;
  private patternIndex: number;
  private textIndex: number;

  constructor(pattern: string) {
    this.pattern = pattern;
    this.text = "";
    this.patternIndex = 0;
    this.textIndex = 0;
  }

  match(text: string): boolean {
    this.text = text;
    this.patternIndex = 0;
    this.textIndex = 0;
    return this.matchHere();
  }

  private matchHere(): boolean {
    if (this.patternIndex === this.pattern.length) {
      return this.textIndex === this.text.length;
    }

    if (this.patternIndex + 1 < this.pattern.length) {
      const nextChar = this.pattern[this.patternIndex + 1];
      if (nextChar === "*") {
        return this.matchStar(this.pattern[this.patternIndex]);
      }
      if (nextChar === "+") {
        return this.matchPlus(this.pattern[this.patternIndex]);
      }
      if (nextChar === "?") {
        return this.matchQuestion(this.pattern[this.patternIndex]);
      }
    }

    if (
      this.textIndex < this.text.length &&
      (this.pattern[this.patternIndex] === "." ||
        this.pattern[this.patternIndex] === this.text[this.textIndex])
    ) {
      this.patternIndex++;
      this.textIndex++;
      return this.matchHere();
    }

    return false;
  }

  private matchStar(c: string): boolean {
    this.patternIndex += 2;
    while (
      this.textIndex < this.text.length &&
      (c === "." || c === this.text[this.textIndex])
    ) {
      if (this.matchHere()) return true;
      this.textIndex++;
    }
    return this.matchHere();
  }

  private matchPlus(c: string): boolean {
    if (
      this.textIndex >= this.text.length ||
      (c !== "." && c !== this.text[this.textIndex])
    ) {
      return false;
    }
    this.patternIndex += 2;
    this.textIndex++;
    while (
      this.textIndex < this.text.length &&
      (c === "." || c === this.text[this.textIndex])
    ) {
      if (this.matchHere()) return true;
      this.textIndex++;
    }
    return this.matchHere();
  }

  private matchQuestion(c: string): boolean {
    this.patternIndex += 2;
    if (
      this.textIndex < this.text.length &&
      (c === "." || c === this.text[this.textIndex])
    ) {
      const matchWithChar = this.matchHere();
      if (matchWithChar) return true;
      this.textIndex--;
    }
    return this.matchHere();
  }
}
