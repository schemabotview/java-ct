import type { Scene } from '@graphlearning/flow'

// §7 — a quoted comma that split(",") cannot handle, and native serialization guarded by an
// ObjectInputFilter allow-list. Real JDK 25.0.2 output.
export const bndFormats: Scene = {
  id: 'bnd-formats',
  title: 'CSV, JSON, schemas and Java serialization boundaries',
  flow: 'TB',
  nodes: [
    {
      id: 'csv',
      kind: 'table',
      label: '"Mug, large",1250,3  split(",")  →  4 fields',
      headers: ['field', 'text'],
      values: [
        ['0', '"Mug'],
        ['1', ' large"'],
        ['2', '1250'],
        ['3', '3'],
      ],
    },
    {
      id: 'formats',
      label: 'Choose a format with a real parser',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'csv-lib', label: 'CSV', sub: 'a library that handles quotes', pattern: 'service', icon: 'table' },
        { id: 'json-lib', label: 'JSON', sub: 'not in the JDK: add a library', pattern: 'service', icon: 'braces' },
        { id: 'schema', label: 'Schema', sub: 'state fields and types', pattern: 'service', icon: 'file' },
      ],
    },
    {
      id: 'serial',
      kind: 'code',
      filename: 'native serialization — allow-list what may be read',
      label: `ObjectInputFilter only = ObjectInputFilter.Config
        .createFilter("Csv$LineItem;!*");
in.setObjectInputFilter(only);
in.readObject()   // LineItem[sku=A-100, unitCents=1250, quantity=3]

filter "java.lang.String;!*"   // rejected: filter status: REJECTED`,
    },
  ],
  edges: [
    { source: 'csv', target: 'formats' },
    { source: 'formats', target: 'serial', label: 'and never' },
  ],
}
