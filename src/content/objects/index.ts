import type { Course } from '../types'
import { classesAndIdentity } from './01-classes-and-identity'
import { constructorsAndInvariants } from './02-constructors-and-invariants'
import { encapsulation } from './03-encapsulation'
import { staticAndLifetime } from './04-static-and-lifetime'
import { compositionAndDelegation } from './05-composition-and-delegation'
import { recordsAndImmutability } from './06-records-and-immutability'
import { enumsAndStates } from './07-enums-and-states'
import { equalsHashcodeTostring } from './08-equals-hashcode-tostring'

// Course 3 — Objects and Domain Modelling (JAVA-COURSE-PLAN.md, chapter 3).
export const objects: Course = {
  id: 'objects',
  title: "Objects and domain modelling",
  sections: [classesAndIdentity, constructorsAndInvariants, encapsulation, staticAndLifetime, compositionAndDelegation, recordsAndImmutability, enumsAndStates, equalsHashcodeTostring],
}
