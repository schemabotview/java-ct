import type { Scene } from '@graphlearning/flow'

// §1 — an HTTP exchange shown as the bytes on the wire: a raw socket writes the request to a local
// com.sun.net.httpserver stub and prints what comes back. Real JDK 25.0.2 output.
export const intNetwork: Scene = {
  id: 'int-network',
  title: 'Requests, responses, protocols, endpoints and network foundations',
  flow: 'TB',
  nodes: [
    {
      id: 'layers',
      label: 'What carries one request',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'client', label: 'Client', sub: 'opens a connection', pattern: 'user', icon: 'monitor' },
        { id: 'tcp', label: 'TCP', sub: '127.0.0.1 : port', pattern: 'network', icon: 'network' },
        { id: 'server', label: 'Server', sub: 'endpoint /orders/17', pattern: 'external', icon: 'server' },
      ],
      edges: [
        { source: 'client', target: 'tcp', label: 'bytes' },
        { source: 'tcp', target: 'server' },
      ],
    },
    {
      id: 'exchange',
      label: 'On the wire',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'request',
          kind: 'code',
          filename: 'request — written to the socket',
          label: `GET /orders/17 HTTP/1.1          ← method, path, version
Host: localhost                  ← headers
Accept: application/json
Connection: close
                                 ← blank line: end of headers`,
        },
        {
          id: 'response',
          kind: 'code',
          filename: 'response — read from the socket',
          label: `HTTP/1.1 200 OK                  ← status line
Date: Fri, 16 Oct 2026 17:44:05 GMT
Content-type: application/json
Content-length: 27

{"id":17,"totalCents":4249}      ← body`,
        },
      ],
      edges: [{ source: 'request', target: 'response', label: 'reply' }],
    },
    {
      id: 'statuses',
      label: 'Status classes',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 's2xx', label: '2xx', sub: 'success: 200, 201', pattern: 'service', icon: 'circlecheck' },
        { id: 's4xx', label: '4xx', sub: 'the request was wrong: 404', pattern: 'warn', icon: 'ban' },
        { id: 's5xx', label: '5xx', sub: 'the server failed: 503', pattern: 'warn', icon: 'server' },
      ],
    },
  ],
  edges: [
    { source: 'layers', target: 'exchange' },
    { source: 'exchange', target: 'statuses', label: 'the first digit' },
  ],
}
