const test_input = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

const real_input = await Deno.readTextFile("./day-05/input.txt");

class Range {
  constructor(public readonly start: number, public readonly end: number) {
    if (end < start) {
      throw new Error(`End ${end} is smaller than start ${start}`);
    }
  }

  contains(number: number) : boolean {
    return number >= this.start && number <= this.end;
  }

  diff() : number {
    return this.end - this.start;
  }
}

if (import.meta.main) {
  const input = real_input;

  let state: "fresh-list" | "ingredients" = "fresh-list";
  let ranges: Range[] = [];
  const freshIngredients: Set<string> = new Set();

  for (const line of input.split("\n")) {
    if (state == "fresh-list" && line.trim().length === 0) {
      state = "ingredients";
      continue;
    }

    switch (state) {
      case "fresh-list":
        ranges = importRange(ranges, line);
        break;
      case "ingredients":
        if (inRange(ranges, line)) {
            freshIngredients.add(line)
        }
        break;
    }
  }

  console.log("Ranges:", ranges.length, "Fresh:", freshIngredients.size);
}

function importRange(fresh: Range[], line: string): Range[] {
  const [start, end] = line.split("-").map((v) => parseInt(v));
  if (start === undefined || end === undefined) {
    throw new Error(`Cannot parse: ${line}`);
  }

  const range = new Range(start, end);
  return fresh.concat(range)
}

function inRange(
  ranges: Range[],
  line: string,
): boolean {
  const number = parseInt(line);
  for (const range of ranges.values()) {
    if (range.contains(number)) {
        return true;
    }
  }

  return false;
}
