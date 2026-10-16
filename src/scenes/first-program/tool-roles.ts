import type { Scene } from '@graphlearning/flow'

// §4 — four places to type Java, one JDK underneath. The JShell transcript is real JDK 25.0.2
// output with the default feedback mode.
export const toolRoles: Scene = {
  id: 'fp-tool-roles',
  title: 'JShell, terminal, editor, IDE',
  flow: 'TB',
  nodes: [
    {
      id: 'jshell-session',
      kind: 'code',
      filename: 'jshell',
      label: `jshell> int q = 3
q ==> 3
jshell> int total = 1250 * q + 499
total ==> 4249
jshell> total / 100
$3 ==> 42
jshell> total % 100
$4 ==> 49`,
    },
    {
      id: 'surfaces',
      label: 'Where you type',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'jshell', label: 'JShell', sub: 'try one expression, see its value', pattern: 'user', icon: 'terminal' },
        { id: 'terminal', label: 'Terminal', sub: 'run javac, java, jar directly', pattern: 'user', icon: 'terminal' },
        { id: 'editor', label: 'Editor', sub: 'write and save .java files', pattern: 'user', icon: 'pencil' },
        { id: 'ide', label: 'IDE', sub: 'edit, build, test, debug together', pattern: 'user', icon: 'code' },
      ],
    },
    { id: 'jdk', label: 'The same JDK', sub: 'javac · java · jshell', pattern: 'service', icon: 'package' },
  ],
  edges: [
    { source: 'jshell-session', target: 'surfaces' },
    { source: 'surfaces', target: 'jdk', label: 'all call' },
  ],
}
