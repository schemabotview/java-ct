import type { Scene } from '@graphlearning/flow'
import { ccExecutors } from './executors'
import { ccRaces } from './races'
import { ccLocks } from './locks'
import { ccAtomics } from './atomics'
import { ccFutures } from './futures'
import { ccCancellation } from './cancellation'
import { ccVirtual } from './virtual'
import { ccBounded } from './bounded'
import { ccDeadlock } from './deadlock'

// Course 10 — Concurrency and Coordinated Work. Spread into src/scenes/index.ts.
export const concurrencyScenes: Scene[] = [ccExecutors, ccRaces, ccLocks, ccAtomics, ccFutures, ccCancellation, ccVirtual, ccBounded, ccDeadlock]
