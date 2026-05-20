# Plan Técnico: Visual SC — Sistema de Pedidos en Kiosco

## TL;DR

Sistema de pedidos en kiosco para Rodson Coffee que permite a los clientes construir órdenes de forma autónoma, y recibir número de orden. El plan divide el desarrollo en **backend** (API REST con Node.js + Express + MongoDB) y **frontend** (React + TypeScript + TailwindCSS), con fases incrementales que permiten validación temprana.

---

## Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| **Backend** | Node.js 20 LTS + Express.js (MVC), MongoDB Atlas, Mongoose, Typescript |
| **Frontend** | React 18 + Vite, TypeScript strict, TailwindCSS, React Router, Zustand (carrito) |

---

## FASE 2: API Backend — Core

### Endpoints de Productos (B2-Products)

| # | Tarea | Endpoint | Descripción |
|---|-------|----------|-------------|
| B2.1 | Crear Lista de Productos | `GET /api/products` | Retorna catálogo completo con categorías |
| B2.2 | Listar productos | `GET /api/products` | Retorna catálogo completo con categorías |
| B2.3 | Producto por ID | `GET /api/products/:id` | Detalle de producto con personalizaciones disponibles |
| B2.4 | Productos por categoría | `GET /api/products/category/:slug` | Filtrar por las 7 categorías |
| B2.5 | Verificar disponibilidad | `GET /api/products/:id/availability` | Check de stock/disponibilidad |

**Modelo Product**:
```javascript
{
  id,
  nombre,
  categoria,
  precio,
  descripcion,
  notas_adicionales,
}
```

### Endpoints de Pedidos (B2-Orders)

| # | Tarea | Endpoint | Descripción |
|---|-------|----------|-------------|
| B2.5 | Crear pedido | `POST /api/orders` | Valida items, calcula total, asigna número |
| B2.6 | Obtener pedido | `GET /api/orders/:orderNumber` | Detalle de pedido por número |
| B2.7 | Pedidos activos | `GET /api/orders/active` | Lista para pantalla de tracking |
| B2.8 | Actualizar estado | `PATCH /api/orders/:orderNumber/status` | Cambiar estado (uso admin) |

**Modelo Order**:

```javascript
{
  _id, orderNumber, 
  items: [
    { 
      product,
      quantity,
      unitPrice,
      subtotal 
    }
    ],
  total, // sunma de los subtotales
  createdAt
}
```

### Lógica de Negocio (B2-Logic)

| # | Tarea | Descripción |
|---|-------|-------------|
| B2.11 | Calculadora de precios | Función que calcula precio final con personalizaciones |
| B2.12 | Generador de número de orden | Secuencial, con posible reinicio diario |
| B2.13 | Rate limiting | Implementar límites: 100 req/min por kiosco |

**Dependencias**: B1.3 → B2.1-B2.4 (productos), B1.3 → B2.5-B2.8 (pedidos). B2.11-B2.13 son funciones helper que se usan en B2.5.

---

## FASE 3: Frontend — Interfaz de Kiosco

### Páginas Principales (F3-Screens)

| # | Tarea | Ruta (React Router) | Descripción |
|---|-------|---------------------|-------------|
| F3.1 | Home de pedido | `/pages/Home` | Componente de página con aside de categorías + grilla de productos + aside de orden |

### Componentes de Negocio (F3-Components)

| # | Tarea | Componente | Descripción |
|---|-------|------------|-------------|
| F3.8 | ProductCard | `components/ProductCard` | Card de producto con imagen, nombre, precio |
| F3.9 | CartItem | `components/CartItem` | Línea de item en carrito |
| F3.10 | CategoriesAside | `components/CategoriesAside` | Aside con las categorías del menú para filtrar productos |
| F3.11 | ProductsByCategoryGrid | `components/ProductsByCategoryGrid` | Grilla de productos filtrada por categoría seleccionada, contiene la grilla de productos con `ProductCard`|
| F3.12 | OrderAside | `components/OrderAside` | Aside de orden dentro de Home con resumen de items, edición y total |
| F3.13 | OrderConfirmationFloating | `components/OrderConfirmationFloating` | Interfaz flotante de confirmación de orden dentro de Home (sin cambio de ruta) |

