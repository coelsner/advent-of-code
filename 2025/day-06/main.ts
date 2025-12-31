import * as streams from "@std/streams";

async function test_input() {
    return Promise.resolve(
        ReadableStream.from([`123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `]).pipeThrough(new streams.TextLineStream()));
} 

async function real_input(f: Deno.FsFile) {
    return f.readable.pipeThrough(
        new TextDecoderStream()
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

  getResult(op: string) : bigint {
    switch(op) {
        case "*": return this.product;
        case "+": return this.sum;
        default: throw new Error(`Unkown "${op}" operator.`)
    }
  }
}

if (import.meta.main) {
    using f = await Deno.open("./day-06/input.txt", {read: true});
    
  const input = await real_input(f);

  let state: "init" | "numbers" = "init";

  const numbers: X[] = [];

  let result: bigint[] = [];

  for await (const data of input) {
    const elements = data.split(/\s+/g).filter((v) => v.trim().length > 0);
    switch (state) {
      case "init":
        elements.forEach((n) => numbers.push(new X(parseInt(n))));
        state = "numbers";
        break;
      case "numbers":
        if (elements.length !== numbers.length) {
            throw new Error(`Elements size ${elements.length} unequal to numbers length ${numbers.length}`)
        }
        if (elements[0] === "*" || elements[0] === "+") {
            result = elements.map((v, i) => numbers[i].getResult(v));
        } else {
            elements.forEach((n, i) => numbers[i].update(parseInt(n)))
        }
        break;
    }
  }

  console.log(numbers, result, result.reduce((p,c) => p+c));
}
