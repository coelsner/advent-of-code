
export class Box {
  public readonly id: string;
  public readonly x: number;
  public readonly y: number;
  public readonly z: number;

  constructor(x: number, y: number, z: number) {
    this.id = [x, y, z].join(",");
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export function parseInput(input: string): Box[] {
  const coordinates = input.split("\n").map((line) => {
    const raw = line.split(",");
    if (raw.length !== 3) {
      throw new Error(`Coordinates length not matching: ${raw}`);
    }
    return {
      x: parseInt(raw[0]),
      y: parseInt(raw[1]),
      z: parseInt(raw[2]),
    };
  });

  return coordinates.map((c) => new Box(c.x, c.y, c.z));
}