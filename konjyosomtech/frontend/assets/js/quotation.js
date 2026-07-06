// ===== QUOTATION JS =====
document.addEventListener('DOMContentLoaded', () => {
    const quoteForm = document.getElementById('quotationForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(quoteForm));
            const quote = Store.add('quotations', {
                ...data,
                status: 'pending',
                userId: JSON.parse(localStorage.getItem('user') || '{}').id
            });
            showToast('Quotation request submitted! Ref: #' + quote.id);
            quoteForm.reset();
        });
    }

    // Load quotations table
    const quotesTable = document.getElementById('quotationsTable');
    if (quotesTable) {
        const quotes = Store.get('quotations');
        const tbody = quotesTable.querySelector('tbody');
        if (tbody) {
            tbody.innerHTML = quotes.map(q => `
                <tr>
                    <td>#${q.id}</td>
                    <td>${q.serviceCategory || 'General'}</td>
                    <td>${formatDate(q.createdAt)}</td>
                    <td><span class="status status-${q.status}">${q.status}</span></td>
                    <td>
                        <button class="btn-primary" style="padding:6px 12px;font-size:12px;" onclick="viewQuotation('${q.id}')">
                            <i class="fas fa-eye"></i> View
                        </button>
                    </td>
                </tr>
            `).join('') || '<tr><td colspan="5" style="text-align:center;padding:30px;color:var(--gray);">No quotations found</td></tr>';
        }
    }
});

function viewQuotation(id) {
    const quotes = Store.get('quotations');
    const q = quotes.find(x => x.id === id);
    if (!q) return;
    alert(`Quotation #${q.id}\nCategory: ${q.serviceCategory}\nStatus: ${q.status}\nBudget: ${q.budget || 'Not specified'}\nRequirements: ${q.requirements || 'N/A'}`);
}
