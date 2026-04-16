# InsightEngine - Mini Data Processing Platform

A full-stack Mini Data Processing platform designed to handle dynamic data ingestion, run complex transformation engines, and provide an analytical overview through a stunning premium interface.

## Tech Stack
- **Frontend**: React.js, Vite, Axios, Tailwind CSS v4
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

### 4. Sample Datasets
For testing and demonstration purposes, we have included sample records.
- Navigate to the `sample_datasets/` folder in the root directory.
- You can upload `sales_data.csv` and `users_data.json` directly into the web application to test dynamic schemas and querying capabilities!

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
The project originally used standard Vanilla CSS, but the frontend UI was migrated and refactored dynamically to use **Tailwind CSS v4**. It leverages native glowing gradients, custom keyframe transitions, and arbitrary backdrop-blur values to convey a modern, premium experience rapidly.

## Assumptions Made
1. **Sanitization Limit:** CSV and JSON files are assumed to be structured logically within an Array block format (for bulk creating).
2. **Postgres Default Schema Engine:** Assumed the PostgreSQL daemon operates cleanly on port 5432 locally.
3. Users intend to perform primarily flat-json analysis.

## Edge Cases Handled
- **Missing / Incorrect Data Formats:** If a single JSON object object is accidentally passed instead of an array, the parser seamlessly injects it into an array matrix. Non CSV/JSON files are brutally blocked by UI bounds testing.
- **Failures in Parsing:** Wrapped inside Database Transactions. If bulk record creation crashes inside the SQL engine, the transaction strictly *rolls back* preventing empty "ghost" datasets from cluttering the schema.


## 📊 Test Cases (sales_data.csv)

1. Total Revenue
Input:
Filter: none
Group By: none
Aggregation: sum
Field: revenue
Output:
183500

2. Filter (Instagram)
Input:
Filter Field: channel
Filter Value: Instagram
Group By: none
Aggregation: sum
Field: revenue
Output:
12900

3. Group By Channel
Input:
Filter: none
Group By: channel
Aggregation: sum
Field: revenue
Output:
Instagram: 12900
Facebook: 12600
Google: 158000

4. Filter + Group (India)
Input:
Filter Field: region
Filter Value: India
Group By: channel
Aggregation: sum
Field: revenue
Output:
Instagram: 7000
Facebook: 6000
Google: 42000

5. Count by Channel
Input:
Filter: none
Group By: channel
Aggregation: count
Field: id
Output:
Instagram: 5
Facebook: 5
Google: 5

6. Average Revenue
Input:
Filter: none
Group By: channel
Aggregation: average
Field: revenue
Output:
Instagram: 2580
Facebook: 2520
Google: 31600

## ⚠️ Edge Cases

Invalid Field
Input:
Filter Field: abc
Output:
Error: Invalid field

No Data Found
Input:
Filter Field: channel
Filter Value: WhatsApp
Output:
No data found

Wrong Aggregation Field
Input:
Aggregation Field: channel
Output:
Error: Invalid aggregation field