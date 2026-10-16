import type { Course } from '../types'
import { classLoading } from './01-class-loading'
import { jitCompilation } from './02-jit-compilation'
import { heapAndGc } from './03-heap-and-gc'
import { leaksAndExhaustion } from './04-leaks-and-exhaustion'
import { jfrAndDumps } from './05-jfr-and-dumps'
import { measurement } from './06-measurement'
import { releasesAndUpdates } from './07-releases-and-updates'
import { applicationReview } from './08-application-review'

// Course 12 — JVM Behaviour, Diagnosis and Application Evolution (JAVA-COURSE-PLAN.md, chapter 12).
export const jvm: Course = {
  id: 'jvm',
  title: "JVM behaviour, diagnosis and application evolution",
  sections: [classLoading, jitCompilation, heapAndGc, leaksAndExhaustion, jfrAndDumps, measurement, releasesAndUpdates, applicationReview],
}
