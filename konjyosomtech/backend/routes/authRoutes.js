const express = require('express');
const router = express.Router();
const { createTechnician, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

// Admin only: create technician accounts
router.post('/create-technician', protect, adminOnly, createTechnician);

// Login
router.post('/login', login);

// Get current user
router.get('/me', protect, getMe);

module.exports = router;
