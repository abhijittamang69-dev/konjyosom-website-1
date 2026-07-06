# Konjyosom Tech Solutions - System Architecture

## Overview
3-tier architecture: Frontend (HTML/CSS/JS) -> Backend API (Node.js/Express) -> Database (MongoDB)

## Components

### Frontend Layer
- **Public Site:** Static HTML pages with responsive design
- **Dashboards:** Role-based client/admin/technician interfaces
- **Panels:** Dedicated admin and technician management systems

### Backend Layer
- **API Server:** Express.js with RESTful endpoints
- **Authentication:** JWT-based with role middleware
- **File Storage:** Local uploads directory (reports, invoices, images)

### Data Layer
- **Database:** MongoDB with Mongoose ODM
- **Models:** User, Booking, Quotation, Technician, Assignment

## Security
- Password hashing with bcrypt (12 rounds)
- JWT token authentication
- Role-based access control
- Input validation on all endpoints

## Deployment
- Docker containerization
- Nginx reverse proxy
- MongoDB persistent storage

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, JavaScript (Vanilla) |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| Email | Nodemailer |
| Container | Docker, Docker Compose |
