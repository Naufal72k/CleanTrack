/**
 * CleanTrack Core Utilities (VERSION 12 - SYNC FIX & CLEAN SLATE)
 * File: user-utils.js
 */

const KEYS = {
    REPORTS: 'shared_reports',
    USERS: 'shared_users',
    TRANSACTIONS: 'shared_tx',
    REWARDS: 'shared_rewards', // Kunci yang SAMA dengan Admin
    CURRENT_SESSION: 'active_session',
    INIT_FLAG: 'cleanTrack_v12_sync_fix' // Versi baru untuk reset data otomatis
};

// ==========================================
// 0. ASSET LIBRARY (KOLEKSI GAMBAR REALISTIS & HD)
// ==========================================

// Koleksi Foto Sampah/Kebersihan Berkualitas Tinggi
const TRASH_IMAGES = [
    "https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=600&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=600&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1523293836945-3f9f872849de?q=80&w=600&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1605600659908-0ef719419d41?q=80&w=600&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1621451537084-482c73073a0f?q=80&w=600&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?q=80&w=600&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=600&auto=format&fit=crop"  
];

// Koleksi Avatar Warga
const USER_AVATARS = [
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop", // Naufal
    "https://randomuser.me/api/portraits/men/32.jpg", 
    "https://randomuser.me/api/portraits/women/44.jpg", 
    "https://randomuser.me/api/portraits/women/68.jpg", 
    "https://randomuser.me/api/portraits/men/86.jpg", 
    "https://randomuser.me/api/portraits/men/15.jpg", 
    "https://randomuser.me/api/portraits/women/65.jpg"  
];

// ==========================================
// 1. DATA FACTORY (PABRIK DATA OTOMATIS)
// ==========================================

