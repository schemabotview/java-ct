import type { Scene } from '@graphlearning/flow'

// §5 — expected domain failures become values at the input boundary; the import loop reports them
// and carries on. Catch order matters: NumberFormatException IS an IllegalArgumentException.
// Real JDK 25.0.2 output.
export const failBoundaries: Scene = {
  id: 'fail-boundaries',
  title: 'Validation, domain failures and error boundaries',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Boundary.java',
      label: `static ParseResult parse(int lineNo, String text) {
    String[] f = text.split(",");
    if (f.length != 3) return new Rejected(lineNo,
            "expected 3 fields, got " + f.length);
    try {
        return new Parsed(new LineItem(f[0],
                Integer.parseInt(f[1]), Integer.parseInt(f[2])));
    } catch (NumberFormatException e) {    // must come first:
        return new Rejected(lineNo,        // it extends IAE
                "not a number: " + e.getMessage());
    } catch (IllegalArgumentException e) {
        return new Rejected(lineNo, e.getMessage());
    }
}`,
    },
    {
      id: 'flow',
      label: 'Four input lines',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'in-1', label: 'A-100,1250,3', sub: 'Parsed', pattern: 'service', icon: 'circlecheck' },
        { id: 'in-2', label: 'B-200,899,0', sub: 'Rejected: quantity', pattern: 'warn', icon: 'ban' },
        { id: 'in-3', label: 'C-300,abc,1', sub: 'Rejected: not a number', pattern: 'warn', icon: 'ban' },
        { id: 'in-4', label: 'D-400,500', sub: 'Rejected: 2 fields', pattern: 'warn', icon: 'ban' },
      ],
    },
    {
      id: 'output',
      kind: 'code',
      filename: 'terminal',
      label: `line 2: quantity must be positive: 0
line 3: not a number: For input string: "abc"
line 4: expected 3 fields, got 2
1 imported, 3 rejected`,
    },
    {
      id: 'layers',
      label: 'Where each failure is handled',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'inside', label: 'Inside the domain', sub: 'invariants throw: a bug', pattern: 'service', icon: 'lock' },
        { id: 'edge', label: 'At the edge', sub: 'catch, report, continue', pattern: 'network', icon: 'dooropen' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'flow' },
    { source: 'flow', target: 'output', label: 'report, continue' },
    { source: 'output', target: 'layers' },
  ],
}
