# Provider boundary

The adapter has two operations:

- `complete(messages, effort)`: one JSON request to `POST /v1/chat/completions`.
- `stream(messages, effort)`: one request with `stream: true`, returning the raw response for the host SSE parser.

A provider adapter must not retry a submission after an ambiguous network failure. The caller can retry a read-only stream connection only after it has established that the original request was not accepted.
