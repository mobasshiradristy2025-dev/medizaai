# Medizaai — AI Agent Development Playbook

**Document type:** Project brief + technical implementation guide + AI coding instructions  
**Project:** Medizaai healthcare services platform  
**Market:** Rajshahi, Bangladesh initially  
**Development approach:** AI-assisted development with human review  
**Recommended stack:** Next.js + NestJS + PostgreSQL + Drizzle ORM  
**Architecture:** Modular monolith  
**Deployment:** Docker + Coolify + Cloudflare  
**Status:** Working specification; client confirmation required for unresolved business rules

---

## 1. Mission and Development Strategy

Build Medizaai, a mobile-first healthcare services platform that allows customers to discover healthcare services, submit bookings and orders, and request emergency ambulance services. Staff must be able to manage the operational workflows through protected administrative interfaces.

The developer has limited time and will use AI coding agents for implementation, testing, debugging, and documentation. The objective is to maximize development speed **without sacrificing correctness, maintainability, security, or essential features**.

### Core principles

1. Use AI agents to implement small, verifiable tasks rather than generating the entire application in one request.
2. Keep one repository and one modular backend unless there is a demonstrated reason to split services.
3. Preserve every agreed business requirement. Simplify implementation and infrastructure, not the required functionality.
4. Let AI inspect the existing repository before making architectural decisions or replacing code.
5. Require database migrations, validation, authorization, error handling, and tests for relevant changes.
6. Review business logic, database operations, security-sensitive changes, and emergency workflows manually.
7. Never treat AI-generated code as production-ready merely because it compiles or looks correct.
8. Maintain a current project specification, task checklist, and architectural decision log.

## 2. Project Requirements

The original client document described the following services. The client subsequently added ambulance emergency services and changed the startup name from MediGuide to **Medizaai**.

### 2.1 Doctor discovery and appointments

- Display a directory of doctors.
- Display doctor information, including name, specialty, qualifications, experience, photo, and appointment/video consultation fee where applicable.
- Allow customers to submit appointment requests.
- Collect the customer's name, Bangladeshi mobile number, preferred date and time, and relevant notes.
- Allow authorized staff to review and manage bookings.
- Support the agreed video consultation workflow.

**Clarify before implementation:** Whether customers select an appointment slot from real availability or submit a preferred time for staff confirmation. A video-call provider, payment flow, and provider scheduling process have not been fully specified.

### 2.2 Hospital guide booking

- Display hospital guides and their service areas.
- Support Normal, Extra, and Premium packages, or the final package categories approved by the client.
- Display package descriptions and prices.
- Allow customers to request a guide booking.
- Allow staff to manage guide availability, assignments, and booking statuses.

### 2.3 Online pharmacy

The original document specifies these business rules:

- Initial delivery coverage: Rajshahi city only.
- Fixed delivery fee: ৳30.
- Minimum medicine subtotal: ৳100.
- Payment: Cash on delivery.
- Advertised delivery estimate: 20–40 minutes.
- Delivery is performed by the business's own delivery personnel.
- Delivery fee and minimum order value must be configurable in the admin panel, not hard-coded throughout the application.

Required workflows:

- Medicine catalog, details, prices, and availability.
- Cart quantity controls.
- Remove items when quantity becomes zero.
- Validate the minimum subtotal before allowing order submission.
- Collect customer name, phone number, and delivery address.
- Calculate subtotal, delivery fee, and total on the server.
- Create an order with its line items and price snapshots.
- Allow staff to manage order status.
- Show clear order confirmation and error states.

**Important:** The advertised 20–40-minute estimate must not be presented as a guaranteed delivery SLA unless the client confirms it. Prescription handling, restricted medicines, stock reservation, and applicable licensing rules require confirmation before enabling the corresponding workflows.

### 2.4 Hospital and diagnostic-center directory

- List hospitals and diagnostic centers.
- Display names, categories, addresses, service areas, and contact information.
- Allow authorized staff to manage directory entries.
- Provide a simple, accessible browsing experience.

### 2.5 Emergency ambulance service — subsequently added

This is a distinct operational workflow, not just another booking form.

#### Customer-facing workflow

- Allow a customer or caller to submit an ambulance request without requiring a customer account.
- Capture the caller's name and phone number.
- Capture pickup address or landmark and destination details, as applicable.
- Capture the request category, urgency, and relevant notes according to client-approved rules.
- Generate a request reference and confirmation.
- Communicate the request status when the relevant notification channel is available.