### Layouts (F3-Layouts)

| # | Tarea | Componente | Descripción |
|---|-------|------------|-------------|
| F3.19 | Header | `layouts/Header` | Logo, navegación y `CartFloating` integrado dentro del Header |
| F3.20 | Footer | `layouts/Footer` | Footer con Redes sociales (instagram), Whatsapp, horario, CTA al final y créditos |

### Estado y Hooks (F3-State)

| # | Tarea | Descripción |
|---|-------|-------------|
| F3.21 | useCart hook | Zustand store: items, add, remove, update, clear, total |
| F3.22 | useProducts hook | Fetch de productos con React Query (TanStack Query) |
| F3.23 | useOrder hook | Crear orden, obtener estado |

**Dependencias**: F3.1 depende de B2.1 y B2.3 para cargar catálogo y filtrar por categoría, e integra los componentes F3.12 (OrderAside) y F3.13 (OrderConfirmationFloating). F3.12 requiere F3.21. La página F3.3 se renderiza tras confirmar orden desde Home.

---

## FASE 4: Integración y Flujo Completo

### Integración API (I4)

| # | Tarea | Descripción |
|---|-------|-------------|
| I4.1 | Conectar catálogo | Frontend consume `GET /api/products` |
| I4.2 | Conectar personalizaciones | Cargar opciones dinámicas desde API |
| I4.3 | Crear pedido | Frontend envía carrito a `POST /api/orders` |
| I4.4 | Mostrar número de orden | Recibir y mostrar `orderNumber` de respuesta |

---

## Archivos Relevantes

### Backend (MVC)

```
src/
├── app.js                  # Entry point, configuración Express
├── config/
│   └── db.js               # Conexión a MongoDB
├── models/
│   ├── Product.js          # Schema de productos con Mongoose
│   ├── Order.js            # Schema de pedidos
├── controllers/
│   ├── productController.js    # Lógica de productos
│   ├── orderController.js      # Lógica de pedidos
├── routes/
│   ├── productRoutes.js    # Rutas de productos
│   ├── orderRoutes.js      # Rutas de pedidos
├── middlewares/
│   └── errorHandler.js     # Manejo centralizado de errores
└── utils/
    ├── priceCalculator.js  # Cálculo de precios con personalizaciones
    └── orderNumberGenerator.js  # Generador de número de orden
```

### Frontend (React + Vite)

```
src/
├── main.tsx                            # Entry point
├── App.tsx                             # Router principal que monta componentes de página
├── stores/
│   └── cartStore.ts                    # Zustand store del carrito
├── hooks/
│   ├── useProducts.ts                  # React Query para productos
│   ├── useOrder.ts                     # Crear y obtener órdenes
├── services/
│   └── api.ts                          # Cliente API con axios/fetch
├── layouts/
│   ├── Header.tsx
│   └── Footer.tsx
├── pages/
│   ├── Home.tsx
├── components/
│   ├── ProductCard.tsx
│   ├── CartItem.tsx
│   ├── CategoriesAside.tsx
│   ├── ProductsByCategoryGrid.tsx
│   ├── OrderAside.tsx
│   ├── OrderConfirmationFloating.tsx
│   ├── EspressoCustomizer.tsx
│   ├── FilteredCoffeeCustomizer.tsx
│   └── ProductDetail.tsx
│   └── OrderCreated.tsx
```

---

## Verificación

| # | Caso de Prueba | Resultado Esperado |
|---|----------------|---------------------|
| 1 | Navegar categorías desde el aside de Home | Ver actualización de la grilla con productos y precios correctos |
| 2 | Latte + leche vegetal + helado | $8,500 + $5,500 + $4,500 = **$18,500** |
| 3 | Chemex 2 tazas Natural | $18,000 + $3,000 = **$21,000** |
| 4 | Agregar 3 productos, modificar, eliminar uno | Total recalculado correctamente |
| 5 | Confirmar pedido desde Home | Mostrar interfaz flotante de confirmación sin salir de Home y número de orden persistido en BD |

---

## Decisiones de Scope

### Incluido en MVP

- Sistema de kiosco para pedidos en local
- 7 categorías de productos con personalizaciones
- Orden con calculo total de la orden
  - Generación de número de orden
