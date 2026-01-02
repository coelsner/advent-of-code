import { getOperators, Product, Sum } from "./operators.ts";
import { assertEquals } from "@std/assert";

Deno.test("getOperators", () => {
  const ops = "*   +  *   ";
  const result = getOperators(ops);

  assertEquals(result.length, 3);
  assertEquals(result[0], new Product(0, 3));
  assertEquals(ops.slice(result[0].start, result[0].end), "*  ");

  assertEquals(result[1], new Sum(4, 6));
  assertEquals(ops.slice(result[1].start, result[1].end), "+ ");

  assertEquals(result[2], new Product(7, 11));
  assertEquals(ops.slice(result[2].start, result[2].end), "*   ");
});
