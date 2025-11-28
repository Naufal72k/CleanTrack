/**
 * CleanTrack Admin Header Component (RESPONSIVE SIDEBAR FIXED)
 * File: admin-header.js
 * Fitur:
 * - Desktop: Horizontal Navbar.
 * - Tablet/Mobile: Full Sidebar Drawer (Menghindari penumpukan menu).
 */

function renderAdminHeader(activePage) {
    // Desktop Style
    const dActive = "text-sm font-bold text-primary border-b-2 border-primary py-5 px-1";
    const dInactive = "text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary transition-colors py-5 px-1 border-b-2 border-transparent";

    // Mobile/Sidebar Style
    const mActive = "flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-xl font-bold shadow-md shadow-primary/30 transition-all";
    const mInactive = "flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-medium transition-colors";

    // Menu Definitions
    const menus = [
        { id: 'dashboard', href: 'AdministratorDashboard.html', icon: 'dashboard', text: 'Dashboard' },
        { id: 'reports', href: 'AdminReports.html', icon: 'description', text: 'Manajemen Laporan' },
        { id: 'map', href: 'AdminMap.html', icon: 'map', text: 'Peta Operasional' },
        { id: 'users', href: 'AdminUsers.html', icon: 'group', text: 'Warga' },
        { id: 'rewards', href: 'AdminRewards.html', icon: 'inventory_2', text: 'Hadiah' }
    ];

    // Generate Nav HTML
    const desktopNav = menus.map(m => 
        `<a href="${m.href}" class="${activePage === m.id ? dActive : dInactive}">${m.text}</a>`
    ).join('');

    const mobileNav = menus.map(m => 
        `<a href="${m.href}" class="${activePage === m.id ? mActive : mInactive}">
            <span class="material-symbols-outlined text-xl">${m.icon}</span>
            ${m.text}
        </a>`
    ).join('');

    const headerHTML = `
    <header class="sticky top-0 z-40 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md border-b border-border-light dark:border-border-dark shadow-sm transition-all duration-300">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16 sm:h-20">
                
                <!-- Left: Hamburger & Brand -->
                <div class="flex items-center gap-4">
                    <button onclick="toggleAdminSidebar()" class="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none">
                        <span class="material-symbols-outlined text-2xl sm:text-3xl">menu</span>
                    </button>

                    <a href="AdministratorDashboard.html" class="flex items-center gap-2 group">
                        <div class="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <span class="material-symbols-outlined text-primary text-2xl">admin_panel_settings</span>
                        </div>
                        <div class="flex flex-col">
                            <span class="text-lg font-bold tracking-tight text-gray-800 dark:text-white leading-none">CleanTrack</span>
                            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden sm:block">Admin Panel</span>
                        </div>
                    </a>
                </div>

                <!-- Center: Desktop Nav -->
                <nav class="hidden lg:flex flex-1 justify-center gap-6 xl:gap-8 h-full items-center">
                    ${desktopNav}
                </nav>

                <!-- Right: Profile & Actions -->
                <div class="flex items-center gap-3">
                    
                    <!-- Notif -->
                    <div class="relative">
                        <button onclick="toggleAdminNotif()" class="relative flex items-center justify-center rounded-full size-10 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none">
                            <span class="material-symbols-outlined text-xl">notifications</span>
                            <span id="notif-indicator" class="hidden absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-surface-dark animate-pulse"></span>
                        </button>
                        <div id="admin-notif-dropdown" class="hidden absolute right-0 mt-2 w-80 bg-white dark:bg-surface-dark rounded-xl shadow-xl border border-border-light dark:border-border-dark overflow-hidden z-50 origin-top-right">
                            <div class="p-4 border-b border-border-light dark:border-border-dark flex justify-between items-center">
                                <h3 class="font-bold text-sm dark:text-white">Notifications</h3>
                            </div>
                            <div id="notif-list" class="max-h-64 overflow-y-auto"></div>
                        </div>
                    </div>

                    <div class="h-8 w-px bg-border-light dark:bg-border-dark mx-1 hidden sm:block"></div>

                    <!-- Logout Button (Desktop) -->
                    <button onclick="confirmLogout()" class="hidden sm:flex group items-center justify-center size-10 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900 hover:bg-red-100 transition-all shadow-sm active:scale-95" title="Logout">
                        <span class="material-symbols-outlined text-xl group-hover:-translate-x-0.5 transition-transform">logout</span>
                    </button>

                    <!-- Avatar Profile -->
                    <div class="flex items-center gap-3 pl-1 cursor-default select-none">
                        <div class="text-right hidden xl:block">
                            <p class="text-sm font-bold text-gray-800 dark:text-white leading-none mb-1">Super Admin</p>
                            <span class="inline-block text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">Level 1</span>
                        </div>
                        <div class="relative size-10 rounded-full bg-gray-200 dark:bg-gray-800 border-2 border-white dark:border-gray-700 shadow-sm overflow-hidden">
                             <div class="bg-center bg-no-repeat bg-cover size-full" style='background-image: url("https://ui-avatars.com/api/?name=Admin+System&background=1a1a1a&color=fff&bold=true");'></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </header>

    <!-- ADMIN MOBILE SIDEBAR (Off-Canvas) -->
    <div id="admin-backdrop" onclick="toggleAdminSidebar()" class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[90] hidden transition-opacity opacity-0"></div>

    <aside id="admin-sidebar" class="fixed top-0 left-0 bottom-0 w-[280px] bg-white dark:bg-surface-dark z-[100] shadow-2xl transform -translate-x-full transition-transform duration-300 ease-out flex flex-col lg:hidden border-r border-border-light dark:border-border-dark">
        
        <div class="p-6 border-b border-border-light dark:border-border-dark flex justify-between items-center">
            <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary text-2xl">admin_panel_settings</span>
                <span class="font-black text-xl text-gray-900 dark:text-white">AdminPanel</span>
            </div>
            <button onclick="toggleAdminSidebar()" class="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>

        <div class="p-6 bg-gray-50 dark:bg-gray-800/50">
            <div class="flex items-center gap-4">
                <div class="size-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-xl border-2 border-white shadow-md">A</div>
                <div>
                    <p class="font-bold text-gray-900 dark:text-white">Super Admin</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">System Administrator</p>
                </div>
            </div>
        </div>

        <nav class="flex-1 overflow-y-auto p-4 space-y-2">
            <p class="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Main Menu</p>
            ${mobileNav}
        </nav>

        <div class="p-4 border-t border-border-light dark:border-border-dark">
            <button onclick="confirmLogout()" class="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold border border-red-100 dark:border-red-900 hover:bg-red-100 transition-all">
                <span class="material-symbols-outlined">logout</span>
                Logout
            </button>
        </div>
    </aside>
    `;

    const target = document.getElementById('app-header');
    if (target) target.innerHTML = headerHTML;

    updateNotifIndicator();
}