- API REST para catálogo y pedidos

### Excluido (fases posteriores)

- Pasarela de pagos (pago en caja por ahora)
- Pantalla de tracking para clientes
- Asignación de ordenes por mesa
- Panel de administración completo
- Sistema de inventario/stock
- Notificaciones push
- Modo "para llevar"

---

# Análisis de Riesgos — Visual SC

> **Fuentes**: Repositorios `Visual-SC/Visual-CS-frontend` (43 commits, 1 contribuidor, 1 issue abierto) y `Visual-SC/Visual-CS-backend` (18 commits, 1 contribuidor, 0 issues).  
> **Fecha del análisis**: 20 de mayo de 2026.

---

## 1. Enumeración de Riesgos Estimados

### 1.1 Riesgos de Seguridad (Severidad Alta)

| ID | Riesgo | Descripción | Impacto | Probabilidad |
|----|--------|-------------|---------|-------------|
| **R01** | URLs hardcodeadas a localhost | `useEvent.ts:13` y `useOrder.ts:134` usan `http://localhost:3001` en vez de la variable de entorno `VITE_API_BASE_URL`. En producción las peticiones fallarán. | Alto | Certeza |
| **R02** | CORS sin restricciones | Ambos repositorios usan `cors()` sin dominio especificado, permitiendo solicitudes cross-origin desde cualquier fuente. | Alto | Alta |
| **R03** | Sin autenticación/autorización | Endpoints `POST /create-order`, `DELETE /delete-orders`, `POST /create-event`, `DELETE /delete-all-events` no tienen protección de identidad. | Crítico | Alta |
| **R04** | Endpoints masivos sin protección | `DELETE /delete-all-events` y `DELETE /delete-orders` permiten eliminación total sin confirmación ni autenticación. | Crítico | Media |
| **R05** | Sin rate limiting implementado | El `plan.md` del backend menciona rate limiting (B2.13) pero no está implementado en código. Un atacante puede saturar la API. | Alto | Alta |
| **R06** | Sin `SECURITY.md` | No existe política de divulgación de vulnerabilidades en ninguno de los repositorios. | Bajo | Certeza |
| **R07** | `.env` en repositorio | El backend tiene `.env` con `DATABASE_URL` en el repositorio. Si se añaden credenciales de producción, quedarán expuestas en el historial de git. | Alto | Baja |

### 1.2 Riesgos de Calidad de Código (Severidad Media-Alta)

| ID | Riesgo | Descripción | Impacto | Probabilidad |
|----|--------|-------------|---------|-------------|
| **R08** | Sin tests automatizados | Backend: `"test": "echo \"Error: no test specified\" && exit 1"`. Frontend: sin script de test. Cero cobertura. | Alto | Certeza |
| **R09** | Sin pipeline CI/CD | No existe `.github/workflows` en ningún repositorio. No hay verificación automatizada de build, lint o typecheck. | Alto | Certeza |
| **R10** | Middleware duplicado | `index.ts:19-21` (en `start()`) y `index.ts:36-38` (global) repiten `cors()`, `express.json()` y `express.urlencoded()`. | Bajo | Certeza |
| **R11** | Sin manejo de errores centralizado | El `plan.md` referencia `middlewares/errorHandler.js` que no existe en el código actual. Los errores de la BD solo se loguean (`console.error`). | Medio | Alta |

### 1.3 Riesgos de Arquitectura y Consistencia (Severidad Media)

| ID | Riesgo | Descripción | Impacto | Probabilidad |
|----|--------|-------------|---------|-------------|
| **R12** | APIs en estado de migración | El frontend (`api.ts`) usa un mecanismo de fallback que intenta múltiples URLs (ej: `/api/products` y `/api/get-products`), indicando que coexisten APIs legacy y nuevas sin completar la transición. | Medio | Certeza |
| **R13** | Discrepancia plan vs. implementación | El `plan.md` documenta React 18 + React Query (TanStack Query), pero `package.json` usa React 19.2.0 + Zustand sin React Query. | Medio | Alta |
| **R14** | Express 5.x en etapa temprana | Express `^5.2.1` es una versión reciente. La API de Express 5 difiere de Express 4 (ej: manejo de errores asíncronos, `req.body`). Dependencias como `@types/express` pueden estar desactualizadas. | Medio | Media |
| **R15** | Sin documentación de API | No hay Swagger/OpenAPI ni documentación de endpoints. El frontend y backend deben mantenerse sincronizados manualmente. | Medio | Alta |

