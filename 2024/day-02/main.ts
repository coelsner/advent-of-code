import { sumOf } from "jsr:@std/collections/sum-of";
import { slidingWindows } from "jsr:@std/collections/sliding-windows";
import { TextLineStream } from "jsr:@std/streams/text-line-stream";
import { zip } from "jsr:@std/collections";

const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;

// const input = await Deno.readTextFile("day-02/input.txt");

async function parseStream(input: string) {
  const result: number[][] = [];

  const stream = ReadableStream.from([input]).pipeThrough(new TextLineStream());
  for await (const data of stream) {
    const values = data.split(/[\s]+/);
    result.push(values.map((v) => parseInt(v)));
  }

  return result;
}

const levels = await parseStream(input);
console.log(levels);

const reducer = (curr: number[], op: (l: number, r: number) => boolean) =>
  curr[0] != curr[1] && op(curr[0], curr[1]) &&
  (Math.abs(curr[0] - curr[1]) <= 3);

const result = levels.map((level) => {
  const increasing = slidingWindows(level, 2).map(
    (curr) => reducer(curr, (l, r) => l <= r),
  );
  console.log(increasing);
  const decreasing = slidingWindows(level, 2).map(
    (curr) => reducer(curr, (l, r) => r <= l),
  );

  return zip(increasing, decreasing);
});

console.log(result);
