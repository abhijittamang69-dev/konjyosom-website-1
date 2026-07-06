// ===== TECHNICIAN JS =====
document.addEventListener('DOMContentLoaded', () => {
    const { user } = checkAuth();
    if (user.role !== 'technician' && window.location.pathname.includes('technician-panel')) {
        showToast('Access denied. Technicians only.', 'error');
        setTimeout(() => window.location.href = '../frontend/login.html', 1500);
    }

    // Load assigned jobs
    const jobsTable = document.getElementById('techJobsTable');
    if (jobsTable) {
        const bookings = Store.get('bookings').filter(b => b.assignedTo === user.id || !b.assignedTo);
        jobsTable.innerHTML = bookings.map(b => `
            <tr>
                <td>#${b.id}</td><td>${b.serviceType || 'General'}</td><td>${b.fullName || 'Client'}</td>
                <td>${formatDate(b.preferredDate || b.createdAt)}</td>
                <td><span class="status status-${b.status}">${b.status}</span></td>
                <td>
                    ${b.status === 'pending' ? `<button class="btn-success" style="padding:4px 10px;font-size:12px;" onclick="acceptJob('${b.id}')">Accept</button>` : ''}
                    ${b.status === 'inprogress' ? `<button class="btn-primary" style="padding:4px 10px;font-size:12px;" onclick="completeJob('${b.id}')">Complete</button>` : ''}
                </td>
            </tr>
        `).join('') || '<tr><td colspan="6" style="text-align:center;padding:30px;">No jobs assigned</td></tr>';
    }
});

function acceptJob(id) {
    const { user } = checkAuth();
    Store.update('bookings', id, { status: 'inprogress', assignedTo: user.id });
    showToast('Job accepted!');
    location.reload();
}

function completeJob(id) {
    const report = prompt('Enter completion report:');
    if (report) {
        Store.update('bookings', id, { status: 'completed', report, completedAt: new Date().toISOString() });
        showToast('Job marked as completed!');
        location.reload();
    }
}
