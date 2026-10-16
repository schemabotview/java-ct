import type { Scene } from '@graphlearning/flow'
import { problemToOutput } from './problem-to-output'
import { toolchain } from './toolchain'
import { compileRun } from './compile-run'
import { toolRoles } from './tool-roles'
import { entryPoints } from './entry-points'
import { failureStages } from './failure-stages'

// Course 1 — A First Program and the Java Execution Model. Spread into src/scenes/index.ts.
export const firstProgramScenes: Scene[] = [problemToOutput, toolchain, compileRun, toolRoles, entryPoints, failureStages]
