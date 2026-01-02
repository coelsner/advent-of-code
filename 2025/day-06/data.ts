import * as streams from "@std/streams";

export async function test_input(f: any) {
  const input = ReadableStream.from([`123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `]).pipeThrough(new streams.TextLineStream());

  const result: string[] = [];
  for await (const data of input) {
    result.push(data);
  }

  return result;
}

export async function real_input(f: Deno.FsFile) : Promise<string[]> {
  const r = f.readable.pipeThrough(
    new TextDecoderStream(),
  ).pipeThrough(new streams.TextLineStream());

  const result = [];
  for await (const line of r) {
    result.push(line);
  }

  return result;
}