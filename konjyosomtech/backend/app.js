const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/quotations', require('./routes/quotationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/technician', require('./routes/technicianRoutes'));

module.exports = app;
