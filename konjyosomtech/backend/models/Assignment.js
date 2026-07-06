const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    technicianId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['assigned', 'accepted', 'in-progress', 'completed'], default: 'assigned' },
    notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);
