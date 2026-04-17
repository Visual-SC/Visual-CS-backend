---
description: "Use when working on Visual SC backend features for kiosk ordering, including products, orders, and business rules in Node.js + Express + MongoDB."
applyTo: "src/**/*.js"
---
# Visual SC Backend Context

- Build backend features for a coffee kiosk ordering system at Rodson Coffee.
- Keep API and code comments in English, but preserve domain terms from the contract when needed (for example: `nombre`, `categoria`, `notas_adicionales`).
- Respect planned modules and file layout: `src/models`, `src/controllers`, `src/routes`, `src/middlewares`, `src/utils`.
- Use incremental delivery: prioritize product endpoints (`GET /api/products*`), then order endpoints (`/api/orders*`), then helper logic.
- Keep implementation aligned with the MVP scope: no payments, no inventory system, no push notifications unless explicitly requested.
