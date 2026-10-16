import type { Course } from '../types'
import { interfacesAndContracts } from './01-interfaces-and-contracts'
import { dispatchAndOverloading } from './02-dispatch-and-overloading'
import { abstractClasses } from './03-abstract-classes'
import { compositionVsInheritance } from './04-composition-vs-inheritance'
import { sealedAndPatterns } from './05-sealed-and-patterns'
import { nestedClasses } from './06-nested-classes'
import { annotationsAndReflection } from './07-annotations-and-reflection'
import { apiEvolution } from './08-api-evolution'

// Course 4 — Interfaces, Variation and Reusable Design (JAVA-COURSE-PLAN.md, chapter 4).
export const interfaces: Course = {
  id: 'interfaces',
  title: "Interfaces, variation and reusable design",
  sections: [interfacesAndContracts, dispatchAndOverloading, abstractClasses, compositionVsInheritance, sealedAndPatterns, nestedClasses, annotationsAndReflection, apiEvolution],
}
