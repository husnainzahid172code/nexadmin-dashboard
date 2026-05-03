# NexAdmin — SaaS Admin Dashboard

A full-stack business analytics and inventory management dashboard built with React, Node.js, MongoDB, and JWT authentication.

**Live Demo:** [nexadmin.vercel.app](https://nexadmin.vercel.app)

---

## Features

- JWT Authentication — Secure login, protected routes
- Dashboard Overview — Revenue stats, order counts, key business metrics
- Area + Bar Charts — Monthly revenue trend and order volume (Recharts)
- Products Table — Search, filter by category, stock status badges
- Analytics Page — Line chart, bar chart, and pie chart breakdowns
- Settings Page — Profile editing, notification toggles, password change

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, Recharts, Lucide Icons |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Auth | JWT, bcryptjs |
| Deployment | Vercel (frontend), Render (backend) |

## Getting Started

### 1. Clone the repo
git clone https://github.com/yourusername/saas-dashboard.git

### 2. Setup backend
cd backend && npm install && cp .env.example .env
(Edit .env with your MongoDB URI and JWT secret)
node server.js

### 3. Setup frontend
npm install && npm run dev

### Demo login
Email: admin@nexadmin.com
Password: password123
(Works in demo mode without backend running)

## Project Structure

src/
  components/   Sidebar, Navbar, ProtectedRoute
  context/      AuthContext (JWT state)
  data/         Dummy data for charts and tables
  pages/        Login, Dashboard, Products, Analytics, Settings
backend/
  models/       User model
  routes/       Auth and dashboard API routes
  middleware/   JWT auth middleware
