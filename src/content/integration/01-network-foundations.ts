import type { Section } from '../types'

export const networkFoundations: Section = {
  id: 'network-foundations',
  title: "Requests, responses, protocols, endpoints and network foundations",
  scene: 'int-network',
  focus: 'request',
  slide: `## A request is just bytes

Under every HTTP library is a **connection** carrying **text**: a request from the client, a response from the server.

### The request
- A **request line**: method, path and protocol version
- **Headers**: host, accepted formats, connection handling
- A blank line, then an optional **body**

### The response
- A **status line**: 200 OK, 404 Not Found, 503 Service Unavailable
- Headers describing the body: type and length
- The body itself: \`{"id":17,"totalCents":4249}\`

### Terms worth keeping
- **Endpoint** — a host, a port and a path
- **Protocol** — the agreed format both sides follow
- Every hop can be slow, fail, or never answer
- HTTPS wraps the same text in TLS`,
  narration:
    "Before using an HTTP library, it helps to see what it hides. Underneath, the client opens a TCP connection to a host and port, and both sides exchange plain text in a format called a protocol. Here a raw socket writes a request by hand to a small local server. The first line names the method, GET, the path of the resource, slash orders slash seventeen, and the protocol version. Headers follow, one per line: which host is meant, which formats the client accepts, and that the connection should close afterwards. A blank line ends the headers. The response has the same shape. Its first line is the status, two hundred OK. Headers describe the body, here JSON, twenty-seven bytes long, and then the body itself, our familiar order total. An endpoint is just the combination of host, port and path. Keep one more fact in mind for the rest of this course: every one of these hops can be slow, can fail outright, or can simply never answer.",
}
