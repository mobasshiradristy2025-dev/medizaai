import React, { useState } from "react";
import {
  LayoutDashboard,
  Siren,
  CalendarCheck,
  Compass,
  Pill,
  Truck,
  Building2,
  Sliders,
  Search,
  Bell,
  MapPin,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  PhoneCall,
  User,
  X,
} from "lucide-react";

// ==========================================
// Types & Initial Data
// ==========================================
type NavTab =
  | "dashboard"
  | "ambulance"
  | "appointments"
  | "guides"
  | "pharmacy"
  | "fleet"
  | "hospitals"
  | "settings";

interface AmbulanceRequest {
  id: string;
  referenceCode: string;
  callerName: string;
  callerPhone: string;
  pickupAddress: string;
  destinationAddress: string;
  urgency: "CRITICAL" | "STANDARD";
  status: "PENDING_DISPATCH" | "ASSIGNED" | "EN_ROUTE" | "COMPLETED";
  assignedVehicle?: string;
  createdAt: string;
}

interface FleetVehicle {
  id: string;
  registrationNumber: string;
  type: "ICU" | "AC" | "NON_AC" | "FREEZER";
  ownership: "MEDIZAAI" | "PARTNER";
  partnerName?: string;
  driverName: string;
  driverPhone: string;
  status: "AVAILABLE" | "ON_TRIP" | "MAINTENANCE";
}

interface DoctorAppointment {
  id: string;
  doctorName: string;
  specialty: string;
  customerName: string;
  customerPhone: string;
  preferredDate: string;
  preferredTimeSlot: string;
  fee: number;
  status: "REQUESTED" | "CONFIRMED" | "CANCELLED";
}

