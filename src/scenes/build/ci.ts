import type { Scene } from '@graphlearning/flow'

// §5 — what a clean build leaves behind as evidence, and the shape of a CI job that reproduces it.
// The surefire files and the -D override are real runs; the workflow is an illustrative minimum,
// modelled on this repository's own .github/workflows/deploy.yml, and was not executed here.
export const bldCi: Scene = {
  id: 'bld-ci',
  title: 'Automated tests, configuration, logging and CI build evidence',
  flow: 'TB',
  nodes: [
    {
      id: 'evidence',
      label: 'What a build leaves behind',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'reports', label: 'Test reports', sub: 'surefire-reports, XML', pattern: 'storage', icon: 'file' },
        { id: 'artifact', label: 'The artifact', sub: 'orders-1.0-SNAPSHOT.jar', pattern: 'storage', icon: 'package' },
        { id: 'log', label: 'The build log', sub: 'versions, phases, results', pattern: 'storage', icon: 'scroll' },
      ],
    },
    {
      id: 'workflow',
      kind: 'code',
      filename: '.github/workflows/ci.yml — illustrative',
      label: `on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with: { distribution: temurin, java-version: '25' }
      - run: mvn -B verify          # compile, test, package, checks
      - uses: actions/upload-artifact@v4
        with: { name: surefire, path: target/surefire-reports }`,
    },
    {
      id: 'config',
      label: 'Configuration is input, not code',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'defaults', label: 'Defaults', sub: 'shop.properties on the classpath', pattern: 'service', icon: 'file' },
        { id: 'override', label: 'Overrides', sub: '-D or environment at launch', pattern: 'network', icon: 'wrench' },
        { id: 'secrets', label: 'Secrets', sub: 'never in the jar or the log', pattern: 'warn', icon: 'key' },
      ],
    },
  ],
  edges: [
    { source: 'evidence', target: 'workflow', label: 'reproduced by' },
    { source: 'workflow', target: 'config' },
  ],
}