### 1.4 Riesgos de Proyecto y Operaciones (Severidad Media)

| ID | Riesgo | Descripción | Impacto | Probabilidad |
|----|--------|-------------|---------|-------------|
| **R16** | Bus factor = 1 | Un solo contribuidor (`juan1988-tech`) en ambos repositorios. Si esta persona no está disponible, el desarrollo se detiene por completo. | Crítico | Media |
| **R17** | Requisitos no cerrados | Issue #1 _"Investigar requerimientos"_ sigue abierto desde el 16 de marzo de 2026 (2+ meses). El alcance del proyecto puede no estar completamente definido. | Alto | Media |
| **R18** | Sin versionado semántico | No hay releases, tags ni changelogs en ninguno de los repos. Imposible rastrear qué versión está desplegada en producción. | Medio | Certeza |
| **R19** | Sin estrategia de backup | MongoDB usa volumen persistente en Docker, pero no hay política documentada de respaldo/restauración de datos. | Alto | Media |
| **R20** | Sin monitoreo ni logs estructurados | Solo se usa `console.log`/`console.error`. No hay integración con herramientas de observabilidad (Winston, Pino, Datadog, Sentry). | Medio | Alta |

### 1.5 Riesgos de Dependencias (Severidad Baja-Media)

| ID | Riesgo | Descripción | Impacto | Probabilidad |
|----|--------|-------------|---------|-------------|
| **R21** | Versiones de TypeScript inconsistentes | Frontend usa TS `~5.9.3`, backend usa TS `^6.0.3`. Posibles incompatibilidades en tipos compartidos si se extraen a un paquete común. | Bajo | Baja |
| **R22** | Sin escaneo de vulnerabilidades | No hay Dependabot, Renovate ni Snyk configurados. Las dependencias no se auditan automáticamente. | Medio | Alta |
| **R23** | Dependencias bleeding-edge | React 19.2.0, Vite 7.2.4, Mongoose 9.5.0, TailwindCSS 4.1.18 son versiones muy recientes. El ecosistema de plugins puede no estar completamente adaptado. | Medio | Media |

---

## 2. Resumen de Plan de Mitigación de Riesgos

### 2.1 Seguridad (Fase inmediata — Semana 1-2)

| Riesgo | Acción de Mitigación | Responsable | Esfuerzo |
|--------|---------------------|-------------|----------|
| R01 | Reemplazar URLs hardcodeadas por `VITE_API_BASE_URL` en `useEvent.ts` y `useOrder.ts` | Dev | 30 min |
| R02 | Configurar CORS con lista blanca de orígenes permitidos en ambos repos | Dev | 1 h |
| R03 | Implementar middleware de autenticación (JWT o API Keys) para endpoints de escritura/eliminación | Dev | 1-2 d |
| R04 | Proteger `DELETE /delete-all-events` y `DELETE /delete-orders` tras autenticación; añadir confirmación en dos pasos | Dev | 2 h |
| R05 | Implementar `express-rate-limit` con 100 req/min por IP (ya planificado en B2.13) | Dev | 2 h |
| R06 | Crear archivo `SECURITY.md` con proceso de reporte de vulnerabilidades | Dev | 30 min |
| R07 | Mover `.env` a `.env.example`, añadir `.env` al `.gitignore` y rotar credenciales si se han expuesto | Dev | 30 min |

### 2.2 Calidad de Código (Fase corto plazo — Semana 2-4)

| Riesgo | Acción de Mitigación | Responsable | Esfuerzo |
|--------|---------------------|-------------|----------|
| R08 | Configurar Vitest + React Testing Library (frontend) y Jest/Mocha + Supertest (backend). Meta inicial: 60% de cobertura en endpoints críticos. | Dev | 3-5 d |
| R09 | Crear `.github/workflows/ci.yml` con jobs de lint, typecheck, build y test en cada push a `main` | Dev | 2-3 h |
| R10 | Eliminar middleware duplicado en `index.ts:36-38` | Dev | 5 min |
| R11 | Crear `middlewares/errorHandler.ts` con manejo centralizado de errores HTTP y de BD | Dev | 3 h |

