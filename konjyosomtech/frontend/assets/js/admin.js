// ===== ADMIN JS =====
document.addEventListener('DOMContentLoaded', () => {
    const { user } = checkAuth();
    if (user.role !== 'admin' && window.location.pathname.includes('admin-panel')) {
        showToast('Access denied. Admin only.', 'error');
        setTimeout(() => window.location.href = '../frontend/login.html', 1500);
    }

    // Dashboard stats
    const statsEl = document.getElementById('adminStats');
    if (statsEl) {
        const bookings = Store.get('bookings');
        const quotes = Store.get('quotations');
        const users = Store.get('users');
        statsEl.innerHTML = `
            <div class="stat-card"><div class="stat-card-icon blue"><i class="fas fa-calendar-check"></i></div><div class="stat-card-info"><h3>${bookings.length}</h3><p>Total Bookings</p></div></div>
            <div class="stat-card"><div class="stat-card-icon orange"><i class="fas fa-file-invoice"></i></div><div class="stat-card-info"><h3>${quotes.length}</h3><p>Quotations</p></div></div>
            <div class="stat-card"><div class="stat-card-icon green"><i class="fas fa-users"></i></div><div class="stat-card-info"><h3>${users.length || 1}</h3><p>Registered Users</p></div></div>
            <div class="stat-card"><div class="stat-card-icon red"><i class="fas fa-wrench"></i></div><div class="stat-card-info"><h3>${Store.get('technicians').length || 0}</h3><p>Technicians</p></div></div>
        `;
    }

    // Load all data tables
    loadAdminTables();
});

function loadAdminTables() {
    // Bookings
    const bTable = document.getElementById('adminBookingsTable');
    if (bTable) {
        const bookings = Store.get('bookings');
        bTable.innerHTML = bookings.map(b => `
            <tr>
                <td>#${b.id}</td><td>${b.fullName || 'Guest'}</td><td>${b.serviceType || 'General'}</td>
                <td>${formatDate(b.preferredDate || b.createdAt)}</td>
                <td><span class="status status-${b.status}">${b.status}</span></td>
                <td>
                    <select onchange="updateBookingStatus('${b.id}', this.value)" style="padding:4px 8px;border-radius:4px;border:1px solid #ddd;font-size:12px;">
                        <option value="pending" ${b.status==='pending'?'selected':''}>Pending</option>
                        <option value="inprogress" ${b.status==='inprogress'?'selected':''}>In Progress</option>
                        <option value="completed" ${b.status==='completed'?'selected':''}>Completed</option>
                        <option value="cancelled" ${b.status==='cancelled'?'selected':''}>Cancelled</option>
                    </select>
                </td>
            </tr>
        `).join('') || '<tr><td colspan="6" style="text-align:center;padding:30px;">No bookings</td></tr>';
    }

    // Quotations
    const qTable = document.getElementById('adminQuotationsTable');
    if (qTable) {
        const quotes = Store.get('quotations');
        qTable.innerHTML = quotes.map(q => `
            <tr>
                <td>#${q.id}</td><td>${q.fullName || 'Guest'}</td><td>${q.serviceCategory || 'General'}</td>
                <td>${formatDate(q.createdAt)}</td>
                <td><span class="status status-${q.status}">${q.status}</span></td>
                <td><button class="btn-primary" style="padding:4px 10px;font-size:12px;" onclick="respondQuote('${q.id}')">Respond</button></td>
            </tr>
        `).join('') || '<tr><td colspan="6" style="text-align:center;padding:30px;">No quotations</td></tr>';
    }
}

function updateBookingStatus(id, status) {
    Store.update('bookings', id, { status });
    showToast('Status updated to ' + status);
    loadAdminTables();
}

function respondQuote(id) {
    const response = prompt('Enter your response/quote amount:');
    if (response) {
        Store.update('quotations', id, { status: 'responded', adminResponse: response });
        showToast('Response sent successfully');
        loadAdminTables();
    }
}
