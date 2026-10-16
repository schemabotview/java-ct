import type { Scene } from '@graphlearning/flow'
import { bldPackages } from './packages'
import { bldLayout } from './layout'
import { bldClasspath } from './classpath'
import { bldMaven } from './maven'
import { bldCi } from './ci'
import { bldModules } from './modules'
import { bldCompat } from './compat'

// Course 9 — Application Structure, Builds and Delivery. Spread into src/scenes/index.ts.
export const buildScenes: Scene[] = [bldPackages, bldLayout, bldClasspath, bldMaven, bldCi, bldModules, bldCompat]
