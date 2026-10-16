import type { Scene } from '@graphlearning/flow'

// §1 — a primitive holds its value; a reference holds a way to reach an object; null reaches
// nothing. The NPE text is real JDK 25.0.2 output: launched from source the local is `<local3>`,
// compiled with `javac -g` it is named — the helpful-NPE message needs debug info for names.
export const valTypes: Scene = {
  id: 'val-types',
  title: 'Primitives, references and null',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Types.java',
      label: `int quantity = 3;
String sku = "A-100";
String note = null;
IO.println(quantity + " " + sku.length() + " " + note);
IO.println(note.length());`,
    },
    {
      id: 'memory',
      label: 'What each variable holds',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'frame',
          kind: 'memory',
          label: 'main — local variables',
          slots: [
            { at: 'quantity', name: '3', note: 'int: the value itself' },
            { at: 'sku', name: 'ref →', note: 'String: a reference' },
            { at: 'note', name: 'null', note: 'String: refers to nothing' },
          ],
        },
        { id: 'string-obj', label: 'String object', sub: '"A-100" · length 5', pattern: 'storage', icon: 'box' },
      ],
      edges: [{ source: 'frame', target: 'string-obj', label: 'sku' }],
    },
    {
      id: 'output',
      kind: 'code',
      filename: 'terminal',
      label: `3 5 null
Exception in thread "main" java.lang.NullPointerException:
  Cannot invoke "String.length()" because "note" is null
    at Types.main(Types.java:6)`,
    },
  ],
  edges: [
    { source: 'code', target: 'memory' },
    { source: 'memory', target: 'output', label: 'run' },
  ],
}
