const test_input = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

const real_input = await Deno.readTextFile("./day-04/input.txt");

type Position = { x: number; y: number };

class Warehouse {
  public readonly width: number;
  public readonly height: number;
  public readonly shelves: number[][];

  constructor(shelves: number[][]) {
    this.height = shelves.length;
    this.width = shelves[0].length;
    this.shelves = shelves.map((r, rowIdx) => {
      return r.map((c, colIdx) => {
        if (c === 0) {
          return 0;
        }
        const adjacents = getAdjacents(rowIdx, colIdx, this.height, this.width);
        return (
          adjacents.map((a) => shelves[a.x][a.y]).filter((v) => v).length + 1
        );
      });
    });
  }

  getAccessible(): Position[] {
    return this.shelves.flatMap((r, rowIdx) => {
      return r.flatMap((c, colIdx) => {
        return c > 0 && c < 5 ? [{ x: rowIdx, y: colIdx }] : [];
      });
    });
  }

  remove(pos: Position[]): Warehouse {
    const updated = this.shelves.map((r, rowIdx) => {
      return r.map((c, colIdx) => {
        return pos.some((v) => v.x === rowIdx && v.y === colIdx) ? 0 : c;
      });
    });

    return new Warehouse(updated);
  }

  toString(): string[] {
    return this.shelves.map((r) => {
      return r
        .map((v) => {
          if (v === 0) return ".";
          if (v > 1 && v < 5) return "x";
          return "@";
        })
        .join("");
    });
  }
}

if (import.meta.main) {
  const input = real_input;
  const parsed: number[][] = parseInput(input.split("\n"));

  let warehouse: Warehouse = new Warehouse(parsed);
  let accessible = warehouse.getAccessible();
  let total = 0;
  while (accessible.length > 0) {
    //console.debug(warehouse.toString().join("\n"));
    console.log("Result:", accessible.length);
    total += accessible.length;

    warehouse = warehouse.remove(accessible);
    accessible = warehouse.getAccessible();
  }

  console.log("Total:",total);
}

function parseInput(rows: string[]): number[][] {
  return rows.map((row) => {
    return row.split("").map((column) => {
      return column === "@" ? 1 : 0;
    });
  });
}

function getAdjacents(
  rowIdx: number,
  colIdx: number,
  height: number,
  width: number
): { x: number; y: number }[] {
  const factors = [-1, 0, 1];
  const result = [];

  for (const xFac of factors) {
    for (const yFac of factors) {
      if (xFac === 0 && yFac === 0) {
        continue;
      }

      const x = rowIdx + xFac;
      const y = colIdx + yFac;

      if (x >= 0 && x < height && y >= 0 && y < width) {
        result.push({ x, y });
      }
    }
  }

  return result;
}
