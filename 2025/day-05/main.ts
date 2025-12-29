import { combineRanges, Range } from "./Range.ts";

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
          freshIngredients.add(line);
        }
        break;
    }
  }

  const freshList = ranges.map((r) => r.diff());
  const freshCount = freshList.reduce((p, v) => p + v, 0);

  console.log(
    "Ranges:",
    ranges.length,
    "Fresh:",
    freshIngredients.size,
    "Part 2: ",
    freshCount
  );
}

function importRange(ranges: Range[], line: string): Range[] {
  const [start, end] = line.split("-").map((v) => parseInt(v));
  if (start === undefined || end === undefined) {
    throw new Error(`Cannot parse: ${line}`);
  }

  const newRange = new Range(start, end);
  return combineRanges(ranges, newRange);
}

function inRange(ranges: Range[], line: string): boolean {
  const number = parseInt(line);
  for (const range of ranges.values()) {
    if (range.contains(number)) {
      return true;
    }
  }

  return false;
}
