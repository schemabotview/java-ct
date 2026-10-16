import type { Scene } from '@graphlearning/flow'
import { intNetwork } from './network'
import { intHttpClient } from './http-client'
import { intRetries } from './retries'
import { intJdbc } from './jdbc'
import { intTransactions } from './transactions'
import { intSecurity } from './security'
import { intTesting } from './testing'

// Course 11 — Network and Database Integration. Spread into src/scenes/index.ts.
export const integrationScenes: Scene[] = [intNetwork, intHttpClient, intRetries, intJdbc, intTransactions, intSecurity, intTesting]