interface PharmacyOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  items: { name: string; quantity: number; price: number }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: "PENDING" | "CONFIRMED" | "OUT_FOR_DELIVERY" | "DELIVERED";
  createdAt: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [assignModalRequest, setAssignModalRequest] = useState<AmbulanceRequest | null>(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("");

  // State Data
  const [requests, setRequests] = useState<AmbulanceRequest[]>([
    {
      id: "req-1",
      referenceCode: "AMB-2026-0001",
      callerName: "Kazi Rafiqul",
      callerPhone: "+8801712345678",
      pickupAddress: "Kazla, Near RUET Gate 2, Rajshahi",
      destinationAddress: "Rajshahi Medical College Hospital (RMCH)",
      urgency: "CRITICAL",
      status: "PENDING_DISPATCH",
      createdAt: "5 mins ago",
    },
    {
      id: "req-2",
      referenceCode: "AMB-2026-0002",
      callerName: "Selina Parveen",
      callerPhone: "+8801819876543",
      pickupAddress: "Alupatti Mor, Ghoramara, Rajshahi",
      destinationAddress: "Islami Bank Hospital, Laxmipur",
      urgency: "STANDARD",
      status: "PENDING_DISPATCH",
      createdAt: "14 mins ago",
    },
    {
      id: "req-3",
      referenceCode: "AMB-2026-0003",
      callerName: "Farhan Hossain",
      callerPhone: "+8801911223344",
      pickupAddress: "Talaimari, Near Padma River embankment",
      destinationAddress: "RMCH Emergency Ward",
      urgency: "CRITICAL",
      status: "EN_ROUTE",
      assignedVehicle: "RAJ-HA-11-2041 (ICU)",
      createdAt: "28 mins ago",
    },
  ]);

  const [fleet, setFleet] = useState<FleetVehicle[]>([
    {
      id: "v-1",
      registrationNumber: "RAJ-HA-11-2041",
      type: "ICU",
      ownership: "MEDIZAAI",
      driverName: "Abul Kalam",
      driverPhone: "+8801711002233",
      status: "ON_TRIP",
    },
    {
      id: "v-2",
      registrationNumber: "RAJ-CHA-71-3092",
      type: "AC",
      ownership: "MEDIZAAI",
      driverName: "Mokbul Hossain",
      driverPhone: "+8801722334455",
      status: "AVAILABLE",
    },
    {
      id: "v-3",
      registrationNumber: "RAJ-CHA-55-1104",
      type: "NON_AC",
      ownership: "PARTNER",
      partnerName: "Al-Razi Ambulance Care",
      driverName: "Tarun Kumar",
      driverPhone: "+8801833445566",
      status: "AVAILABLE",
    },
    {
      id: "v-4",
      registrationNumber: "RAJ-HA-88-9921",
      type: "FREEZER",
      ownership: "PARTNER",
      partnerName: "Padma Medical Fleet",
      driverName: "Anisur Rahman",
      driverPhone: "+8801944556677",
      status: "AVAILABLE",
    },
  ]);

  const [appointments, setAppointments] = useState<DoctorAppointment[]>([
    {
      id: "apt-1",
      doctorName: "Prof. Dr. M. A. Jalil",
      specialty: "Cardiology",
      customerName: "Md. Tanvir Ahmed",
      customerPhone: "+8801733445566",
      preferredDate: "2026-10-24",
      preferredTimeSlot: "5:00 PM - 7:00 PM",
      fee: 1000,
      status: "REQUESTED",
    },
    {
      id: "apt-2",
      doctorName: "Dr. Nazneen Akhter",
      specialty: "Gynecology",
      customerName: "Ruksana Begum",
      customerPhone: "+8801822114433",
      preferredDate: "2026-10-25",
      preferredTimeSlot: "6:30 PM - 8:30 PM",
      fee: 800,
      status: "CONFIRMED",
    },
  ]);

  const [orders, setOrders] = useState<PharmacyOrder[]>([
    {
      id: "ord-1",
      customerName: "Shafiqul Islam",
      customerPhone: "+8801755667788",
      deliveryAddress: "House 24, Road 3, Padma R/A, Rajshahi",
      items: [
        { name: "Napa Extra 500mg (10 tabs)", quantity: 2, price: 30 },
        { name: "Seclo 20mg (14 caps)", quantity: 2, price: 98 },
        { name: "Entacyd Plus Suspension", quantity: 1, price: 110 },
      ],
      subtotal: 366,
      deliveryFee: 30,
      total: 396,
      status: "PENDING",
      createdAt: "12 mins ago",
    },
  ]);

  const [settings, setSettings] = useState({
    deliveryFee: 30,
    minOrderValue: 100,
    dispatchTimeoutSeconds: 180,
    activeCity: "Rajshahi",
  });

  // Action Handlers
  const handleAssignAmbulance = () => {
    if (!assignModalRequest || !selectedVehicleId) return;
    const targetVehicle = fleet.find((v) => v.id === selectedVehicleId);
    if (!targetVehicle) return;

    setRequests((prev) =>
      prev.map((r) =>
        r.id === assignModalRequest.id
          ? {
              ...r,
              status: "ASSIGNED",
              assignedVehicle: `${targetVehicle.registrationNumber} (${targetVehicle.type})`,
            }
          : r,
      ),
    );

    setFleet((prev) =>
      prev.map((v) =>
        v.id === selectedVehicleId ? { ...v, status: "ON_TRIP" } : v,
      ),
    );

    setAssignModalRequest(null);
    setSelectedVehicleId("");
  };

  const handleUpdateOrderStatus = (orderId: string, status: PharmacyOrder["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o)),
    );
  };

  const handleUpdateAppointment = (aptId: string, status: DoctorAppointment["status"]) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === aptId ? { ...a, status } : a)),
    );
  };

  const pendingAmbulanceCount = requests.filter((r) => r.status === "PENDING_DISPATCH").length;

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-badge">M</div>
          <div className="brand-info">
            <h1>Medizaai</h1>
            <p>Admin & Dispatch</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">Operations</div>
          <button
            className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>
          <button
            className={`nav-item ${activeTab === "ambulance" ? "active" : ""}`}
            onClick={() => setActiveTab("ambulance")}
          >
            <Siren size={18} />
            <span>Ambulance Queue</span>
            {pendingAmbulanceCount > 0 && (
              <span className="badge badge-emergency">{pendingAmbulanceCount}</span>
            )}
          </button>
          <button
            className={`nav-item ${activeTab === "fleet" ? "active" : ""}`}
            onClick={() => setActiveTab("fleet")}
          >
            <Truck size={18} />
            <span>Fleet & Partners</span>
          </button>

          <div className="nav-section-title">Healthcare Services</div>
          <button
            className={`nav-item ${activeTab === "appointments" ? "active" : ""}`}
            onClick={() => setActiveTab("appointments")}
          >
            <CalendarCheck size={18} />
            <span>Doctor Appointments</span>
          </button>
          <button
            className={`nav-item ${activeTab === "guides" ? "active" : ""}`}
            onClick={() => setActiveTab("guides")}
          >
            <Compass size={18} />
            <span>Hospital Guides</span>
          </button>
          <button
            className={`nav-item ${activeTab === "pharmacy" ? "active" : ""}`}
            onClick={() => setActiveTab("pharmacy")}
          >
            <Pill size={18} />
            <span>Pharmacy Orders</span>
          </button>
          <button
            className={`nav-item ${activeTab === "hospitals" ? "active" : ""}`}
            onClick={() => setActiveTab("hospitals")}
          >
            <Building2 size={18} />
            <span>Hospitals Directory</span>
          </button>

          <div className="nav-section-title">System</div>
          <button
            className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <Sliders size={18} />
            <span>Settings & Rules</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-avatar">AD</div>
          <div className="user-details">
            <div className="user-name">Central Dispatcher</div>
            <div className="user-role">Super Admin • Rajshahi</div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-wrapper">
        <header className="top-header">
          <div className="header-left">
            <div className="search-box">
              <Search size={16} color="#94a3b8" />
              <input
                type="text"
                placeholder="Search reference, phone, address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="city-pill">
              <MapPin size={14} />
              <span>{settings.activeCity} (Active Market)</span>
            </div>
          </div>

          <div className="header-right">
            <div className="system-status">
              <span className="status-dot"></span>
              <span>API Gateway Connected</span>
            </div>
            <button className="btn btn-secondary btn-sm" title="Refresh Data">
              <RefreshCw size={14} />
            </button>
          </div>
        </header>

        <main className="content-body">
          {/* ======================================================== */}
          {/* VIEW 1: DASHBOARD */}
          {/* ======================================================== */}
          {activeTab === "dashboard" && (
            <div>
              <div className="page-header">
                <div>
                  <h1 className="page-title">Operations Overview</h1>
                  <p className="page-subtitle">
                    Real-time operational summary for Rajshahi Healthcare Platform
                  </p>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => setActiveTab("ambulance")}
                >
                  <Siren size={16} />
                  <span>Open Dispatch Queue ({pendingAmbulanceCount})</span>
                </button>
              </div>

              {/* Statistics Cards */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-header">
                    <span>Emergency Ambulance</span>
                    <div className="stat-icon" style={{ background: "#fee2e2", color: "#dc2626" }}>
                      <Siren size={20} />
                    </div>
                  </div>
                  <div className="stat-value" style={{ color: "#dc2626" }}>
                    {pendingAmbulanceCount}
                  </div>
                  <div className="stat-footer">Pending manual vehicle assignment</div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <span>Pharmacy COD Orders</span>
                    <div className="stat-icon" style={{ background: "#fef3c7", color: "#d97706" }}>
                      <Pill size={20} />
                    </div>
                  </div>
                  <div className="stat-value">{orders.length}</div>
                  <div className="stat-footer">Rajshahi city delivery queue</div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <span>Doctor Appointments</span>
                    <div className="stat-icon" style={{ background: "#e0f2fe", color: "#0284c7" }}>
                      <CalendarCheck size={20} />
                    </div>
                  </div>
                  <div className="stat-value">{appointments.length}</div>
                  <div className="stat-footer">Incoming booking requests</div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <span>Active Fleet Available</span>
                    <div className="stat-icon" style={{ background: "#dcfce7", color: "#16a34a" }}>
                      <Truck size={20} />
                    </div>
                  </div>
                  <div className="stat-value" style={{ color: "#16a34a" }}>
                    {fleet.filter((f) => f.status === "AVAILABLE").length} / {fleet.length}
                  </div>
                  <div className="stat-footer">Medizaai & Partner vehicles</div>
                </div>
              </div>

              {/* Urgent Ambulance Requests Table */}
              <div className="table-container" style={{ marginBottom: "2rem" }}>
                <div className="table-header-bar">
                  <div className="table-title">🚨 Active Emergency Ambulance Requests</div>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setActiveTab("ambulance")}
                  >
                    View All
                  </button>
                </div>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Ref Code</th>
                      <th>Urgency</th>
                      <th>Caller & Phone</th>
                      <th>Pickup Location</th>
                      <th>Destination</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((req) => (
                      <tr key={req.id}>
                        <td style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                          {req.referenceCode}
                        </td>
                        <td>
                          <span
                            className={`status-pill ${
                              req.urgency === "CRITICAL"
                                ? "status-emergency"
                                : "status-warning"
                            }`}
                          >
                            {req.urgency}
                          </span>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{req.callerName}</div>
                          <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                            {req.callerPhone}
                          </div>
                        </td>
                        <td>{req.pickupAddress}</td>
                        <td>{req.destinationAddress}</td>
                        <td>
                          <span className="status-pill status-info">{req.status}</span>
                        </td>
                        <td>
                          {req.status === "PENDING_DISPATCH" ? (
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => {
                                setAssignModalRequest(req);
                                setSelectedVehicleId("");
                              }}
                            >
                              Assign Fleet
                            </button>
                          ) : (
                            <span style={{ fontSize: "0.8rem", color: "var(--color-success)", fontWeight: 600 }}>
                              {req.assignedVehicle}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 2: AMBULANCE DISPATCH QUEUE */}
          {/* ======================================================== */}
          {activeTab === "ambulance" && (
            <div>
              <div className="page-header">
                <div>
                  <h1 className="page-title">Ambulance Dispatch Queue</h1>
                  <p className="page-subtitle">
                    Manual dispatcher assignment queue • Rajshahi City Zone
                  </p>
                </div>
              </div>

              <div className="table-container">
                <div className="table-header-bar">
                  <div className="table-title">Incoming Request Intake Stream</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                    {requests.length} total recorded requests
                  </div>
                </div>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Reference</th>
                      <th>Urgency</th>
                      <th>Caller Details</th>
                      <th>Pickup Address / Landmark</th>
                      <th>Destination Facility</th>
                      <th>Current Status</th>
                      <th>Assignment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((r) => (
                      <tr key={r.id}>
                        <td style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                          {r.referenceCode}
                        </td>
                        <td>
                          <span
                            className={`status-pill ${
                              r.urgency === "CRITICAL" ? "status-emergency" : "status-warning"
                            }`}
                          >
                            {r.urgency}
                          </span>
                        </td>
                        <td>
                          <strong>{r.callerName}</strong>
                          <div style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>
                            {r.callerPhone}
                          </div>
                        </td>
                        <td>{r.pickupAddress}</td>
                        <td>{r.destinationAddress}</td>
                        <td>
                          <span className="status-pill status-info">{r.status}</span>
                        </td>
                        <td>
                          {r.status === "PENDING_DISPATCH" ? (
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => {
                                setAssignModalRequest(r);
                                setSelectedVehicleId("");
                              }}
                            >
                              Manual Assign
                            </button>
                          ) : (
                            <div>
                              <div style={{ fontWeight: 600, color: "var(--color-primary)" }}>
                                {r.assignedVehicle}
                              </div>
                              <button
                                className="btn btn-secondary btn-sm"
                                style={{ marginTop: "0.25rem" }}
                                onClick={() => {
                                  setRequests((prev) =>
                                    prev.map((item) =>
                                      item.id === r.id ? { ...item, status: "COMPLETED" } : item,
                                    ),
                                  );
                                }}
                              >
                                Mark Completed
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 3: DOCTOR APPOINTMENTS */}
          {/* ======================================================== */}
          {activeTab === "appointments" && (
            <div>
              <div className="page-header">
                <div>
                  <h1 className="page-title">Doctor Appointments</h1>
                  <p className="page-subtitle">
                    Manage patient appointments and consultation requests in Rajshahi
                  </p>
                </div>
              </div>

              <div className="table-container">
                <div className="table-header-bar">
                  <div className="table-title">Recent Appointment Requests</div>
                </div>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Doctor</th>
                      <th>Specialty</th>
                      <th>Patient Name & Phone</th>
                      <th>Preferred Slot</th>
                      <th>Fee</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((apt) => (
                      <tr key={apt.id}>
                        <td>
                          <strong>{apt.doctorName}</strong>
                        </td>
                        <td>{apt.specialty}</td>
                        <td>
                          <div>{apt.customerName}</div>
                          <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                            {apt.customerPhone}
                          </div>
                        </td>
                        <td>
                          <div>{apt.preferredDate}</div>
                          <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                            {apt.preferredTimeSlot}
                          </div>
                        </td>
                        <td style={{ fontWeight: 700 }}>৳{apt.fee}</td>
                        <td>
                          <span
                            className={`status-pill ${
                              apt.status === "CONFIRMED" ? "status-success" : "status-warning"
                            }`}
                          >
                            {apt.status}
                          </span>
                        </td>
                        <td>
                          {apt.status === "REQUESTED" ? (
                            <div style={{ display: "flex", gap: "0.4rem" }}>
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleUpdateAppointment(apt.id, "CONFIRMED")}
                              >
                                Confirm
                              </button>
                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => handleUpdateAppointment(apt.id, "CANCELLED")}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                              Resolved
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 4: HOSPITAL GUIDES */}
          {/* ======================================================== */}
          {activeTab === "guides" && (
            <div>
              <div className="page-header">
                <div>
                  <h1 className="page-title">Hospital Navigation Guides</h1>
                  <p className="page-subtitle">
                    Patient guide bookings for unfamiliar hospitals and diagnostic centers
                  </p>
                </div>
              </div>

              <div className="table-container">
                <div className="table-header-bar">
                  <div className="table-title">Guide Service Packages (Client Approved)</div>
                </div>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Tier</th>
                      <th>Package Title</th>
                      <th>Description</th>
                      <th>Approved Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span className="status-pill status-info">NORMAL</span>
                      </td>
                      <td>Standard Guide Assistance</td>
                      <td>Assistance with OPD registration, ticket collection, and chamber queue navigation.</td>
                      <td style={{ fontWeight: 700 }}>৳499</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="status-pill status-warning">EXTRA</span>
                      </td>
                      <td>Extended Guide Support</td>
                      <td>Includes OPD plus diagnostic test sample deposits and report collection guidance.</td>
                      <td style={{ fontWeight: 700 }}>৳899</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="status-pill status-success">PREMIUM</span>
                      </td>
                      <td>Full Day Dedicated Care</td>
                      <td>Full day bedside and admission accompaniment, pharmacy collection, and discharge assistance.</td>
                      <td style={{ fontWeight: 700 }}>৳1,499</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 5: PHARMACY ORDERS */}
          {/* ======================================================== */}
          {activeTab === "pharmacy" && (
            <div>
              <div className="page-header">
                <div>
                  <h1 className="page-title">Online Pharmacy (Cash on Delivery)</h1>
                  <p className="page-subtitle">
                    Authoritative server calculation • Rajshahi delivery zone
                  </p>
                </div>
              </div>

              <div className="table-container">
                <div className="table-header-bar">
                  <div className="table-title">Incoming Delivery Orders</div>
                </div>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer & Address</th>
                      <th>Items Ordered</th>
                      <th>Financial Snapshot</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id}>
                        <td style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>{o.id}</td>
                        <td>
                          <strong>{o.customerName}</strong>
                          <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                            {o.customerPhone}
                          </div>
                          <div style={{ fontSize: "0.8rem", marginTop: "0.2rem" }}>
                            {o.deliveryAddress}
                          </div>
                        </td>
                        <td>
                          <ul style={{ paddingLeft: "1.2rem", fontSize: "0.82rem" }}>
                            {o.items.map((it, idx) => (
                              <li key={idx}>
                                {it.name} × {it.quantity} (৳{it.price * it.quantity})
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <div>Subtotal: ৳{o.subtotal}</div>
                          <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                            Delivery Fee: ৳{o.deliveryFee}
                          </div>
                          <strong style={{ color: "var(--color-primary)" }}>
                            Total: ৳{o.total}
                          </strong>
                        </td>
                        <td>
                          <span
                            className={`status-pill ${
                              o.status === "DELIVERED"
                                ? "status-success"
                                : o.status === "OUT_FOR_DELIVERY"
                                  ? "status-info"
                                  : "status-warning"
                            }`}
                          >
                            {o.status}
                          </span>
                        </td>
                        <td>
                          <select
                            style={{
                              padding: "0.35rem 0.5rem",
                              borderRadius: "var(--radius-sm)",
                              border: "1px solid var(--border-color)",
                              fontSize: "0.8rem",
                            }}
                            value={o.status}
                            onChange={(e) =>
                              handleUpdateOrderStatus(o.id, e.target.value as PharmacyOrder["status"])
                            }
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
                            <option value="DELIVERED">DELIVERED</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 6: FLEET & PARTNERS */}
          {/* ======================================================== */}
          {activeTab === "fleet" && (
            <div>
              <div className="page-header">
                <div>
                  <h1 className="page-title">Fleet & Partner Ambulances</h1>
                  <p className="page-subtitle">
                    Manage Medizaai-owned and partner-operated emergency vehicles
                  </p>
                </div>
              </div>

              <div className="table-container">
                <div className="table-header-bar">
                  <div className="table-title">Registered Fleet Vehicles</div>
                </div>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Reg Number</th>
                      <th>Type</th>
                      <th>Ownership</th>
                      <th>Driver Name & Phone</th>
                      <th>Operating Status</th>
                      <th>Availability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fleet.map((v) => (
                      <tr key={v.id}>
                        <td style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                          {v.registrationNumber}
                        </td>
                        <td>
                          <span className="status-pill status-info">{v.type}</span>
                        </td>
                        <td>
                          <strong>{v.ownership}</strong>
                          {v.partnerName && (
                            <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                              {v.partnerName}
                            </div>
                          )}
                        </td>
                        <td>
                          <div>{v.driverName}</div>
                          <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                            {v.driverPhone}
                          </div>
                        </td>
                        <td>
                          <span
                            className={`status-pill ${
                              v.status === "AVAILABLE"
                                ? "status-success"
                                : v.status === "ON_TRIP"
                                  ? "status-emergency"
                                  : "status-warning"
                            }`}
                          >
                            {v.status}
                          </span>
                        </td>
                        <td>
                          <select
                            style={{
                              padding: "0.35rem 0.5rem",
                              borderRadius: "var(--radius-sm)",
                              border: "1px solid var(--border-color)",
                              fontSize: "0.8rem",
                            }}
                            value={v.status}
                            onChange={(e) => {
                              const newStatus = e.target.value as FleetVehicle["status"];
                              setFleet((prev) =>
                                prev.map((item) =>
                                  item.id === v.id ? { ...item, status: newStatus } : item,
                                ),
                              );
                            }}
                          >
                            <option value="AVAILABLE">AVAILABLE</option>
                            <option value="ON_TRIP">ON TRIP</option>
                            <option value="MAINTENANCE">MAINTENANCE</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 7: HOSPITALS DIRECTORY */}
          {/* ======================================================== */}
          {activeTab === "hospitals" && (
            <div>
              <div className="page-header">
                <div>
                  <h1 className="page-title">Hospitals & Diagnostic Centers</h1>
                  <p className="page-subtitle">Rajshahi City Directory Registry</p>
                </div>
              </div>

              <div className="table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Facility Name</th>
                      <th>Category</th>
                      <th>Address</th>
                      <th>Emergency Hotline</th>
                      <th>Services</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Rajshahi Medical College Hospital (RMCH)</strong></td>
                      <td><span className="status-pill status-info">GOVT HOSPITAL</span></td>
                      <td>Laxmipur, Rajshahi</td>
                      <td>+8802588865123</td>
                      <td>24/7 Emergency, ICU, CCU, NICU, Trauma Center</td>
                    </tr>
                    <tr>
                      <td><strong>Islami Bank Medical College Hospital</strong></td>
                      <td><span className="status-pill status-success">PRIVATE HOSPITAL</span></td>
                      <td>Nawdapara, Rajshahi</td>
                      <td>+8801711223344</td>
                      <td>Cardiology, Nephrology, General Surgery</td>
                    </tr>
                    <tr>
                      <td><strong>Popular Diagnostic Center</strong></td>
                      <td><span className="status-pill status-warning">DIAGNOSTIC</span></td>
                      <td>Laxmipur Mor, Rajshahi</td>
                      <td>+8809613787811</td>
                      <td>MRI, CT Scan, Ultrasound, Pathological Lab</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 8: OPERATIONAL SETTINGS */}
          {/* ======================================================== */}
          {activeTab === "settings" && (
            <div>
              <div className="page-header">
                <div>
                  <h1 className="page-title">Business & Operational Settings</h1>
                  <p className="page-subtitle">
                    Central configurations applied across Rajshahi platform
                  </p>
                </div>
              </div>

              <div className="table-container" style={{ padding: "2rem", maxWidth: "600px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                      Delivery Fee (BDT)
                    </label>
                    <input
                      type="number"
                      value={settings.deliveryFee}
                      onChange={(e) =>
                        setSettings({ ...settings, deliveryFee: Number(e.target.value) })
                      }
                      style={{
                        width: "100%",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-color)",
                      }}
                    />
                    <small style={{ color: "var(--text-secondary)", fontSize: "0.75rem" }}>
                      Applied to all pharmacy delivery orders in Rajshahi (Default: ৳30)
                    </small>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                      Minimum Medicine Order Subtotal (BDT)
                    </label>
                    <input
                      type="number"
                      value={settings.minOrderValue}
                      onChange={(e) =>
                        setSettings({ ...settings, minOrderValue: Number(e.target.value) })
                      }
                      style={{
                        width: "100%",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-color)",
                      }}
                    />
                    <small style={{ color: "var(--text-secondary)", fontSize: "0.75rem" }}>
                      Orders below this subtotal are rejected by the server (Default: ৳100)
                    </small>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                      Ambulance Dispatch Acceptance Timeout (Seconds)
                    </label>
                    <input
                      type="number"
                      value={settings.dispatchTimeoutSeconds}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          dispatchTimeoutSeconds: Number(e.target.value),
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-color)",
                      }}
                    />
                    <small style={{ color: "var(--text-secondary)", fontSize: "0.75rem" }}>
                      Seconds before a partner ambulance offer expires and alerts dispatchers (Default: 180s)
                    </small>
                  </div>

                  <button
                    className="btn btn-primary"
                    style={{ alignSelf: "flex-start", marginTop: "1rem" }}
                    onClick={() => alert("Settings successfully saved to database configuration!")}
                  >
                    Save Operational Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Manual Ambulance Assignment Modal */}
      {assignModalRequest && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                Manual Ambulance Assignment
              </h3>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setAssignModalRequest(null)}
              >
                <X size={16} />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: "1rem", background: "#f8fafc", padding: "1rem", borderRadius: "var(--radius-md)" }}>
                <div><strong>Ref:</strong> {assignModalRequest.referenceCode}</div>
                <div><strong>Caller:</strong> {assignModalRequest.callerName} ({assignModalRequest.callerPhone})</div>
                <div><strong>Pickup:</strong> {assignModalRequest.pickupAddress}</div>
                <div><strong>Urgency:</strong> <span style={{ color: assignModalRequest.urgency === "CRITICAL" ? "red" : "orange", fontWeight: 700 }}>{assignModalRequest.urgency}</span></div>
              </div>

              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                Select Available Fleet Vehicle:
              </label>
              <select
                style={{
                  width: "100%",
                  padding: "0.6rem 0.75rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-color)",
                  marginBottom: "1rem",
                }}
                value={selectedVehicleId}
                onChange={(e) => setSelectedVehicleId(e.target.value)}
              >
                <option value="">-- Choose available vehicle --</option>
                {fleet
                  .filter((v) => v.status === "AVAILABLE")
                  .map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.registrationNumber} ({v.type}) — {v.ownership} (Driver: {v.driverName})
                    </option>
                  ))}
              </select>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setAssignModalRequest(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                disabled={!selectedVehicleId}
                onClick={handleAssignAmbulance}
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
