import type { Scene } from '@graphlearning/flow'

// §1 — the order total as a chain of four artefacts: the problem's inputs, the algorithm written in
// words, the program that encodes it, and the one line it prints. The amounts are integer minor
// units (cents) so the arithmetic is exact; decimal money waits for course 8.
export const problemToOutput: Scene = {
  id: 'fp-problem-to-output',
  title: 'From a problem to an observable result',
  flow: 'TB',
  nodes: [
    {
      id: 'inputs',
      label: 'The problem — what is known',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'unit', label: 'Unit price', sub: '1250 cents (12.50)', pattern: 'storage', icon: 'tag' },
        { id: 'qty', label: 'Quantity', sub: '3 items', pattern: 'storage', icon: 'hash' },
        { id: 'ship', label: 'Shipping', sub: '499 cents (4.99)', pattern: 'storage', icon: 'package' },
      ],
    },
    {
      id: 'algorithm',
      kind: 'list',
      framed: true,
      label: 'The algorithm — steps in words',
      items: [
        'multiply unit price by quantity',
        'add the shipping charge',
        'report the total in cents',
      ],
    },
    {
      id: 'program',
      kind: 'code',
      filename: 'Order.java',
      label: `int totalCents = unitCents * quantity
               + shippingCents;
IO.println("Total (cents): " + totalCents);`,
    },
    {
      id: 'output',
      kind: 'code',
      filename: 'terminal',
      label: `Total (cents): 4249`,
    },
  ],
  edges: [
    { source: 'inputs', target: 'algorithm', label: 'reason' },
    { source: 'algorithm', target: 'program', label: 'encode' },
    { source: 'program', target: 'output', label: 'run' },
  ],
}
