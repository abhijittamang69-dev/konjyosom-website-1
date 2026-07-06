exports.adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};

exports.technicianOnly = (req, res, next) => {
    if (req.user.role !== 'technician') {
        return res.status(403).json({ message: 'Technician access required' });
    }
    next();
};
