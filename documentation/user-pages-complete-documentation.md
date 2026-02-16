# User Pages Documentation
## EcoTrade Platform – Conceptual Overview

---

## Introduction

The User Pages constitute the main interface for registered users on the EcoTrade platform. They provide the core functionality: submitting and tracking material collection requests, and browsing and bidding in auctions. These pages form the heart of the user experience and are essential to the platform's recycling and scrap trading mission. Access requires a registered account.

---

## 1. Requests / Orders Page (طلباتك)

![Requests Page](../screen/User/userRequest.png)

**Purpose:** Submit and manage personal material collection and recycling requests.

**Contents:**
- **Hero Header:** Welcome banner with gradient background, page title "طلباتك" (Your Requests), and subtitle describing easy tracking and management.
- **Search Bar:** Search by address or scrap type to quickly find specific requests.
- **Actions:** Refresh button to reload data, and "إنشاء طلب جديد" (Create New Request) to open the creation form.
- **Status Filters:** Tabs to filter requests – All, Pending (قيد الانتظار), Completed (مكتمل), Canceled (ملغي), each showing the count.
- **Sort Options:** Dropdown to sort by newest first, oldest first, or by status.
- **Request Cards:** Each card displays images, address, scrap type, creation date, status badge, and completion/cancellation dates when applicable. Completed and pending requests use distinct visual styling (green border for completed, orange for pending).
- **Pagination:** When there are many requests, results are paginated (e.g., 9 per page) with navigation controls.

**Create Request Flow:** The user opens a popup, selects a location on an interactive map (address is auto-fetched), enters scrap type, uploads 1–5 images, and submits. Validation ensures required fields and image limits (max 5 images, 2MB each).

**Importance:** Requests are the primary way users offer materials for pickup and recycling. Clear status tracking, search, and filtering help users stay informed. The creation flow is straightforward and encourages participation. Admin notes (when added) keep users updated on their requests.

---

## 2. Auctions Listing Page (المزادات)

![Auctions Page](../screen/User/userAuction.png)

**Purpose:** Browse available auctions and find items to bid on.

**Contents:**
- **Hero Section:** Gradient header with title, live statistics (total auctions, active, completed, total bids), and a refresh button.
- **Search Bar:** Search auctions by item name.
- **Filters Toggle:** Expandable panel for advanced filters – status (all, active, closed, canceled), category (Metals, Plastics, Electronics, etc.), and sort order (newest, oldest, price, ending soon, popular).
- **View Modes:** Toggle between grid view (card layout) and list view (compact rows).
- **Results Count:** Displays how many auctions match the current filters.
- **Auction Cards:** Each card shows image slider, status badge (Active/Closed/Canceled), time remaining (for active auctions), item name, description preview, category badge, statistics (views, participants, bids), start price and current bid in euros, and an action button – "Enter Auction Room" for active auctions, or status label for closed/canceled.

**Importance:** This page is the gateway to bidding. Clear filters, search, and sorting help users find relevant auctions. Live stats and time remaining create urgency. The grid and list views cater to different preferences. Status and price information support informed bidding decisions.

---

## 3. Auction Room (غرفة المزاد)

![Auction Room](../screen/User/userAuctionRoom.png)

**Purpose:** View full auction details and place bids.

**Contents:**
- **Auction Details:** Images, full description, category, quantity, location, condition, weight, specifications, start price, current bid, and end date.
- **Time Remaining:** Live countdown until the auction ends.
- **Statistics:** Total bids, number of participants, and view count.
- **Bid History:** List of previous bids with bidder information and amounts.
- **Bidding Interface:** Input to place a new bid (e.g., via percentage increase). The system validates that the bid is higher than the current bid and that the auction is still open and not expired.
- **Actions:** Place bid, share, or other contextual buttons. Closed auctions display winner information instead of bid input.

**Importance:** The auction room is where users engage and compete. Full details build trust, the countdown creates urgency, and the bid history provides transparency. A clear, validated bidding flow reduces errors and disputes.

---

## Summary

| Page           | Primary Function              | Key Value                                      |
|----------------|-------------------------------|------------------------------------------------|
| Requests       | Submit and track pickups      | User demand for recycling services              |
| Auctions       | Browse and discover auctions  | Discovery and engagement                        |
| Auction Room   | Bid and view details          | Transaction completion and transparency         |

---

## Connection to Homepage

The design of these pages aligns with the EcoTrade homepage: green-to-blue gradients, clean white sections, rounded cards, and clear call-to-action buttons. This consistency reinforces brand identity and makes navigation familiar for users moving between the homepage and their personal areas.

---

Together, the Requests and Auctions pages form the core user experience of EcoTrade: from submitting materials for pickup to bidding on recyclable items in live auctions. They are essential for the platform's mission of smart recycling and scrap trading.