### 2.3 Arquitectura (Fase medio plazo — Sprint 2)

| Riesgo | Acción de Mitigación | Responsable | Esfuerzo |
|--------|---------------------|-------------|----------|
| R12 | Consolidar APIs: eliminar endpoints legacy (`/get-products`, `/get-product`, `/get-event`) tras verificar que el frontend migró completamente | Dev | 1 d |
| R13 | Actualizar `plan.md` para reflejar el stack real (React 19 + Zustand). Si se reintroduce React Query, documentar la decisión. | Dev | 1 h |
| R14 | Revisar breaking changes de Express 5, verificar compatibilidad de middlewares y actualizar `@types/express` | Dev | 2 h |
| R15 | Integrar Swagger (`swagger-jsdoc` + `swagger-ui-express`) para documentar la API automáticamente | Dev | 1 d |

### 2.4 Proyecto y Operaciones (Fase medio plazo — Sprint 2-3)

| Riesgo | Acción de Mitigación | Responsable | Esfuerzo |
|--------|---------------------|-------------|----------|
| R16 | Documentar arquitectura, decisiones técnicas y guías de onboarding en `CONTRIBUTING.md`. Evaluar incorporar un segundo desarrollador al proyecto. | PM/Tech Lead | 2 d |
| R17 | Cerrar issue #1 con un documento de requerimientos definitivo. Priorizar funcionalidades con método MoSCoW. | PM | 4 h |
| R18 | Adoptar versionado semántico: primer release `v0.1.0-alpha`. Crear tags de git sincronizados con milestones. | Dev | 1 h |
| R19 | Configurar `mongodump` periódico con cron dentro del contenedor o script externo. Documentar procedimiento de restauración. | Dev | 2 h |
| R20 | Integrar Winston o Pino para logs estructurados. Configurar Sentry para captura de errores en frontend y backend. | Dev | 1 d |

### 2.5 Dependencias (Fase continua)

| Riesgo | Acción de Mitigación | Responsable | Esfuerzo |
|--------|---------------------|-------------|----------|
| R21 | Unificar versión de TypeScript en ambos repos o documentar la razón de la discrepancia | Dev | 30 min |
| R22 | Activar Dependabot en GitHub (`.github/dependabot.yml`) con actualizaciones semanales para npm | Dev | 30 min |
| R23 | Ejecutar `npm audit` semanalmente. Antes de actualizar dependencias mayores, revisar changelogs y breaking changes. | Dev | Continuo |

---

## 3. Plan de Contingencia

### 3.1 Contingencias de Seguridad

| Riesgo materializado | Respuesta |
|----------------------|-----------|
| **Ataque DoS por falta de rate limiting (R05)** | 1. Aplicar rate limiting de emergencia en el reverse proxy (Nginx) o balanceador de carga. 2. Bloquear IPs abusivas temporalmente. 3. Implementar `express-rate-limit` con hotfix inmediato. |
| **Eliminación masiva de datos por endpoint desprotegido (R04)** | 1. Restaurar base de datos desde el último backup de MongoDB. 2. Deshabilitar temporalmente los endpoints DELETE hasta implementar autenticación. 3. Auditar logs para determinar alcance del incidente. |
| **Fuga de credenciales por .env expuesto (R07)** | 1. Rotar inmediatamente todas las credenciales expuestas. 2. Usar `git filter-repo` o `BFG Repo-Cleaner` para eliminar el archivo del historial. 3. Verificar que `.gitignore` incluya `.env`. |
| **Peticiones cross-origin maliciosas (R02)** | 1. Restringir CORS al dominio del kiosco como hotfix inmediato. 2. Revisar logs de acceso para detectar actividad sospechosa previa. |

### 3.2 Contingencias Técnicas

