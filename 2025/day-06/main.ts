import { real_input, test_input } from "./data.ts";
import { getOperators } from "./operators.ts";
import { transposeLines } from "./transpose.ts";

if (import.meta.main) {
  using f = await Deno.open("./day-06/input.txt", { read: true });

  const input: string[] = await real_input(f);
  const lines = transposeLines(input.slice(0, -1));

  const operators = getOperators(input.at(-1)!);

  operators.map((op) => {
    for (let idx = op.start; idx < op.end; idx++) {
      op.append(parseInt(lines[idx]));
    }
  })

  // Part of first task
  // for (const line of lines.slice(0,-1)) {
  //   for (const ops of operators) {
  //     const element = line.slice(ops.start, ops.end);
  //     console.log(element);
  //     ops.append(parseInt(element));
  //   }
  // }

  console.log(operators, operators.reduce((p, v) => p + v.total(), 0n));
}
