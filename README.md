# Medizaai (মেডিজাই)

> Mobile-first healthcare services platform for Rajshahi, Bangladesh.

Medizaai empowers citizens to discover specialist doctors, book hospital navigation guides, order medicines with rapid cash-on-delivery delivery, and request emergency ambulance services with manual dispatcher coordination.

---

## 🏗 Repository Architecture

This repository is organized as a modular monorepo managed with [Turborepo](https://turbo.build/) and [Bun](https://bun.sh/):

```text
medizaai/
├── apps/
│   ├── web/                 # Next.js 16 (React 19) customer-facing web portal
│   ├── admin/               # React 19 + Vite admin & dispatch operations panel
│   ├── api/                 # NestJS 11 modular monolith REST API (OpenAPI at /docs)
│   └── worker/              # PostgreSQL outbox background worker
├── packages/
│   ├── contracts/           # Shared types, status enums, and Zod schemas
│   ├── db/                  # Drizzle ORM PostgreSQL schema & migrations
│   ├── ui/                  # Shared React UI components
│   ├── eslint-config/       # Shared ESLint configuration
│   └── typescript-config/   # Shared TypeScript configurations
├── docs/                    # Complete architectural specifications and decision logs
│   ├── PROJECT_BRIEF.md
│   ├── REQUIREMENTS.md
│   ├── ARCHITECTURE.md
│   ├── DATA_MODEL.md
│   ├── API_CONTRACTS.md
│   ├── DECISIONS.md
│   ├── AI_WORK_LOG.md
│   └── project_init.md
├── docker-compose.yml       # Local PostgreSQL 16 container definition
└── .env.example             # Environment configuration template
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: `>= 24.x`
- **Bun**: `>= 1.2.x`
- **Docker**: For local PostgreSQL database

### 2. Setup Environment
Copy the environment template:
```sh
cp .env.example .env
```

Start the local PostgreSQL container:
```sh
docker compose up -d
```

### 3. Install Dependencies
```sh
bun install
```

### 4. Database Schema
Generate and push database schemas:
```sh
bun run db:generate
bun run db:push
```

### 5. Start Development
Run all applications concurrently:
```sh
bun run dev
```

- **Web Frontend (Customer)**: [http://localhost:3000](http://localhost:3000)
- **Admin Panel (Staff/Dispatch)**: [http://localhost:3001](http://localhost:3001)
- **API Backend**: [http://localhost:4000/api](http://localhost:4000/api)
- **API Swagger Docs**: [http://localhost:4000/docs](http://localhost:4000/docs)

---

## 🧪 Available Scripts

| Command | Action |
| :--- | :--- |
| `bun run dev` | Start all applications in watch mode |
| `bun run build` | Build all apps and packages |
| `bun run check-types` | Run type checking across all monorepo packages |
| `bun run lint` | Run ESLint across all workspaces |
| `bun run format` | Run Prettier format check and write |
| `bun run db:generate` | Generate Drizzle SQL migrations |
| `bun run db:migrate` | Apply Drizzle migrations |
| `bun run db:studio` | Launch Drizzle Studio database browser |

---

## 📖 Key Documentation
- [Project Brief](file:///docs/PROJECT_BRIEF.md) — Mission and operational model
- [Requirements](file:///docs/REQUIREMENTS.md) — Functional specs and unresolved decisions tracker
- [Architecture](file:///docs/ARCHITECTURE.md) — Modular monolith and concurrency invariants
- [Data Model](file:///docs/DATA_MODEL.md) — Database schema specifications and ER diagram
- [API Contracts](file:///docs/API_CONTRACTS.md) — REST API endpoints and payload schemas
- [Decisions](file:///docs/DECISIONS.md) — Architectural Decision Records (ADRs)
- [AI Work Log](file:///docs/AI_WORK_LOG.md) — Incremental milestone implementation log
