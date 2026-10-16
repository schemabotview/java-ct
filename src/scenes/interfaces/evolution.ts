import type { Scene } from '@graphlearning/flow'

// §8 — one interface, three versions, one existing implementation. v2 adds a default method: Flat
// still compiles, and the OLD Flat.class still runs against it. v3 adds an abstract method: every
// implementer breaks. All three results are real JDK 25.0.2 runs.
export const ifcEvolution: Scene = {
  id: 'ifc-evolution',
  title: 'API design, compatibility and controlled change',
  flow: 'TB',
  nodes: [
    {
      id: 'v1',
      kind: 'code',
      filename: 'v1 — PricingPolicy.java, implemented by Flat',
      label: `public interface PricingPolicy {
    int priceCents(int unitCents, int quantity);
}`,
    },
    {
      id: 'changes',
      label: 'Two ways to add a method',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'v2',
          kind: 'code',
          filename: 'v2 — compatible',
          label: `default String describe() {
    return "flat";
}
// Flat compiles: 3750 flat
// old Flat.class runs: 3750`,
        },
        {
          id: 'v3',
          kind: 'code',
          filename: 'v3 — breaks implementers',
          label: `int priceCents(int unitCents,
    int quantity, String currency);
// error: Flat is not abstract
// and does not override abstract
// method priceCents(int,int,String)`,
        },
      ],
    },
    {
      id: 'rules',
      label: 'Controlled change',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'document', label: 'Document', sub: 'inputs, results, failures', pattern: 'service', icon: 'file' },
        { id: 'version', label: 'Version', sub: 'say which change is which', pattern: 'service', icon: 'tag' },
        { id: 'deprecate', label: 'Deprecate', sub: 'before you remove', pattern: 'warn', icon: 'history' },
      ],
    },
  ],
  edges: [
    { source: 'v1', target: 'changes', label: 'evolve' },
    { source: 'changes', target: 'rules' },
  ],
}
