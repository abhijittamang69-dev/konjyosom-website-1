const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');

dotenv.config();
connectDB();

const app = express();

// Auto-seed admin on startup
(async () => {
    try {
        const adminExists = await User.findOne({ role: 'admin' });
        if (!adminExists) {
            const adminEmail = process.env.ADMIN_EMAIL || 'admin@konjyosom.com';
            const adminPassword = process.env.ADMIN_PASSWORD || 'Abhijit@2';
            await User.create({
                fullName: 'Admin User',
                email: adminEmail,
                phone: '9865057546',
                password: adminPassword,
                role: 'admin'
            });
            console.log('Admin auto-created:', adminEmail);
        }
    } catch (err) {
        console.error('Auto-seed error:', err.message);
    }
})();

// CORS - allow frontend domain
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'https://konjyosom-website-1.onrender.com',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/quotations', require('./routes/quotationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/technician', require('./routes/technicianRoutes'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', time: new Date().toISOString() }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
