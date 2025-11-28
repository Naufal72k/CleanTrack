/**
 * CleanTrack User Header Component (RESPONSIVE SIDEBAR EDITION)
 * File: user-header.js
 * Fitur:
 * 1. Navbar Desktop Horizontal.
 * 2. Sidebar Drawer (Off-canvas) untuk Mobile & Tablet.
 * 3. Profil & Saldo di dalam Sidebar.
 * 4. [UPDATE] Tombol Logout di Desktop.
 */

function renderHeader(activePage) {
    // 1. Cek Sesi
    const currentUser = getActiveSession();
    if (!currentUser) {
        window.location.href = 'Login.html';
        return;
    }

    // 2. Style Config
    // Desktop Styles
    const dActive = "text-sm font-bold text-primary border-b-2 border-primary py-5"; 
    const dInactive = "text-sm font-medium text-gray-500 hover:text-primary transition-colors py-5 border-b-2 border-transparent";
    
    // Mobile/Sidebar Styles
    const mActive = "flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-xl font-bold transition-colors";
    const mInactive = "flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-colors";

    // Link Logic
    const links = [
        { id: 'reports', href: 'MyWasteReports.html', icon: 'description', text: 'Laporan Saya' },
        { id: 'map', href: 'MapView.html', icon: 'map', text: 'Peta Persebaran' },
        { id: 'new', href: 'ReportNew.html', icon: 'add_a_photo', text: 'Buat Laporan' },
        { id: 'profile', href: 'UserProfile.html', icon: 'account_balance_wallet', text: 'Dompet & Profil' }
    ];

    // Build Nav Links
    const desktopNav = links.map(l => 
        `<a href="${l.href}" class="${activePage === l.id ? dActive : dInactive}">${l.text}</a>`
    ).join('');

    const mobileNav = links.map(l => 
        `<a href="${l.href}" class="${activePage === l.id ? mActive : mInactive}">
            <span class="material-symbols-outlined text-xl">${l.icon}</span>
            ${l.text}
        </a>`
    ).join('');

    // 3. HTML Template
    const headerHTML = `
    <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16 sm:h-20">
                
                <div class="flex items-center gap-3 sm:gap-6">
                    <button onclick="toggleSidebar()" class="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <span class="material-symbols-outlined text-2xl sm:text-3xl">menu</span>
                    </button>

                    <a href="MyWasteReports.html" class="flex items-center gap-2 group">
                        <div class="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <span class="material-symbols-outlined text-primary text-2xl">recycling</span>
                        </div>
                        <div class="flex flex-col">
                            <span class="text-lg sm:text-xl font-bold tracking-tight text-gray-900 leading-none">CleanTrack</span>
                            <span class="text-[10px] font-bold text-primary uppercase tracking-widest hidden sm:block">Warga</span>
                        </div>
                    </a>
                </div>

                <nav class="hidden lg:flex gap-8">
                    ${desktopNav}
                </nav>

                <div class="flex items-center gap-2 sm:gap-4">
                    
                    <a href="Notifications.html" class="relative flex items-center justify-center rounded-full size-10 text-gray-500 hover:bg-gray-100 hover:text-primary transition-colors ${activePage === 'notifications' ? 'bg-gray-100 text-primary' : ''}">
                        <span class="material-symbols-outlined text-2xl">notifications</span>
                        <span id="header-notif-dot" class="hidden absolute top-2.5 right-3 size-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
                    </a>

                    <div class="hidden lg:flex items-center gap-3 pl-4 border-l border-gray-200">
                    <button onclick="confirmLogoutUser()" class="ml-2 flex items-center justify-center size-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 border border-red-100 transition-all" title="Keluar">
                            <span class="material-symbols-outlined text-xl">logout</span>
                        </button>
                        <div class="text-right hidden xl:block cursor-pointer" onclick="window.location.href='UserProfile.html'">
                            <p class="text-sm font-bold text-gray-900 leading-none" id="header-name">${currentUser.name}</p>
                            <p class="text-xs text-gray-500 font-mono mt-1" id="header-points">${currentUser.points} Pts</p>
                        </div>
                        <img id="header-avatar" src="${currentUser.avatar}" class="size-10 rounded-full bg-gray-100 object-cover border border-gray-200 cursor-pointer" onclick="window.location.href='UserProfile.html'">
                        
                        
                    </div>

                </div>
            </div>
        </div>
    </header>

    <div id="sidebar-backdrop" onclick="toggleSidebar()" class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 hidden transition-opacity opacity-0"></div>

    <aside id="sidebar-panel" class="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[60] shadow-2xl transform -translate-x-full transition-transform duration-300 ease-out flex flex-col h-full lg:hidden">
        
        <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div class="flex items-center gap-2">
                <div class="bg-primary p-1.5 rounded-lg">
                    <span class="material-symbols-outlined text-white text-xl">recycling</span>
                </div>
                <span class="font-bold text-gray-900 text-lg">CleanTrack</span>
            </div>
            <button onclick="toggleSidebar()" class="p-1 rounded-full hover:bg-gray-200 text-gray-500 transition-colors">
                <span class="material-symbols-outlined text-xl">close</span>
            </button>
        </div>

        <div class="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-b border-gray-100">
            <div class="flex items-center gap-4 mb-4">
                <img id="mobile-avatar" src="${currentUser.avatar}" class="size-14 rounded-full bg-white p-1 border border-gray-200 object-cover shadow-sm">
                <div>
                    <p class="font-bold text-gray-900 text-lg leading-tight line-clamp-1" id="mobile-name">${currentUser.name}</p>
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-[10px] font-bold uppercase tracking-wide border border-yellow-200 mt-1">
                        Warga Aktif
                    </span>
                </div>
            </div>
            <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
                <div>
                    <p class="text-xs text-gray-400 font-bold uppercase">Saldo Poin</p>
                    <p class="text-xl font-black text-gray-900 font-mono tracking-tight" id="mobile-points">${currentUser.points}</p>
                </div>
                <button onclick="window.location.href='UserProfile.html'" class="size-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30">
                    <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
            </div>
        </div>

        <div class="flex-1 overflow-y-auto p-4 space-y-1">
            ${mobileNav}
        </div>

        <div class="p-4 border-t border-gray-100 bg-gray-50">
            <button onclick="confirmLogoutUser()" class="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-white border border-gray-200 text-red-600 font-bold hover:bg-red-50 hover:border-red-200 transition-all shadow-sm">
                <span class="material-symbols-outlined">logout</span>
                Keluar Aplikasi
            </button>
            <p class="text-center text-[10px] text-gray-400 mt-4 font-medium">v2.5.0 &bull; CleanTrack Mobile</p>
        </div>
    </aside>
    `;

    const target = document.getElementById('app-header');
    if (target) {
        target.innerHTML = headerHTML;
        checkSmartNotification();
        
        // Listeners for auto-update
        window.addEventListener('walletUpdated', updateHeaderVisuals);
        window.addEventListener('profileUpdated', updateHeaderVisuals);
    }
}

