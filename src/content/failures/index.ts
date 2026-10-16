import type { Course } from '../types'
import { exceptionsAndTraces } from './01-exceptions-and-traces'
import { checkedAndUnchecked } from './02-checked-and-unchecked'
import { wrappingAndCauses } from './03-wrapping-and-causes'
import { tryWithResources } from './04-try-with-resources'
import { errorBoundaries } from './05-error-boundaries'
import { unitTests } from './06-unit-tests'
import { debuggingEvidence } from './07-debugging-evidence'

// Course 5 — Failures, Resources, Testing and Debugging (JAVA-COURSE-PLAN.md, chapter 5).
export const failures: Course = {
  id: 'failures',
  title: "Failures, resources, testing and debugging",
  sections: [exceptionsAndTraces, checkedAndUnchecked, wrappingAndCauses, tryWithResources, errorBoundaries, unitTests, debuggingEvidence],
}
