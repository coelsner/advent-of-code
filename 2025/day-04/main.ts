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

class Warehouse {
  constructor(
    public readonly shelves: number[][],
    public readonly width: number,
    public readonly height: number
  ) {}

  getAccessible(): { x: number; y: number }[] {
    return this.shelves.flatMap((r, rowIdx) => {
      return r.flatMap((c, colIdx) => {
        return c > 0 && c < 5 ? [{ x: rowIdx, y: colIdx }] : [];
      });
    });
  }

  toString(): string[] {
    return this.shelves.map((r) => {
      return r.map((v) => (v > 1 ? "@" : ".")).join("");
    });
  }
}

if (import.meta.main) {
  const input = test_input;
  const parsed: boolean[][] = parseInput(input.split("\n"));

  const warehouse: Warehouse = createWarehouse(parsed);

  console.debug(warehouse.toString().join("\n"));

  const accessible = warehouse.getAccessible();
  console.log("Result:", accessible.length);
}

function parseInput(rows: string[]): boolean[][] {
  return rows.map((row) => {
    return row.split("").map((column) => {
      return column === "@" ? true : false;
    });
  });
}

function createWarehouse(shelves: boolean[][]): Warehouse {
  const height = shelves.length;
  const width = shelves[0].length;

  const result: number[][] = [];

  for (let rowIdx = 0; rowIdx < height; rowIdx++) {
    const row: number[] = [];
    for (let columIdx = 0; columIdx < width; columIdx++) {
      const self = shelves[rowIdx][columIdx];

      const adjacents = getAdjacents(rowIdx, columIdx, height, width);
      const value = adjacents
        .map((a) => {
          return shelves[a.x][a.y];
        })
        .filter((v) => v).length;
      row.push(self ? value + 1 : 0);
    }
    result.push(row);
  }

  return new Warehouse(result, width, height);
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
