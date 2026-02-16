# EcoTrade

A full-stack web application for a recycling company, enabling users to request mobile scrap collection and participate in online auctions for recycled materials. The platform promotes sustainability by connecting material providers with buyers through a transparent, fair market mechanism.

---

## ⚠️ IMPORTANT: Usage & License Notice

**This project is for PORTFOLIO AND DEMONSTRATION PURPOSES ONLY.**

- **No use without explicit permission:** This project, its code, design, and any associated assets **cannot be used under any circumstances** without the prior written consent of the author.
- **Showcase purpose:** The project is intended solely to demonstrate the software development capabilities and work methodology of the author as a software developer.
- **Exclusive authorization:** Any use—including but not limited to cloning, forking, modifying, deploying, or commercial use—**must be authorized exclusively by the author upon direct request.**
- **All rights reserved.**

---

## Table of Contents

- [Project Overview](#project-overview)
- [Vision & Philosophy](#vision--philosophy)
- [Technical Stack](#technical-stack)
- [Project Structure](#project-structure)
- [Database & Architecture](#database--architecture)
- [Diagrams](#diagrams)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Demo Credentials](#demo-credentials)
- [Documentation](#documentation)

---

## Project Overview

EcoTrade addresses the gap between individuals and businesses who possess recyclable materials and buyers who struggle to access them easily. The platform acts as a bridge, connecting supply and demand through:

1. **Material collection requests** – Users request a mobile seller to pick up scrap materials.
2. **Online auctions** – Users bid on recycled materials in a fair, transparent auction format.

The platform supports the circular economy by facilitating the flow of materials from end consumers to processors and manufacturers.

---

## Vision & Philosophy

### Core Principles

- **Waste as a resource:** Materials such as metals, plastics, electronics, paper, and furniture are potential inputs for recycling and manufacturing.
- **Transparency & fairness:** Auctions ensure prices are determined by actual demand and visible competition.
- **Simplicity:** Register → Submit request or join auction → Complete transaction.

### Strategic Objectives

| Objective | Description |
|-----------|-------------|
| Transparent market | Reduce fragmentation; prices determined by real demand |
| Simplified disposal | Connect individuals and small shops with collection entities |
| Circular economy | Return materials to the production cycle instead of landfills |
| Environmental awareness | Combine personal benefit with environmental interest |

### Target Users

- **Material providers:** Individuals, enterprises, shops, and institutions.
- **Material buyers:** Recycling companies, scrap dealers, investors.
- **Administrators:** Manage workflow from requests through auctions to fulfillment.

---

## Technical Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 18, React Router, Axios, Leaflet (maps), Chart.js, Socket.io-client, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens) |
| **Real-time** | Socket.io |
| **Scheduling** | node-cron (auction expiration, status updates) |
| **File upload** | Multer |
| **Email** | Nodemailer |

---

## Project Structure

```
EcoTrade/
├── backend/                 # Node.js + Express API
│   ├── controllers/         # Request handlers
│   ├── models/              # Mongoose schemas (User, Request, ScrapItem, Auction, Message)
│   ├── routes/              # API routes
│   ├── middleware/          # Auth, validation
│   ├── scheduled/           # Cron jobs
│   ├── scripts/             # Seed script
│   └── server.js
├── frontend/                # React SPA
│   ├── src/
│   │   ├── components/
│   │   ├── pages/           # User & Admin pages
│   │   ├── context/         # User/auth context
│   │   └── ...
│   └── package.json
├── documentation/           # Detailed project documentation
│   ├── project-overview.md
│   ├── user-pages-complete-documentation.md
│   ├── admin-dashboard.md
│   └── seed.md
├── screen/                  # Screenshots and diagrams
│   ├── User/                # User interface screenshots
│   ├── Admin/               # Admin dashboard screenshots
│   └── diagram/             # ERD and Use Case diagrams
└── README.md
```

---

## Database & Architecture

### Main Entities

| Entity | Description |
|--------|-------------|
| **User** | name, email, password, role (user/admin) |
| **Request** | userId, address, scrapType, images, position, status (pending/completed/canceled) |
| **ScrapItem** | name, description, category, quantity, status, estimatedPrice, source, userRequestId |
| **Auction** | itemName, description, category, startPrice, bids, endDate, status (open/closed/canceled) |
| **Message** | customerName, email, message (contact form) |

### Entity Relationships

- **User** → **Request** (one-to-many)
- **Request** → **ScrapItem** (optional, via userRequestId)
- **Auction** → **User** (currentBidder, winner, bids)
- **ScrapItem** categories: Metals, Plastics, Electronics, Paper and Cardboard, Furniture

### Request Status Flow

`pending` → `completed` or `canceled`

### ScrapItem Status Flow

`Received` → `Processed` → `Ready for Recycling` → `Ready for Auction`

### Auction Status Flow

`open` → `closed` or `canceled`

---

## Diagrams

Project diagrams are available in the `screen/diagram/` folder:

- **ERD (Entity-Relationship Diagram):** Database schema and relationships between entities.
- **Use Case Diagram:** Actors (User, Admin) and their interactions with the system.

Refer to these diagrams for a visual overview of the system architecture and user flows.

---

## Features

### User Portal

| Feature | Description |
|---------|-------------|
| **Requests / Orders** | Create and track material collection requests. Search, filter by status, sort. Interactive map for location selection. Upload 1–5 images per request. |
| **Auctions Listing** | Browse auctions with filters (status, category), search, grid/list views. Live stats (total, active, completed, bids). |
| **Auction Room** | View full details, countdown, bid history. Place bids with validation. Winner display when closed. |

### Admin Dashboard

| Feature | Description |
|---------|-------------|
| **Main Dashboard** | Summary stats (users, orders, auctions, materials, messages). Order and auction status distribution. Quick actions. |
| **User Management** | List, filter, search users. Add, edit, delete. Role management (admin/user). |
| **Materials Management** | CRUD for scrap items. Category and status filters. Analytics view. |
| **Auctions Management** | Create, cancel, close, delete auctions. Status and category filters. |
| **Auction Room (Admin)** | View bids, winner info, close/cancel/delete with confirmation. |
| **Messages** | View and manage contact form submissions. Analytics and date filters. |
| **Orders / Requests** | Manage collection requests. Status workflow and user details. |

---

## Installation

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- npm or yarn

### Steps

1. **Clone the repository** (for authorized use only):

   ```bash
   git clone https://github.com/your-username/EcoTrade.git
   cd EcoTrade
   ```

2. **Install backend dependencies:**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**

   ```bash
   cd ../frontend
   npm install
   ```

---

## Configuration

Create a `.env` file in the `backend/` directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Optionally configure Nodemailer and other services as needed for your environment.

---

## Running the Application

1. **Start the backend** (from `backend/`):

   ```bash
   npm start
   ```

2. **Start the frontend** (from `frontend/`, in a new terminal):

   ```bash
   npm start
   ```

3. Open `http://localhost:3000` in your browser.

### Database Seeding

To populate the database with demo data:

```bash
cd backend
npm run seed        # Adds data only if database is empty
npm run seed:clear  # Clears all collections, then seeds fresh data
```

---

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@ecotrade.com | Admin123! |
| User | john@example.com | User123! |
| User | jane@example.com | User123! |

---

## Documentation

Detailed documentation is available in the `documentation/` folder:

| File | Content |
|------|---------|
| `project-overview.md` | Vision, philosophy, objectives, target groups |
| `user-pages-complete-documentation.md` | User pages: Requests, Auctions, Auction Room |
| `admin-dashboard.md` | Admin dashboard sections and features |
| `seed.md` | Database seeding instructions |

---

## Currency & Dates

- **Currency:** Euro (€)
- **Dates:** Gregorian (ISO 8601)

---

*EcoTrade — Demonstrating sustainable recycling through a transparent, digital marketplace.*
