# Mini Data Platform

## Setup

### Backend
cd backend
npm install
npm start

### Frontend
cd frontend
npm install
npm run dev

## Database
CREATE TABLE datasets (
  id SERIAL PRIMARY KEY,
  data JSONB
);
