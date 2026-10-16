import type { Scene } from '@graphlearning/flow'

// §7 — an enum names the only legal states, and a method on it names the legal moves. The switch
// is exhaustive over the constants, so it needs no default. Real JDK 25.0.2 output.
export const objEnums: Scene = {
  id: 'obj-enums',
  title: 'Enums and explicit domain states',
  flow: 'TB',
  nodes: [
    {
      id: 'states',
      label: 'Order status — the allowed moves',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'new', label: 'NEW', sub: 'created', pattern: 'user', icon: 'file' },
        { id: 'paid', label: 'PAID', sub: 'payment taken', pattern: 'service', icon: 'receipt' },
        { id: 'shipped', label: 'SHIPPED', sub: 'final', pattern: 'storage', icon: 'package' },
        { id: 'cancelled', label: 'CANCELLED', sub: 'final', pattern: 'warn', icon: 'ban' },
      ],
      edges: [
        { source: 'new', target: 'paid' },
        { source: 'paid', target: 'shipped' },
        { source: 'new', target: 'cancelled', route: 'step' },
        { source: 'paid', target: 'cancelled', route: 'step' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'Status.java',
      label: `enum Status {
    NEW, PAID, SHIPPED, CANCELLED;
    boolean canMoveTo(Status next) {
        return switch (this) {          // exhaustive: no default
            case NEW  -> next == PAID || next == CANCELLED;
            case PAID -> next == SHIPPED || next == CANCELLED;
            case SHIPPED, CANCELLED -> false;
        };
    }
}`,
    },
    {
      id: 'output',
      kind: 'code',
      filename: 'terminal',
      label: `NEW.canMoveTo(PAID)     true
SHIPPED.canMoveTo(NEW)  false
Status.valueOf("Paid")  IllegalArgumentException:
                        No enum constant Enums.Status.Paid`,
    },
  ],
  edges: [
    { source: 'states', target: 'code', label: 'encoded as' },
    { source: 'code', target: 'output', label: 'run' },
  ],
}
