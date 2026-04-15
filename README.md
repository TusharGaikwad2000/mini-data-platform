# InsightEngine™ - Mini Data Processing Platform

A full-stack Mini Data Processing platform designed to handle dynamic data ingestion, run complex transformation engines, and provide an analytical overview through a stunning premium interface.

## Tech Stack
- **Frontend**: React.js, Vite, Axios, Custom Vanilla CSS Glassmorphism Engine
- **Backend**: Node.js, Express.js
- **Database Architecture**: PostgreSQL (with Sequelize ORM) utilizing JSONB scaling.

## Setup Instructions

### 1. Database Configuration
Ensure PostgreSQL is running locally. Update the database credentials located in `backend/config/db.js` with your root Postgres password (if it is not `tushar`).

### 2. Backend Initialization
```bash
cd backend
npm install
# Boot up the server (It will automatically Sync DB and create Tables!)
npm start
```
The server will be running on `http://localhost:5000`.

### 3. Frontend Initialization
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
Open the application running on `http://localhost:5173/`.

---

## Architecture & Design Decisions

### 1. Unified Dynamic Schema Modeling
Instead of relying on rigid, pre-defined columns, the entire data model centers heavily around PostgreSQL's binary JSON format (`JSONB`). 
- **Datasets**: Tracks high level meta-data (name, file_type).
- **Records**: Connects to the dataset through foreign-key relationship and drops the entirety of the payload row into a `data` JSONB column.
This ensures ultimate flexibility; whether the user uploads `{ channel: "Instagram", revenue: 500 }` or `{ user: "Alice", age: 30 }`, the system adapts natively.

### 2. Secure Transformation Query Engine
Instead of blindly injecting user input into raw strings which triggers severe SQL injection vulnerabilities, the `query.service.js` carefully interpolates aggregation modes (`sum`, `count`, `avg`) and specifically assigns user-values into Sequelize Query Bindings `$index`.
- Generates dynamic aliases like `value` for computations and `group` for dimensionality cuts.

### 3. Glassmorphism Aesthetics
No CSS frameworks (like Tailwind) were used. The design utilizes Vanilla CSS methodologies leveraging CSS variables (`:root`), translucent backdrops, native glowing gradients, and specific `cubic-bezier()` transitions to convey a modern, premium experience.

## Assumptions Made
1. **Sanitization Limit:** CSV and JSON files are assumed to be structured logically within an Array block format (for bulk creating).
2. **Postgres Default Schema Engine:** Assumed the PostgreSQL daemon operates cleanly on port 5432 locally.
3. Users intend to perform primarily flat-json analysis.

## Edge Cases Handled
- **Missing / Incorrect Data Formats:** If a single JSON object object is accidentally passed instead of an array, the parser seamlessly injects it into an array matrix. Non CSV/JSON files are brutally blocked by UI bounds testing.
- **Failures in Parsing:** Wrapped inside Database Transactions. If bulk record creation crashes inside the SQL engine, the transaction strictly *rolls back* preventing empty "ghost" datasets from cluttering the schema.
