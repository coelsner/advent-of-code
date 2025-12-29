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

  combine(range: Range): Range {
    const numbers: number[] = [
      this.start,
      range.start,
      this.end,
      range.end,
    ].toSorted((a, b) => a - b);
    return new Range(numbers[0], numbers[3]);
  }

  diff(): number {
    return this.end - this.start + 1;
  }
}

export function combineRanges(ranges: Range[], newRange: Range): Range[] {
  const combined = ranges
    .filter((r) => r.intersect(newRange))
    .reduce((prev, curr) => prev.combine(curr), newRange);

  const remaining = ranges.filter((r) => !r.intersect(newRange));
  return remaining.concat(combined);
}
