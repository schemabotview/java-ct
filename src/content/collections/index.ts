import type { Course } from '../types'
import { genericsBasics } from './01-generics-basics'
import { varianceAndWildcards } from './02-variance-and-wildcards'
import { erasureAndRawTypes } from './03-erasure-and-raw-types'
import { collectionChoices } from './04-collection-choices'
import { iterationAndViews } from './05-iteration-and-views'
import { hashingAndOrdering } from './06-hashing-and-ordering'
import { complexityAndTradeoffs } from './07-complexity-and-tradeoffs'
import { immutableStructures } from './08-immutable-structures'

// Course 6 — Generics and Collection Contracts (JAVA-COURSE-PLAN.md, chapter 6).
export const collections: Course = {
  id: 'collections',
  title: "Generics and collection contracts",
  sections: [genericsBasics, varianceAndWildcards, erasureAndRawTypes, collectionChoices, iterationAndViews, hashingAndOrdering, complexityAndTradeoffs, immutableStructures],
}
