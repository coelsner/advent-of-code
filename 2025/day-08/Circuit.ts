import { Box } from "./Box.ts";
import { Distance } from "./distances.ts";

export class Circuit {
  public readonly boxes: Set<Box>;

  constructor(
    ...boxes: Box[]
  ) {
    this.boxes = new Set(boxes);
  }

  contains(distance: Distance) : boolean {
    return this.boxes.has(distance.start) || this.boxes.has(distance.end);
  }

  combine(other: Circuit): Circuit {
    const boxes = Array.from(this.boxes.union(other.boxes));
    return new Circuit(...boxes);
  }
}

export function computeCircuits(circuits: Circuit[], distance: Distance) : Circuit[] {
  const matches = circuits.filter(c => c.contains(distance))
  if (matches.length === 2) {
    const [first, second] = matches;
    const newCircuit = first.combine(second);

    return [...circuits.filter(c => !c.contains(distance)), newCircuit];
  }

  return circuits;
}