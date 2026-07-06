const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
    try {
        const booking = await Booking.create({ ...req.body, userId: req.user.id });
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBookings = async (req, res) => {
    try {
        const filter = req.user.role === 'admin' ? {} : 
                      req.user.role === 'technician' ? { assignedTo: req.user.id } :
                      { userId: req.user.id };
        const bookings = await Booking.find(filter).populate('assignedTo', 'fullName');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