#### Dispatcher workflow

- Display incoming requests in a dispatcher queue.
- Let authorized dispatchers acknowledge and review requests.
- Let dispatchers manually select and assign an eligible ambulance.
- Support both Medizaai-owned and partner-operated ambulances.
- Record assignment decisions and status transitions.
- Handle partner acceptance, rejection, or timeout where applicable.
- Support reassignment, escalation, cancellation, and trip completion under approved rules.
- Keep an auditable history of operational actions.

#### Fleet and team management

- Manage ambulance vehicles, registration numbers, vehicle types, operational status, and ownership/provider organization.
- Manage partner organizations and their contact details.
- Manage dispatch teams and their city assignments.
- Associate vehicles and partners with their permitted operating areas.
- Restrict each dispatcher to authorized cities and teams.
- Allow central administrators to oversee multiple cities where authorized.

#### Explicit exclusions for the initial implementation

- No maps.
- No GPS or live vehicle tracking.
- No automatic nearest-ambulance selection.
- No automated route optimization.
- No requirement for a separate mobile application.

Pickup and destination can be represented as text addresses and landmarks. The data model should not prevent adding coordinates later, but do not implement geospatial infrastructure without an approved requirement.

**Operational safety:** The software must not imply that submitting a request guarantees an ambulance is available or dispatched. The interface must communicate the actual status. The client must define what happens if no ambulance is available or the system is unavailable.

### 2.6 Administration

Provide protected staff interfaces for the agreed functions:

- Dashboard and operational summaries.
- Doctors and appointment management.
- Guides, packages, and guide booking management.
- Medicine catalog, prices, inventory, and pharmacy orders.
- Hospital and diagnostic-center management.
- Ambulance requests, fleet, partners, assignments, and trips.
- City and dispatch-team configuration.
- Delivery and business settings.
- User access and role management.
- Notifications and delivery-attempt logs.
- Reports and data exports.
- Audit history.

The precise dashboard metrics and export formats should be confirmed with the client.

### 2.7 Customer experience

- Mobile-first responsive layout.
- Bangla-first interface, with English support if agreed.
- Clear labels, large touch targets, readable typography, and simple forms.
- Customers should not be forced to create an account unless the client changes that requirement.
- Preserve understandable loading, empty, success, and error states.
- Provide a clear contact or assistance route for customers who cannot complete a workflow.

### 2.8 Future scope and legal dependencies

The original document discusses later-phase possibilities, including online payments, customer accounts and history, provider logins, prescription uploads, internal video calls, reviews, ratings, delivery tracking, and expansion to additional cities.

Keep these distinguishable from the launch scope. Do not build all future functionality before the launch-critical workflows work.

The original document also flags legal questions about online medicine sales and telemedicine in Bangladesh. The client must verify applicable licensing, privacy, clinical, and operational requirements with qualified local professionals. AI-generated code and this specification do not establish legal compliance.

---

## 3. Recommended Technical Architecture

### 3.1 Stack

| Layer              | Choice                                                             | Reason                                                    |
| ------------------ | ------------------------------------------------------------------ | --------------------------------------------------------- |
| Frontend           | Next.js + TypeScript                                               | Customer website and staff interfaces                     |
| Backend            | NestJS + TypeScript                                                | Modular business logic, validation, APIs, authorization   |
| Database           | PostgreSQL                                                         | Relational business data and transactions                 |
| ORM                | Drizzle ORM                                                        | Typed schema, queries, and migrations                     |
| Validation         | Shared TypeScript types where useful; explicit server-side schemas | Consistent request validation                             |
| API contract       | REST + OpenAPI                                                     | Clear frontend/backend boundary                           |
| Background work    | PostgreSQL-backed outbox/worker initially                          | Notifications and retryable tasks without mandatory Redis |
| Real-time updates  | Polling initially; SSE/WebSockets if justified                     | Keep initial dispatch simple                              |
| Deployment         | Docker + Coolify                                                   | Reuse existing deployment experience                      |
| Edge/network layer | Cloudflare                                                         | DNS, proxy/CDN, and appropriate protection                |
| Monitoring         | Structured logs, error tracking, uptime alerts                     | Detect failures and support debugging                     |

