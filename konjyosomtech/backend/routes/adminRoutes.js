const express = require('express');
const router = express.Router();
const { getDashboardStats, getAllUsers, assignWork } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

router.get('/stats', protect, adminOnly, getDashboardStats);
router.get('/users', protect, adminOnly, getAllUsers);
router.post('/assign', protect, adminOnly, assignWork);

module.exports = router;
