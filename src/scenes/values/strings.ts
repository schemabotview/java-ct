import type { Scene } from '@graphlearning/flow'

// §4 — `==` compares references, `equals` compares content. a and b share one pooled literal; c is
// built at run time, so it is a different object with the same characters. Real JDK 25.0.2 output.
export const valStrings: Scene = {
  id: 'val-strings',
  title: 'Strings, identity and content equality',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Strings.java',
      label: `String a = "A-100";
String b = "A-100";
String c = new StringBuilder("A-")
        .append(100).toString();
IO.println(a == b);        // true
IO.println(a == c);        // false
IO.println(a.equals(c));   // true`,
    },
    {
      id: 'heap',
      label: 'Three variables, two String objects',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'vars',
          label: 'Variables',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'a', label: 'a', sub: 'reference', pattern: 'user', icon: 'link' },
            { id: 'b', label: 'b', sub: 'reference', pattern: 'user', icon: 'link' },
            { id: 'c', label: 'c', sub: 'reference', pattern: 'user', icon: 'link' },
          ],
        },
        {
          id: 'objects',
          label: 'Objects',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'pooled', label: '"A-100"', sub: 'literal, shared', pattern: 'storage', icon: 'box' },
            { id: 'built', label: '"A-100"', sub: 'built at run time', pattern: 'storage', icon: 'box' },
          ],
        },
      ],
      edges: [
        { source: 'a', target: 'pooled' },
        { source: 'b', target: 'pooled' },
        { source: 'c', target: 'built' },
      ],
    },
    {
      id: 'text-block',
      kind: 'code',
      filename: 'text block',
      label: `String receipt = """
    Order 17
      3 x A-100   37.50
    """;              // 2 lines, indent stripped`,
    },
  ],
  edges: [
    { source: 'code', target: 'heap' },
    { source: 'heap', target: 'text-block' },
  ],
}
