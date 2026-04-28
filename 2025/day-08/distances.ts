import { Box } from "./Box.ts";

export class Distance {
  public readonly distance: number;

  constructor(
    public readonly start: Box,
    public readonly end: Box,
  ) {
    this.distance = Math.pow(end.x - start.x, 2) +
      Math.pow(end.y - start.y, 2) +
      Math.pow(end.z - start.z, 2);
  }
}

export function computeDistances(boxes: Box[]): Distance[] {
  const pairs = boxes.flatMap((b, i) => {
    return boxes.slice(i + 1).map((other) => new Distance(b, other));
  });

  return pairs.sort((a: Distance, b: Distance) => {
    return a.distance - b.distance;
  });
}