Use a currently supported, mutually compatible set of dependency versions. Do not let an AI agent invent versions or upgrade the entire stack without checking the existing repository and official documentation.

### 3.2 Application structure

Prefer a monorepo, for example:

```text
medizaai/
├── apps/
│   ├── web/                 # Next.js frontend
│   ├── api/                 # NestJS backend
│   └── worker/              # Background processing
├── packages/
│   ├── contracts/           # Shared API contracts, if useful
│   ├── config/              # Shared lint/type configuration
│   └── ui/                  # Shared UI components, if useful
├── docs/
│   ├── PROJECT_BRIEF.md
│   ├── REQUIREMENTS.md
│   ├── ARCHITECTURE.md
│   ├── DATA_MODEL.md
│   ├── API_CONTRACTS.md
│   ├── DECISIONS.md
│   └── AI_WORK_LOG.md
├── docker-compose.yml
├── README.md
└── ...
```

This is a target structure, not a mandate to reorganize an existing repository. If a working codebase already exists, ask the agent to inspect it and adapt incrementally.

### 3.3 NestJS business modules

Organize the backend by business domain:

```text
src/
├── auth/
├── users/
├── access-control/
├── cities/
├── organizations/
├── doctors/
├── appointments/
├── guides/
├── guide-bookings/
├── hospitals/
├── pharmacy/
├── orders/
├── ambulance/
├── dispatch-teams/
├── notifications/
├── audit/
├── settings/
└── common/
```

Use the actual module boundaries that fit the approved scope. Avoid creating a module for every database table or introducing an abstract framework for simple CRUD operations.

### 3.4 Deployment

Initially, deploy the frontend, API, worker, and PostgreSQL using a simple, documented topology appropriate for the current VPS.

- Keep PostgreSQL off the public internet.
- Store secrets in deployment environment variables or an appropriate secret manager.
- Configure HTTPS and secure cookies appropriately.
- Set up database backups and test restoration.
- Configure health checks, structured logs, and alerts.
- Document an operational fallback for ambulance dispatch.

A single VPS is a cost-effective starting point but remains a single point of failure. Do not claim high availability without redundant infrastructure and tested failover.

---

## 4. Data Model and Domain Rules

Ask the AI agent to inspect the current schema before creating or changing tables. The following is a conceptual starting point, not a complete migration script.

### 4.1 Core tables

- `users`
- `roles` and/or `user_roles`
- `cities`
- `organizations`
- `organization_memberships`
- `dispatch_teams`
- `team_memberships`
- `doctors`
- `appointments`
- `guides`
- `guide_packages`
- `guide_bookings`
- `hospitals`
- `medicines`
- `orders`
- `order_items`
- `ambulance_vehicles`
- `ambulance_crews` (only if crew management is in scope)
- `vehicle_crew_assignments` (only if required)
- `ambulance_requests`
- `ambulance_assignments`
- `ambulance_trips`
- `dispatch_events`
- `notification_outbox`
- `notification_attempts`
- `settings`
- `audit_logs`

Add other tables only when they support an approved workflow.

### 4.2 Essential database rules

- Use foreign keys, unique constraints, indexes, and explicit status values.
- Use transactions for operations that must succeed or fail together.
- Preserve order-item prices at purchase time; do not recalculate historical orders from current catalog prices.
- Store money using an appropriate exact numeric representation or integer minor units, not floating-point arithmetic.
- Store timestamps consistently, preferably as timezone-aware timestamps in UTC.
- Keep business settings configurable.
- Prevent unauthorized cross-city and cross-organization access.
- Record important status transitions and administrative actions.
- Avoid deleting records that must remain in an operational or financial audit trail.

### 4.3 Ambulance concurrency rules

The server—not just the UI—must enforce:

- A vehicle cannot receive conflicting active assignments.
- A request cannot accidentally receive multiple active primary assignments unless the client explicitly supports multi-vehicle dispatch.
- Assignment must verify vehicle eligibility, operating status, team scope, and partner eligibility.
- Assignment creation and availability changes must be protected against concurrent requests, using appropriate database transactions, locks, or conditional updates.
- Reassignment must preserve the previous assignment history.
- A notification failure must not silently undo a valid assignment or leave the request in an ambiguous state.
- A request submission retry must not create duplicate requests when an idempotency key is used.

