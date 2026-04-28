import { expect } from "@std/expect/expect";
import { computeDistances, Distance } from "./distances.ts";
import { Box } from "./Box.ts";

Deno.test("computeDistances", async (t) => {
  await t.step("3 boxes", () => {
    const boxes = [new Box(1, 2, 3), new Box(2, 3, 4), new Box(3, 4, 5)];
    const result = computeDistances(boxes);

    expect(result.length).toEqual(3);
    expect(result[0]).toEqual(
      new Distance(
        boxes[0],
        boxes[1],
      ),
    );
  });

  await t.step("4 boxes", () => {
    const boxes = [new Box(1, 2, 1), new Box(2, 3, 4), new Box(3, 4, 5), new Box(1,1,1)];
    const result = computeDistances(boxes);

    expect(result.length).toEqual(6);
    expect(result[0]).toEqual(
      new Distance(
        boxes[0],
        boxes[3],
      ),
    );
  });
});
