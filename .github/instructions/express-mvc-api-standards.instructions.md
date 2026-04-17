---
description: "Use when adding or modifying Express routes, controllers, models, and middleware in the Visual SC backend API. Covers REST and MVC conventions."
applyTo: "src/**/*.js"
---
# Express MVC API Standards

- Keep controllers thin: validate input, orchestrate service/util calls, return HTTP response.
- Place shared business logic in `src/utils` (or services if introduced), not duplicated across controllers.
- Keep Mongoose schemas in `src/models` and avoid embedding request-handling logic in models.
- Follow REST naming from plan:
  - `GET /api/products`
  - `GET /api/products/:id`
  - `GET /api/products/category/:slug`
  - `GET /api/products/:id/availability`
  - `POST /api/orders`
  - `GET /api/orders/:orderNumber`
  - `GET /api/orders/active`
  - `PATCH /api/orders/:orderNumber/status`
- Use centralized error handling through `src/middlewares/errorHandler.js`; avoid ad-hoc try/catch response shapes.
- Return consistent JSON envelopes for success and failure in all endpoints.
- Validate request params/body before DB calls and return explicit 4xx errors for invalid data.
