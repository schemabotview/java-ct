import type { Scene } from '@graphlearning/flow'

// §2 — block scope, `final` and `var`, shown through the two errors javac reports. Real JDK 25.0.2
// output; the compiler reports both errors in one pass.
export const valScope: Scene = {
  id: 'val-scope',
  title: 'Variables, scope, final and var',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Scope.java',
      label: `final int unitCents = 1250;
var quantity = 3;            // inferred: int
int totalCents = 0;          // initialised
for (int i = 0; i < quantity; i++) {
    int line = unitCents;    // lives in this block
    totalCents += line;
}
IO.println(line);            // line 9
unitCents = 1300;            // line 10`,
    },
    {
      id: 'errors',
      kind: 'code',
      filename: 'javac Scope.java',
      label: `Scope.java:9: error: cannot find symbol
    IO.println(line);
               ^
  symbol:   variable line
Scope.java:10: error: cannot assign a value
  to final variable unitCents
2 errors`,
    },
    {
      id: 'rules',
      label: 'Three rules the compiler enforced',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'block', label: 'Block scope', sub: 'a name ends at its closing brace', pattern: 'service', icon: 'braces' },
        { id: 'final', label: 'final', sub: 'assigned once, then fixed', pattern: 'warn', icon: 'lock' },
        { id: 'var', label: 'var', sub: 'type inferred, still static', pattern: 'network', icon: 'search' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'errors', label: 'compile' },
    { source: 'errors', target: 'rules' },
  ],
}
