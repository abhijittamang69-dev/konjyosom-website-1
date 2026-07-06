const express = require('express');
const router = express.Router();
const { createQuotation, getQuotations, respondToQuotation } = require('../controllers/quotationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createQuotation);
router.get('/', protect, getQuotations);
router.put('/:id/respond', protect, respondToQuotation);

module.exports = router;
