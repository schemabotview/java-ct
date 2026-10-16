import type { Scene } from '@graphlearning/flow'

// §3 — the whole first program, then the two ways to run it. Both terminal transcripts are real
// JDK 25.0.2 output. Stacked in one column: side by side, three ~48-char code cards make a board
// ~2.5:1 wide that fitView shrinks until the code is unreadable.
export const compileRun: Scene = {
  id: 'fp-compile-run',
  title: 'A first compile and run',
  flow: 'TB',
  nodes: [
    {
      id: 'program',
      kind: 'code',
      filename: 'Order.java',
      label: `void main() {
    int unitCents = 1250;      // 12.50
    int quantity = 3;
    int shippingCents = 499;   //  4.99
    int totalCents = unitCents * quantity
                   + shippingCents;
    IO.println("Total (cents): " + totalCents);
}`,
    },
    {
      id: 'workflows',
      label: 'Two workflows, one result',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'two-step',
          kind: 'code',
          filename: 'compile, then run',
          label: `$ javac Order.java
$ ls
Order.class  Order.java
$ java Order
Total (cents): 4249`,
        },
        {
          id: 'one-step',
          kind: 'code',
          filename: 'launch the source file',
          label: `$ java Order.java
Total (cents): 4249

# compiled in memory;
# no .class file left`,
        },
      ],
    },
  ],
  edges: [{ source: 'program', target: 'workflows' }],
}
