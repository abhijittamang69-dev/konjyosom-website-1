const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    companyName: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    serviceCategory: { type: String, required: true },
    budget: { type: String },
    requirements: { type: String, required: true },
    status: { type: String, enum: ['pending', 'responded', 'approved', 'rejected'], default: 'pending' },
    adminResponse: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Quotation', quotationSchema);
