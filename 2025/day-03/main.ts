import { text } from "node:stream/consumers";

const test_input = `987654321111111
811111111111119
234234234234278
818181911112111`;

const real_input = await Deno.readTextFile("./day-03/input.txt");

type Battery = {
  index: number;
  voltage: number;
};

function toBattery(value: string, index: number): Battery {
  return { index, voltage: parseInt(value) };
}

function getMax(batteries: Battery[], index: number, count: number): Battery[] {
  const sorted = batteries
    .slice(index, batteries.length - count + 1)
    .toSorted((a, b) => b.voltage - a.voltage);

  const max = sorted[0];

  if (count === 1) {
    return [max];
  }

  if (count <= batteries.length) {
    return [max, ...getMax(batteries, max.index + 1, count - 1)];
  }

  return batteries.slice(0);
}

if (import.meta.main) {
  const input = real_input;

  const results = [] as string[];

  for (const bank of input.split("\n")) {
    //console.debug("Bank: ", bank);

    const batteries = bank.split("").map(toBattery);
    const values = getMax(batteries, 0, 12)
      .map((b) => b.voltage)
      .join("");

    results.push(values);
  }

  //console.debug("Results: ", results);

  const sum = results
    .map((x) => parseInt(x))
    .reduce((sum, curr) => sum + curr, 0);

  console.log(sum);
}
