import type { Scene } from '@graphlearning/flow'

// §2 — the same text parsed under two locales, a regular expression that states the line format,
// and parseInt's strictness. Real JDK 25.0.2 output.
export const bndParsing: Scene = {
  id: 'bnd-parsing',
  title: 'Parsing, formatting, regular expressions and locale',
  flow: 'TB',
  nodes: [
    {
      id: 'locale',
      kind: 'table',
      label: 'Locale decides what "." and "," mean',
      headers: ['operation', 'GERMANY', 'US'],
      values: [
        ['parse("1.234,50")', '1234.5', '1.234 — stops at ","'],
        ['format("%,.2f", 1234.5)', '1.234,50', '1,234.50'],
      ],
    },
    {
      id: 'regex',
      kind: 'code',
      filename: 'a pattern is a format specification',
      label: `Pattern line = Pattern.compile("([A-Z]-\\\\d{3}),(\\\\d+),(\\\\d+)");

A-100,1250,3   -> sku=A-100 cents=1250 qty=3
a-100,1250,3   -> no match        // lower-case sku
A-100,12.50,3  -> no match        // price must be whole cents`,
    },
    {
      id: 'strict',
      kind: 'code',
      filename: 'parseInt is strict',
      label: `Integer.parseInt(" 3")
    // NumberFormatException: For input string: " 3"
Integer.parseInt(" 3".strip())     // 3`,
    },
  ],
  edges: [
    { source: 'locale', target: 'regex' },
    { source: 'regex', target: 'strict' },
  ],
}
