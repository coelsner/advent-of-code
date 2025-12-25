import { text } from "node:stream/consumers";

const test_input = `987654321111111
811111111111119
234234234234278
818181911112111`;

const real_input = await Deno.readTextFile("./day-03/input.txt");

if (import.meta.main) {
  const input = test_input;

  const results = [];

  for (const bank of input.split("\n")) {
    console.debug("Bank: ", bank);

    const digits = bank.split("").map((x) => parseInt(x));
    const maxLeft = digits.slice(0, -1).reduce((max, x) => Math.max(max, x), 0);
    const indexOfLeft = digits.indexOf(maxLeft);

    const max2 = digits
      .slice(indexOfLeft + 1, digits.length)
      .reduceRight((max, x) => Math.max(max, x), 0);

    const test = getNumbers(digits, 12);

    console.debug(
      "Digits:",
      digits.join(""),
      digits.length,
      "max1:",
      maxLeft,
      "max2:",
      max2,
      "test",
      test.join(""),
      test.length
    );
    results.push(`${maxLeft}${max2}`);
  }

  const sum = results
    .map((x) => parseInt(x))
    .reduce((sum, curr) => sum + curr, 0);

  console.log(sum);
}

function getNumbers(numbers: number[], count: number): number[] {
  const sorted = numbers.toSorted((a, b) => b - a).slice(0, count);
  console.debug("Sorted:", sorted.join(""), sorted.length);

  const result: number[] = [];

  for (let xI = 0; xI < numbers.length; xI++) {
    const sI = sorted.indexOf(numbers[xI]);
    if (sI >= 0) {
      result.push(numbers[xI]);
    }
  }

  return result;
}
