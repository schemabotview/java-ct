import type { Scene } from '@graphlearning/flow'
import { jvmClassLoading } from './class-loading'
import { jvmJit } from './jit'
import { jvmHeapGc } from './heap-gc'
import { jvmLeaks } from './leaks'
import { jvmJfr } from './jfr'
import { jvmMeasurement } from './measurement'
import { jvmReleases } from './releases'
import { jvmReview } from './review'

// Course 12 — JVM Behaviour, Diagnosis and Application Evolution. Spread into src/scenes/index.ts.
export const jvmScenes: Scene[] = [jvmClassLoading, jvmJit, jvmHeapGc, jvmLeaks, jvmJfr, jvmMeasurement, jvmReleases, jvmReview]
