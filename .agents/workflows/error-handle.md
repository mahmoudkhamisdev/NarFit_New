---
description: Graceful Error Handling & Security
---

- Every backend function or Server Action must use `try/catch` blocks.
- Log detailed technical errors on the server using `console.error()`.
- Return only clean, user-friendly errors to the frontend.
- Never expose database details, raw errors, or sensitive system information.
