export class Line {
    constructor(
    public readonly data: string,
    public readonly splits: number = 0,
    public readonly times: number = 0,
    ){};
}


export function compute(input: Line, pattern: string) : Line {
    if (input.data.length !== pattern.length) {
        throw new Error(`Length does not match: ${input.data.length} != ${pattern.length}`)
    }

    const result = new Array(input.data.length).fill(".");

    let splits = 0;
    let timelines = 0;

    pattern.split("").forEach((p, i) => {
        const currentIn = input.data.at(i);
        if (p === "^" && currentIn === "|") {
            result[i-1] = "|";
            result[i+1] = "|";
            splits++;
        } else if (currentIn === "|" || p === "S") {
            result[i] = "|";
        }
    });


    return new Line(result.join(""), splits + input.splits, timelines);
}
