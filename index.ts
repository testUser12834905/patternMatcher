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
    if (this.isPatternEnd()) {
      return this.isTextEnd();
    }

    if (this.hasNextPatternChar()) {
      const nextChar = this.getNextPatternChar();
      if (nextChar === "*") {
        return this.matchStar(this.getCurrentPatternChar());
      }
      if (nextChar === "+") {
        return this.matchPlus(this.getCurrentPatternChar());
      }
    }

    if (this.isCurrentCharMatch()) {
      this.advanceIndices();
      return this.matchHere();
    }

    return false;
  }

  private matchStar(char: string): boolean {
    this.advancePatternIndex(2);
    while (this.isCurrentCharMatchWith(char)) {
      if (this.matchHere()) return true;
      this.advanceTextIndex();
    }
    return this.matchHere();
  }

  private matchPlus(char: string): boolean {
    if (!this.isCurrentCharMatchWith(char)) {
      return false;
    }
    this.advancePatternIndex(2);
    this.advanceTextIndex();
    while (this.isCurrentCharMatchWith(char)) {
      if (this.matchHere()) return true;
      this.advanceTextIndex();
    }
    return this.matchHere();
  }

  private isPatternEnd(): boolean {
    return this.patternIndex === this.pattern.length;
  }

  private isTextEnd(): boolean {
    return this.textIndex === this.text.length;
  }

  private hasNextPatternChar(): boolean {
    return this.patternIndex + 1 < this.pattern.length;
  }

  private getNextPatternChar(): string {
    return this.pattern[this.patternIndex + 1];
  }

  private getCurrentPatternChar(): string {
    return this.pattern[this.patternIndex];
  }

  private isCurrentCharMatch(): boolean {
    return (
      this.textIndex < this.text.length &&
      (this.getCurrentPatternChar() === "." ||
        this.getCurrentPatternChar() === this.text[this.textIndex])
    );
  }

  private isCurrentCharMatchWith(char: string): boolean {
    return (
      this.textIndex < this.text.length &&
      (char === "." || char === this.text[this.textIndex])
    );
  }

  private advanceIndices(): void {
    this.patternIndex++;
    this.textIndex++;
  }

  private advancePatternIndex(amount: number = 1): void {
    this.patternIndex += amount;
  }

  private advanceTextIndex(amount: number = 1): void {
    this.textIndex += amount;
  }
}
