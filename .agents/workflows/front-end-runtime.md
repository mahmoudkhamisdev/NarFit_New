---
description: Frontend Runtime Crash Prevention
---

- Protect the frontend from crashes when handling async or real-time data.
- Use optional chaining (`?.`) for nested data.
- Use safe fallback values (`||`) for `null` or `undefined`.
- Always handle loading, empty, and missing data states.
- Never call methods like `.map()` on possibly undefined values.