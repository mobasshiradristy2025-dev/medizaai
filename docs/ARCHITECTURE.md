# Medizaai — System Architecture

## 1. Monorepo Structure
The repository uses **Turborepo** with **Bun** package manager:

```text
medizaai/
├── apps/
│   ├── web/                     # Next.js 16 (React 19) frontend (customer & staff portals)
│   ├── api/                     # NestJS 11 modular monolith REST API
│   └── worker/                  # Background worker processing outbox events & retries
├── packages/
│   ├── contracts/               # Shared TypeScript types, status enums, and Zod schemas
│   ├── db/                      # Drizzle ORM schemas, database client, and migrations
│   ├── ui/                      # Shared UI component library
│   ├── eslint-config/           # Monorepo ESLint configurations
│   └── typescript-config/       # Shared tsconfig definitions
├── docs/                        # Architectural documentation and playbooks
├── docker-compose.yml           # Local PostgreSQL 16 container definition
├── .env.example                 # Environment configuration template
└── README.md                    # Project onboarding and operation instructions
```

---

## 2. Backend Modular Monolith (NestJS)
The backend in `apps/api` is structured into domain modules adhering to the single responsibility principle:

```text
apps/api/src/
├── access-control/             # RolesGuard, @Roles decorator, and permission evaluation
├── ambulance/                  # Emergency intake, dispatcher queues, and vehicle assignment
├── appointments/               # Doctor appointment booking workflows
├── audit/                      # Tamper-evident operational audit logging
├── auth/                       # Staff authentication, password hashing, and token issuance
├── cities/                     # Multi-city tenancy management (Rajshahi initial)
├── common/                     # Global database connection provider, filters, and interceptors
├── dispatch-teams/             # City-scoped dispatch teams and memberships
├── doctors/                    # Doctor profiles, fees, and specialty catalogs
├── guide-bookings/             # Patient hospital navigation bookings
├── guides/                     # Guide staff profiles and tiered service packages
├── hospitals/                  # Hospital and diagnostic center directory
├── notifications/              # Asynchronous notification outbox integration
├── orders/                     # Pharmacy cart calculation, totals, and COD orders
├── organizations/              # Partner organizations and fleet providers
├── pharmacy/                   # Authoritative medicine catalog and inventory
├── settings/                   # Dynamic business parameters (delivery fee, min order value)
├── users/                      # User profiles and role assignments
├── app.module.ts               # Root module assembling all domain modules
└── main.ts                     # NestJS bootstrap, CORS, global prefix (/api), Swagger (/docs)
```

---

## 3. Concurrency & Data Integrity Invariants

### 3.1 Ambulance Dispatch Concurrency Rules
1. **Vehicle Assignment Protection:** A vehicle can never hold more than one active assignment simultaneously (`OFFERED` or `ACCEPTED`).
2. **Transaction Isolation:** Vehicle assignment transitions are executed in database transactions checking vehicle availability state.
3. **Audit Immutability:** When an ambulance request is reassigned or cancelled, previous assignment history is preserved in `ambulance_assignments` and `dispatch_events`.
4. **Idempotent Requests:** Request submission supports `idempotency_key` preventing network duplicate submissions.

### 3.2 Pharmacy Financial Integrity
1. **Authoritative Server Pricing:** Medicine unit prices are fetched from the database at order creation time; client-submitted totals are disregarded.
2. **Price Snapshot:** Line items store `unitPriceSnapshot` and `lineTotal` as exact integers (BDT), isolating historical orders from future price modifications.
3. **Atomic Execution:** Order headers and line items are committed in a single atomic database transaction.

---

## 4. Background Outbox Pattern
Instead of introducing Redis or complex message brokers at initial launch, background jobs (SMS notifications, status timeouts, dispatcher alerts) use a **PostgreSQL-backed outbox table** (`notification_outbox`):
- API endpoints insert notification jobs atomically within the business transaction.
- `apps/worker` polls for pending notifications with scheduled timestamps and handles delivery and retry tracking.
