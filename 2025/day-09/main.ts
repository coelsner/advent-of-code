const test_input = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

// Solution Part 01:
//   Rectangle {
//     start: Tile { x: 83899, y: 85263 },
//     end: Tile { x: 16133, y: 15044 },
//     distance: 97585.54563561143,
//     a: 67767,
//     b: 70220,
//     area: 4758598740
//   },

const real_input = await Deno.readTextFile("./day-09/input.txt");

class Tile {
  public readonly x: number;
  public readonly y: number;

  constructor(coordinates: string[]) {
    const x = parseInt(coordinates[0]);
    const y = parseInt(coordinates[1]);

    this.x = x;
    this.y = y;
  }
}

class Rectangle {
  public readonly distance: number;
  public readonly a: number;
  public readonly b: number;
  public readonly area: number;

  constructor(
    public readonly start: Tile,
    public readonly end: Tile,
  ) {
    this.distance = Math.pow(this.end.x - this.start.x, 2) +
      Math.pow(this.end.y - this.start.y, 2);

    this.a = Math.abs(this.end.x - this.start.x) + 1;
    this.b = Math.abs(this.end.y - this.start.y) + 1;

    this.area = this.a * this.b;
  }
}

function parseInput(input: string): Tile[] {
  const lines = input.split("\n");
  return lines.map((line) => {
    const coordinates = line.split(",", 2);
    return new Tile(coordinates);
  });
}

if (import.meta.main) {
  console.log("Starting day-08");

  const input = real_input;

  const tiles = parseInput(input);
  console.log(tiles);

  const rectangles = tiles.flatMap((tile, i) => {
    return tiles.slice(i).map((other) => {
      return new Rectangle(tile, other);
    });
  })
    .filter((d) => d.distance !== 0)
    .sort((a, b) => b.distance - a.distance);

  console.log(rectangles.slice(0, 3));

  console.log("Exisiting day-08");
}
