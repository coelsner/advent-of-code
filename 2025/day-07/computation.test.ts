import { assertEquals } from "@std/assert/equals";
import { compute, Line } from "./computation.ts";

Deno.test("compute", async (t) => {
  await t.step("init", () => {
    const input = new Line(".........");
    const pattern = "....S....";

    const result = compute(input, pattern);
    assertEquals(result, new Line("....|...."));
  });

  await t.step("first-row", () => {
    const input = new Line("....|....");
    const pattern = "....^....";

    const result = compute(input, pattern);
    assertEquals(result, new Line("...|.|...", 1, 2));
  });

  await t.step("mid-row", () => {
    const input = new Line("...|.|.|||.|...");;
    const pattern =        "...^.^...^.^...";

    const result = compute(input, pattern);
    assertEquals(result, new Line("..|.|.|||.|.|..", 4, 6));
  });

  await t.step("end-row", () => {
    const input = new Line(".|.|||.||.||.|.", 4);
    const pattern = "|^|^|^|^|^|||^|";

    const result = compute(input, pattern);
    assertEquals(result, new Line("|.|.|.|.|.|||.|", 9, 8));
  })
});
