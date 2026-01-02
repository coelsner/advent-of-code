import { assertEquals } from "@std/assert/equals";
import { transposeLines } from "./transpose.ts";

Deno.test("transposeLines", async (t) => {
  await t.step("simple", () => {
    const result = transposeLines(["1 3", "234", "345", "45 "]);

    assertEquals(result.length, 3);
    assertEquals(result[0], "1234");
    assertEquals(result[1], " 345");
    assertEquals(result[2], "345 ");
  });

  await t.step("sample", () => {
    const input = ["123 328  51 64 ", " 45 64  387 23 ", "  6 98  215 314"];

    const result = transposeLines(input);
    assertEquals(result.length, 15);
    assertEquals(result[0], "1  ");
    assertEquals(result[1], "24 ");
    assertEquals(result[2], "356");
    assertEquals(result[4], "369");
    assertEquals(result[8], " 32");
  });
});
