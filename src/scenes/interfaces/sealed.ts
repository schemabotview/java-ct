import type { Scene } from '@graphlearning/flow'

// §5 — a sealed result type, an exhaustive pattern switch with a guard, and what javac says when a
// case is missing. All output is real JDK 25.0.2; a null selector throws unless a `case null` exists.
export const ifcSealed: Scene = {
  id: 'ifc-sealed',
  title: 'Sealed hierarchies and pattern matching',
  flow: 'TB',
  nodes: [
    {
      id: 'hierarchy',
      label: 'sealed interface PaymentResult permits …',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'approved', label: 'Approved', sub: 'record (authCode)', pattern: 'service', icon: 'circlecheck' },
        { id: 'declined', label: 'Declined', sub: 'record (reason)', pattern: 'warn', icon: 'ban' },
        { id: 'pending', label: 'Pending', sub: 'record (retryAfterSeconds)', pattern: 'network', icon: 'clock' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'exhaustive switch — no default',
      label: `return switch (r) {
    case Approved a -> "paid, auth " + a.authCode();
    case Declined d when d.reason().equals("insufficient funds")
                    -> "try another card";
    case Declined d -> "declined: " + d.reason();
    case Pending p  -> "retry in " + p.retryAfterSeconds() + "s";
};`,
    },
    {
      id: 'output',
      kind: 'code',
      filename: 'terminal',
      label: `paid, auth X91        try another card
declined: expired     retry in 30s
message(null)         NullPointerException
remove Pending case   error: the switch expression does not
                      cover all possible input values`,
    },
  ],
  edges: [
    { source: 'hierarchy', target: 'code', label: 'matched by' },
    { source: 'code', target: 'output', label: 'run' },
  ],
}
