import { real_input } from "./data.ts";
import { getOperators } from "./operators.ts";

if (import.meta.main) {
  using f = await Deno.open("./day-06/input.txt", { read: true });

  const lines: string[] = await real_input(f);

  const operators = getOperators(lines.at(-1)!);

  for (const line of lines.slice(0,-1)) {
    for (const ops of operators) {
      const element = line.slice(ops.start, ops.end);
      console.log(element);
      ops.append(parseInt(element));
    }
  }

  console.log(operators, operators.reduce((p, v) => p + v.total(), 0n));
}
