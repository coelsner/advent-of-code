export function transposeLines(lines: string[]): string[] {
  const result: string[] = [];
  lines.map((line) => {
    line.split("").map((d, j) => {
        result[j] = result.at(j)?.concat(d) ?? d;
    });
  });

  return result;
}

export function transposeOperator() {
    
}