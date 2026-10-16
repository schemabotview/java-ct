import type { Course } from '../types'
import { problemToOutput } from './01-problem-to-output'
import { sourceToJvm } from './02-source-to-jvm'
import { compileAndRun } from './03-compile-and-run'
import { toolRoles } from './04-tool-roles'
import { entryPoints } from './05-entry-points'
import { failureStages } from './06-failure-stages'

// Course 1 — A First Program and the Java Execution Model (JAVA-COURSE-PLAN.md, chapter 1).
export const firstProgram: Course = {
  id: 'first-program',
  title: 'A first program and the Java execution model',
  sections: [problemToOutput, sourceToJvm, compileAndRun, toolRoles, entryPoints, failureStages],
}
