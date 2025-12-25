const test_input = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

const real_input = await Deno.readTextFile("./day-01/input.txt");

const re = /^(?<dir>R|L)(?<steps>\d+)$/u;
const max_dial: number = 100;

function computePosition(
  position: number,
  steps: number,
  direction: -1 | 1,
): [number, number] {
  const fullSpins = Math.floor(steps / max_dial);
  const remainingSteps = steps % max_dial;

  console.log("Full spins: ", fullSpins, ", remaining", remainingSteps);

  const rawPosition = position + (direction * remainingSteps);
  const wasZero = position !== 0 &&
    (rawPosition <= 0 || rawPosition >= max_dial);

  //console.log("Steps:", steps, "Full spins:", fullSpins, ", was Zero:", wasZero);

  return [
    ((rawPosition % max_dial) + max_dial) % max_dial,
    fullSpins + (wasZero ? 1 : 0),
  ];
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  let position: number = 50;
  let spins = 0;
  let password = 0;

  const input = real_input;

  for (const line of input.split("\n")) {
    const groups = re.exec(line)?.groups;
    if (!groups) {
      console.log("Not matching groups found in: ", line);
      continue;
    }

    const dir = groups.dir;
    const steps = parseInt(groups.steps);

    switch (dir) {
      case "R":
        [position, spins] = computePosition(position, steps, 1);
        break;
      case "L":
        [position, spins] = computePosition(position, steps, -1);
        break;

      default:
        throw new Error(`Direction ${dir} unknown.`);
    }

    console.log(
      "Rotation:",
      dir,
      "by",
      steps,
      "steps. New positition: ",
      position,
      ". Spins?",
      spins,
    );

    if (position === 0 || spins) {
      password += spins;
    }
  }

  console.log("--> Password:", password);
}
