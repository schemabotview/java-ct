import type { Scene } from '@graphlearning/flow'
import { strFunctional } from './functional'
import { strCaptures } from './captures'
import { strPipelines } from './pipelines'
import { strFlatMap } from './flatmap'
import { strCollectors } from './collectors'
import { strOptional } from './optional'
import { strParallel } from './parallel'

// Course 7 — Lambdas and Stream Transformations. Spread into src/scenes/index.ts.
export const streamsScenes: Scene[] = [strFunctional, strCaptures, strPipelines, strFlatMap, strCollectors, strOptional, strParallel]
