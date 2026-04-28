import { parseInput } from "./Box.ts";
import { Circuit, computeCircuits } from "./Circuit.ts";
import { computeDistances } from "./distances.ts";

const test_input = `162,817,812
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
425,690,689`;

const real_input = await Deno.readTextFile(`./day-08/input.txt`);

// Solution of part 1:
// Circuits: 279 after 1000 cycles.
// The product of the first 3 circuits = 123420

if (import.meta.main) {
  const input = {
    data: real_input,
    cycles: 1000,
    sumOf: 3,
  }

  console.debug("Start day-08");

  const boxes = parseInput(input.data);
  const distances = computeDistances(boxes);

  let circuits: Circuit[] = boxes.map(b => new Circuit(b));
  //console.log(circuits)
  for (let i = 0; i < input.cycles; i++) {
    circuits = computeCircuits(circuits, distances[i]);
  }

  const result = circuits.toSorted((a,b) => (b.boxes.size - a.boxes.size));

  console.log("-----------");
  console.log("Circuits:", result.length, "after", input.cycles, "cycles.");
  //console.log(result.slice(0,3))

  let product = 1;
  for (let i = 0; i < input.sumOf; i++) {
    //console.log("Combining:", result[i], product)
    product = product * result[i].boxes.size
  }

  console.log("The product of the first", input.sumOf, "circuits =", product);

  console.debug("End day-08");
}
