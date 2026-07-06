const express = require('express');
const router = express.Router();
const { getAssignedJobs, updateJobStatus } = require('../controllers/technicianController');
const { protect } = require('../middleware/authMiddleware');
const { technicianOnly } = require('../middleware/roleMiddleware');

router.get('/jobs', protect, technicianOnly, getAssignedJobs);
router.put('/jobs/:id', protect, technicianOnly, updateJobStatus);

module.exports = router;
