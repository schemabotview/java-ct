import type { Scene } from '@graphlearning/flow'

// §2 — the compiler's rule for checked exceptions, shown by the error it reports, and the class
// hierarchy the rule follows. Real JDK 25.0.2 output.
export const failChecked: Scene = {
  id: 'fail-checked',
  title: 'Checked and unchecked exceptions',
  flow: 'TB',
  nodes: [
    {
      id: 'hierarchy',
      label: 'Throwable',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'error-type', label: 'Error', sub: 'JVM trouble: do not catch', pattern: 'warn', icon: 'skull' },
        { id: 'checked-type', label: 'Checked', sub: 'Exception: IOException and the like', pattern: 'network', icon: 'shieldcheck' },
        { id: 'unchecked-type', label: 'Unchecked', sub: 'RuntimeException: bugs, bad arguments', pattern: 'service', icon: 'bug' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'Load.java',
      label: `static String load(Path p) {
    return Files.readString(p);       // throws IOException
}`,
    },
    {
      id: 'error',
      kind: 'code',
      filename: 'javac',
      label: `Load.java:3: error: unreported exception IOException;
  must be caught or declared to be thrown
    return Files.readString(p);
                           ^`,
    },
    {
      id: 'choices',
      label: 'The caller must choose',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'declare', label: 'Declare it', sub: 'throws IOException', pattern: 'service', icon: 'share' },
        { id: 'handle', label: 'Handle it', sub: 'catch, and do something', pattern: 'service', icon: 'wrench' },
      ],
    },
  ],
  edges: [
    { source: 'hierarchy', target: 'code' },
    { source: 'code', target: 'error', label: 'compile' },
    { source: 'error', target: 'choices' },
  ],
}
