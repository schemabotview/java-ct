import type { Course } from '../types'
import { packagesAndDependencies } from './01-packages-and-dependencies'
import { projectLayout } from './02-project-layout'
import { classpathAndJars } from './03-classpath-and-jars'
import { mavenLifecycle } from './04-maven-lifecycle'
import { testsAndCi } from './05-tests-and-ci'
import { modulesAndServices } from './06-modules-and-services'
import { compatibilityAndRuntimes } from './07-compatibility-and-runtimes'

// Course 9 — Application Structure, Builds and Delivery (JAVA-COURSE-PLAN.md, chapter 9).
export const build: Course = {
  id: 'build',
  title: "Application structure, builds and delivery",
  sections: [packagesAndDependencies, projectLayout, classpathAndJars, mavenLifecycle, testsAndCi, modulesAndServices, compatibilityAndRuntimes],
}
