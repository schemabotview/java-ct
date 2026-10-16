import type { Scene } from '@graphlearning/flow'

// §1 — one interface, two implementations, one caller that knows only the interface. Totals are real
// JDK 25.0.2 output: 3750 + 1990 = 5740; with 10 % off the 10-item line, 3750 + 1791 = 5541
// (integer division rounds the discounted line down).
export const ifcContracts: Scene = {
  id: 'ifc-contracts',
  title: 'Interfaces and contracts',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'PricingPolicy.java',
      label: `interface PricingPolicy {
    int priceCents(LineItem line);           // the contract
    default String describe() {              // shared default
        return getClass().getSimpleName();
    }
}
static int total(List<LineItem> lines, PricingPolicy policy) {
    int sum = 0;
    for (LineItem line : lines) sum += policy.priceCents(line);
    return sum;
}`,
    },
    {
      id: 'impls',
      label: 'Two implementations, one caller',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'caller', label: 'total(lines, policy)', sub: 'knows only the interface', pattern: 'user', icon: 'sigma' },
        {
          id: 'policies',
          label: 'implements PricingPolicy',
          pattern: 'group',
          cols: 3,
          children: [
            { id: 'standard', label: 'Standard', sub: 'StandardPricing: unit × quantity', pattern: 'service', icon: 'tag' },
            { id: 'bulk', label: 'Bulk', sub: 'BulkDiscount: 10 % off at 10+', pattern: 'service', icon: 'scissors' },
            { id: 'next', label: 'Next policy', sub: 'any future implementation', pattern: 'network', icon: 'gears' },
          ],
        },
      ],
      edges: [{ source: 'caller', target: 'policies', label: 'policy.priceCents(line)' }],
    },
    {
      id: 'output',
      kind: 'code',
      filename: 'terminal — lines: 1250 × 3, 199 × 10',
      label: `StandardPricing 5740
BulkDiscount 5541`,
    },
  ],
  edges: [
    { source: 'code', target: 'impls' },
    { source: 'impls', target: 'output', label: 'run' },
  ],
}
