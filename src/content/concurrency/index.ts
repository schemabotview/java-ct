import type { Course } from '../types'
import { tasksAndExecutors } from './01-tasks-and-executors'
import { racesAndVisibility } from './02-races-and-visibility'
import { locksAndInvariants } from './03-locks-and-invariants'
import { atomicsAndConcurrentCollections } from './04-atomics-and-concurrent-collections'
import { futuresAndComposition } from './05-futures-and-composition'
import { cancellationAndTimeouts } from './06-cancellation-and-timeouts'
import { virtualThreads } from './07-virtual-threads'
import { boundedWork } from './08-bounded-work'
import { deadlockAndLiveness } from './09-deadlock-and-liveness'

// Course 10 — Concurrency and Coordinated Work (JAVA-COURSE-PLAN.md, chapter 10).
export const concurrency: Course = {
  id: 'concurrency',
  title: "Concurrency and coordinated work",
  sections: [tasksAndExecutors, racesAndVisibility, locksAndInvariants, atomicsAndConcurrentCollections, futuresAndComposition, cancellationAndTimeouts, virtualThreads, boundedWork, deadlockAndLiveness],
}
