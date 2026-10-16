import type { Scene } from '@graphlearning/flow'

// §6 — Optional as a return type for "maybe absent", the eager/lazy default trap, and get() on
// empty. Real JDK 25.0.2 output.
export const strOptional: Scene = {
  id: 'str-optional',
  title: 'Optional, absence and API choices',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Opt.java',
      label: `Optional<LineItem> bulk = lines.stream()
    .filter(l -> l.quantity() >= 10).findFirst();
Optional<LineItem> pricey = lines.stream()
    .filter(l -> l.unitCents() > 1000).findFirst();

bulk                                    // Optional.empty
pricey.map(LineItem::sku)               // Optional[A-100]
bulk.map(LineItem::sku).orElse("no bulk line")   // no bulk line
pricey.orElse(expensiveDefault())       // "building default" printed
pricey.orElseGet(() -> expensiveDefault())  // nothing printed
bulk.get()        // NoSuchElementException: No value present`,
    },
    {
      id: 'choices',
      label: 'Use it where absence is part of the contract',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'return-type', label: 'Return types', sub: 'find…, first…, lookup', pattern: 'service', icon: 'circlecheck' },
        { id: 'not-fields', label: 'Not fields', sub: 'or parameters', pattern: 'warn', icon: 'ban' },
        { id: 'not-collections', label: 'Not collections', sub: 'return an empty list', pattern: 'warn', icon: 'ban' },
        { id: 'no-get', label: 'Avoid get()', sub: 'map, orElse, orElseThrow', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'choices' }],
}