| Riesgo materializado | Respuesta |
|----------------------|-----------|
| **Fallo en producción por URLs hardcodeadas (R01)** | 1. Hotfix: modificar las líneas `useEvent.ts:13` y `useOrder.ts:134` para usar `import.meta.env.VITE_API_BASE_URL`. 2. Build y deploy de emergencia. |
| **Regresión por falta de tests (R08)** | 1. Ejecutar manualmente los casos de prueba documentados en `plan.md` (sección Verificación). 2. No hacer deploy sin pasar los 5 casos de prueba manuales. 3. Priorizar tests de humo (smoke tests) para el flujo crítico: cargar catálogo → crear orden → confirmar. |
| **Incompatibilidad Express 5 (R14)** | 1. Revisar changelog de Express 5 para identificar breaking changes. 2. Si un middleware no es compatible, hacer downgrade temporal a Express 4.18.x. 3. Probar localmente antes de cualquier bump de versión. |
| **API inconsistente entre frontend y backend (R12)** | 1. El mecanismo de fallback del frontend (`requestFirstOk`) mitiga parcialmente este riesgo al probar múltiples URLs. 2. Como plan definitivo, hacer que el backend exponga solo una versión de cada endpoint y eliminar las rutas legacy. |
| **Caída de MongoDB (R19)** | 1. Verificar estado del volumen Docker (`docker compose down` no elimina datos, solo `-v`). 2. Si el volumen está corrupto, restaurar desde backup. 3. Configurar replica set de MongoDB para alta disponibilidad (fase futura). |

### 3.3 Contingencias de Proyecto

| Riesgo materializado | Respuesta |
|----------------------|-----------|
| **Desarrollador único no disponible (R16)** | 1. Documentación completa del código en `plan.md` y `README.md` sirve como knowledge base. 2. Stack estándar del ecosistema JavaScript (React + Express + MongoDB) facilita encontrar reemplazo. 3. Considerar contratar un freelance para features críticas si la indisponibilidad es prolongada. |
| **Alcance indefinido (R17)** | 1. Cerrar issue #1 inmediatamente con un alcance mínimo viable (ya documentado en Decisiones de Scope). 2. Nuevas funcionalidades entran como issues separados post-MVP. |

### 3.4 Contingencias de Dependencias

| Riesgo materializado | Respuesta |
|----------------------|-----------|
| **Vulnerabilidad crítica en dependencia (R22)** | 1. Ejecutar `npm audit fix`. 2. Si no hay fix disponible, buscar alternativa o aplicar workaround manual. 3. Notificar al equipo y evaluar impacto real (¿la vulnerabilidad es explotable en nuestro contexto de kiosco local?). |
| **Breaking change en dependencia mayor (R23)** | 1. Congelar versión de la dependencia problemática con `overrides` en `package.json`. 2. Planificar migración en sprint separado. 3. Evaluar alternativas si la dependencia queda sin mantenimiento. |

---

## Resumen Ejecutivo

El proyecto Visual SC presenta **23 riesgos identificados**, de los cuales **4 son de severidad crítica** (R03, R04, R16, y exposición de datos), **8 de severidad alta** (R01, R02, R05, R08, R09, R11, R17, R19), y **11 de severidad media o baja**.

**Los 3 riesgos más urgentes a mitigar** antes de cualquier despliegue a producción son:

1. **R01 — URLs hardcodeadas a localhost**: Impide que la aplicación funcione fuera del entorno local. Solución: 30 minutos.
2. **R03/R04 — Endpoints sin autenticación**: Cualquier persona con acceso de red puede crear/eliminar órdenes y eventos. Solución: 1-2 días.
3. **R05 — Sin rate limiting**: Un bucle accidental en el frontend podría saturar el backend. Solución: 2 horas.

La matriz de riesgo completa se resume en el siguiente gráfico de prioridades:

```
Impacto
  ^
C  |  R16           R03,R04
r  |
í  |  R05  R08,R09  R01,R02
t  |  R17,R19        R11
i  |
c  |  R12,R13  R14,R20  R22,R23
o  |  R18     R15,R21  R06,R07,R10
  +--------------------------------> Probabilidad
```

**Nota**: Este análisis se basa en inspección de código estático y revisión de la configuración de los repositorios públicos en GitHub al 20 de mayo de 2026. Se recomienda complementar con pruebas dinámicas (penetration testing básico) antes del lanzamiento.

