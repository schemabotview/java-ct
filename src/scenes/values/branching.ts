import type { Scene } from '@graphlearning/flow'

// §5 — an if/else rule, a switch expression, and the old switch statement's fall-through. All three
// outputs are real JDK 25.0.2 runs.
export const valBranching: Scene = {
  id: 'val-branching',
  title: 'Conditions, if and switch',
  flow: 'TB',
  nodes: [
    {
      id: 'if-else',
      kind: 'code',
      filename: 'free shipping at 50.00',
      label: `int itemsCents = 1250 * quantity;
int shippingCents;
if (itemsCents >= 5000) shippingCents = 0;
else                    shippingCents = 499;
// 3 items: 4249    4 items: 5000`,
    },
    {
      id: 'switch-expr',
      kind: 'code',
      filename: 'switch expression — yields a value',
      label: `int shippingCents = switch (zone) {
    case "DOMESTIC" -> 499;
    case "EU", "UK" -> 1299;
    default         -> 2499;
};
// DOMESTIC 499   EU 1299   MARS 2499`,
    },
    {
      id: 'fall-through',
      kind: 'code',
      filename: 'switch statement — falls through',
      label: `switch (code) {             // code == 1
    case 1: IO.println("one");
    case 2: IO.println("two");
    default: IO.println("other");
}
// prints one, two, other — no break`,
    },
  ],
  edges: [
    { source: 'if-else', target: 'switch-expr', label: 'many cases' },
    { source: 'switch-expr', target: 'fall-through', label: 'the older form' },
  ],
}
