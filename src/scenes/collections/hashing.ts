import type { Scene } from '@graphlearning/flow'

// §6 — two contract violations that throw nothing: a key mutated after insertion, and a comparator
// that calls different items equal. Real JDK 25.0.2 output.
export const colHashing: Scene = {
  id: 'col-hashing',
  title: 'Hashing, natural order and comparators',
  flow: 'TB',
  nodes: [
    {
      id: 'hash-case',
      label: 'A key that changes after insertion',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'hash-code',
          kind: 'code',
          filename: 'Key uses sku + warehouse',
          label: `reserved.add(k);       // hashed as (A-100, 1)
k.warehouse = 2;       // now hashes elsewhere
reserved.contains(k)                 false
reserved.size()                      1
contains(new Key("A-100", 1))        false`,
        },
        {
          id: 'buckets',
          kind: 'memory',
          label: 'HashSet buckets',
          slots: [
            { at: 'hash(A-100,1)', name: 'k', note: 'stored here' },
            { at: 'hash(A-100,2)', name: '—', note: 'looked up here' },
          ],
        },
      ],
      edges: [{ source: 'hash-code', target: 'buckets' }],
    },
    {
      id: 'tree-case',
      label: 'A comparator that ignores the sku',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'tree-code',
          kind: 'code',
          filename: 'TreeSet uses compare, not equals',
          label: `new TreeSet<>(comparingInt(LineItem::unitCents))
add A-100 @1250, B-200 @899, C-300 @1250    →  2 items

byPrice.thenComparing(LineItem::sku)        →  [B-200, A-100, C-300]`,
        },
      ],
    },
  ],
  edges: [{ source: 'hash-case', target: 'tree-case' }],
}
