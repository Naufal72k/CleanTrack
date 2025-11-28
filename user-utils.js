/**
 * CleanTrack Core Utilities (UPDATED)
 * File: user-utils.js
 * * UPDATE LOG:
 * - FIXED: Trash Images replaced with stable HD Unsplash URLs (No more broken images).
 * - UPDATE: Data initialization flag updated to force refresh.
 */

const KEYS = {
    REPORTS: 'shared_reports',      // Data Laporan
    USERS: 'shared_users',          // Data User
    TRANSACTIONS: 'shared_tx',      // Riwayat Transaksi
    CURRENT_SESSION: 'active_session', // User Login
    INIT_FLAG: 'cleanTrack_v8_hd_images' // Flag baru untuk memaksa reset data gambar
};

// ==========================================
// 0. ASSET LIBRARY (KOLEKSI GAMBAR REALISTIS & HD)
// ==========================================

// Koleksi Foto Sampah/Kebersihan Berkualitas Tinggi (Stable Unsplash IDs)
const TRASH_IMAGES = [
    "https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=600&auto=format&fit=crop", // Tumpukan Plastik (HD)
    "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=600&auto=format&fit=crop", // Botol Plastik Berserakan (HD)
    "https://images.unsplash.com/photo-1523293836945-3f9f872849de?q=80&w=600&auto=format&fit=crop", // Tong Sampah Penuh (HD)
    "https://images.unsplash.com/photo-1605600659908-0ef719419d41?q=80&w=600&auto=format&fit=crop", // Sampah di Pinggir Jalan (HD)
    "https://images.unsplash.com/photo-1621451537084-482c73073a0f?q=80&w=600&auto=format&fit=crop", // Sampah di Pantai/Pasir (HD)
    "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?q=80&w=600&auto=format&fit=crop", // Kardus/Kertas Bekas (HD)
    "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600&auto=format&fit=crop", // Sampah Elektronik/Kabel (HD)
    "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=600&auto=format&fit=crop"  // Sampah Industri/Pipa (HD)
];

// Koleksi Avatar Warga (Campuran Gender)
const USER_AVATARS = [
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop", // Naufal (Cool Guy)
    "https://randomuser.me/api/portraits/men/32.jpg", // Budi
    "https://randomuser.me/api/portraits/women/44.jpg", // Siti
    "https://randomuser.me/api/portraits/women/68.jpg", // Rina
    "https://randomuser.me/api/portraits/men/86.jpg", // Ahmad
    "https://randomuser.me/api/portraits/men/15.jpg", // Dedi
    "https://randomuser.me/api/portraits/women/65.jpg"  // Maya
];

// ==========================================
// 1. DATA FACTORY (PABRIK DATA OTOMATIS)
// ==========================================

