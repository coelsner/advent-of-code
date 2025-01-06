import { TextLineStream } from "jsr:@std/streams/text-line-stream";

export async function readLines<E>(
  input: string,
  process: (data: string) => E,
): Promise<E[]> {
  const result: E[] = [];

  const stream = ReadableStream.from([input]).pipeThrough(new TextLineStream());
  for await (const data of stream) {
    const processed = process(data);
    result.push(processed);
  }

  return result;
}
