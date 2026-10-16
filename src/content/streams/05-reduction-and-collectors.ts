import type { Section } from '../types'

export const reductionAndCollectors: Section = {
  id: 'reduction-and-collectors',
  title: "Reduction, collectors, grouping and combination laws",
  scene: 'str-collectors',
  focus: 'laws',
  slide: `## Reductions and their laws

A **reduction** combines all elements into one result. Collectors build richer results: maps, groups and counts.

### Results from the four lines
- A specialised sum and a general reduce from 0 both give **8788**
- Grouping by sku and summing each group gives A-100 = 5000
- Partitioning splits the lines into two groups: 3 under 2000, 1 over
- Collectors **nest**: group first, then sum or count each group

### The laws a parallel reduction relies on
- The operation must be **associative**: (a + b) + c = a + (b + c)
- The starting value must be a true **identity**: 0 for addition
- Subtraction is neither, so parallel gives **0**, not −500500
- Nothing warns you: compare with a sequential run`,
  narration:
    "A reduction combines all the elements of a stream into a single result. The total of our four lines can be computed with a specialised sum, or with a general reduce that starts from zero and adds each value, and both give eighty-seven eighty-eight. Collectors build richer results. groupingBy sorts the lines into groups by sku and sums each group, so the two A-one hundred lines together come to five thousand. partitioningBy splits the lines into exactly two groups by a condition and counts them. Reduction looks simple, but it quietly relies on two laws, and they matter as soon as a stream runs in parallel. A parallel stream splits the data into chunks, reduces each chunk from the starting value, and then combines the partial results. That only works if the operation is associative, so grouping does not matter, and the starting value is a true identity. Addition qualifies. Subtraction does not, and on this machine the parallel version returns zero instead of minus five hundred thousand five hundred. Nothing warns you.",
}
