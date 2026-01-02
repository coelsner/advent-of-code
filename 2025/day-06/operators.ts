export abstract class Operator {
  readonly numbers: number[] = [];
  constructor(
    readonly start: number,
    readonly end: number,
  ) {
  }

  public append(n: number) {
    this.numbers.push(n);
  }

  abstract total(): bigint;
}

export class Sum extends Operator {
    override total(): bigint {
      return this.numbers.reduce<bigint>((p, v) => p + BigInt(v), 0n);
    }
}

export class Product extends Operator {
    override total(): bigint {
        return this.numbers.reduce<bigint>((p, v) => p * BigInt(v), 1n);
    }
    
}

export function getOperators(ops: string): Operator[] {
  const indices = ops.split("").map((o, i) => {
    switch (o) {
      case "*":
      case "+":
        return { o, i };
      default:
        return null;
    }
  }).filter((v) => v !== null);

  return indices.reduce<Operator[]>((p: Operator[], c, idx, all) => {
    const nextIdx = all.at(idx + 1)?.i ?? ops.length + 1;
    return [...p, matchOperator(c.o, c.i, nextIdx - 1)];
  }, []);
}

function matchOperator(o: "*" | "+", idx: number, length: number): Operator {
  if (o === "*") {
    return new Product(idx, length);
  }

  if (o === "+") {
    return new Sum(idx, length);
  }

  throw new Error(`Unknown Operator ${o}`);
}
