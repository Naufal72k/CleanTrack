/**
 * CleanTrack Admin Utilities (INTEGRATED & UPDATED)
 * File: admin-utils.js
 * Deskripsi: 
 * - Jembatan antara Halaman Admin dan Session Storage.
 * - Menangani CRUD Laporan, User, dan Rewards.
 * - Menyediakan fitur Export CSV dan Filter Tanggal.
 */

// KUNCI DATABASE (Harus sinkron dengan user-utils.js)
const KEYS = {
    REPORTS: 'shared_reports',
    USERS: 'shared_users',
    REWARDS: 'shared_rewards' // Key baru untuk hadiah
};

// ==========================================
// 1. DATABASE ACCESS (READ/WRITE)
// ==========================================

// --- LAPORAN ---
function getReports() {
    const data = sessionStorage.getItem(KEYS.REPORTS);
    return data ? JSON.parse(data) : [];
}

function saveReports(reports) {
    sessionStorage.setItem(KEYS.REPORTS, JSON.stringify(reports));
    window.dispatchEvent(new Event('storageUpdated'));
}

function getReportById(id) {
    return getReports().find(r => r.id === id);
}

// --- USERS ---
function getUsers() {
    const data = sessionStorage.getItem(KEYS.USERS);
    return data ? JSON.parse(data) : [];
}

function saveUsers(users) {
    sessionStorage.setItem(KEYS.USERS, JSON.stringify(users));
}

// --- REWARDS (BARU) ---
function getRewards() {
    // Inisialisasi jika belum ada
    if (!sessionStorage.getItem(KEYS.REWARDS)) initRewards();
    return JSON.parse(sessionStorage.getItem(KEYS.REWARDS));
}

function saveRewards(rewards) {
    sessionStorage.setItem(KEYS.REWARDS, JSON.stringify(rewards));
}

// ==========================================
// 2. INITIALIZATION & DATA SEEDING
// ==========================================

function initAdminData() {
    const reports = getReports();
    const users = getUsers();
    
    // Pastikan data rewards juga siap
    initRewards();

    if (reports.length === 0 && users.length === 0) {
        console.warn("[CleanTrack Admin] Database Laporan/User Kosong.");
    } else {
        console.log(`[CleanTrack Admin] Ready. Laporan: ${reports.length}, User: ${users.length}`);
    }
}

/**
 * Membuat data dummy hadiah jika database kosong.
 * Agar halaman UserProfile.html punya data untuk ditampilkan.
 */
function initRewards() {
    if (!sessionStorage.getItem(KEYS.REWARDS)) {
        const dummies = [
            {
                id: 'RWD-001',
                name: 'Token PLN 20k',
                cost: 100,
                category: 'PLN',
                description: 'Voucher listrik prabayar nominal 20.000.',
                stock: 50,
                api_provider: 'NUSANTARA_DATA',
                api_code: 'PLN20'
            },
            {
                id: 'RWD-002',
                name: 'Pulsa Reguler 10k',
                cost: 50,
                category: 'Pulsa',
                description: 'Pulsa All Operator masa aktif 30 hari.',
                stock: 100,
                api_provider: 'NUSANTARA_DATA',
                api_code: 'HPS10'
            },
            {
                id: 'RWD-003',
                name: 'Saldo GoPay 50k',
                cost: 250,
                category: 'E-Wallet',
                description: 'Top up saldo e-wallet instan tanpa biaya admin.',
                stock: 25,
                api_provider: 'GOPAY_CORP',
                api_code: 'GOPAY50'
            }
        ];
        sessionStorage.setItem(KEYS.REWARDS, JSON.stringify(dummies));
        console.log("[CleanTrack] Data Rewards diinisialisasi.");
    }
}

// ==========================================
// 3. EXPORT ENGINE (CSV)
// ==========================================

/**
 * Mengonversi data laporan menjadi file CSV dan memicu download.
 */
