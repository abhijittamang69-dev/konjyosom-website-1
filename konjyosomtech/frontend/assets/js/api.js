// ===== API JS =====
const API = {
    base: 'http://localhost:5000/api',

    async get(endpoint) {
        const token = localStorage.getItem('token');
        const res = await fetch(this.base + endpoint, {
            headers: token ? { 'Authorization': 'Bearer ' + token } : {}
        });
        return res.json();
    },

    async post(endpoint, data) {
        const token = localStorage.getItem('token');
        const res = await fetch(this.base + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': 'Bearer ' + token } : {})
            },
            body: JSON.stringify(data)
        });
        return res.json();
    },

    async put(endpoint, data) {
        const token = localStorage.getItem('token');
        const res = await fetch(this.base + endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': 'Bearer ' + token } : {})
            },
            body: JSON.stringify(data)
        });
        return res.json();
    },

    async delete(endpoint) {
        const token = localStorage.getItem('token');
        const res = await fetch(this.base + endpoint, {
            method: 'DELETE',
            headers: token ? { 'Authorization': 'Bearer ' + token } : {}
        });
        return res.json();
    }
};

// Local Storage fallback for demo
const Store = {
    get(key) { return JSON.parse(localStorage.getItem(key) || '[]'); },
    set(key, data) { localStorage.setItem(key, JSON.stringify(data)); },
    add(key, item) { const data = this.get(key); item.id = Date.now().toString(); item.createdAt = new Date().toISOString(); data.push(item); this.set(key, data); return item; },
    update(key, id, updates) { const data = this.get(key); const idx = data.findIndex(i => i.id === id); if (idx > -1) { data[idx] = { ...data[idx], ...updates }; this.set(key, data); } return data[idx]; },
    remove(key, id) { const data = this.get(key); this.set(key, data.filter(i => i.id !== id)); }
};