Use database constraints where possible and transactional server logic where necessary. A button disabled in the frontend is not a concurrency-control mechanism.

### 4.4 Pharmacy consistency rules

- The server must load authoritative medicine prices and calculate totals.
- The client must never be trusted to determine final prices or delivery fees.
- Validate medicine availability and permitted quantities.
- Apply the approved minimum order and delivery fee rules.
- Create the order and line items atomically.
- Use a consistent stock-reservation or stock-decrement policy approved by the client.
- Validate phone number and required address fields on the server.

### 4.5 Customer authentication and staff authorization

Customer booking without an account does not mean the admin API can be public.

Implement authentication and server-side authorization for staff actions. Define roles and scopes deliberately, such as:

- Platform administrator.
- City administrator.
- Dispatcher.
- Fleet manager.
- Partner coordinator.
- Driver or crew member, if a staff portal is required.
- Doctor or provider, if provider access is included.
- Pharmacy or order operator.

Use the least privilege needed for each role. A partner user must not see another partner's private data unless explicitly authorized.

---

## 5. Development Plan: Work in Small, Testable Milestones

The exact order depends on the existing codebase and the client's deadline. Start with repository discovery before committing to a detailed schedule.

### Milestone 0 — Repository audit and scope confirmation

**Deliverables**

- Repository map and stack inventory.
- List of existing pages, APIs, schemas, migrations, and integrations.
- Requirement checklist mapped to implementation status.
- Known defects, risks, and missing decisions.
- Proposed architecture adapted to existing code.
- Initial acceptance-test checklist.

**Completion criteria**

The agent has identified what can be reused, what is incomplete, and what must be built. No destructive rewrite has occurred.

### Milestone 1 — Project foundation

**Deliverables**

- Working local development environment.
- Environment-variable template without secrets.
- Database connection and migrations.
- Basic authentication and access-control foundation.
- Shared error handling and validation conventions.
- Linting, type checking, test commands, and health checks.
- Deployment and backup documentation.

**Completion criteria**

A clean setup works from documented instructions; migrations apply correctly; secrets are not committed.

### Milestone 2 — Shared application shell and administration

**Deliverables**

- Responsive layout and navigation.
- Staff login.
- Protected admin routes and APIs.
- Role/scope enforcement.
- Reusable forms, tables, pagination, loading states, and error states.
- Audit foundation.

**Completion criteria**

Unauthenticated users cannot perform staff operations, and unauthorized roles cannot access protected data or actions.

### Milestone 3 — Core healthcare modules

Implement the agreed doctor, appointment, guide, hospital, and pharmacy workflows.

For each module, complete the full vertical slice:

1. Database schema and migration.
2. Server validation and business logic.
3. API endpoints and authorization.
4. Frontend form/list/detail/status interface.
5. Loading, empty, error, and success states.
6. Automated tests.
7. Manual verification and documentation.

**Completion criteria**

The workflows work end-to-end using persistent database records, not mock data or frontend-only state.

### Milestone 4 — Ambulance dispatch

**Deliverables**

- Ambulance request intake.
- Dispatcher queue.
- City/team scope rules.
- Fleet and partner management.
- Manual assignment workflow.
- Assignment acceptance/rejection/timeout rules, as approved.
- Trip lifecycle and status history.
- Notifications and retry handling.
- Reassignment and escalation.
- Audit trail and operational fallback documentation.

**Completion criteria**

A request can move from submission to closure through approved states, including failure and reassignment paths. Concurrent assignments, duplicate requests, and permission boundaries are tested.

### Milestone 5 — Reliability and security hardening

**Deliverables**

- Notification retry and failure visibility.
- Duplicate-submission protection.
- Database backup and restore test.
- Logging and monitoring.
- Rate limiting and abuse prevention.
- Authorization and validation tests.
- Error handling for external-service failures.
- Deployment rollback procedure.

**Completion criteria**

The system fails predictably, operational staff can identify failed work, and recovery procedures have been exercised.

### Milestone 6 — Release readiness

**Deliverables**

- Client acceptance checklist.
- Production environment configuration.
- Admin account setup procedure.
- Seed/demo data separated from production data.
- User and staff documentation.
- Known limitations list.
- Go-live checklist and rollback plan.

**Completion criteria**

