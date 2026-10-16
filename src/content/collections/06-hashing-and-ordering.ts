import type { Section } from '../types'

export const hashingAndOrdering: Section = {
  id: 'hashing-and-ordering',
  title: "Hashing, natural order, comparators and contract consistency",
  scene: 'col-hashing',
  focus: 'buckets',
  slide: `## Contracts that fail silently

Hash and tree collections trust their elements' \`hashCode\`, \`equals\` and \`compare\`. Break the contract and nothing throws — the collection just **gives wrong answers**.

### A mutated hash key
- \`k\` was stored under the hash of \`(A-100, 1)\`
- Changing \`warehouse\` changes its hash — lookups go to the **wrong bucket**
- \`contains(k)\` is false, yet the set still has size 1

### A comparator inconsistent with equals
- \`TreeSet\` decides duplicates by \`compare\`, not \`equals\`
- Comparing by price alone makes A-100 and C-300 **the same** — one is dropped
- Add a tie-breaker: \`thenComparing(LineItem::sku)\`
- Sort by everything \`equals\` compares

### Rules
- Keys must not change in ways that affect \`equals\` or \`hashCode\``,
  narration:
    "Hash-based and tree-based collections are fast because they trust their elements. A HashSet trusts hashCode and equals; a TreeSet trusts its comparator. If those methods break their contract, nothing throws an exception. The collection simply starts giving wrong answers. In the first example, a key object is stored in a HashSet, which files it under the hash of its fields, A one hundred in warehouse one. Then the code changes the warehouse. The object is still in the set, so the size is one, but asking whether the set contains it computes a new hash and looks in a different bucket, where nothing is found. Even a fresh key with the original values fails, because equals no longer matches. In the second example, a TreeSet sorts line items by price alone. A TreeSet treats two elements that compare as equal as duplicates, so two different products at the same price collapse into one, and an item silently disappears. A tie-breaker on the sku fixes it. Keys must not change once they are stored.",
}
