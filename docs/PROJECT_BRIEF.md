# Medizaai — Project Brief

## 1. Executive Summary
**Medizaai** (formerly MediGuide) is a mobile-first healthcare services platform engineered for the Bangladeshi market, launching initially in **Rajshahi**.

The platform bridges the gap between citizens needing essential healthcare services and local healthcare providers, offering an integrated suite of services covering:
1. **Specialist Doctor Discovery & Appointment Booking**
2. **Hospital Guide Packages & Bookings** (Normal, Extra, Premium navigation assistance)
3. **Hospital & Diagnostic Center Directory**
4. **Online Pharmacy Delivery** (Rapid local delivery, Cash on Delivery)
5. **Emergency Ambulance Intake & Dispatch** (24/7 manual dispatch queue)
6. **Protected Staff Administration & Operations Portals**

---

## 2. Market Context & Operational Model
- **Primary Market:** Rajshahi city, Bangladesh.
- **Language Priority:** Bangla-first user experience, with English accessibility.
- **Access Model:** Frictionless customer booking — customers can submit requests without being forced to create an account first.
- **Staff Control:** Role-based access control (RBAC) ensuring strict scoping by city, dispatch team, and provider organization.

---

## 3. Technology Stack Summary
| Component | Selection | Purpose |
| :--- | :--- | :--- |
| **Monorepo Engine** | Turborepo + Bun | High-performance build caching & package management |
| **Frontend** | Next.js (App Router) + TypeScript | Mobile-first responsive web apps for customers & staff |
| **Backend API** | NestJS + TypeScript | Modular monolith REST API with OpenAPI/Swagger |
| **Database** | PostgreSQL 16 | Relational data integrity, ACID transactions, outbox |
| **ORM & Migrations** | Drizzle ORM | Type-safe queries, schema declarations, and migrations |
| **Background Tasks** | PostgreSQL Outbox Worker | Reliable notifications and retry pipelines without Redis overhead |
| **Deployment** | Docker + Coolify + Cloudflare | Containerized hosting with edge security and CDN caching |

---

## 4. Key Strategic Principles
1. **Vertical Slices:** Features are delivered as complete vertical slices (Schema → Logic → API → UI → Verification).
2. **Authoritative Server:** The client browser is never trusted for pricing, availability, or dispatch state transitions.
3. **Operational Safety:** Ambulance requests and status updates must never fail silently or allow race-condition double bookings.