Every launch-critical requirement is tested or explicitly signed off as deferred. No known critical security or data-integrity defect remains.

---

## 6. How to Work With an AI Coding Agent

### 6.1 Start each session with repository context

Ask the agent to read:

- `README.md`
- `docs/PROJECT_BRIEF.md`
- `docs/REQUIREMENTS.md`
- `docs/ARCHITECTURE.md`
- Relevant module files and migrations.
- The last entry in `docs/AI_WORK_LOG.md`.

If the documentation is missing or stale, have the agent propose an update. Do not ask it to blindly implement a feature before it understands the current code.

### 6.2 Use the plan → implement → verify → review loop

For each task:

1. **Plan:** Identify files, dependencies, data changes, edge cases, and tests.
2. **Scope:** Agree on a small, bounded change.
3. **Implement:** Make the change without unrelated refactoring.
4. **Verify:** Run relevant tests, type checking, linting, and migrations.
5. **Review:** Inspect the diff, business rules, authorization, and error paths.
6. **Record:** Update the task checklist and work log.
7. **Commit:** Create a focused Git commit after reviewing the changes.

For a simple, low-risk task, the planning and implementation can happen in one interaction. For schema, authentication, ambulance dispatch, payments, or other high-risk changes, require an explicit plan first.

### 6.3 Keep tasks small

Good task:

> Implement the server-side creation endpoint for ambulance requests. Validate required fields, enforce the approved input rules, persist the request, prevent duplicate submission using the agreed idempotency strategy, and add unit/integration tests. Do not implement fleet assignment or notification delivery in this task.

Poor task:

> Build the whole ambulance system, frontend, database, notifications, and admin dashboard.

The smaller task is easier to verify and much less likely to produce hidden omissions.

### 6.4 Make the agent report evidence

For each completed task, require:

- Summary of changes.
- Files changed.
- Migration impact.
- Tests executed and their actual results.
- Commands that failed or could not be run.
- Assumptions made.
- Remaining risks and follow-up tasks.
- Any manual verification you should perform.

The agent must never claim tests passed unless it actually ran them and observed success.

### 6.5 Use Git as a safety boundary

Before substantial AI work:

- Check `git status`.
- Commit or safely preserve the current working state.
- Review the agent's plan.
- Inspect the diff after implementation.
- Run tests before merging or deploying.
- Avoid combining unrelated features in one commit.

Do not permit destructive database changes, production deployment, data deletion, secret rotation, or other high-impact actions without explicit review and authorization.

---

## 7. Master Prompt for the Coding Agent

Copy this prompt into the coding agent's project instructions or initial session. Adjust it to the actual tool's instruction-file conventions.

