import type { Section } from '../types'

export const filterMapFlatten: Section = {
  id: 'filter-map-flatten',
  title: "Filtering, mapping, flattening and short-circuiting",
  scene: 'str-flatmap',
  focus: 'op-flat',
  slide: `## Map, flatMap and early exits

Most pipelines are built from a handful of operations. The one that surprises people is **flatMap**.

### map versus flatMap
- \`map(Order::lines)\` gives one **list** per order: 3 lists
- \`flatMap(o -> o.lines().stream())\` splices them: **4 lines**
- An order with no lines simply contributes nothing

### Building the SKU list
- flatMap to lines, map to SKU, \`distinct\`, \`toList\`
- Result: \`[A-100, B-200, C-300]\`

### Short-circuiting
- \`anyMatch\`, \`allMatch\`, \`findFirst\` stop as soon as the answer is known
- Infinite or huge sources are safe with a short-circuit at the end
- \`filter\` before \`map\` saves work on discarded elements
- \`toList()\` returns an **unmodifiable** list`,
  narration:
    "Most pipelines are assembled from a small set of operations: filter keeps some elements, map turns each element into one new element, and distinct drops repeats. The operation that surprises people is flatMap. Suppose we want every line from every order. Mapping each order to its lines gives a stream of lists, three lists, one per order, which is rarely what you want. flatMap instead maps each order to a stream of its lines and splices those streams together into one, so we get four line items in a single stream. Order nineteen, with no lines, simply contributes nothing. From there, mapping to the sku, removing duplicates and collecting gives the three distinct products. Some terminal operations can finish early. anyMatch asks whether any line has a quantity of three or more, and it stops at the first one it finds. That short-circuiting is what makes it safe to end even a very large or infinite source with findFirst or anyMatch. And as a habit, filter before you map, so discarded elements cost less.",
}
