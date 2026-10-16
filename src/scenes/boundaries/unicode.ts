import type { Scene } from '@graphlearning/flow'

// §1 — three different "lengths" of one string, and the same four characters decoded with the right
// and the wrong charset. Real JDK 25.0.2 output (run with -Dstdout.encoding=UTF-8).
export const bndUnicode: Scene = {
  id: 'bnd-unicode',
  title: 'Unicode, UTF-16 chars, code points and encodings',
  flow: 'TB',
  nodes: [
    {
      id: 'lengths',
      kind: 'table',
      label: 'note = "Café 🎁"',
      headers: ['measure', 'value', 'counts'],
      values: [
        ['note.length()', '7', 'UTF-16 chars — 🎁 needs 2'],
        ['codePointCount', '6', 'Unicode characters'],
        ['UTF-8 bytes', '10', 'é = 2 bytes, 🎁 = 4'],
        ['note.charAt(5)', 'd83c', 'half a surrogate pair'],
      ],
    },
    {
      id: 'decode',
      label: 'Bytes on disk need a charset to become text',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'bytes',
          kind: 'memory',
          label: 'note.txt — 5 bytes',
          slots: [
            { at: '43 61 66', name: 'C a f' },
            { at: 'C3 A9', name: 'é in UTF-8' },
          ],
        },
        {
          id: 'readers',
          label: 'new String(raw, charset)',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'utf8', label: 'UTF_8', sub: '"Café" · 4 chars', pattern: 'service', icon: 'circlecheck' },
            { id: 'latin1', label: 'ISO_8859_1', sub: '"CafÃ©" · 5 chars', pattern: 'warn', icon: 'ban' },
          ],
        },
      ],
      edges: [{ source: 'bytes', target: 'readers', label: 'decode' }],
    },
  ],
  edges: [{ source: 'lengths', target: 'decode', label: 'on disk' }],
}
