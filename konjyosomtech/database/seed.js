const mongoose = require('mongoose');
const User = require('../backend/models/User');
const connectDB = require('../backend/config/db');
const dotenv = require('dotenv');

dotenv.config({ path: '../backend/.env' });

const seedData = async () => {
    await connectDB();

    // Only seed if no admin exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
        console.log('Admin already exists. Skipping seed.');
        process.exit();
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@konjyosom.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Abhijit@2';

    const users = [
        { fullName: 'Admin User', email: adminEmail, phone: '9865057546', password: adminPassword, role: 'admin' },
    ];

    await User.insertMany(users);
    console.log('Admin created:', adminEmail);
    console.log('Seed complete');
    process.exit();
};

seedData();
