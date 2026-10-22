# Medizaai — API Contracts & Conventions

## 1. REST Standards & Global Conventions
- **Base URL:** `/api`
- **Interactive Documentation:** `/docs` (OpenAPI Swagger UI)
- **Response Format:** JSON
- **Dates & Times:** ISO 8601 UTC strings (`2026-10-23T00:00:00.000Z`)
- **Monetary Values:** Whole integers representing Bangladeshi Taka (৳)

---

## 2. Primary Route Groups

### 2.1 Authentication & Profile (`/api/auth`)
| Method | Path | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/login` | Public | Staff login with phone and password |
| `GET` | `/auth/me` | Staff | Returns authenticated user profile and roles |

### 2.2 Ambulance Dispatch (`/api/ambulance`)
| Method | Path | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/ambulance/requests` | Public | Customer intake form submission |
| `GET` | `/ambulance/requests/:ref` | Public | Check status of request by reference code |
| `GET` | `/ambulance/queue` | Dispatcher | Active queue for dispatcher's city/team |
| `POST` | `/ambulance/assignments` | Dispatcher | Manually offer/assign ambulance to request |
| `PATCH` | `/ambulance/assignments/:id` | Staff/Partner | Accept, reject, or complete assignment |
| `GET` | `/ambulance/fleet` | Fleet/Dispatcher | Vehicle status and availability |

### 2.3 Doctor Appointments (`/api/doctors`, `/api/appointments`)
| Method | Path | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/doctors` | Public | Browse doctors by city and specialty |
| `GET` | `/doctors/:id` | Public | Doctor detailed qualifications and schedule |
| `POST` | `/appointments` | Public | Submit appointment booking request |
| `GET` | `/appointments` | Staff | Manage appointment requests |
| `PATCH` | `/appointments/:id/status` | Staff | Confirm, reschedule, or cancel appointment |

### 2.4 Hospital Guides (`/api/guides`, `/api/guide-bookings`)
| Method | Path | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/guides` | Public | List available hospital guides in city |
| `GET` | `/guides/packages` | Public | List service package tiers (Normal/Extra/Premium) |
| `POST` | `/guide-bookings` | Public | Request hospital guide package |
| `GET` | `/guide-bookings` | Staff | Manage guide requests and assignments |

### 2.5 Online Pharmacy (`/api/pharmacy`, `/api/orders`)
| Method | Path | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/pharmacy/medicines` | Public | Browse medicines catalog with search |
| `POST` | `/orders` | Public | Submit COD medicine order |
| `GET` | `/orders/:id` | Public | Order status confirmation |
| `GET` | `/orders` | Staff | Manage pharmacy order pipeline |
| `PATCH` | `/orders/:id/status` | Staff | Update order status (CONFIRMED, OUT_FOR_DELIVERY, etc.) |

### 2.6 System Administration & Settings (`/api/settings`, `/api/cities`, `/api/organizations`)
| Method | Path | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/cities` | Public | Active cities |
| `GET` | `/settings` | Staff | Business settings (delivery fees, thresholds) |
| `PATCH` | `/settings/:key` | SuperAdmin | Update business configuration |
| `GET` | `/organizations` | Staff | Partner fleet and provider directory |
