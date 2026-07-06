# Konjyosom Tech Solutions Pvt. Ltd.

Full-stack web application for Konjyosom Tech Solutions - IT service company based at Konjyosom 4, Nepal.

## Company Info
- **Name:** Konjyosom Tech Solutions Pvt. Ltd.
- **Location:** Konjyosom 4, Nepal
- **Phone:** 9865057546
- **Email:** abhijittamang69@gmail.com

## Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend
Open `frontend/index.html` in browser or serve with any static server.

### Docker
```bash
docker-compose up -d
```

## Features
- Public website (Home, About, Services, Contact)
- Client booking & quotation system
- Admin dashboard with full management
- Technician panel with job tracking
- Role-based authentication (JWT)
- Responsive design
- Email notifications

## API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/auth/register | POST | User registration |
| /api/auth/login | POST | User login |
| /api/bookings | POST/GET | Create/List bookings |
| /api/quotations | POST/GET | Create/List quotations |
| /api/admin/stats | GET | Dashboard statistics |
| /api/technician/jobs | GET | Get assigned jobs |

## Project Structure
```
konjyosomtech/
├── frontend/          # Public Website (HTML/CSS/JS)
├── backend/           # Node.js API Server
├── admin-panel/       # Admin Dashboard
├── technician-panel/  # Technician System
├── database/          # Schema & Seed
├── uploads/           # File storage
└── docs/              # Documentation
```

## License
Copyright 2025 Konjyosom Tech Solutions Pvt. Ltd.