// --- GLOBAL TOGGLE FUNCTION ---
window.toggleSidebar = function() {
    const backdrop = document.getElementById('sidebar-backdrop');
    const panel = document.getElementById('sidebar-panel');
    const body = document.body;

    if (panel.classList.contains('-translate-x-full')) {
        // Open
        backdrop.classList.remove('hidden');
        setTimeout(() => backdrop.classList.remove('opacity-0'), 10);
        panel.classList.remove('-translate-x-full');
        body.style.overflow = 'hidden'; // Lock Scroll
    } else {
        // Close
        backdrop.classList.add('opacity-0');
        panel.classList.add('-translate-x-full');
        body.style.overflow = ''; // Unlock Scroll
        setTimeout(() => backdrop.classList.add('hidden'), 300);
    }
}

// --- LOGOUT CONFIRMATION ---
window.confirmLogoutUser = function() {
    if(confirm("Apakah Anda yakin ingin keluar?")) {
        logoutUser(); // Memanggil fungsi dari user-utils.js
    }
}

function updateHeaderVisuals() {
    const updatedSession = getActiveSession();
    if (!updatedSession) return;

    // Desktop
    const nameEl = document.getElementById('header-name');
    const pointsEl = document.getElementById('header-points');
    const avatarEl = document.getElementById('header-avatar');
    if (nameEl) nameEl.textContent = updatedSession.name;
    if (pointsEl) pointsEl.textContent = updatedSession.points + ' Pts';
    if (avatarEl) avatarEl.src = updatedSession.avatar;

    // Mobile Sidebar
    const mName = document.getElementById('mobile-name');
    const mPoints = document.getElementById('mobile-points');
    const mAvatar = document.getElementById('mobile-avatar');
    if (mName) mName.textContent = updatedSession.name;
    if (mPoints) mPoints.textContent = updatedSession.points;
    if (mAvatar) mAvatar.src = updatedSession.avatar;
}

function checkSmartNotification() {
    const currentUser = getActiveSession();
    if (!currentUser) return;
    const reports = JSON.parse(sessionStorage.getItem('shared_reports')) || [];
    const hasUnread = reports.some(r => r.userId === currentUser.id && r.status === 'Resolved' && !r.rating);
    const dot = document.getElementById('header-notif-dot');
    if (dot) hasUnread ? dot.classList.remove('hidden') : dot.classList.add('hidden');
}