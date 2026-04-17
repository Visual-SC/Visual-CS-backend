---
description: "Use when implementing order creation, totals, pricing customizations, and sequential order number generation for kiosk orders."
applyTo: "src/{controllers,utils,models}/**/*.js"
---
# Order Logic Rules

- In `POST /api/orders`, compute totals server-side only. Never trust totals sent by the client.
- For each order item, store `quantity`, `unitPrice`, and `subtotal`; enforce `subtotal = quantity * unitPrice`.
- Enforce `order.total` as the sum of all item subtotals.
- Keep price calculation logic in `src/utils/priceCalculator.js` and order-number logic in `src/utils/orderNumberGenerator.js`.
- Order numbers must be unique, sequential, and suitable for kiosk display.
- If daily reset is implemented, ensure uniqueness across date boundaries and document the format clearly.
- Add rate limiting for kiosk traffic (`100 req/min` per kiosk/client source) as part of order flow hardening.
- Prefer deterministic and testable pure functions for price and number generation.
