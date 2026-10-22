# Medizaai — Architecture Decision Records (ADRs)

## ADR-001: Monorepo with Turborepo and Bun
- **Status:** Accepted
- **Context:** Medizaai consists of a Next.js frontend, a NestJS backend, background processing workers, and shared schemas/contracts. Managing independent repositories adds synchronization overhead.
- **Decision:** Use a Turborepo monorepo managed with Bun for ultra-fast local dependency resolution and caching across `apps/*` and `packages/*`.
- **Consequences:** Single source of truth, shared TypeScript types and lint configurations, unified build and check pipelines.

## ADR-002: Modular Monolith Architecture for Backend
- **Status:** Accepted
- **Context:** A microservices architecture introduces excessive operational complexity, latency, and failure modes for a single-team early-stage launch in Rajshahi.
- **Decision:** Build a single NestJS backend structured into domain modules (`ambulance`, `pharmacy`, `doctors`, `guides`, etc.) sharing a common database.
- **Consequences:** Simplified deployment (single container), strong transactional consistency, straightforward refactoring.

## ADR-003: PostgreSQL 16 with Drizzle ORM
- **Status:** Accepted
- **Context:** Medical appointments, pharmacy orders, and emergency ambulance dispatch demand relational integrity, foreign key constraints, atomic transactions, and JSONB audit trails.
- **Decision:** PostgreSQL 16 with Drizzle ORM.
- **Consequences:** Maximum type safety across TypeScript without runtime generation lag, zero magic migrations, fine-grained transaction control.

## ADR-004: Manual Dispatcher Queue without Real-Time Maps/GPS
- **Status:** Accepted
- **Context:** Live GPS tracking and automated nearest-ambulance algorithms require heavy mobile telemetry apps and driver hardware integration that are out of initial launch scope.
- **Decision:** Use text landmark/address capture and a prioritized manual dispatcher queue where human dispatchers match incoming calls to available ambulances.
- **Consequences:** Dramatic reduction in risk and time-to-market while keeping data structures extensible for coordinates in future milestones.

## ADR-005: PostgreSQL-Backed Outbox for Asynchronous Work
- **Status:** Accepted
- **Context:** Reliable notifications and retry mechanisms are required without introducing Redis as a mandatory single point of failure.
- **Decision:** Implement a transactional Outbox pattern using `notification_outbox` and `notification_attempts` tables processed by `apps/worker`.
- **Consequences:** Atomic notification scheduling within API transactions, transparent failure auditing, zero extra infrastructure to manage initially.

## ADR-006: Server-Side Authoritative Pricing and Snapshots for Pharmacy
- **Status:** Accepted
- **Context:** Clients could tamper with cart totals; catalog prices fluctuate over time.
- **Decision:** The server calculates all order totals and minimum-order thresholds based on database prices. Order items store price snapshots frozen at checkout.
- **Consequences:** Immune to client manipulation and historical order auditing remains permanently accurate.
