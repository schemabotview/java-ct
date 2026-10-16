import type { Scene } from '@graphlearning/flow'

// §1 — one lambda shape, several target types; and the error when the target has two abstract
// methods. Real JDK 25.0.2 output.
export const strFunctional: Scene = {
  id: 'str-functional',
  title: 'Functional interfaces, lambdas and target types',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Fn.java',
      label: `@FunctionalInterface
interface PricingPolicy { int priceCents(LineItem l); }

PricingPolicy flat = l -> l.unitCents() * l.quantity();
ToIntFunction<LineItem> same = l -> l.unitCents() * l.quantity();
Predicate<LineItem> bulk = l -> l.quantity() >= 10;
Function<LineItem, String> sku = LineItem::sku;
Supplier<LineItem> sample = () -> new LineItem("B-200", 899, 2);

flat.priceCents(line) 3750    same.applyAsInt(line) 3750
bulk.test(line) false`,
    },
    {
      id: 'shapes',
      label: 'java.util.function — the common shapes',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'function', label: 'Function', sub: 'T → R', pattern: 'service', icon: 'share' },
        { id: 'predicate', label: 'Predicate', sub: 'T → boolean', pattern: 'service', icon: 'funnel' },
        { id: 'supplier', label: 'Supplier', sub: '() → T', pattern: 'service', icon: 'package' },
        { id: 'consumer', label: 'Consumer', sub: 'T → nothing', pattern: 'service', icon: 'power' },
      ],
    },
    {
      id: 'error',
      kind: 'code',
      filename: 'javac — two abstract methods',
      label: `interface Pricing { int price(int cents); String name(); }
Pricing p = c -> c * 2;
// error: incompatible types:
//   Pricing is not a functional interface
//   multiple non-overriding abstract methods found`,
    },
  ],
  edges: [
    { source: 'code', target: 'shapes' },
    { source: 'shapes', target: 'error', label: 'only one method' },
  ],
}