```text
You are the senior software engineer and implementation partner
for Medizaai, a healthcare services platform in Bangladesh.

Your job is to help implement the existing project incrementally,
maintainably, and safely. I am the human developer and project
owner. I will review architecture, business logic, critical code,
and release decisions.

PROJECT CONTEXT

Medizaai includes:
1. Doctor discovery and appointment booking.
2. Hospital guide discovery, packages, and bookings.
3. Hospital and diagnostic-center directory.
4. Pharmacy catalog, cart, orders, and cash-on-delivery workflow.
5. Emergency ambulance request and manual dispatcher assignment.
6. Administration, staff permissions, notifications, reports,
   settings, and audit history.

The original market is Rajshahi, Bangladesh. Multi-city operation
and multiple dispatch teams must be supported by the data model
and authorization design without creating separate applications
or databases per city.

Ambulance service was added after the original client document.
Ambulances can be owned by Medizaai or operated by partner
organizations. Dispatchers manually assign vehicles. No maps,
GPS tracking, automatic nearest-vehicle selection, or routing
features are required initially.

RECOMMENDED DEFAULT STACK

- Next.js + TypeScript
- NestJS + TypeScript
- PostgreSQL
- Drizzle ORM and migrations
- REST API with an explicit API contract
- PostgreSQL-backed outbox/background worker initially
- Docker + Coolify
- Cloudflare for DNS/proxy/CDN/protection

Treat these as project defaults, not permission to replace the
existing stack without inspection. First discover the repository's
actual state and report any mismatch.

CORE ENGINEERING RULES

1. Inspect relevant existing code before proposing or making edits.
2. Reuse working components and established conventions.
3. Do not rewrite the whole application when a focused change
   will solve the problem.
4. Do not invent business rules, API contracts, environment
   variables, integrations, or credentials.
5. If a missing decision blocks correctness, ask me. Otherwise,
   state a reasonable assumption and isolate it so it can be changed.
6. Validate all untrusted input on the server.
7. Enforce authorization on the server for every protected action.
8. Treat city, team, and organization boundaries as security
   boundaries, not merely frontend filters.
9. Use database transactions and constraints where appropriate.
10. Prevent duplicate submissions and conflicting ambulance
    assignments.
11. Use explicit state transitions for orders, bookings,
    assignments, and trips.
12. Keep secrets out of source control, logs, and documentation.
13. Do not hard-code configurable prices, delivery fees, or
    operational settings.
14. Add or update tests for meaningful changes.
15. Do not use mock data as a substitute for required persistent
    workflows.
16. Do not introduce microservices, Redis, maps, GPS, or additional
    infrastructure without a concrete requirement.
17. Do not silently change dependency versions or add large
    dependencies without justification.
18. Never claim a test, migration, deployment, or security check
    succeeded unless you actually verified the result.
19. Do not run destructive production operations or deploy to
    production without my explicit approval.
20. Update the relevant documentation and AI work log.

WORKFLOW FOR EVERY TASK

A. Restate the goal and acceptance criteria.
B. Inspect relevant files and existing patterns.
C. Identify affected files, database changes, risks, and tests.
D. Present a short implementation plan before high-risk changes.
E. Implement only the agreed scope.
F. Run the relevant tests, type checking, linting, and migration
   checks that are available.
G. Review the diff for regressions, security issues, and omissions.
H. Report exactly what changed and what was actually verified.
I. List unresolved assumptions and follow-up work.

SECURITY AND RELIABILITY

Pay special attention to authentication, authorization, personal
data, pharmacy prices and stock, order consistency, notification
failures, audit logs, and emergency ambulance dispatch.

For ambulance dispatch:
- Persist requests before treating them as accepted by the system.
- Prevent conflicting active assignments under concurrent requests.
- Preserve assignment history during reassignment.
- Distinguish an offered partner assignment from an accepted one.
- Make failures and unavailable ambulances visible to dispatchers.
- Do not imply that a request guarantees vehicle availability.
- Preserve an operational fallback for application/network failure.

For pharmacy orders:
- Calculate totals on the server using authoritative prices.
- Preserve price snapshots on order items.
- Apply minimum-order and delivery-fee rules on the server.
- Create orders and their line items atomically.

OUTPUT EXPECTATIONS

At the end of each task, report:
1. Summary.
2. Files changed.
3. Database/API impact.
4. Tests run and actual results.
5. Assumptions.
6. Risks or unverified behavior.
7. Manual review checklist.
8. Suggested next small task.

Begin by auditing the repository. Do not immediately generate
the entire application.
```

---

## 8. Reusable Task Prompt Template

Use this template for each feature or bug fix.

```text
TASK:
[One specific feature, defect, or technical improvement]

BUSINESS CONTEXT:
[Why the feature exists and who uses it]

ACCEPTANCE CRITERIA:
- [Observable result 1]
- [Observable result 2]
- [Validation or authorization requirement]
- [Failure/edge case]
- [Tests required]

SCOPE LIMITS:
- Do not change unrelated modules.
- Do not introduce new infrastructure unless approved.
- Do not invent unspecified business behavior.

WORKFLOW:
1. Inspect the existing implementation.
2. Explain the plan and affected files.
3. Identify risks and database changes.
4. Implement the smallest complete solution.
5. Add/update tests.
6. Run relevant checks and report actual results.
7. Update relevant documentation.

REQUIRED REPORT:
Summary, files changed, tests run, test results, assumptions,
risks, manual review checklist, and next task.
```

## 9. Specialized Prompts

### 9.1 Repository audit

```text
Audit the existing Medizaai repository before making changes.

Identify:
- Frontend/backend architecture and framework versions.
- Existing routes, APIs, modules, database schema, and migrations.
- Authentication and authorization implementation.
- Mock data and incomplete workflows.
- Existing tests, linting, type checking, and deployment setup.
- Missing or duplicated business logic.
- Security, data-integrity, and operational risks.

Map the existing implementation to the requirements in
docs/REQUIREMENTS.md.

Produce a prioritized report with:
1. Already implemented and verified.
2. Partially implemented.
3. Missing.
4. Broken or risky.
5. Blocked by unresolved client decisions.

Cite file paths and relevant symbols for findings. Do not modify
files or perform a rewrite during this audit.
```

