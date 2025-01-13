import { readLines } from "../utils/parsing.ts";

// const input = `MMMSXXMASM
// MSAMXMSMSA
// AMXSXMAAMM
// MSAMASMSMX
// XMASAMXAMM
// XXAMMXXAMA
// SMSMSASXSS
// SAXAMASAAA
// MAMMMXMMMM
// MXMXAXMASX`;

const input = await Deno.readTextFile("day-04/first.txt");

const lines = await readLines(input, (data) => [...data]);
const width = lines[0].length;
const height = lines.length;

const Direction = [
  "TOP_LEFT",
  "TOP_RIGHT",
  "BOTTOM_LEFT",
  "BOTTOM_RIGHT",
];

const test = (
  row: number,
  column: number,
  needle: string,
): boolean => {
  return lines[row - 1][column - 1] === needle[0] &&
    lines[row - 1][column + 1] === needle[1] &&
    lines[row + 1][column + 1] === needle[2] &&
    lines[row + 1][column - 1] === needle[3];
};

const hasXMAS = (
  row: number,
  column: number,
  direction: string,
): boolean => {
  if (
    row > 0 && row < lines.length - 1 && column > 0 &&
    column < lines[row].length - 1
  ) {
    switch (direction) {
      case "TOP_LEFT":
        return test(row, column, "MMSS");
      case "TOP_RIGHT":
        return test(row, column, "SMMS");
      case "BOTTOM_RIGHT":
        return test(row, column, "SSMM");
      case "BOTTOM_LEFT":
        return test(row, column, "MSSM");
      default:
        return false;
    }
  } else return false;
};

let result = 0;
for (const [row, line] of lines.entries()) {
  for (const [column, char] of line.entries()) {
    if (char === "A") {
      for (const dir of Direction) {
        if (hasXMAS(row, column, dir)) {
          result++;
          //console.log("XMAS", dir, row, column);
        }
      }
    }
  }
}

console.log("count", result);
