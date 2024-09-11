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
}