(function initSharedData() {
    // Cek apakah data versi terbaru sudah ada
    if (!sessionStorage.getItem(KEYS.INIT_FLAG)) {
        console.log("🚀 Initializing CleanTrack Data (Clean History & Synced Rewards)...");

        // --- A. GENERATE USERS (POIN 0 UNTUK KEASLIAN) ---
        const userNames = [
            "Naufal Ihsanul", "Budi Santoso", "Siti Aminah", 
            "Rina Wati", "Ahmad Dani", "Dedi Corbuzier", "Maya Esti"
        ];
        
        let users = [];
        // User Admin (Manual)
        users.push({
            id: 'ADM-001', name: 'Super Admin', email: 'admin', password: 'admin',
            role: 'ADMIN', phone: '-', 
            avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop',
            joined: '01/01/2025', status: 'Active', points: 9999
        });

        // Loop User Warga
        userNames.forEach((name, index) => {
            const isMainUser = index === 0; // Naufal user pertama
            users.push({
                id: `USR-00${index + 1}`,
                name: name,
                email: isMainUser ? 'naufal' : `user${index + 1}@mail.com`,
                password: isMainUser ? '123' : '123',
                role: 'USER',
                phone: `0812${Math.floor(10000000 + Math.random() * 90000000)}`,
                avatar: USER_AVATARS[index] || `https://ui-avatars.com/api/?name=${name}`,
                joined: getRandomDate('year'), 
                status: index === 5 ? 'Blocked' : 'Active',
                points: 0 // CLEAN SLATE: Poin awal 0 agar realistis
            });
        });
        sessionStorage.setItem(KEYS.USERS, JSON.stringify(users));


        // --- B. GENERATE REWARDS (SINKRONISASI ADMIN & USER) ---
        // Kita buat data hadiah di sini agar User langsung melihatnya tanpa harus buka Admin dulu.
        const defaultRewards = [
            {
                id: 'RWD-001',
                name: 'Token PLN 20k',
                cost: 200,
                category: 'PLN',
                description: 'Voucher listrik prabayar nominal 20.000.',
                stock: 50,
                image: 'https://images.unsplash.com/photo-1550565118-c974fb636248?auto=format&fit=crop&w=300&q=80',
                api_provider: 'NUSANTARA_DATA',
                api_code: 'PLN20'
            },
            {
                id: 'RWD-002',
                name: 'Pulsa Reguler 10k',
                cost: 100,
                category: 'Pulsa',
                description: 'Pulsa All Operator masa aktif 30 hari.',
                stock: 100,
                image: 'https://images.unsplash.com/photo-1512428559087-560fa5ce7d5b?auto=format&fit=crop&w=300&q=80',
                api_provider: 'NUSANTARA_DATA',
                api_code: 'HPS10'
            },
            {
                id: 'RWD-003',
                name: 'Saldo GoPay 50k',
                cost: 500,
                category: 'E-Wallet',
                description: 'Top up saldo e-wallet instan tanpa biaya admin.',
                stock: 25,
                image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=300&q=80',
                api_provider: 'GOPAY_CORP',
                api_code: 'GOPAY50'
            }
        ];
        sessionStorage.setItem(KEYS.REWARDS, JSON.stringify(defaultRewards));


        // --- C. GENERATE REPORTS (Laporan Tetap Ada) ---
        const locations = [
            "Jl. Udayana, Mataram", "Taman Sangkareang", "Pasar Kebon Roek", 
            "Pantai Ampenan", "Jl. Majapahit", "Simpang Lima", "Taman Mayura",
            "Epicentrum Mall", "Universitas Mataram", "Jl. Pejanggik"
        ];
        const statuses = ['Pending', 'In Progress', 'Resolved', 'Rejected'];
        
        let reports = [];
        let reportCounter = 10000;

        users.filter(u => u.role === 'USER').forEach((user) => {
            // Kita kurangi jumlah laporan dummy agar tidak terlalu penuh
            for (let i = 0; i < 4; i++) {
                const dateStr = getRandomDate('month');
                const status = statuses[Math.floor(Math.random() * statuses.length)];
                const photoUrl = TRASH_IMAGES[Math.floor(Math.random() * TRASH_IMAGES.length)];

                let adminNotes = "";
                if (status === 'Rejected') adminNotes = "Foto bukti buram atau lokasi tidak valid.";
                if (status === 'Resolved') adminNotes = "Laporan selesai ditindaklanjuti.";
                if (status === 'In Progress') adminNotes = "Tim sedang menuju lokasi.";

                reports.push({
                    id: `CTR-${reportCounter++}`,
                    userId: user.id,
                    reporterName: user.name,
                    category: "Laporan Kebersihan",
                    location: locations[Math.floor(Math.random() * locations.length)],
                    description: `Ditemukan tumpukan sampah yang mengganggu di area ini.`,
                    status: status,
                    priority: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
                    date: dateStr,
                    photos: [photoUrl], 
                    rating: status === 'Resolved' && Math.random() > 0.5 ? 5 : null,
                    reviewContent: status === 'Resolved' ? "Terima kasih respon cepatnya!" : null,
                    adminNotes: adminNotes,
                    timeline: [{ status: 'Submitted', date: dateStr, latest: true }]
                });
            }
        });
        reports.reverse();
        sessionStorage.setItem(KEYS.REPORTS, JSON.stringify(reports));


        // --- D. GENERATE TRANSACTIONS (CLEAN HISTORY) ---
        // Array KOSONG agar akun terlihat baru dan bersih
        const txs = []; 
        sessionStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(txs));


        // Set Flag Selesai
        sessionStorage.setItem(KEYS.INIT_FLAG, 'true');
    }
})();

// ==========================================
// 2. HELPER: SMART DATE GENERATOR
// ==========================================
function getRandomDate(category) {
    const today = new Date();
    let pastDate = new Date(today);
    let daysBack = 0;

    switch(category) {
        case 'today': daysBack = 0; break;
        case 'week': daysBack = Math.floor(Math.random() * 6) + 1; break;
        case 'month': daysBack = Math.floor(Math.random() * 20) + 8; break;
        case 'year': daysBack = Math.floor(Math.random() * 200) + 31; break;
    }

    pastDate.setDate(today.getDate() - daysBack);
    return pastDate.toLocaleDateString('id-ID', {
        day: '2-digit', month: '2-digit', year: 'numeric'
    });
}

// ==========================================
// 3. POINT SYSTEM & CORE LOGIC
// ==========================================

function getCurrentBalance() {
    const session = getActiveSession();
    if (!session) return 0;
    const users = getSharedUsers();
    const freshUser = users.find(u => u.id === session.id);
    return freshUser ? freshUser.points : 0;
}

