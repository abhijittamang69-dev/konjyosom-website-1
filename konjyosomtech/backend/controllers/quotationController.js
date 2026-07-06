const Quotation = require('../models/Quotation');

exports.createQuotation = async (req, res) => {
    try {
        const quote = await Quotation.create({ ...req.body, userId: req.user.id });
        res.status(201).json(quote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getQuotations = async (req, res) => {
    try {
        const filter = req.user.role === 'admin' ? {} : { userId: req.user.id };
        const quotes = await Quotation.find(filter);
        res.json(quotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.respondToQuotation = async (req, res) => {
    try {
        const quote = await Quotation.findByIdAndUpdate(req.params.id, {
            status: 'responded',
            adminResponse: req.body.response
        }, { new: true });
        res.json(quote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
