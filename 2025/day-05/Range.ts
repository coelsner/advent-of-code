
export class Range {
  constructor(public readonly start: number, public readonly end: number) {
    if (end < start) {
      throw new Error(`End ${end} is smaller than start ${start}`);
    }
  }

  contains(number: number): boolean {
    return number >= this.start && number <= this.end;
  }

  intersect(range: Range): boolean {
    return (
      this.contains(range.start) ||
      this.contains(range.end) ||
      range.contains(this.start) ||
      range.contains(this.end)
    );
  }

  update(newStart: number, newEnd: number): Range {
    const range : number[] = [this.start, newStart, this.end, newEnd].toSorted((a,b) => a-b);
    return new Range(range[0], range[3]);
  }

  diff(): number {
    return this.end - this.start + 1;
  }
}