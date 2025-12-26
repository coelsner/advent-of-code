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

  const result: number[][] = shelves.map((r, rowIdx) => {
    return r.map((c, colIdx) => {
      if (c === false) {
        return 0;
      }
      const adjacents = getAdjacents(rowIdx, colIdx, height, width)
      return adjacents.map((a) => shelves[a.x][a.y]).filter(v => v).length + 1
    })
  });

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