### 9.2 Database design review

```text
Review the proposed or existing Medizaai PostgreSQL schema.

Check entity relationships, foreign keys, unique constraints,
indexes, status modeling, money representation, timestamps,
audit history, and migration safety.

For ambulance dispatch, analyze concurrent assignment, duplicate
requests, reassignment history, vehicle/crew eligibility, and
city/team/organization authorization.

For pharmacy, analyze authoritative pricing, order-item snapshots,
inventory consistency, and atomic order creation.

Identify concrete defects and propose the smallest safe changes.
Do not generate a destructive migration without explaining the
data-loss risk and a recovery plan.
```

### 9.3 Frontend implementation

```text
Implement the specified Medizaai frontend task using the existing
design conventions and API contracts.

Requirements:
- Mobile-first, accessible, Bangla-friendly interface.
- Clear form validation and error messages.
- Loading, empty, success, and failure states.
- No fake success responses or hard-coded production data.
- Do not expose staff-only information or secrets.
- Follow existing component and styling conventions.

Inspect the relevant page and API contract first. Implement only
the requested scope and test the important interaction paths.
```

### 9.4 Ambulance assignment implementation

```text
Implement the next approved ambulance-dispatch task.

The system uses manual dispatcher assignment. The fleet can contain
Medizaai-owned and partner-operated ambulances. Dispatch teams are
city-scoped. There are no maps or GPS features in this scope.

Before coding, verify the approved request, assignment, vehicle,
organization, team, and trip models.

Handle:
- Server-side eligibility checks.
- City/team/organization authorization.
- Concurrent assignment attempts.
- Explicit state transitions.
- Partner acceptance/rejection/timeout where specified.
- Assignment history and audit events.
- Notification failure without losing persisted state.
- Duplicate requests and retry behavior.

Add tests for both successful and failed transitions. Do not add
automatic dispatch, mapping, GPS, or routing features.
```

### 9.5 Testing and code review

```text
Review the current changes as a critical senior engineer.

Do not merely summarize the code or praise its structure.

Look for:
- Incorrect business rules.
- Authorization and data leakage.
- Race conditions and transaction errors.
- Invalid state transitions.
- Duplicate submissions.
- Incomplete error handling.
- Broken mobile interactions and accessibility.
- Missing test cases.
- Unintended API or schema changes.
- Hard-coded settings and insecure defaults.

For each finding, give severity, file/symbol, reproducible scenario,
impact, and a minimal fix.

Then run the available relevant tests and report actual results.
Do not silently modify unrelated code during the review.
```

---

## 10. Testing Checklist

Use this checklist as a release gate, adapting it to the final agreed scope.

### General application

- [ ] Clean setup works from the README.
- [ ] Database migrations apply to a clean database.
- [ ] Protected APIs reject unauthenticated requests.
- [ ] Unauthorized roles cannot access restricted operations.
- [ ] Invalid input is rejected by the server.
- [ ] Errors do not reveal secrets or sensitive internals.
- [ ] Mobile layout and primary workflows work.
- [ ] Empty, loading, success, and error states are present.
- [ ] Secrets are not committed.
- [ ] Backups can be restored.

### Bookings and directories

- [ ] Required booking fields are validated.
- [ ] Invalid or past dates are rejected according to the approved rules.
- [ ] Booking statuses follow permitted transitions.
- [ ] Directory changes appear in the correct public views.
- [ ] Staff actions are recorded where appropriate.

### Pharmacy

- [ ] Cart quantities and item removal work.
- [ ] Server calculates the total using current authoritative prices.
- [ ] Minimum order rule is enforced.
- [ ] Delivery fee is configurable.
- [ ] Order and order items are persisted atomically.
- [ ] Repeated submission does not create unintended duplicate orders.
- [ ] Stock changes follow the approved policy.
- [ ] Order status updates are authorized and audited.

### Ambulance

