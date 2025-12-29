import { combineRanges, Range } from "./Range.ts";
import { expect } from "@std/expect";
import { assertEquals } from "@std/assert";

Deno.test("contains", () => {
  const r = new Range(1, 10);
  expect(r.contains(0)).toBe(false);
  expect(r.contains(1)).toBe(true);
  expect(r.contains(10)).toBe(true);
  expect(r.contains(11)).toBe(false);
});

Deno.test("intersect", async (t) => {
  await t.step("r1 != r2", () => {
    const r1 = new Range(1, 10);
    const r2 = new Range(11, 20);

    expect(r1.intersect(r2)).toBe(false);
    expect(r2.intersect(r1)).toBe(false);
  });

  await t.step("r1 contains r2", () => {
    const r1 = new Range(1, 10);
    const r2 = new Range(4, 6);

    expect(r1.intersect(r2)).toBe(true);
    expect(r2.intersect(r1)).toBe(true);
  });

  await t.step("r2 contains r1", () => {
    const r1 = new Range(1, 10);
    const r2 = new Range(1, 20);

    expect(r1.intersect(r2)).toBe(true);
    expect(r2.intersect(r1)).toBe(true);
  });

  await t.step("r1 overlaps r2", () => {
    const r1 = new Range(1, 10);
    const r2 = new Range(10, 20);

    expect(r1.intersect(r2)).toBe(true);
    expect(r2.intersect(r1)).toBe(true);
  });

  await t.step("r2 overlaps r1", () => {
    const r1 = new Range(1, 10);
    const r2 = new Range(0, 1);

    expect(r1.intersect(r2)).toBe(true);
    expect(r2.intersect(r1)).toBe(true);
  });
});

Deno.test("combine", async (t) => {
  await t.step("r1 == r2", () => {
    const r1 = new Range(1, 10);
    const r2 = new Range(1, 10);
    const updated = r1.combine(r2);

    assertEquals(updated.start, 1);
    assertEquals(updated.end, 10);
    expect(updated.diff()).toBe(10);
  });

  await t.step("r1 contains r2", () => {
    const r1 = new Range(1, 10);
    const r2 = new Range(3, 7);
    const updated = r1.combine(r2);

    assertEquals(updated.start, 1);
    assertEquals(updated.end, 10);
    expect(updated.diff()).toBe(10);
  });

  await t.step("r2 contains r1", () => {
    const r1 = new Range(1, 10);
    const r2 = new Range(0, 20);
    const updated = r1.combine(r2);

    assertEquals(updated.start, 0);
    assertEquals(updated.end, 20);
    expect(updated.diff()).toBe(21);
  });

  await t.step("r1 overlaps r2", () => {
    const r1 = new Range(1, 10);
    const r2 = new Range(5, 15);
    const updated = r1.combine(r2);

    assertEquals(updated.start, 1);
    assertEquals(updated.end, 15);
    expect(updated.diff()).toBe(15);
  });

  await t.step("r2 overlaps r1", () => {
    const r1 = new Range(1, 10);
    const r2 = new Range(0, 5);
    const updated = r1.combine(r2);

    assertEquals(updated.start, 0);
    assertEquals(updated.end, 10);
    expect(updated.diff()).toBe(11);
  });
});

Deno.test("combine multiple", async (t) => {
  await t.step("r1, r2, r3", () => {
    const r1 = new Range(1, 10);
    const r2 = new Range(5, 15);
    const r3 = new Range(15, 20);

    const updated = r1.combine(r2).combine(r3);
    assertEquals(updated.start, 1);
    assertEquals(updated.end, 20);
    assertEquals(updated.diff(), 20);
  });

  await t.step("r1, r2, !r3", () => {
    const r1 = new Range(1, 10);
    const r2 = new Range(5, 15);
    const r3 = new Range(16, 20);

    const updated = r1.combine(r2).combine(r3);
    assertEquals(updated.start, 1);
    assertEquals(updated.end, 20);
    assertEquals(updated.diff(), 20);
  });
});

Deno.test("diff", () => {
  const r = new Range(1, 10);
  expect(r.diff()).toBe(10);
});

Deno.test("combineRange", async (t) => {
  await t.step("empty list", () => {
    const result = combineRanges([], new Range(1,2));
    assertEquals(result.length, 1);
    assertEquals(result[0].start, 1);
    assertEquals(result[0].end, 2);
  })

  await t.step("single element", () => {
    const result = combineRanges([new Range(1,2)], new Range(2,3));
    assertEquals(result.length, 1);
    assertEquals(result[0].start, 1);
    assertEquals(result[0].end, 3);
  })

  await t.step("r1 < r2 < r3", () => {
    const current = [new Range(1, 10), new Range(20, 30)];

    const result = combineRanges(current, new Range(5, 25));
    assertEquals(result.length, 1);
    assertEquals(result[0].start, 1);
    assertEquals(result[0].end, 30);
  });

  await t.step("r1 < r2, r3", () => {
    const current = [new Range(1, 10), new Range(20, 30)];
    const result = combineRanges(current, new Range(5,15));
    assertEquals(result.length, 2);
  });
});
