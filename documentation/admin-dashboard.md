# Admin Dashboard Documentation
## EcoTrade Platform – Conceptual Overview

---

## Introduction

The Admin Dashboard constitutes the central control interface for platform administrators. It provides oversight, management, and analytical tools across the main operational domains of EcoTrade: users, materials, auctions, orders, and customer communication. Access is restricted to users with administrative privileges.

---

## 1. Main Dashboard (AdminDashboard)

![Main Dashboard](../screen/Admin/admin-dashboard.png)

**Purpose:** The entry point and summary view of platform activity.

**Contents:**
- **Summary Statistics:** Aggregated counts for users, orders, auctions, materials, and messages. Each metric links to its dedicated management page.
- **Order Status Distribution:** A visual breakdown of orders by status (completed, pending, canceled), enabling quick assessment of workflow and backlog.
- **Auction Status:** Distribution of auctions into active and closed, supporting resource allocation and planning.
- **Quick Actions:** Shortcuts to the main management sections (users, auctions, materials, messages).

**Importance:** This page answers the fundamental question: *What is the current state of the platform?* It reduces the need to browse multiple sections to obtain an overview and supports faster, data‑driven decisions.

---

## 2. User Management (UserAdmin)

![User Management](../screen/Admin/admin-user.png)

**Purpose:** Administration of platform accounts and roles.

**Contents:**
- **User List:** All registered users with basic profile data (name, email, role, join date).
- **Role Filtering:** Ability to filter by role (administrator or regular user).
- **Search:** Search by name or email.
- **Statistics:** Total users, number of administrators, and number of regular users.
- **Operations:** Add new users, edit existing accounts, and delete users.

**Importance:** User management underpins security and access control. Administrators can onboard colleagues, correct account details, and remove accounts when necessary. The separation between administrators and regular users is critical for maintaining platform governance.

---

## 3. Materials Management (AdminScrapItems)

![Materials Management](../screen/Admin/admin-matireal.png)

**Purpose:** Management of recyclable materials inventory.

**Contents:**
- **Materials List:** Items displayed as cards with key attributes: name, description, category, quantity, estimated price, barcode, source, and status.
- **Categories:** Metals, Plastics, Electronics, Paper and Cardboard, Furniture.
- **Status Workflow:** From receipt through processing and recycling readiness to auction readiness.
- **Sources:** Distinguishes between items entered by users and those added manually.
- **Operations:** Add, edit, and delete materials. Optional analytics view (category and status distribution).
- **Filters:** Search by name/description/barcode; filter by category and status.

**Importance:** Materials are the core inventory of a recycling platform. Accurate tracking of quantity, value, and status enables proper planning for auctions and recycling operations. The analytics view helps identify inventory mix and processing bottlenecks.

---

## 4. Auctions Management (AdminAuction)

![Auctions Management](../screen/Admin/admin-auction.png)

**Purpose:** Creation and control of material auctions.

**Contents:**
- **Auctions List:** Cards showing item name, images, description, category, start price, current bid, time remaining, and status (active, closed, canceled).
- **Statistics:** Overview of auctions by status and category.
- **Operations:** Create new auctions (with name, description, category, start price, end date, images); cancel, close, or delete existing auctions.
- **Filters:** Search by item name; filter by status and category.

**Importance:** Auctions are the main mechanism for selling recyclable materials. Administrators must be able to launch new auctions, close them at the right time, and handle cancellations when needed. Clear status indicators and time remaining help prioritize actions.

---

## 5. Auction Room (AdminAuctionRoom)

*Screenshot: Accessed via "عرض تفاصيل المزاد" from the Auctions list.*

**Purpose:** Detailed view and control of a single auction.

**Contents:**
- **Auction Details:** Images, description, category, start price, current bid, number of bids, time remaining, and end date.
- **Bids List:** All bids with bidder information; the current leading bidder is prominently displayed.
- **Winner Information:** For closed auctions, the winner’s contact details (email, phone) to facilitate post‑auction coordination.
- **Operations:** Close the auction (declare winner), cancel the auction, or delete it entirely. Each action requires confirmation.

**Importance:** This page provides the level of detail required to manage individual auctions. The ability to view all bidders and contact the winner supports fulfillment and dispute resolution. The confirmation step reduces the risk of accidental or irreversible actions.

---

## 6. Messages Management (AdminContact)

![Messages Management](../screen/Admin/admin-massages.png)

**Purpose:** Centralized handling of customer inquiries and feedback.

**Contents:**
- **Messages List:** All incoming messages with sender name, email, message preview, and date.
- **Statistics:** Total messages, messages received today, this week, and average daily volume.
- **Analytics:** Timeline of messages over the last 14 days and monthly distribution over the last 6 months.
- **Search and Filters:** Search by name, email, or message content; filter by date range; sort by date or name.
- **Operations:** View full message details and delete messages.

**Importance:** Customer communication is essential for trust and support. This page ensures inquiries are visible, measurable, and manageable. The analytics help assess response capacity and identify trends in customer engagement.

---

## 7. Orders / Requests (OrdersPage)

![Orders Management](../screen/Admin/admin-request.png)

**Purpose:** Management of material collection and recycling requests submitted by users.

**Contents:**
- **Orders List:** All requests grouped by status or date.
- **Request Details:** User information, material type, quantity, location, and status.
- **Status Workflow:** Tracking from submission through processing to completion or cancellation.

**Importance:** Orders represent the demand side of the platform. Effective management ensures timely pickup, fair processing, and clear communication with users who submit materials for recycling or auction.

---

## Summary

| Page            | Primary Function              | Key Value                                      |
|-----------------|-------------------------------|------------------------------------------------|
| Main Dashboard  | Overview and navigation       | At‑a‑glance platform status                   |
| User Management | Account and role control      | Security and access governance                 |
| Materials       | Inventory lifecycle           | Accurate stock and auction preparation         |
| Auctions        | Auction creation and listing  | Sales and resource allocation                  |
| Auction Room    | Single‑auction management     | Detailed control and winner coordination       |
| Messages        | Customer communication       | Responsiveness and relationship building       |
| Orders          | Request lifecycle             | User demand tracking and fulfillment           |

Together, these pages form a coherent administrative system that supports the full lifecycle of the EcoTrade platform: from user onboarding and material intake through auction execution to post‑sale communication.
