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
    public readonly shelves: boolean[][],
    public readonly width: number,
    public readonly height: number
  ) {}

  isAccessible(x: number, y: number) : boolean {
    const isFilled = this.shelves[x][y];
    const adjacents = getAdjacents(x, y, this);

    //console.debug(adjacent);
    return isFilled && adjacents.map((a) => {
      return this.shelves[a.x][a.y]
    }).filter(a => a === true).length < 4;
  }

  toString(): string[] {
    return this.shelves.map((r) => {
      return r.map((v) => (v ? "@" : ".")).join("");
    });
  }
}

if (import.meta.main) {
  const input = real_input;
  const warehouse: Warehouse = createWarehouse(input.split("\n"));

  console.debug(warehouse.toString().join("\n"));

  const result = warehouse.shelves.map((r, rowIdx) => {
    return r.map((c, colIdx) => {
      return warehouse.isAccessible(rowIdx, colIdx);
    });
  });

  //console.debug(result.map((s) => s.map((x) => x?"x":".").join("")).join("\n"));
  console.log("Result:", result.flatMap(r => r.filter(c => c === true)).length);
}

function createWarehouse(rows: string[]): Warehouse {
  const height = rows.length;
  const width = rows[0].split("").length;

  const result: boolean[][] = [];

  for (let rowIdx = 0; rowIdx < height; rowIdx++) {
    const cols: boolean[] = rows[rowIdx].split("").map((column) => {
      return column === "@" ? true : false;
    });
    result.push(cols);
  }

  return new Warehouse(result, width, height);
}

function getAdjacents(
  rowIdx: number,
  colIdx: number,
  w: Warehouse,
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

      if (x >= 0 && x < w.height && y >= 0 && y < w.width) {
        result.push({x,y});
      }
    }
  }

  return result;
}
