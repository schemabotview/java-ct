import type { Scene } from '@graphlearning/flow'

// §7 — the same program with assertions off (the default) and on, plus a System.Logger line. Real
// JDK 25.0.2 output; the logger's default backend is java.util.logging, which prints two lines.
export const failEvidence: Scene = {
  id: 'fail-evidence',
  title: 'Debuggers, logging, assertions and the limits of evidence',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Evidence.java',
      label: `static int discountCents(int baseCents, int percent) {
    assert percent >= 0 && percent <= 100
         : "percent out of range: " + percent;
    return baseCents * percent / 100;
}
System.Logger log = System.getLogger("shop.pricing");
log.log(INFO, "pricing order {0} with {1} lines", 17, 2);
IO.println(discountCents(3750, 150));`,
    },
    {
      id: 'runs',
      label: 'Same code, two runs',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'default-run',
          kind: 'code',
          filename: 'java Evidence.java — assertions off',
          label: `INFO: pricing order 17 with 2 lines
5625                     // 150 % discount, silently`,
        },
        {
          id: 'ea-run',
          kind: 'code',
          filename: 'java -ea Evidence.java',
          label: `INFO: pricing order 17 with 2 lines
Exception in thread "main" java.lang.AssertionError:
  percent out of range: 150`,
        },
      ],
    },
    {
      id: 'tools',
      label: 'Evidence and its limits',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'debugger', label: 'Debugger', sub: 'pause, inspect, step', pattern: 'user', icon: 'bug' },
        { id: 'logs', label: 'Logs', sub: 'what ran, in production', pattern: 'network', icon: 'scroll' },
        { id: 'asserts', label: 'Assertions', sub: 'off unless -ea', pattern: 'warn', icon: 'shieldcheck' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'runs' },
    { source: 'runs', target: 'tools' },
  ],
}
