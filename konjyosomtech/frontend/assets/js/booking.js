// ===== BOOKING JS =====
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(bookingForm));
            const booking = Store.add('bookings', {
                ...data,
                status: 'pending',
                userId: JSON.parse(localStorage.getItem('user') || '{}').id
            });
            showToast('Service booked successfully! Booking ID: #' + booking.id);
            bookingForm.reset();
        });
    }

    // Load bookings table
    const bookingsTable = document.getElementById('bookingsTable');
    if (bookingsTable) {
        const bookings = Store.get('bookings');
        const tbody = bookingsTable.querySelector('tbody');
        if (tbody) {
            tbody.innerHTML = bookings.map(b => `
                <tr>
                    <td>#${b.id}</td>
                    <td>${b.serviceType || 'General'}</td>
                    <td>${formatDate(b.preferredDate || b.createdAt)}</td>
                    <td><span class="status status-${b.status}">${b.status}</span></td>
                    <td>
                        <button class="btn-primary" style="padding:6px 12px;font-size:12px;" onclick="viewBooking('${b.id}')">
                            <i class="fas fa-eye"></i> View
                        </button>
                    </td>
                </tr>
            `).join('') || '<tr><td colspan="5" style="text-align:center;padding:30px;color:var(--gray);">No bookings found</td></tr>';
        }
    }
});

function viewBooking(id) {
    const bookings = Store.get('bookings');
    const b = bookings.find(x => x.id === id);
    if (!b) return;
    alert(`Booking #${b.id}\nService: ${b.serviceType}\nStatus: ${b.status}\nDate: ${formatDate(b.preferredDate || b.createdAt)}\nDescription: ${b.description || 'N/A'}`);
}
