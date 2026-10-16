import type { Scene } from '@graphlearning/flow'
import { failTraces } from './traces'
import { failChecked } from './checked'
import { failWrapping } from './wrapping'
import { failResources } from './resources'
import { failBoundaries } from './boundaries'
import { failTests } from './tests'
import { failEvidence } from './evidence'

// Course 5 — Failures, Resources, Testing and Debugging. Spread into src/scenes/index.ts.
export const failuresScenes: Scene[] = [failTraces, failChecked, failWrapping, failResources, failBoundaries, failTests, failEvidence]