(function initSharedData() {
    // Hanya jalankan jika data versi baru belum ada
    if (!sessionStorage.getItem(KEYS.INIT_FLAG)) {
        console.log("🚀 Initializing CleanTrack Realistic Data Ecosystem (HD Images)...");

        // --- A. GENERATE USERS (7 ORANG) ---
        const userNames = [
            "Naufal Ihsanul", "Budi Santoso", "Siti Aminah", 
            "Rina Wati", "Ahmad Dani", "Dedi Corbuzier", "Maya Esti"
        ];
        
        let users = [];
        // User Admin (Manual)
        users.push({
            id: 'ADM-001', name: 'Super Admin', email: 'admin', password: 'admin',
            role: 'ADMIN', phone: '-', 
            avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop', // Business man
            joined: '01/01/2025', status: 'Active', points: 9999
        });

        // Loop User Warga
        userNames.forEach((name, index) => {
            const isMainUser = index === 0; // Naufal user pertama
            users.push({
                id: `USR-00${index + 1}`,
                name: name,
                email: isMainUser ? 'naufal' : `user${index + 1}@mail.com`,
                password: '123',
                role: 'USER',
                phone: `0812${Math.floor(10000000 + Math.random() * 90000000)}`,
                // Gunakan avatar dari array USER_AVATARS
                avatar: USER_AVATARS[index] || `https://ui-avatars.com/api/?name=${name}`,
                joined: getRandomDate('year'), // Random gabung tahun ini
                status: index === 5 ? 'Blocked' : 'Active', // User ke-6 kita blokir buat demo
                points: isMainUser ? 150 : Math.floor(Math.random() * 500)
            });
        });
        sessionStorage.setItem(KEYS.USERS, JSON.stringify(users));


        // --- B. GENERATE REPORTS (NESTED LOOP) ---
        // UPDATE: Kategori dihapus, diganti hardcode "Laporan Kebersihan"
        
        const locations = [
            "Jl. Udayana, Mataram", "Taman Sangkareang", "Pasar Kebon Roek", 
            "Pantai Ampenan", "Jl. Majapahit", "Simpang Lima", "Taman Mayura",
            "Epicentrum Mall", "Universitas Mataram", "Jl. Pejanggik"
        ];
        const statuses = ['Pending', 'In Progress', 'Resolved', 'Rejected'];
        
        let reports = [];
        let reportCounter = 10000;

        // Loop User (Hanya role USER)
        users.filter(u => u.role === 'USER').forEach((user, uIndex) => {
            
            
            for (let i = 0; i < 6; i++) {
                
                // Distribusi Waktu
                let timeCategory = 'year';
                if (i === 0) timeCategory = 'today';
                else if (i <= 2) timeCategory = 'week';
                else if (i <= 4) timeCategory = 'month';

                const dateStr = getRandomDate(timeCategory);
                const status = statuses[Math.floor(Math.random() * statuses.length)];
                
                // PILIH FOTO SECARA ACAK DARI KOLEKSI HD
                const photoUrl = TRASH_IMAGES[Math.floor(Math.random() * TRASH_IMAGES.length)];

                // Admin Notes Logic
                let adminNotes = "";
                if (status === 'Rejected') adminNotes = "Foto bukti buram atau lokasi tidak dapat ditemukan tim lapangan.";
                if (status === 'Resolved') adminNotes = "Laporan selesai ditindaklanjuti. Area sudah bersih.";
                if (status === 'In Progress') adminNotes = "Tim kebersihan sedang menuju ke lokasi.";

                reports.push({
                    id: `CTR-${reportCounter++}`,
                    userId: user.id,
                    reporterName: user.name,
                    category: "Laporan Kebersihan", // HARDCODED (Sesuai Request)
                    location: locations[Math.floor(Math.random() * locations.length)],
                    description: `Ditemukan tumpukan sampah di area ${locations[Math.floor(Math.random() * locations.length)]}. Mengganggu kenyamanan warga.`,
                    status: status,
                    priority: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
                    date: dateStr,
                    photos: [photoUrl], 
                    rating: status === 'Resolved' && Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : null,
                    reviewContent: status === 'Resolved' ? "Respon sangat cepat, terima kasih!" : null,
                    adminNotes: adminNotes,
                    timeline: [{ status: 'Submitted', date: dateStr, latest: true }]
                });
            }
        });
        
        // Sort reports: Terbaru di atas
        reports.reverse();
        sessionStorage.setItem(KEYS.REPORTS, JSON.stringify(reports));


        // --- C. GENERATE TRANSACTIONS ---
        const txs = [
            { id: 'TX-001', date: getRandomDate('month'), type: 'CREDIT', amount: 50, description: 'Bonus Pengguna Baru' },
            { id: 'TX-002', date: getRandomDate('week'), type: 'CREDIT', amount: 100, description: 'Reward Laporan Sampah' },
            { id: 'TX-003', date: getRandomDate('today'), type: 'DEBIT', amount: 20, description: 'Tukar: Pulsa 5k' }
        ];
        sessionStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(txs));

        // Set Flag Selesai (Versi Baru)
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
        case 'today': 
            daysBack = 0; break;
        case 'week': 
            daysBack = Math.floor(Math.random() * 6) + 1; break;
        case 'month': 
            daysBack = Math.floor(Math.random() * 20) + 8; break;
        case 'year': 
            daysBack = Math.floor(Math.random() * 200) + 31; break;
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
    window.location.href = 'Login.html'; // Redirect to Login
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