import type { Scene } from '@graphlearning/flow'

// §2 — source → javac → bytecode → JVM → platform. The bytecode card is a real `javap -c Order`
// excerpt from JDK 25.0.2, trimmed to the arithmetic, so the learner sees the class file is not
// machine code. The platform row makes the portability boundary concrete: the class file is shared,
// the JVM under it is not.
export const toolchain: Scene = {
  id: 'fp-toolchain',
  title: 'Source, bytecode, JVM, platform',
  flow: 'TB',
  nodes: [
    {
      id: 'source',
      kind: 'code',
      filename: 'Order.java — source',
      label: `int totalCents = unitCents * quantity
               + shippingCents;`,
    },
    {
      id: 'bytecode',
      kind: 'code',
      filename: 'Order.class — javap -c',
      label: `10: iload_1        // unitCents
11: iload_2        // quantity
12: imul
13: iload_3        // shippingCents
14: iadd
15: istore 4       // totalCents`,
    },
    {
      id: 'jvm',
      label: 'JVM — runs bytecode on this machine',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'loader', label: 'Class loader', sub: 'finds and verifies Order.class', pattern: 'service', icon: 'boxes' },
        { id: 'interp', label: 'Interpreter', sub: 'executes bytecode at first', pattern: 'service', icon: 'cpu' },
        { id: 'jit', label: 'JIT compiler', sub: 'turns hot code into native', pattern: 'service', icon: 'zap' },
        { id: 'gc', label: 'Garbage collector', sub: 'reclaims unreachable objects', pattern: 'service', icon: 'trash' },
      ],
    },
    {
      id: 'platform',
      label: 'Platform — a separate JVM build for each',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'linux', label: 'Linux', sub: 'x64 · AArch64', pattern: 'external', icon: 'server' },
        { id: 'macos', label: 'macOS', sub: 'AArch64 · x64', pattern: 'external', icon: 'cpu' },
        { id: 'windows', label: 'Windows', sub: 'x64 · AArch64', pattern: 'external', icon: 'harddrive' },
      ],
    },
  ],
  edges: [
    { source: 'source', target: 'bytecode', label: 'javac' },
    { source: 'bytecode', target: 'jvm', label: 'java' },
    { source: 'jvm', target: 'platform' },
  ],
}
