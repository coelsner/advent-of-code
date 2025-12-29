import { Range } from "./Range.ts";
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

Deno.test("update", async (t) => {
  await t.step("r1 == r2", () => {
    const r1 = new Range(1, 10);
    const updated = r1.update(1, 10);

    assertEquals(updated.start, 1);
    assertEquals(updated.end, 10);
    expect(updated.diff()).toBe(10);
  });

  await t.step("r1 contains r2", () => {
    const r1 = new Range(1, 10);
    const updated = r1.update(3, 7);

    assertEquals(updated.start, 1);
    assertEquals(updated.end, 10);
    expect(updated.diff()).toBe(10);
  });

  await t.step("r2 contains r1", () => {
    const r1 = new Range(1, 10);
    const updated = r1.update(0, 20);

    assertEquals(updated.start, 0);
    assertEquals(updated.end, 20);
    expect(updated.diff()).toBe(21);
  });

  await t.step("r1 overlaps r2", () => {
    const r1 = new Range(1, 10);
    const updated = r1.update(5, 15);

    assertEquals(updated.start, 1);
    assertEquals(updated.end, 15);
    expect(updated.diff()).toBe(15);
  });

  await t.step("r2 overlaps r1", () => {
    const r1 = new Range(1, 10);
    const updated = r1.update(0, 5);

    assertEquals(updated.start, 0);
    assertEquals(updated.end, 10);
    expect(updated.diff()).toBe(11);
  });
});

Deno.test("diff", () => {
  const r = new Range(1, 10);
  expect(r.diff()).toBe(10);
});
