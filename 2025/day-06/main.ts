import * as streams from "@std/streams";

function test_input(f: any) {
  return Promise.resolve(
    ReadableStream.from([`123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `]).pipeThrough(new streams.TextLineStream()),
  );
}

function real_input(f: Deno.FsFile) {
  return f.readable.pipeThrough(
    new TextDecoderStream(),
  ).pipeThrough(new streams.TextLineStream());
}

class X {
  private sum: bigint;
  private product: bigint;

  constructor(x: number) {
    this.sum = BigInt(x);
    this.product = BigInt(x);
  }

  update(n: number) {
    this.sum += BigInt(n);
    this.product *= BigInt(n);
  }

  getResult(op: string): bigint {
    switch (op.trim()) {
      case "*":
        return this.product;
      case "+":
        return this.sum;
      default:
        throw new Error(`Unkown "${op}" operator.`);
    }
  }
}

if (import.meta.main) {
  using f = await Deno.open("./day-06/input.txt", { read: true });

  const input = await test_input(f);
  
  const numbers: X[] = [];

  let result: bigint[] = [];

  for await (const data of input) {
    const elements = data.split(/([0-9 ]{3}) ?/g).filter((s) =>
      s.trim().length !== 0
    );

    if (numbers.length === 0) {
      console.log("Initializing numbers", elements.length);
      elements.map((n) => new X(parseInt(n))).forEach((e) => numbers.push(e));
      continue;
    }

    if (elements.length !== numbers.length) {
      throw new Error(
        `Elements size ${elements.length} unequal to numbers length ${numbers.length}`,
      );
    }

    const first = elements[0].trim();

    if (first === "*" || first === "+") {
      result = elements.map((v, i) => numbers[i].getResult(v));
    } else {
      elements.forEach((n, i) => numbers[i].update(parseInt(n)));
    }
  }

  console.log(numbers, result, result.reduce((p, c) => p + c));
}