function exportToCSV(data) {
    if (!data || data.length === 0) {
        alert("Tidak ada data untuk diunduh.");
        return;
    }

    // 1. Definisikan Header CSV
    const headers = ["ID Laporan", "Tanggal", "Pelapor", "Kategori", "Lokasi", "Status", "Prioritas", "Rating User", "Komentar User"];
    
    // 2. Map Data ke Baris CSV
    const rows = data.map(r => {
        // Bersihkan data teks dari koma agar tidak merusak format CSV
        const cleanLoc = r.location ? r.location.replace(/,/g, ' ') : '-';
        const cleanCat = r.category ? r.category.replace(/,/g, ' ') : '-';
        const cleanComment = r.userComment ? r.userComment.replace(/,/g, ' ') : '-';

        return [
            r.id,
            r.date,
            r.reporterName || 'Anonim',
            cleanCat,
            cleanLoc,
            r.status,
            r.priority || 'Medium',
            r.rating || 0, // Rating (0-5)
            cleanComment   // Komentar User
        ].join(",");
    });

    // 3. Gabungkan Header dan Baris
    const csvContent = [headers.join(","), ...rows].join("\n");

    // 4. Buat Blob dan Link Download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    // Nama file dinamis: laporan-cleantrack-DD-MM-YYYY.csv
    const today = new Date().toLocaleDateString('id-ID').replace(/\//g, '-');
    link.setAttribute("href", url);
    link.setAttribute("download", `laporan-cleantrack-${today}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ==========================================
// 4. FILTER ENGINE (DATE)
// ==========================================

/**
 * Helper untuk parse string tanggal format "DD/MM/YYYY" (ID Locale) ke Object Date JS
 */
function parseDateID(dateString) {
    if (!dateString) return new Date(0); // Return epoch jika null
    const parts = dateString.split('/'); // Asumsi format 15/08/2025
    // Constructor Date: (Year, MonthIndex, Day) -> MonthIndex mulai dari 0
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

/**
 * Menyaring array laporan berdasarkan rentang waktu.
 * @param {Array} data - Array laporan
 * @param {String} range - 'today', 'week', 'month'
 */
function filterByDate(data, range) {
    const now = new Date();
    // Reset jam agar perbandingan tanggal akurat (start of day)
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return data.filter(item => {
        const itemDate = parseDateID(item.date);
        
        if (range === 'today') {
            // Cek apakah tanggal sama persis
            return itemDate.getTime() === todayStart.getTime();
        } 
        else if (range === 'week') {
            // Cek 7 hari terakhir
            const oneWeekAgo = new Date(todayStart);
            oneWeekAgo.setDate(todayStart.getDate() - 7);
            return itemDate >= oneWeekAgo;
        } 
        else if (range === 'month') {
            // Cek bulan dan tahun yang sama
            return itemDate.getMonth() === now.getMonth() && 
                   itemDate.getFullYear() === now.getFullYear();
        }
        
        return true; // Default return all
    });
}

// ==========================================
// 5. STATISTICS ENGINE
// ==========================================

function getAdminStats() {
    const reports = getReports();
    const users = getUsers();
    
    const total = reports.length;
    const pending = reports.filter(r => r.status === 'Pending').length;
    const inProgress = reports.filter(r => r.status === 'In Progress').length;
    const resolved = reports.filter(r => r.status === 'Resolved').length;
    const activeUsers = users.filter(u => u.role === 'USER' && u.status === 'Active').length;
    const completionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

    return { total, pending, inProgress, resolved, completionRate, activeUsers };
}

// ==========================================
// 6. UI FORMATTERS
// ==========================================

function getStatusColor(status) {
    switch (status) {
        case 'Resolved': 
            return { badge: 'bg-green-100 text-green-700 border-green-200', dot: 'bg-green-500' };
        case 'In Progress': 
            return { badge: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-500' };
        case 'Pending': 
            return { badge: 'bg-yellow-100 text-yellow-700 border-yellow-200', dot: 'bg-yellow-500' };
        default: 
            return { badge: 'bg-gray-100 text-gray-700 border-gray-200', dot: 'bg-gray-500' };
    }
}

function getPriorityColor(priority) {
    switch (priority) {
        case 'High': return 'text-red-600 bg-red-50 border border-red-100';
        case 'Medium': return 'text-orange-600 bg-orange-50 border border-orange-100';
        case 'Low': return 'text-gray-600 bg-gray-50 border border-gray-100';
        default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
}

function truncateText(text, length = 50) {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
}