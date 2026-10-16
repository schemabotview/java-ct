import type { Scene } from '@graphlearning/flow'
import { valTypes } from './types'
import { valScope } from './scope'
import { valOperators } from './operators'
import { valStrings } from './strings'
import { valBranching } from './branching'
import { valLoops } from './loops'
import { valArrays } from './arrays'
import { valMethods } from './methods'

// Course 2 — Values, Expressions and Control Flow. Spread into src/scenes/index.ts.
export const valuesScenes: Scene[] = [valTypes, valScope, valOperators, valStrings, valBranching, valLoops, valArrays, valMethods]