- [ ] Request submission persists the request.
- [ ] Dispatcher sees requests within their permitted scope.
- [ ] An ineligible or unavailable vehicle cannot be assigned.
- [ ] Two simultaneous assignment attempts cannot create a conflict.
- [ ] Reassignment preserves the old assignment history.
- [ ] Partner rejection and timeout follow the approved escalation rules.
- [ ] Notification failure is visible and retryable.
- [ ] Reconnecting to the dispatcher interface restores current persisted state.
- [ ] Staff cannot access another city/team's requests without permission.
- [ ] Closure and cancellation rules are enforced.
- [ ] An outage fallback procedure is documented and understood.

### Deployment and operations

- [ ] Production environment variables are configured securely.
- [ ] PostgreSQL is not publicly exposed.
- [ ] HTTPS works correctly.
- [ ] Health checks and error monitoring work.
- [ ] Backup and restore have been tested.
- [ ] Rollback and emergency operating procedures are documented.
- [ ] Client acceptance criteria have been reviewed.

---

## 11. Human Review: What You Must Not Delegate Blindly

You do not need to hand-write every component. You do need to retain control over the areas where mistakes can have serious consequences.

**Always personally review:**

1. Database migrations and data deletion.
2. Authentication, authorization, and role boundaries.
3. Pharmacy pricing, order totals, and inventory consistency.
4. Ambulance assignment concurrency, reassignment, and escalation.
5. Secrets, production environment configuration, and deployment.
6. Backups, recovery, and operational fallback.
7. Any code that handles sensitive personal or healthcare information.
8. Client-facing claims about availability, delivery times, and emergency response.

You can delegate routine forms, list pages, CRUD endpoints, repetitive validation, documentation, and test scaffolding more aggressively—but still verify their behavior.

## 12. Client Decisions That Must Be Confirmed

Do not allow the AI agent to make these business decisions silently.

- [ ] What exactly constitutes the initial launch scope versus later phases?
- [ ] Will each city have its own dispatch team, or will one central team manage all cities?
- [ ] Who can assign partner ambulances, and must partners explicitly accept assignments?
- [ ] What are the assignment timeout, cancellation, reassignment, and escalation rules?
- [ ] What is the fallback process when no ambulance is available or the platform is down?
- [ ] Which roles need their own login or portal?
- [ ] Which notification channels are approved and funded?
- [ ] Which video consultation provider and booking workflow are required?
- [ ] What is the approved pharmacy stock policy and prescription workflow?
- [ ] Are the original delivery fee, minimum order, and estimated delivery time still valid?
- [ ] What data retention, privacy, and legal requirements apply?
- [ ] Which languages, reports, exports, and dashboard metrics are required?

Record answers in `docs/REQUIREMENTS.md` or `docs/DECISIONS.md`. Once confirmed, treat them as requirements rather than repeatedly reinterpreting them.

## 13. Definition of Done

A task is not complete just because the AI agent generated code.

A task is done when:

- The implementation matches approved acceptance criteria.
- The change fits the existing architecture.
- Server-side validation and authorization are correct.
- Relevant tests exist and have actually been run.
- No unintended changes are present.
- Database changes are documented and migration-safe.
- Important errors and edge cases are handled.
- The developer has reviewed the diff.
- Relevant project documentation is updated.

The whole launch is ready only when launch-critical workflows have passed acceptance testing, operational risks are documented, and the client has accepted any explicitly deferred requirements.

---

## 14. Immediate Next Actions

Follow this sequence rather than asking an agent to build everything at once.

1. **Audit the repository.** Run the repository-audit prompt.
2. **Compare implementation with requirements.** Create a checklist of existing, partial, missing, and blocked work.
3. **Confirm launch scope with the client.** Resolve the decisions that affect architecture or operational safety.
4. **Finalize the architecture and data model.** Keep them proportional to the project.
5. **Set up the AI agent's persistent project instructions.** Use the Master Prompt and keep the documentation in the repository.
6. **Choose the smallest high-value task.** Complete one end-to-end workflow at a time.
7. **Review and test every milestone.** Keep the main branch in a deployable state.
8. **Prioritize operationally critical workflows.** Do not leave ambulance dispatch concurrency, authorization, or failure handling until after launch.
9. **Deploy only after acceptance checks.** Test the production configuration, backups, and fallback procedures.

**The governing principle:** Let the AI agent write and inspect code quickly; keep the human developer responsible for requirements, architecture, verification, and release decisions.
