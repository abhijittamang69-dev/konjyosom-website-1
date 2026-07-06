const mongoose = require('mongoose');

const technicianSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    specialization: [{ type: String }],
    experience: { type: Number, default: 0 },
    rating: { type: Number, default: 5 },
    jobsCompleted: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Technician', technicianSchema);
