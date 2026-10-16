import { firstProgram } from './first-program'
import { values } from './values'
import { objects } from './objects'
import { interfaces } from './interfaces'
import { failures } from './failures'
import { collections } from './collections'
import { streams } from './streams'
import { boundaries } from './boundaries'
import type { Course, Section } from './types'

// Course registry, in syllabus order (JAVA-COURSE-PLAN.md). Courses are added here as each is
// authored.
export const COURSES: Record<string, Course> = {
  [firstProgram.id]: firstProgram,
  [values.id]: values,
  [objects.id]: objects,
  [interfaces.id]: interfaces,
  [failures.id]: failures,
  [collections.id]: collections,
  [streams.id]: streams,
  [boundaries.id]: boundaries,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract every recorder drives, so it cannot be a per-repo decision. Re-exported here
// because this module is what the app and the scripts import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
