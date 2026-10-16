import type { Scene } from '@graphlearning/flow'
import { objIdentity } from './identity'
import { objInvariants } from './invariants'
import { objEncapsulation } from './encapsulation'
import { objStatic } from './static-lifetime'
import { objComposition } from './composition'
import { objRecords } from './records'
import { objEnums } from './enums'
import { objEquality } from './equality'

// Course 3 — Objects and Domain Modelling. Spread into src/scenes/index.ts.
export const objectsScenes: Scene[] = [objIdentity, objInvariants, objEncapsulation, objStatic, objComposition, objRecords, objEnums, objEquality]
