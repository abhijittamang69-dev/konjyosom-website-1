const Booking = require('../models/Booking');

exports.getAssignedJobs = async (req, res) => {
    try {
        const jobs = await Booking.find({ assignedTo: req.user.id });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateJobStatus = async (req, res) => {
    try {
        const { status, report } = req.body;
        const update = { status };
        if (status === 'completed') {
            update.completedAt = new Date();
            update.report = report;
        }
        const job = await Booking.findByIdAndUpdate(req.params.id, update, { new: true });
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
