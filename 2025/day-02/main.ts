const test_input =
  "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,\
1698522-1698528,446443-446449,38593856-38593862,565653-565659,\
824824821-824824827,2121212118-2121212124";

const real_input = await Deno.readTextFile("./day-02/input.txt");

// --------------

const r = /^(?<start>[1-9]\d*)-(?<end>[1-9]\d*)$/u;

const loglevel: "info" | "debug" = "info";

function debug(exec: () => void) {
  if (loglevel === "debug") exec();
}

if (import.meta.main) {
  const input = real_input;

  let totalCount = 0;

  for (const line of input.split(",")) {
    const match = r.exec(line.trim());
    if (!match || !match.groups) {
      console.log(`Line ${line} does not match regex`);
      continue;
    }

    const [start, end] = [
      parseInt(match.groups.start),
      parseInt(match.groups.end),
    ];
    if (Number.isNaN(start) || Number.isNaN(end)) {
      console.log(
        `Line: ${line} does not contain numbers for start (${start}) and end (${end}.`
      );
      continue;
    }

    const invalidIds = getInvalidIds(start, end);
    totalCount += invalidIds.reduce((prev, curr) => curr + prev, 0);
    debug(() => 
    console.log(
      `Line: ${line}, start: ${start}, end: ${end}, invalidIds: ${invalidIds}, totalCount: ${totalCount}`
    ));
  }

  console.log("Total count:", totalCount);
}

function getInvalidIds(start: number, end: number): number[] {
  const result = [];
  for (let x = start; x <= end; x++) {
    if (isInvalid(x)) {
      result.push(x);
    }
  }
  return result;
}

function isInvalid(x: number): boolean {
    const raw = x.toString();
    for (const pattern of extractPatterns(raw)) {
        const patternMatch = new RegExp(`^(${pattern})+$`, 'g');
        if (patternMatch.exec(raw) !== null) {
            debug(() => console.debug(`${x} is invalid`))
            return true;
        }
    }

    return false;
}

function extractPatterns(raw: string): string[] {
    const patterns: string[] = [];
    for (let size = 1; size <= raw.length / 2; size++) {
        patterns.push(raw.substring(0, size));
    }
    return patterns;
}
