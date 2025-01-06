import { readLines } from "../utils/parsing.ts";

const pattern = /(mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\))/g;

// const input =
//   `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
// const matches = [...input.matchAll(pattern)];

const input = await readLines(
  await Deno.readTextFile("day-03/input.txt"),
  (data) => data.matchAll(pattern),
);
const matches = input.flatMap((v) => [...v]);

const result: number[] = [];

let enabled = true;
matches?.map((match) => {
  console.log(match);
  if (match[2] && match[3]) {
    const a = parseInt(match[2]);
    const b = parseInt(match[3]);
    if (enabled) {
      result.push(a * b);
    }
  } else if (match[1] === "do()") {
    enabled = true;
  } else {
    enabled = false;
  }
});

console.log(result);
console.log(result.reduce((prev, curr) => {
  return prev + curr;
}));
