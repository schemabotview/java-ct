import type { Course } from '../types'
import { typesAndNull } from './01-types-and-null'
import { variablesAndScope } from './02-variables-and-scope'
import { operatorsAndOverflow } from './03-operators-and-overflow'
import { stringsAndEquality } from './04-strings-and-equality'
import { branchingAndSwitch } from './05-branching-and-switch'
import { loops } from './06-loops'
import { arrays } from './07-arrays'
import { methodsAndRecursion } from './08-methods-and-recursion'

// Course 2 — Values, Expressions and Control Flow (JAVA-COURSE-PLAN.md, chapter 2).
export const values: Course = {
  id: 'values',
  title: "Values, expressions and control flow",
  sections: [typesAndNull, variablesAndScope, operatorsAndOverflow, stringsAndEquality, branchingAndSwitch, loops, arrays, methodsAndRecursion],
}
