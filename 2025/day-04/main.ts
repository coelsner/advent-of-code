import { toUSVString } from "node:util";

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

type Shelf = {
  x: number;
  y: number;
  isOccupied: boolean;
  isAccessible: boolean;
};

if (import.meta.main) {
  const input = real_input;
  const warehouse: Shelf[] = getWarehouse(input.split("\n"));

  //console.debug(warehouse.map(s => display(s)).join(""));
  
  for (const shelf of warehouse) {
    shelf.isAccessible = isAccessible(shelf, warehouse);
  }

  console.debug(warehouse.map(s => display(s)).join(""));
  console.log("Result:", warehouse.filter(s => s.isAccessible).length);
}

function getWarehouse(rows: string[]): Shelf[] {
  return rows.flatMap((row, rowIdx) => {
    return row.split("").map((shelf, colIdx) => ({
      x: rowIdx,
      y: colIdx,
      isOccupied: shelf === "@",
      isAccessible: false,
    }));
  });
}

function isAccessible(shelf: Shelf, warehouse: Shelf[]) : boolean {
    const adjacent = getAdjacents(shelf);
    const shelves = warehouse.filter((shelf) => {
        return adjacent.find((v) => v.x === shelf.x && v.y === shelf.y)
    }).filter((s) => s.isOccupied);

    //console.debug("Adjacents:", shelf.x, shelf.y, shelves);
    return shelf.isOccupied && shelves.length < 4;
}

function getAdjacents(shelf: Shelf) : {x: number, y:number}[] {
    const result = [
        {x: shelf.x, y: shelf.y - 1},
        {x: shelf.x, y: shelf.y + 1},
        {x: shelf.x + 1, y: shelf.y - 1},
        {x: shelf.x + 1, y: shelf.y},
        {x: shelf.x + 1, y: shelf.y + 1},
    ];

    if (shelf.x > 0) {
    result.push({x: shelf.x - 1, y: shelf.y - 1},
        {x: shelf.x - 1, y: shelf.y},
        {x: shelf.x - 1, y: shelf.y + 1})
    }
    
    return result;
}

function display(s: Shelf) {
    const seperator = s.y === 0  ? "\n" : "";
    if (s.isAccessible) {
        return `${seperator}x`;
    } else if (s.isOccupied) {
        return `${seperator}@`;
    } else {
        return `${seperator}.`;
    }
}
