// ===== AUTH JS =====
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'
    : (window.API_BASE_URL || 'https://konjyosom-website-1.onrender.com/api');

// Check if logged in
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return { token, user };
}

// Logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    const path = window.location.pathname;
    if (path.includes('/admin-panel/') || path.includes('/technician-panel/')) {
        window.location.href = '../frontend/login.html';
    } else {
        window.location.href = 'login.html';
    }
}

// Get dashboard URL by role
function getDashboardUrl(role) {
    if (role === 'admin') return '../admin-panel/dashboard.html';
    if (role === 'technician') return '../technician-panel/dashboard.html';
    return 'index.html';
}

// Update Nav for Auth
function updateAuthNav() {
    const { user } = checkAuth();
    const navLinks = document.getElementById('navLinks');
    if (!navLinks || !user.name) return;

    const loginLink = navLinks.querySelector('.btn-login');
    if (loginLink) {
        loginLink.outerHTML = `
            <div style="display:flex;align-items:center;gap:10px;">
                <a href="${getDashboardUrl(user.role)}" style="font-size:13px;font-weight:600;color:var(--primary);">
                    <i class="fas fa-user-circle"></i> ${user.name}
                </a>
                <a href="#" onclick="logout();return false;" style="font-size:13px;color:var(--danger);">
                    <i class="fas fa-sign-out-alt"></i>
                </a>
            </div>
        `;
    }
}

// Login
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(loginForm));
            try {
                const res = await fetch(`${API_BASE}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: data.email, password: data.password })
                });
                const result = await res.json();
                if (res.ok) {
                    localStorage.setItem('token', result.token);
                    localStorage.setItem('user', JSON.stringify(result.user));
                    showToast('Login successful! Redirecting...');
                    setTimeout(() => window.location.href = getDashboardUrl(result.user.role), 1500);
                    return;
                }
                showToast(result.message || 'Login failed', 'error');
            } catch (err) {
                // Fallback: demo mode if backend is offline
                const email = data.email.toLowerCase().trim();
                const password = data.password;
                let role, name;

                // Admin login
                if (email === 'admin@konjyosom.com' && password === 'Abhijit@2') {
                    role = 'admin';
                    name = 'Admin';
                } else {
                    // Check technician accounts created by admin
                    const techs = JSON.parse(localStorage.getItem('technicianAccounts') || '[]');
                    const tech = techs.find(t => t.email.toLowerCase() === email && t.password === password);
                    if (tech) {
                        role = 'technician';
                        name = tech.fullName;
                    } else {
                        showToast('Invalid email or password. Contact admin to create an account.', 'error');
                        return;
                    }
                }
                localStorage.setItem('token', 'demo-token-' + Date.now());
                localStorage.setItem('user', JSON.stringify({
                    id: 'u' + Date.now(),
                    name: name,
                    email: data.email,
                    role: role
                }));
                showToast('Login successful! (Demo mode) Redirecting...');
                setTimeout(() => window.location.href = getDashboardUrl(role), 1500);
            }
        });
    }

    updateAuthNav();
});
