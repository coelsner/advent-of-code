import { parseInput } from "./Box.ts";
import { Circuit, computeCircuits } from "./Circuit.ts";
import { computeDistances, Distance } from "./distances.ts";

const test_input = {
  data: `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`,
  cycles: 10,
};

const real_input = {
  data: await Deno.readTextFile(`./day-08/input.txt`),
  cycles: 1000,
};

function joinCircuits(circuits: Circuit[], distances: Distance[]) {
  return distances.reduce<Circuit[]>(
    (prev: Circuit[], distance: Distance) => {
      return computeCircuits(prev, distance);
    },
    circuits,
  ).toSorted((a, b) => (b.boxes.size - a.boxes.size));
}

// Solution of part 1:
// Circuits: 279 after 1000 cycles.
// The product of the first 3 circuits = 123420
function partOne(circuits: Circuit[], distances: Distance[]) {
  const result = joinCircuits(circuits, distances);

  console.log("----- Part 01 ------");
  console.log("Circuits:", result.length, "after", distances.length, "cycles.");
  //console.log(result.slice(0,3))

  const sumOf = 3;
  const product = result.slice(0, sumOf).reduce<number>(
    (prev: number, circuit: Circuit) => (prev * circuit.boxes.size),
    1,
  );
  console.log("The product of the first", sumOf, "circuits =", product);
}

// Solution of part 2:
// TODO: Find the last two circuits needed to be connected
// It's not necessarily the last two distances, since they are maybe already part of the main circuit
function partTwo(circuits: Circuit[], distances: Distance[]) {
  console.log("----- Part 02 ------");
  const result = joinCircuits(circuits, distances.slice(0, -2));

  console.log(result);
  const last = distances.slice(-2).map((d) => Math.max(d.start.x, d.end.x));
  console.log(last, last.reduce((p, c) => p * c));
}

if (import.meta.main) {
  const input = real_input;

  console.debug("Start day-08");

  const boxes = parseInput(input.data);
  const distances = computeDistances(boxes);

  const circuits: Circuit[] = boxes.map((b) => new Circuit(b));
  //console.log(circuits)

  partOne(circuits, distances.slice(0, input.cycles));
  partTwo(circuits, distances);

  console.debug("End day-08");
}
