// MongoDB Schema Definitions for Konjyosom Tech Solutions

const schemas = {
    users: {
        fullName: String,
        email: { type: String, unique: true },
        phone: String,
        password: String,
        role: { type: String, enum: ['client', 'admin', 'technician'] },
        isActive: Boolean
    },
    bookings: {
        fullName: String,
        email: String,
        phone: String,
        serviceType: String,
        preferredDate: Date,
        address: String,
        description: String,
        status: { type: String, enum: ['pending', 'inprogress', 'completed', 'cancelled'] },
        userId: { type: 'ObjectId', ref: 'User' },
        assignedTo: { type: 'ObjectId', ref: 'User' }
    },
    quotations: {
        fullName: String,
        companyName: String,
        email: String,
        phone: String,
        serviceCategory: String,
        budget: String,
        requirements: String,
        status: { type: String, enum: ['pending', 'responded', 'approved', 'rejected'] },
        adminResponse: String
    }
};

module.exports = schemas;
