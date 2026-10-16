import type { Scene } from '@graphlearning/flow'

// §1 — a rejected order line propagating up three calls, read as a stack trace; and an Error the
// program should not try to handle. Real JDK 25.0.2 output (StackOverflowError's trace is capped
// at 1024 frames by default).
export const failTraces: Scene = {
  id: 'fail-traces',
  title: 'Exceptions, propagation and stack traces',
  flow: 'TB',
  nodes: [
    {
      id: 'unwind',
      label: 'Thrown at the top, propagated down the stack',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'code',
          kind: 'code',
          filename: 'Trace.java',
          label: `static LineItem parseLine(String text) {
    String[] f = text.split(",");
    return new LineItem(f[0], Integer.parseInt(f[1]),
                        Integer.parseInt(f[2]));          // line 8
}
static int checkout(String text) {
    LineItem line = parseLine(text);                      // line 11
    return line.unitCents() * line.quantity();
}
checkout("A-100,1250,0");                                 // line 16`,
        },
        {
          id: 'stack',
          kind: 'memory',
          label: 'Call stack, newest on top',
          slots: [
            { at: 'top', name: 'LineItem.<init>  :3', note: 'thrown here' },
            { at: '', name: 'parseLine  :8', note: 'no catch: propagates' },
            { at: '', name: 'checkout  :11', note: 'no catch: propagates' },
            { at: 'bottom', name: 'main  :16', note: 'no catch: thread ends' },
          ],
        },
      ],
      edges: [{ source: 'code', target: 'stack', label: 'unwinds' }],
    },
    {
      id: 'output',
      kind: 'code',
      filename: 'terminal',
      label: `Exception in thread "main" java.lang.IllegalArgumentException:
  quantity must be positive: 0
    at Trace$LineItem.<init>(Trace.java:3)
    at Trace.parseLine(Trace.java:8)
    at Trace.checkout(Trace.java:11)
    at Trace.main(Trace.java:16)`,
    },
    {
      id: 'error',
      kind: 'code',
      filename: 'an Error, not an Exception',
      label: `static int depth(int n) { return depth(n + 1) + 1; }
// caught java.lang.StackOverflowError, trace frames: 1024`,
    },
    {
      id: 'kinds',
      label: 'Two branches of Throwable',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'exception-kind', label: 'Exception', sub: 'a condition code may handle', pattern: 'service', icon: 'wrench' },
        { id: 'error-kind', label: 'Error', sub: 'the JVM itself is in trouble', pattern: 'warn', icon: 'skull' },
      ],
    },
  ],
  edges: [
    { source: 'unwind', target: 'output', label: 'printed as' },
    { source: 'output', target: 'error', label: 'contrast' },
    { source: 'error', target: 'kinds' },
  ],
}