// --- ADMIN SIDEBAR TOGGLE ---
window.toggleAdminSidebar = function() {
    const backdrop = document.getElementById('admin-backdrop');
    const sidebar = document.getElementById('admin-sidebar');
    const body = document.body;

    if (sidebar.classList.contains('-translate-x-full')) {
        // Open
        backdrop.classList.remove('hidden');
        setTimeout(() => backdrop.classList.remove('opacity-0'), 10);
        sidebar.classList.remove('-translate-x-full');
        body.style.overflow = 'hidden';
    } else {
        // Close
        backdrop.classList.add('opacity-0');
        sidebar.classList.add('-translate-x-full');
        body.style.overflow = '';
        setTimeout(() => backdrop.classList.add('hidden'), 300);
    }
}

// --- ADMIN LOGOUT ---
window.confirmLogout = function() {
    if(confirm("Apakah Anda yakin ingin keluar dari Panel Admin?")) {
        sessionStorage.removeItem('active_session'); 
        window.location.href = 'index.html';
    }
}

// --- ADMIN NOTIF LOGIC (Existing) ---
window.toggleAdminNotif = function() {
    const dropdown = document.getElementById('admin-notif-dropdown');
    const list = document.getElementById('notif-list');
    
    dropdown.classList.toggle('hidden');

    if (!dropdown.classList.contains('hidden')) {
        // Load Real Data
        const reports = JSON.parse(sessionStorage.getItem('shared_reports')) || []; 
        const pendingReports = reports.filter(r => r.status === 'Pending');

        if (pendingReports.length === 0) {
            list.innerHTML = `
                <div class="flex flex-col items-center justify-center p-6 text-gray-400">
                    <span class="material-symbols-outlined text-3xl mb-2">notifications_off</span>
                    <p class="text-xs">No pending tasks.</p>
                </div>
            `;
        } else {
            list.innerHTML = pendingReports.map(r => `
                <div class="p-3 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors" onclick="window.location.href='AdminReportDetail.html?id=${r.id}'">
                    <div class="flex items-start gap-3">
                        <div class="shrink-0 mt-1 bg-red-100 text-red-600 rounded-full p-1">
                            <span class="material-symbols-outlined text-sm">warning</span>
                        </div>
                        <div>
                            <p class="text-sm font-bold text-gray-800 dark:text-gray-200">New ${r.category}</p>
                            <p class="text-xs text-gray-500 line-clamp-1">${r.description}</p>
                            <p class="text-[10px] text-gray-400 mt-1">${r.date}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
}

function updateNotifIndicator() {
    const reports = JSON.parse(sessionStorage.getItem('shared_reports')) || [];
    const hasPending = reports.some(r => r.status === 'Pending');
    const indicator = document.getElementById('notif-indicator');
    if (indicator) hasPending ? indicator.classList.remove('hidden') : indicator.classList.add('hidden');
}

// Close Dropdown Outside Click
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('admin-notif-dropdown');
    const button = document.querySelector('button[onclick="toggleAdminNotif()"]');
    if (dropdown && button && !dropdown.contains(event.target) && !button.contains(event.target)) {
        dropdown.classList.add('hidden');
    }
});