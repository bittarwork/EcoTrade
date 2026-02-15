# Database Seed

Documentation for populating MongoDB with demo data.

## Prerequisites

- MongoDB running (local or Atlas)
- Backend `.env` configured with `MONGODB_URI`
- Dependencies installed: `npm install`

## Commands

```bash
cd backend

npm run seed        # Adds data only if database is empty
npm run seed:clear  # Clears all collections, then seeds fresh data
```

## Script Location

`backend/scripts/seed.js`

## Data Created

- 3 Users (1 admin, 2 regular)
- 3 Requests
- 4 Scrap Items
- 3 Auctions
- 3 Messages

## Demo Credentials

| Role  | Email               | Password  |
|-------|---------------------|-----------|
| Admin | admin@ecotrade.com   | Admin123! |
| User  | john@example.com    | User123!  |
| User  | jane@example.com    | User123!  |

## Note

Use `seed:clear` when you need a clean slate. Plain `seed` skips if data exists to avoid duplicate-key errors.
