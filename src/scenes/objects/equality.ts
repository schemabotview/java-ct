import type { Scene } from '@graphlearning/flow'

// §8 — identity, value equality, hash codes and toString, each row printed by a real JDK 25.0.2
// run. "Aa" and "BB" are the standard colliding pair: equal hash, unequal strings.
export const objEquality: Scene = {
  id: 'obj-equality',
  title: 'equals, hashCode, toString and value semantics',
  flow: 'TB',
  nodes: [
    {
      id: 'results',
      kind: 'table',
      label: 'Same content — equal?',
      headers: ['case', 'equals', 'HashSet size'],
      values: [
        ['class PlainItem, no equals', 'false', '2'],
        ['record Item(sku, quantity)', 'true', '1'],
        ['"Aa" vs "BB" — hash 2112 each', 'false', '2'],
      ],
    },
    {
      id: 'contract',
      label: 'The contract',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'eq-hash', label: 'Equal objects', sub: 'must have equal hash codes', pattern: 'service', icon: 'scale' },
        { id: 'hash-not-eq', label: 'Equal hashes', sub: 'do not prove equality', pattern: 'warn', icon: 'hash' },
        { id: 'stable', label: 'Stable fields', sub: 'or a set loses the key', pattern: 'service', icon: 'lock' },
      ],
    },
    {
      id: 'to-string',
      kind: 'code',
      filename: 'toString leaks what it prints',
      label: `record LeakyCustomer(String name, String cardNumber) {}
// LeakyCustomer[name=Ada, cardNumber=4111111111111111]

record Customer(String name, String cardNumber) {
    @Override public String toString() {
        return "Customer[name=" + name + ", card=****"
             + cardNumber.substring(cardNumber.length() - 4) + "]";
    }
}
// Customer[name=Ada, card=****1111]`,
    },
  ],
  edges: [
    { source: 'results', target: 'contract' },
    { source: 'contract', target: 'to-string', label: 'and printing' },
  ],
}
