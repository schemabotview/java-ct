import type { Scene } from '@graphlearning/flow'
import { bndUnicode } from './unicode'
import { bndParsing } from './parsing'
import { bndMoney } from './money'
import { bndTime } from './time'
import { bndFiles } from './files'
import { bndBuffering } from './buffering'
import { bndFormats } from './formats'
import { bndAtomic } from './atomic'

// Course 8 — Text, Time, Files and Data Boundaries. Spread into src/scenes/index.ts.
export const boundariesScenes: Scene[] = [bndUnicode, bndParsing, bndMoney, bndTime, bndFiles, bndBuffering, bndFormats, bndAtomic]
