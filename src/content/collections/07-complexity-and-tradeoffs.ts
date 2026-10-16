import type { Section } from '../types'

export const complexityAndTradeoffs: Section = {
  id: 'complexity-and-tradeoffs',
  title: "Ordering guarantees, basic complexity and workload trade-offs",
  scene: 'col-cost',
  focus: 'counts',
  slide: `## Cost grows differently

**Complexity** describes how work grows with the number of elements, *n*. Counting comparisons shows it without trusting a stopwatch.

### Finding the last of 10,000 SKUs
- \`ArrayList.contains\` — **10,000** \`equals\` calls: O(n)
- \`TreeSet.contains\` — **24** comparisons: O(log n)
- \`HashSet.contains\` — **1** \`equals\` call: O(1) on average
- Double *n*: the list's work doubles, the tree's grows by one step

### Each guarantee has a price
- A list keeps insertion order and allows duplicates
- A tree keeps sorted order and costs log n per step
- A hash gives no order and needs a good \`hashCode\`

### State the workload
- How big is *n*? Lookups or iteration? Is order needed?
- Then **measure** with real data — chapter 12`,
  narration:
    "Choosing a collection also means choosing how its cost grows. Complexity describes that growth as the number of elements, n, increases. Rather than timing operations, which depends on the machine, the warm-up and the moment, here we count the work. We look for the last of ten thousand SKUs in three collections and count how many times an equals or compareTo method is called. The ArrayList checks every element in turn: ten thousand calls. Double the list and the work doubles. The TreeSet walks down a balanced tree: twenty-four comparisons, growing with the logarithm of n. The HashSet computes a hash, jumps to one bucket, and makes a single equals call, constant on average, provided the hash codes are well spread. But each structure buys its speed with a guarantee given up or kept: order, sorting, duplicates. For a handful of elements, a list is often simplest and fastest. So state the workload first: how big n is, whether you look up or iterate, and whether order matters. Then measure.",
}
