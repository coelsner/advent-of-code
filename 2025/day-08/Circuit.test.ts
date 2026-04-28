import { expect } from "@std/expect";
import { Circuit, computeCircuits } from "./Circuit.ts";
import { Distance } from "./distances.ts";
import { Box } from "./Box.ts";

Deno.test('computeCircuit', async (t) => {
    const b1 = new Box(1,1,1);
    const b2 = new Box(2,2,2);

    await t.step('already in circuit', () => {
        const circuits = [new Circuit(b1, b2), new Circuit(new Box(3,3,3))];
        const result = computeCircuits(circuits, new Distance(b1, b2))
        expect(result).toHaveLength(2);
        expect(result[0]).toEqual(new Circuit(b1, b2));
    });

    await t.step('disjunct circuits', () => {
        const c1 = new Circuit(b1);
        const c2 = new Circuit(b2);
        const c3 = new Circuit(new Box(3,3,3))
        
        const result = computeCircuits([c1, c2, c3], new Distance(b1, b2))
        expect(result).toHaveLength(2);
        expect(result).toEqual([c3, new Circuit(b1, b2)]);
    });
})
