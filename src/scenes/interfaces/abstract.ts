import type { Scene } from '@graphlearning/flow'

// §3 — an abstract class holds the shared, final algorithm and leaves one step abstract. Real
// JDK 25.0.2 output, including the guard firing and javac's refusal to instantiate.
export const ifcAbstract: Scene = {
  id: 'ifc-abstract',
  title: 'Abstract classes and shared implementation',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Discount.java',
      label: `abstract class Discount {
    final int apply(int baseCents) {              // shared, fixed
        int off = discountCents(baseCents);
        if (off < 0 || off > baseCents)
            throw new IllegalStateException("bad discount " + off);
        return baseCents - off;
    }
    protected abstract int discountCents(int baseCents);  // varies
}`,
    },
    {
      id: 'subclasses',
      label: 'extends Discount — supply one step',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'percent', label: 'PercentOff(10)', sub: 'apply(3750) → 3375', pattern: 'service', icon: 'scissors' },
        { id: 'fixed', label: 'FixedOff(500)', sub: 'apply(3750) → 3250', pattern: 'service', icon: 'tag' },
      ],
    },
    {
      id: 'failures',
      kind: 'code',
      filename: 'the guard, and the abstract class itself',
      label: `new FixedOff(5000).apply(3750)
  IllegalStateException: bad discount 5000

new Discount()
  error: Make.Discount is abstract; cannot be instantiated`,
    },
  ],
  edges: [
    { source: 'code', target: 'subclasses', label: 'extends' },
    { source: 'subclasses', target: 'failures' },
  ],
}
