import type { Scene } from '@graphlearning/flow'
import { colGenerics } from './generics'
import { colVariance } from './variance'
import { colErasure } from './erasure'
import { colChoices } from './choices'
import { colViews } from './views'
import { colHashing } from './hashing'
import { colCost } from './cost'
import { colImmutable } from './immutable'

// Course 6 — Generics and Collection Contracts. Spread into src/scenes/index.ts.
export const collectionsScenes: Scene[] = [colGenerics, colVariance, colErasure, colChoices, colViews, colHashing, colCost, colImmutable]
