# Medizaai — Detailed Requirements Specification

## 1. Domain Workflows

### 1.1 Doctor Discovery and Appointments
- **Directory:** Searchable list of doctors filtered by specialty, qualifications, experience, and fee.
- **Booking Intake:** Customers submit appointment requests with:
  - Customer name
  - Bangladeshi mobile number (`+8801...` validation)
  - Preferred date and time slot
  - Symptoms/notes
- **Staff Management:** Authorized clinic staff confirm, reschedule, or cancel requests.
- **Status Flow:** `REQUESTED` → `CONFIRMED` → `COMPLETED` / `CANCELLED`.

### 1.2 Hospital Guide Booking
- **Guide Packages:** Tiered packages (e.g., `NORMAL`, `EXTRA`, `PREMIUM`) with transparent pricing.
- **Service Scope:** In-person assistance for patients navigating hospital admissions, diagnostics, and appointments in unfamiliar facilities.
- **Booking Intake:** Captures customer details, target hospital, preferred date, and package tier.
- **Staff Workflow:** Assign available guide, update status, and manage trip completion.

### 1.3 Online Pharmacy
- **Catalog:** Medicine list with dosage forms, strength, generic names, and stock status.
- **Business Rules:**
  - Initial coverage: Rajshahi city only.
  - Delivery fee: Configurable in admin (default ৳30).
  - Minimum subtotal: Configurable in admin (default ৳100).
  - Payment method: Cash on delivery (COD).
- **Cart & Order Integrity:**
  - Server calculates authoritative totals and enforces minimum order rules.
  - Line items capture unit price snapshots at checkout time.
  - Repeated submissions protected against accidental duplication.

### 1.4 Hospitals & Diagnostic Centers Directory
- Public directory categorized into Hospitals and Diagnostic Centers.
- Display addresses, emergency telephone numbers, service offerings, and working hours.

### 1.5 Emergency Ambulance Service (High Priority Operational Workflow)
- **Intake:** Fast, unauthenticated form collecting:
  - Caller name and Bangladeshi phone number
  - Pickup landmark / address and destination hospital/address
  - Urgency level (`STANDARD` vs `CRITICAL`)
  - Optional patient condition notes
  - Generates unique reference code (e.g. `AMB-2026-0001`)
- **Dispatcher Operations:**
  - Real-time dispatcher queue showing incoming emergency requests.
  - Manual vehicle assignment by authorized dispatchers.
  - Support for Medizaai-owned and partner-operated fleet vehicles.
  - State machine: `PENDING_DISPATCH` → `ASSIGNED` → `EN_ROUTE` → `ON_SCENE` → `TRANSPORTING` → `COMPLETED` / `CANCELLED` / `UNFULFILLED`.
- **Explicit Scope Limits (Launch):**
  - No GPS live tracking or map rendering.
  - No automated nearest-vehicle routing algorithm.
  - Addresses and landmarks represented as structured text.

---

## 2. Administration & Security Boundaries
- **Staff Authentication:** Secure login with hashed passwords and JWT session handling.
- **Role-Based Authorization:**
  - `SUPER_ADMIN`: Full system access across all cities and modules.
  - `CITY_ADMIN`: Scoped to a specific city's operations and teams.
  - `DISPATCHER`: Handles ambulance queues and manual vehicle assignments within assigned teams.
  - `FLEET_MANAGER`: Manages vehicles, drivers, maintenance, and partner fleet associations.
  - `PARTNER_COORDINATOR`: Manages partner organization relationships.
  - `PHARMACY_OPERATOR`: Processes pharmacy orders and inventory.
- **Audit Logging:** Administrative actions, price changes, and dispatch status transitions logged to `audit_logs`.

---

## 3. Unresolved Client Decisions Tracker
| # | Decision Item | Status | Working Assumption |
| :--- | :--- | :--- | :--- |
| 1 | Doctor appointment slot booking vs request-only | Pending Client Confirmation | Request-only with staff confirmation |
| 2 | Partner ambulance acceptance timeout duration | Pending Client Confirmation | 3 minutes (180s) before re-alerting dispatcher |
| 3 | Prescription verification requirement for restricted medicines | Pending Client Confirmation | Catalog flags prescription items; COD order verification by phone |
| 4 | Offline fallback communication channels | Pending Client Confirmation | SMS notification outbox + telephone backup |
| 5 | Video consultation provider integration | Deferred post-launch | Public profile displays video consultation availability; link provided manually |
