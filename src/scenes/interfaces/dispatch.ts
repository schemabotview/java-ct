import type { Scene } from '@graphlearning/flow'

// §2 — two different decisions, made at two different times. Overloads are chosen by javac from the
// STATIC type; overridden methods are chosen by the JVM from the RUNTIME class. Real JDK 25.0.2
// output.
export const ifcDispatch: Scene = {
  id: 'ifc-dispatch',
  title: 'Overriding, dynamic dispatch and overload resolution',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Dispatch.java',
      label: `class Shipping { String name() { return "standard"; } }
class Express extends Shipping {
    @Override String name() { return "express"; }
}
static String label(Object o)   { return "Object overload"; }
static String label(Shipping s) { return "Shipping overload"; }

Shipping s = new Express();
Object   o = s;                 // same object, wider static type`,
    },
    {
      id: 'decisions',
      label: 'Who decides, and when',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'compile-time',
          kind: 'list',
          framed: true,
          label: 'javac — overloads',
          items: ['looks at the static type', 'label(s) → Shipping overload', 'label(o) → Object overload'],
        },
        {
          id: 'run-time',
          kind: 'list',
          framed: true,
          label: 'JVM — overrides',
          items: ['looks at the object’s class', 's.name() → express', 'o.getClass() → Express'],
        },
      ],
    },
    {
      id: 'output',
      kind: 'code',
      filename: 'terminal',
      label: `express 1299
Shipping overload
Object overload
Express`,
    },
  ],
  edges: [
    { source: 'code', target: 'decisions' },
    { source: 'decisions', target: 'output', label: 'run' },
  ],
}
