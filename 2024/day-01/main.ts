import { TextLineStream } from "jsr:@std/streams/text-line-stream";
import {
  aggregateGroups,
  associateWith,
  runningReduce,
  sumOf,
  zip,
} from "jsr:@std/collections";

// const input = `3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3`;

const input = await Deno.readTextFile("day-01/input.txt");

async function parseStream(input: string) {
  const left: number[] = [];
  const right: number[] = [];

  const stream = ReadableStream.from([input]).pipeThrough(new TextLineStream());
  for await (const data of stream) {
    const values = data.split(/[\s]+/);

    left.push(parseInt(values[0]));
    right.push(parseInt(values[1]));
  }

  const sorting = (a: number, b: number) => a - b;

  return [left.sort(sorting), right.sort(sorting)];
}

const [left, right] = await parseStream(input);
const x = right.reduce<{ [key: number]: number }>((prev, curr) => {
  return { ...prev, [curr]: prev[curr] ? prev[curr] + 1 : 1 };
}, {});
//console.log(x);

//console.log(left, right);

//const distances = sumOf(zip(left, right), ([l, r]) => Math.abs(l - r));
const distances = sumOf(left, (l) => l * (x[l] ? x[l] : 0));
console.log(distances);
