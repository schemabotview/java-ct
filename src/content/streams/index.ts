import type { Course } from '../types'
import { functionalInterfaces } from './01-functional-interfaces'
import { capturesAndReferences } from './02-captures-and-references'
import { streamPipelines } from './03-stream-pipelines'
import { filterMapFlatten } from './04-filter-map-flatten'
import { reductionAndCollectors } from './05-reduction-and-collectors'
import { optionalAndAbsence } from './06-optional-and-absence'
import { sideEffectsAndParallel } from './07-side-effects-and-parallel'

// Course 7 — Lambdas and Stream Transformations (JAVA-COURSE-PLAN.md, chapter 7).
export const streams: Course = {
  id: 'streams',
  title: "Lambdas and stream transformations",
  sections: [functionalInterfaces, capturesAndReferences, streamPipelines, filterMapFlatten, reductionAndCollectors, optionalAndAbsence, sideEffectsAndParallel],
}
