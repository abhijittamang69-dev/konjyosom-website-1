const axios = require('axios');

// Resend is free: 3,000 emails/month. Sign up at https://resend.com
// Get your API key from the dashboard and add it to your .env file
const RESEND_API_KEY = process.env.RESEND_API_KEY;

// SMTP fallback (for any email provider: SendGrid, Brevo, Gmail, etc.)
const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.resend.com';
const EMAIL_PORT = process.env.EMAIL_PORT || 587;
const EMAIL_USER = process.env.EMAIL_USER || 'resend';
const EMAIL_PASS = process.env.EMAIL_PASS || RESEND_API_KEY;

// Primary: Send via Resend REST API (free, easiest)
exports.sendEmail = async (to, subject, html) => {
    if (!RESEND_API_KEY) {
        console.warn('No RESEND_API_KEY set. Email not sent. Add it to your .env file.');
        return { sent: false, reason: 'No API key configured' };
    }
    try {
        const res = await axios.post('https://api.resend.com/emails', {
            from: 'Konjyosom Tech <noreply@konjyosom.com>',
            to: [to],
            subject: subject,
            html: html
        }, {
            headers: { Authorization: `Bearer ${RESEND_API_KEY}` }
        });
        console.log('Email sent to', to, '— ID:', res.data.id);
        return { sent: true, id: res.data.id };
    } catch (error) {
        console.error('Email failed:', error.response?.data?.message || error.message);
        return { sent: false, reason: error.message };
    }
};

// Booking confirmation email
exports.sendBookingConfirmation = async (to, booking) => {
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <h2 style="color: #1a237e;">Booking Confirmed</h2>
            <p>Your service booking has been received.</p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 6px; margin: 15px 0;">
                <p><strong>Booking ID:</strong> #${booking.id}</p>
                <p><strong>Service:</strong> ${booking.serviceType}</p>
                <p><strong>Date:</strong> ${booking.preferredDate || 'To be confirmed'}</p>
            </div>
            <p>We will contact you shortly to confirm the details.</p>
            <p style="color: #666; font-size: 12px; margin-top: 20px;">Konjyosom Tech Solutions Pvt. Ltd. | Konjyosom 4, Nepal</p>
        </div>
    `;
    return await exports.sendEmail(to, 'Booking Confirmation - Konjyosom Tech', html);
};

// Technician assignment notification
exports.sendJobAssigned = async (to, job) => {
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #1a237e;">New Job Assigned</h2>
            <p>A new service job has been assigned to you.</p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 6px; margin: 15px 0;">
                <p><strong>Job ID:</strong> #${job.id}</p>
                <p><strong>Service:</strong> ${job.serviceType}</p>
                <p><strong>Client:</strong> ${job.fullName}</p>
                <p><strong>Location:</strong> ${job.address || 'N/A'}</p>
            </div>
            <p>Please check your technician dashboard for full details.</p>
        </div>
    `;
    return await exports.sendEmail(to, 'New Job Assigned - Konjyosom Tech', html);
};

// Quotation response email
exports.sendQuotationResponse = async (to, quotation) => {
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #1a237e;">Quotation Response</h2>
            <p>Your quotation request has been reviewed.</p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 6px; margin: 15px 0;">
                <p><strong>Quotation ID:</strong> #${quotation.id}</p>
                <p><strong>Category:</strong> ${quotation.serviceCategory}</p>
                <p><strong>Status:</strong> ${quotation.status}</p>
            </div>
            <p>Admin response: ${quotation.adminResponse || 'Will contact you shortly'}</p>
        </div>
    `;
    return await exports.sendEmail(to, 'Quotation Update - Konjyosom Tech', html);
};