function updateUserPoints(userId, amount, description) {
    const users = getSharedUsers();
    const index = users.findIndex(u => u.id === userId);

    if (index !== -1) {
        users[index].points = (users[index].points || 0) + amount;
        saveSharedUsers(users);

        const txs = JSON.parse(sessionStorage.getItem(KEYS.TRANSACTIONS)) || [];
        txs.unshift({
            id: `TX-${Math.floor(Date.now()/1000)}`,
            userId: userId,
            date: new Date().toLocaleDateString('id-ID'),
            type: amount > 0 ? 'CREDIT' : 'DEBIT',
            amount: Math.abs(amount),
            description: description
        });
        sessionStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(txs));

        // Update active session if needed
        const currentSession = getActiveSession();
        if (currentSession && currentSession.id === userId) {
            currentSession.points = users[index].points;
            sessionStorage.setItem(KEYS.CURRENT_SESSION, JSON.stringify(currentSession));
        }

        window.dispatchEvent(new Event('walletUpdated'));
        window.dispatchEvent(new Event('profileUpdated'));
        return true;
    }
    return false;
}

function generateRedeemCode(type) {
    if (type === 'PLN') {
        let token = "";
        for (let i = 0; i < 5; i++) {
            let block = Math.floor(1000 + Math.random() * 9000);
            token += block + (i < 4 ? "-" : "");
        }
        return token;
    } else {
        return "V-" + Math.random().toString(36).substring(2, 8).toUpperCase() + "-2025";
    }
}

// ==========================================
// 4. DATABASE ACCESSORS
// ==========================================

function getSharedUsers() { return JSON.parse(sessionStorage.getItem(KEYS.USERS)) || []; }
function saveSharedUsers(u) { sessionStorage.setItem(KEYS.USERS, JSON.stringify(u)); }

function getSharedReports() { return JSON.parse(sessionStorage.getItem(KEYS.REPORTS)) || []; }
function saveSharedReports(r) { 
    sessionStorage.setItem(KEYS.REPORTS, JSON.stringify(r)); 
    window.dispatchEvent(new Event('storageUpdated')); 
}

function getTransactionHistory() {
    const session = getActiveSession();
    const all = JSON.parse(sessionStorage.getItem(KEYS.TRANSACTIONS)) || [];
    if(!session) return [];
    // Filter transaksi hanya milik user yang sedang login
    return all.filter(tx => !tx.userId || tx.userId === session.id);
}

// ==========================================
// 5. AUTHENTICATION & SESSION
// ==========================================

function getActiveSession() { return JSON.parse(sessionStorage.getItem(KEYS.CURRENT_SESSION)); }

function loginUser(email, password) {
    const users = getSharedUsers();
    const found = users.find(u => (u.email === email || u.name === email) && u.password === password);
    
    if (found) {
        if(found.status === 'Blocked') return { success: false, message: 'Akun diblokir Admin.' };
        
        const sessionData = { ...found };
        delete sessionData.password;
        sessionStorage.setItem(KEYS.CURRENT_SESSION, JSON.stringify(sessionData));
        return { success: true };
    }
    return { success: false, message: 'Login gagal.' };
}

function logoutUser() {
    sessionStorage.removeItem(KEYS.CURRENT_SESSION);
    window.location.href = 'Login.html'; 
}

function requireLogin() {
    const session = getActiveSession();
    if (!session) { window.location.href = 'Login.html'; return null; }
    
    const users = getSharedUsers();
    const fresh = users.find(u => u.id === session.id);
    if(!fresh || fresh.status === 'Blocked') {
        alert("Sesi berakhir atau akun diblokir.");
        logoutUser();
        return null;
    }
    return fresh;
}

// ==========================================
// 6. UI HELPERS
// ==========================================

function getStatusConfig(status) {
    switch (status) {
        case 'Resolved': return { badge: 'bg-green-100 text-green-700 border-green-200', icon: 'check_circle' };
        case 'In Progress': return { badge: 'bg-blue-100 text-blue-700 border-blue-200', icon: 'sync' };
        case 'Pending': return { badge: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: 'hourglass_top' };
        case 'Rejected': return { badge: 'bg-red-100 text-red-700 border-red-200', icon: 'cancel' };
        default: return { badge: 'bg-gray-100 text-gray-600 border-gray-200', icon: 'help' };
    }
}