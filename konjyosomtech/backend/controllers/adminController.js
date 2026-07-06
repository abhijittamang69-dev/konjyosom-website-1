const User = require('../models/User');
const Booking = require('../models/Booking');
const Quotation = require('../models/Quotation');

exports.getDashboardStats = async (req, res) => {
    try {
        const [totalBookings, totalQuotations, totalUsers, totalTechnicians] = await Promise.all([
            Booking.countDocuments(),
            Quotation.countDocuments(),
            User.countDocuments(),
            User.countDocuments({ role: 'technician' })
        ]);
        res.json({ totalBookings, totalQuotations, totalUsers, totalTechnicians });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.assignWork = async (req, res) => {
    try {
        const { bookingId, technicianId } = req.body;
        const booking = await Booking.findByIdAndUpdate(bookingId, {
            assignedTo: technicianId,
            status: 'inprogress'
        }, { new: true });
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
