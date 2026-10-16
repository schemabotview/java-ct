import type { Scene } from '@graphlearning/flow'

// §2 — the constructor is the one door into a LineItem, so the rules are checked there. The stack
// trace is real JDK 25.0.2 output: `<init>` is how a constructor appears in a trace.
export const objInvariants: Scene = {
  id: 'obj-invariants',
  title: 'Constructors, validation and invariants',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'LineItem constructor',
      label: `LineItem(String sku, int unitCents, int quantity) {
    if (quantity <= 0) throw new IllegalArgumentException(
            "quantity must be positive: " + quantity);
    if (unitCents < 0) throw new IllegalArgumentException(
            "price must not be negative: " + unitCents);
    this.sku = Objects.requireNonNull(sku, "sku");
    this.unitCents = unitCents;
    this.quantity = quantity;
}`,
    },
    {
      id: 'rules',
      label: 'True of every LineItem that exists',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'qty-rule', label: 'quantity ≥ 1', sub: 'zero lines are not orders', pattern: 'service', icon: 'hash' },
        { id: 'price-rule', label: 'price ≥ 0', sub: 'in whole cents', pattern: 'service', icon: 'tag' },
        { id: 'sku-rule', label: 'sku present', sub: 'never null', pattern: 'service', icon: 'circlecheck' },
      ],
    },
    {
      id: 'rejected',
      kind: 'code',
      filename: 'new LineItem("A-100", 1250, 0)',
      label: `Exception in thread "main" java.lang.IllegalArgumentException:
  quantity must be positive: 0
    at Invariant$LineItem.<init>(Invariant.java:7)
    at Invariant.main(Invariant.java:20)`,
    },
  ],
  edges: [
    { source: 'code', target: 'rules', label: 'guarantees' },
    { source: 'rules', target: 'rejected', label: 'or no object' },
  ],
}
