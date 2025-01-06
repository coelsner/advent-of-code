import { readLines } from "../utils/parsing.ts";

const pattern = /mul\((\d{1,3}),(\d{1,3})\)/g;

const input =
  `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
const matches = [...input.matchAll(pattern)];

// const input = await readLines(await Deno.readTextFile("day-03/input.txt"));
// const matches = input.flatMap((v) => [...v.matchAll(pattern)]);

const result: number[] = [];

matches?.map((match) => {
  console.log(match);
  if (match) {
    const a = parseInt(match[1]);
    const b = parseInt(match[2]);

    result.push(a * b);
  }
});

console.log(result);
console.log(result.reduce((prev, curr) => {
  return prev + curr;
}));
