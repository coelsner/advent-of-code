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
  "EAST",
  "SOUTH_EAST",
  "SOUTH",
  "SOUTH_WEST",
  "WEST",
  "NORTH_WEST",
  "NORTH",
  "NORTH_EAST",
];

const getWord = (
  row: number,
  column: number,
  mR: -1 | 0 | 1,
  mC: -1 | 0 | 1,
): string => {
  return lines[row][column] + lines[row + 1 * mR][column + 1 * mC] +
    lines[row + 2 * mR][column + 2 * mC] +
    lines[row + 3 * mR][column + 3 * mC];
};

const hasXMAS = (
  row: number,
  column: number,
  direction: string,
): boolean => {
  switch (direction) {
    case "EAST":
      return column + 3 < width && getWord(row, column, 0, 1) === "XMAS";
    case "SOUTH_EAST":
      return column + 3 < width && row + 3 < height &&
        getWord(row, column, 1, 1) === "XMAS";
    case "SOUTH":
      return row + 3 < height && getWord(row, column, 1, 0) === "XMAS";
    case "SOUTH_WEST":
      return row + 3 < height && column - 3 >= 0 &&
        getWord(row, column, 1, -1) === "XMAS";
    case "WEST":
      return column - 3 >= 0 &&
        getWord(row, column, 0, -1) === "XMAS";
    case "NORTH_WEST":
      return row - 3 >= 0 && column - 3 >= 0 &&
        getWord(row, column, -1, -1) === "XMAS";
    case "NORTH":
      return row - 3 >= 0 &&
        getWord(row, column, -1, 0) === "XMAS";
    case "NORTH_EAST":
      return row - 3 >= 0 && column + 3 < width &&
        getWord(row, column, -1, 1) === "XMAS";
    default:
      return false;
  }
};

let result = 0;
for (const [row, line] of lines.entries()) {
  for (const [column, char] of line.entries()) {
    if (char === "X") {
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
