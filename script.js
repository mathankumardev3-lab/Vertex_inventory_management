document.addEventListener('DOMContentLoaded', () => {
      if (window.lucide) lucide.createIcons();

      const STORAGE_KEY = 'stockflow_v1_workspace';

      // ====================================================================
      // 1. DEFAULT SEED DATA (26 Realistic Products across 5 Categories)
      // ====================================================================
      const DEFAULT_CATEGORIES = [
        'Electronics',
        'Office Supplies',
        'Grocery',
        'Accessories',
        'Equipment'
      ];

      const DEFAULT_SUPPLIERS = [
        { id: 'sup-1', name: 'Apex Tech Distribution', contact: 'Hannah Park', email: 'orders@apextech.example', phone: '+1 (555) 231-9040', leadTime: '2–3 Days' },
        { id: 'sup-2', name: 'Nordic Paper & Office Co.', contact: 'Liam Lindqvist', email: 'supply@nordicoffice.example', phone: '+1 (555) 384-1120', leadTime: '1–2 Days' },
        { id: 'sup-3', name: 'Harvest & Roastery Wholesale', contact: 'Mateo Silva', email: 'b2b@harvestroast.example', phone: '+1 (555) 619-4402', leadTime: '2–4 Days' },
        { id: 'sup-4', name: 'Vanguard Gear & Carry', contact: 'Claire Bennett', email: 'wholesale@vanguardgear.example', phone: '+1 (555) 740-8821', leadTime: '3–5 Days' },
        { id: 'sup-5', name: 'Titan Warehouse Equipment', contact: 'Marcus Vance', email: 'sales@titanequip.example', phone: '+1 (555) 892-3319', leadTime: '5–7 Days' },
        { id: 'sup-6', name: 'Meridian Peripherals Ltd.', contact: 'Priya Nair', email: 'partners@meridianperi.example', phone: '+1 (555) 905-6714', leadTime: '2–3 Days' }
      ];

      const DEFAULT_PRODUCTS = [
        // Electronics (6 items)
        { id: 'p-01', name: 'Dell UltraSharp 27" 4K USB-C Monitor', sku: 'ELC-101', category: 'Electronics', supplier: 'Apex Tech Distribution', purchasePrice: 340.00, sellingPrice: 489.00, quantity: 24, minStock: 8 },
        { id: 'p-02', name: 'Logitech MX Master 3S Wireless Mouse', sku: 'ELC-102', category: 'Electronics', supplier: 'Meridian Peripherals Ltd.', purchasePrice: 62.00, sellingPrice: 99.00, quantity: 42, minStock: 15 },
        { id: 'p-03', name: 'Keychron Q3 Mechanical Keyboard', sku: 'ELC-103', category: 'Electronics', supplier: 'Meridian Peripherals Ltd.', purchasePrice: 115.00, sellingPrice: 179.00, quantity: 6, minStock: 10 }, // Low Stock
        { id: 'p-04', name: 'CalDigit TS4 Thunderbolt 4 Dock', sku: 'ELC-104', category: 'Electronics', supplier: 'Apex Tech Distribution', purchasePrice: 245.00, sellingPrice: 369.00, quantity: 0, minStock: 6 }, // Out of Stock
        { id: 'p-05', name: 'Sony WH-1000XM5 ANC Headphones', sku: 'ELC-105', category: 'Electronics', supplier: 'Apex Tech Distribution', purchasePrice: 230.00, sellingPrice: 349.00, quantity: 18, minStock: 8 },
        { id: 'p-06', name: 'APC Back-UPS Pro 1500VA Battery', sku: 'ELC-106', category: 'Electronics', supplier: 'Apex Tech Distribution', purchasePrice: 145.00, sellingPrice: 219.00, quantity: 5, minStock: 8 }, // Low Stock

        // Office Supplies (5 items)
        { id: 'p-07', name: 'A4 Premium Copy Paper 80gsm (5-Ream Box)', sku: 'OFF-201', category: 'Office Supplies', supplier: 'Nordic Paper & Office Co.', purchasePrice: 22.00, sellingPrice: 36.00, quantity: 85, minStock: 25 },
        { id: 'p-08', name: 'HP 58A Black LaserJet Toner Cartridge', sku: 'OFF-202', category: 'Office Supplies', supplier: 'Nordic Paper & Office Co.', purchasePrice: 68.00, sellingPrice: 104.00, quantity: 7, minStock: 10 }, // Low Stock
        { id: 'p-09', name: 'Pilot G2 Gel Ink Pens 0.7mm (12-Pack)', sku: 'OFF-203', category: 'Office Supplies', supplier: 'Nordic Paper & Office Co.', purchasePrice: 9.50, sellingPrice: 16.50, quantity: 110, minStock: 30 },
        { id: 'p-10', name: 'Magnetic Glass Whiteboard 48" × 36"', sku: 'OFF-204', category: 'Office Supplies', supplier: 'Nordic Paper & Office Co.', purchasePrice: 95.00, sellingPrice: 159.00, quantity: 14, minStock: 5 },
        { id: 'p-11', name: 'Heavy-Duty Archival Lever Files (10-Pack)', sku: 'OFF-205', category: 'Office Supplies', supplier: 'Nordic Paper & Office Co.', purchasePrice: 19.00, sellingPrice: 32.00, quantity: 0, minStock: 12 }, // Out of Stock

        // Grocery (5 items)
        { id: 'p-12', name: 'Single-Origin Arabica Espresso Beans (2kg)', sku: 'GRC-301', category: 'Grocery', supplier: 'Harvest & Roastery Wholesale', purchasePrice: 26.00, sellingPrice: 44.00, quantity: 36, minStock: 12 },
        { id: 'p-13', name: 'Organic Matcha Ceremonial Tin (250g)', sku: 'GRC-302', category: 'Grocery', supplier: 'Harvest & Roastery Wholesale', purchasePrice: 28.00, sellingPrice: 48.00, quantity: 8, minStock: 10 }, // Low Stock
        { id: 'p-14', name: 'Cold-Pressed Extra Virgin Olive Oil (5L)', sku: 'GRC-303', category: 'Grocery', supplier: 'Harvest & Roastery Wholesale', purchasePrice: 38.00, sellingPrice: 62.00, quantity: 22, minStock: 8 },
        { id: 'p-15', name: 'Sparkling Mineral Water Glass Case (24 × 330ml)', sku: 'GRC-304', category: 'Grocery', supplier: 'Harvest & Roastery Wholesale', purchasePrice: 18.00, sellingPrice: 31.00, quantity: 54, minStock: 20 },
        { id: 'p-16', name: 'Artisanal Raw Wildflower Honey (1kg Jar)', sku: 'GRC-305', category: 'Grocery', supplier: 'Harvest & Roastery Wholesale', purchasePrice: 14.00, sellingPrice: 24.50, quantity: 29, minStock: 10 },

        // Accessories (5 items)
        { id: 'p-17', name: 'Ballistic Nylon 16" Laptop Briefcase', sku: 'ACC-401', category: 'Accessories', supplier: 'Vanguard Gear & Carry', purchasePrice: 48.00, sellingPrice: 89.00, quantity: 31, minStock: 10 },
        { id: 'p-18', name: 'Braided USB-C 240W Fast Charge Cable (2m)', sku: 'ACC-402', category: 'Accessories', supplier: 'Meridian Peripherals Ltd.', purchasePrice: 8.00, sellingPrice: 19.00, quantity: 95, minStock: 25 },
        { id: 'p-19', name: 'Anodized Aluminum Dual-Arm Laptop Stand', sku: 'ACC-403', category: 'Accessories', supplier: 'Vanguard Gear & Carry', purchasePrice: 34.00, sellingPrice: 64.00, quantity: 4, minStock: 10 }, // Low Stock
        { id: 'p-20', name: 'MagSafe 3-in-1 Desk Charging Valet', sku: 'ACC-404', category: 'Accessories', supplier: 'Meridian Peripherals Ltd.', purchasePrice: 52.00, sellingPrice: 89.00, quantity: 19, minStock: 8 },
        { id: 'p-21', name: 'Wool Felt Desk Mat Extended (90 × 40cm)', sku: 'ACC-405', category: 'Accessories', supplier: 'Vanguard Gear & Carry', purchasePrice: 16.00, sellingPrice: 34.00, quantity: 40, minStock: 12 },

        // Equipment (5 items)
        { id: 'p-22', name: 'Zebra ZD421 Thermal Barcode Label Printer', sku: 'EQP-501', category: 'Equipment', supplier: 'Titan Warehouse Equipment', purchasePrice: 290.00, sellingPrice: 435.00, quantity: 11, minStock: 5 },
        { id: 'p-23', name: 'Honeywell Voyager 2D Wireless Barcode Scanner', sku: 'EQP-502', category: 'Equipment', supplier: 'Titan Warehouse Equipment', purchasePrice: 135.00, sellingPrice: 210.00, quantity: 16, minStock: 6 },
        { id: 'p-24', name: 'Heavy-Duty Aluminum Platform Hand Truck', sku: 'EQP-503', category: 'Equipment', supplier: 'Titan Warehouse Equipment', purchasePrice: 165.00, sellingPrice: 259.00, quantity: 3, minStock: 5 }, // Low Stock
        { id: 'p-25', name: 'Industrial Steel 5-Tier Shelving Unit', sku: 'EQP-504', category: 'Equipment', supplier: 'Titan Warehouse Equipment', purchasePrice: 120.00, sellingPrice: 189.00, quantity: 0, minStock: 4 }, // Out of Stock
        { id: 'p-26', name: 'Digital Parcel Bench Scale (150kg Capacity)', sku: 'EQP-505', category: 'Equipment', supplier: 'Titan Warehouse Equipment', purchasePrice: 88.00, sellingPrice: 145.00, quantity: 9, minStock: 4 }
      ];

      const DEFAULT_TRANSACTIONS = [
        { id: 'tx-1008', ref: 'PO-2026-409', date: '2026-11-20 09:15', type: 'Stock In', productId: 'p-01', productName: 'Dell UltraSharp 27" 4K USB-C Monitor', sku: 'ELC-101', quantity: 10, unitPrice: 340.00, totalValue: 3400.00, partner: 'Apex Tech Distribution', notes: 'Q4 replenishment batch' },
        { id: 'tx-1007', ref: 'SO-2026-882', date: '2026-11-19 16:40', type: 'Stock Out', productId: 'p-04', productName: 'CalDigit TS4 Thunderbolt 4 Dock', sku: 'ELC-104', quantity: 6, unitPrice: 369.00, totalValue: 2214.00, partner: 'Northstar Studio Design', notes: 'Fulfilled enterprise workstation order' },
        { id: 'tx-1006', ref: 'PO-2026-405', date: '2026-11-19 11:20', type: 'Stock In', productId: 'p-07', productName: 'A4 Premium Copy Paper 80gsm (5-Ream Box)', sku: 'OFF-201', quantity: 40, unitPrice: 22.00, totalValue: 880.00, partner: 'Nordic Paper & Office Co.', notes: 'Pallet verified at Dock A' },
        { id: 'tx-1005', ref: 'SO-2026-879', date: '2026-11-18 14:10', type: 'Stock Out', productId: 'p-03', productName: 'Keychron Q3 Mechanical Keyboard', sku: 'ELC-103', quantity: 9, unitPrice: 179.00, totalValue: 1611.00, partner: 'FinTech Hub Co-Working', notes: 'Engineering onboarding kit' },
        { id: 'tx-1004', ref: 'PO-2026-401', date: '2026-11-17 10:05', type: 'Stock In', productId: 'p-12', productName: 'Single-Origin Arabica Espresso Beans (2kg)', sku: 'GRC-301', quantity: 20, unitPrice: 26.00, totalValue: 520.00, partner: 'Harvest & Roastery Wholesale', notes: 'Fresh roast lot #88' },
        { id: 'tx-1003', ref: 'SO-2026-874', date: '2026-11-16 15:30', type: 'Stock Out', productId: 'p-25', productName: 'Industrial Steel 5-Tier Shelving Unit', sku: 'EQP-504', quantity: 4, unitPrice: 189.00, totalValue: 756.00, partner: 'Eastside Fulfillment Annex', notes: 'Warehouse expansion transfer' },
        { id: 'tx-1002', ref: 'PO-2026-398', date: '2026-11-15 09:45', type: 'Stock In', productId: 'p-17', productName: 'Ballistic Nylon 16" Laptop Briefcase', sku: 'ACC-401', quantity: 15, unitPrice: 48.00, totalValue: 720.00, partner: 'Vanguard Gear & Carry', notes: 'Standard restock' },
        { id: 'tx-1001', ref: 'SO-2026-870', date: '2026-11-14 13:50', type: 'Stock Out', productId: 'p-22', productName: 'Zebra ZD421 Thermal Barcode Label Printer', sku: 'EQP-501', quantity: 3, unitPrice: 435.00, totalValue: 1305.00, partner: 'Metro Logistics Depot', notes: 'Shipping station upgrade' }
      ];

      const DEFAULT_SETTINGS = {
        orgName: 'StockFlow',
        currency: '$',
        defaultMinStock: 10
      };

      // ====================================================================
      // 2. STATE & LOCALSTORAGE PERSISTENCE
      // ====================================================================
      let appState = loadWorkspaceState();

      // UI View Filter / Pagination State
      const uiState = {
        activeView: 'dashboard',
        prodSearch: '',
        prodCategory: 'all',
        prodStatus: 'all',
        prodSort: 'name-asc',
        prodPage: 1,
        prodPerPage: 10,
        txSearch: '',
        txType: 'all',
        pendingDeleteId: null
      };

      let charts = {
        monthly: null,
        category: null,
        overview: null
      };

      function loadWorkspaceState() {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed.products) && parsed.products.length > 0) {
              return {
                products: parsed.products,
                categories: parsed.categories || [...DEFAULT_CATEGORIES],
                suppliers: parsed.suppliers || [...DEFAULT_SUPPLIERS],
                transactions: parsed.transactions || [...DEFAULT_TRANSACTIONS],
                settings: { ...DEFAULT_SETTINGS, ...(parsed.settings || {}) }
              };
            }
          }
        } catch (err) {
          console.warn('Resetting corrupted StockFlow localStorage state:', err);
        }
        return {
          products: JSON.parse(JSON.stringify(DEFAULT_PRODUCTS)),
          categories: [...DEFAULT_CATEGORIES],
          suppliers: JSON.parse(JSON.stringify(DEFAULT_SUPPLIERS)),
          transactions: JSON.parse(JSON.stringify(DEFAULT_TRANSACTIONS)),
          settings: { ...DEFAULT_SETTINGS }
        };
      }

      function saveWorkspaceState() {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
        } catch (err) {
          console.error('Unable to save to localStorage:', err);
        }
      }

      // Dynamic Stock Status Helper
      function getProductStatus(product) {
        if (Number(product.quantity) <= 0) return 'Out of Stock';
        if (Number(product.quantity) <= Number(product.minStock)) return 'Low Stock';
        return 'In Stock';
      }

      function renderStatusBadge(status) {
        if (status === 'Out of Stock') {
          return '<span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap bg-rose-50 text-rose-700 border border-rose-200"><span class="w-1.5 h-1.5 rounded-full bg-sf-danger shrink-0"></span>Out of Stock</span>';
        }
        if (status === 'Low Stock') {
          return '<span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap bg-amber-50 text-amber-700 border border-amber-200"><span class="w-1.5 h-1.5 rounded-full bg-sf-warning shrink-0"></span>Low Stock</span>';
        }
        return '<span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap bg-emerald-50 text-emerald-700 border border-emerald-200"><span class="w-1.5 h-1.5 rounded-full bg-sf-success shrink-0"></span>In Stock</span>';
      }

      function formatMoney(amount) {
        const sym = appState.settings.currency || '$';
        return sym + Number(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }

      function getCurrentTimestamp() {
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const hh = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
      }

      function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const borderClass = type === 'error' ? 'border-l-sf-danger' : type === 'warning' ? 'border-l-sf-warning' : 'border-l-sf-teal';
        const toast = document.createElement('div');
        toast.className = `pointer-events-auto bg-sf-navy text-white text-xs font-medium px-4 py-3 rounded shadow-lg border border-slate-700 border-l-4 ${borderClass} flex items-center gap-2.5 transition-opacity duration-300`;
        toast.innerHTML = `<span class="leading-snug">${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
          toast.style.opacity = '0';
          setTimeout(() => toast.remove(), 300);
        }, 3200);
      }

      // ====================================================================
      // 3. NAVIGATION & SIDEBAR CONTROLS
      // ====================================================================
      const VIEW_TITLES = {
        'dashboard': 'Dashboard',
        'products': 'Products',
        'categories': 'Categories',
        'suppliers': 'Suppliers',
        'stock-in': 'Stock In',
        'stock-out': 'Stock Out',
        'transactions': 'Transactions',
        'reports': 'Reports',
        'settings': 'Settings'
      };

      function switchView(viewName) {
        if (!VIEW_TITLES[viewName]) return;
        uiState.activeView = viewName;

        document.querySelectorAll('.app-view').forEach((sec) => {
          sec.classList.toggle('hidden', sec.id !== `view-${viewName}`);
        });

        document.querySelectorAll('.sidebar-nav-item').forEach((btn) => {
          btn.classList.toggle('active', btn.getAttribute('data-nav') === viewName);
        });

        const crumb = document.getElementById('breadcrumb-current');
        if (crumb) crumb.textContent = VIEW_TITLES[viewName];

        // Close mobile drawer if open
        closeMobileSidebar();

        // Refresh view-specific data
        refreshAllUI();
      }

      document.querySelectorAll('.nav-trigger').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const target = btn.getAttribute('data-nav');
          if (target) switchView(target);
        });
      });

      // Desktop Sidebar Collapse
      const collapseBtn = document.getElementById('desktop-collapse-btn');
      collapseBtn?.addEventListener('click', () => {
        const collapsed = document.body.classList.toggle('sidebar-collapsed');
        collapseBtn.setAttribute('aria-pressed', String(collapsed));
        collapseBtn.innerHTML = `<i data-lucide="${collapsed ? 'panel-left-open' : 'panel-left-close'}" class="w-4 h-4"></i>`;
        if (window.lucide) lucide.createIcons();
        setTimeout(() => {
          Object.values(charts).forEach((c) => c && c.resize());
        }, 220);
      });

      // Mobile Sidebar Open/Close
      const sidebarEl = document.getElementById('sidebar');
      const mobileBackdrop = document.getElementById('mobile-sidebar-backdrop');

      function openMobileSidebar() {
        sidebarEl?.classList.remove('-translate-x-full');
        mobileBackdrop?.classList.remove('hidden');
      }
      function closeMobileSidebar() {
        sidebarEl?.classList.add('-translate-x-full');
        mobileBackdrop?.classList.add('hidden');
      }

      document.getElementById('mobile-open-sidebar')?.addEventListener('click', openMobileSidebar);
      document.getElementById('mobile-close-sidebar')?.addEventListener('click', closeMobileSidebar);
      mobileBackdrop?.addEventListener('click', closeMobileSidebar);

      // Global Topbar Quick Search -> Jumps to Products with query
      document.getElementById('global-search-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = document.getElementById('global-search-input').value.trim();
        uiState.prodSearch = q;
        uiState.prodPage = 1;
        const prodSearchBox = document.getElementById('prod-search-input');
        if (prodSearchBox) prodSearchBox.value = q;
        switchView('products');
      });

      // Notifications Dropdown Toggle
      const notifBtn = document.getElementById('notif-toggle-btn');
      const notifDropdown = document.getElementById('notif-dropdown');
      notifBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        notifDropdown?.classList.toggle('hidden');
      });
      document.addEventListener('click', (e) => {
        if (notifDropdown && !notifDropdown.contains(e.target) && e.target !== notifBtn) {
          notifDropdown.classList.add('hidden');
        }
      });

      // ====================================================================
      // 4. MASTER UI RENDERING ENGINE
      // ====================================================================
      function refreshAllUI() {
        populateDropdownOptions();
        renderKPIsAndAlerts();
        renderDashboardTables();
        renderCharts();
        renderProductsTable();
        renderCategoriesView();
        renderSuppliersView();
        renderStockInAndOutTables();
        renderTransactionsTable();
        renderReportsView();

        const wsName = document.getElementById('topbar-workspace-name');
        if (wsName) wsName.textContent = appState.settings.orgName || 'StockFlow';

        if (window.lucide) lucide.createIcons();
      }

      function populateDropdownOptions() {
        // Categories dropdowns
        const prodCatFilter = document.getElementById('prod-category-filter');
        const modalCatSelect = document.getElementById('prod-form-category');
        if (prodCatFilter) {
          const prev = prodCatFilter.value;
          prodCatFilter.innerHTML = '<option value="all">All Categories</option>' +
            appState.categories.map((c) => `<option value="${c}">${c}</option>`).join('');
          prodCatFilter.value = appState.categories.includes(prev) ? prev : 'all';
        }
        if (modalCatSelect) {
          const prev = modalCatSelect.value;
          modalCatSelect.innerHTML = appState.categories.map((c) => `<option value="${c}">${c}</option>`).join('');
          if (appState.categories.includes(prev)) modalCatSelect.value = prev;
        }

        // Suppliers dropdowns
        const modalSupSelect = document.getElementById('prod-form-supplier');
        const stockInSupSelect = document.getElementById('stockin-supplier');
        const supOpts = appState.suppliers.map((s) => `<option value="${s.name}">${s.name}</option>`).join('');
        if (modalSupSelect) modalSupSelect.innerHTML = supOpts;
        if (stockInSupSelect) stockInSupSelect.innerHTML = supOpts;

        // Stock In & Stock Out Product Selectors
        const sortedProds = [...appState.products].sort((a, b) => a.name.localeCompare(b.name));
        const prodOpts = '<option value="">-- Choose a product SKU --</option>' +
          sortedProds.map((p) => `<option value="${p.id}">${p.sku} — ${p.name} (Qty: ${p.quantity})</option>`).join('');

        const stockInProd = document.getElementById('stockin-product');
        const stockOutProd = document.getElementById('stockout-product');
        if (stockInProd) {
          const prev = stockInProd.value;
          stockInProd.innerHTML = prodOpts;
          if (prev) stockInProd.value = prev;
        }
        if (stockOutProd) {
          const prev = stockOutProd.value;
          stockOutProd.innerHTML = prodOpts;
          if (prev) stockOutProd.value = prev;
        }
      }

      function renderKPIsAndAlerts() {
        const totalProducts = appState.products.length;
        let totalUnits = 0;
        let totalCostVal = 0;
        let totalRetailVal = 0;
        const alertItems = [];

        appState.products.forEach((p) => {
          const qty = Number(p.quantity);
          totalUnits += qty;
          totalCostVal += qty * Number(p.purchasePrice);
          totalRetailVal += qty * Number(p.sellingPrice);
          const status = getProductStatus(p);
          if (status === 'Low Stock' || status === 'Out of Stock') {
            alertItems.push({ ...p, status });
          }
        });

        const lowCount = alertItems.filter((i) => i.status === 'Low Stock').length;
        const outCount = alertItems.filter((i) => i.status === 'Out of Stock').length;

        document.getElementById('kpi-total-products').textContent = totalProducts;
        document.getElementById('kpi-total-units').textContent = `${totalUnits.toLocaleString()} total units`;

        const formattedCostVal = formatMoney(totalCostVal);
        const formattedRetailVal = formatMoney(totalRetailVal);
        const stockValueEl = document.getElementById('kpi-stock-value');
        const retailValueEl = document.getElementById('kpi-retail-value');

        if (stockValueEl) {
          stockValueEl.textContent = formattedCostVal;
          stockValueEl.title = formattedCostVal;
        }
        if (retailValueEl) {
          retailValueEl.textContent = `Retail: ${formattedRetailVal}`;
          retailValueEl.title = `Retail: ${formattedRetailVal}`;
        }

        document.getElementById('kpi-low-stock').textContent = lowCount;
        document.getElementById('kpi-out-stock').textContent = outCount;
        document.getElementById('kpi-total-categories').textContent = appState.categories.length;
        document.getElementById('kpi-total-suppliers').textContent = `${appState.suppliers.length} active suppliers`;

        // Sidebar & Topbar Notification Badges
        const totalAlerts = alertItems.length;
        const sideBadge = document.getElementById('sidebar-alert-badge');
        const notifDot = document.getElementById('notif-dot');
        const notifPill = document.getElementById('notif-summary-pill');
        const notifList = document.getElementById('notif-list');

        if (sideBadge) sideBadge.textContent = totalAlerts;
        if (notifDot) notifDot.textContent = totalAlerts;
        if (notifPill) notifPill.textContent = `${totalAlerts} Alert${totalAlerts === 1 ? '' : 's'}`;

        if (notifList) {
          if (alertItems.length === 0) {
            notifList.innerHTML = '<div class="p-4 text-xs text-sf-muted text-center">All SKUs are above minimum safety stock thresholds.</div>';
          } else {
            notifList.innerHTML = alertItems
              .sort((a, b) => a.quantity - b.quantity)
              .map(
                (item) => `
                <div class="px-4 py-3 flex items-center justify-between gap-3 hover:bg-slate-50">
                  <div class="min-w-0 flex-1">
                    <p class="text-xs font-semibold text-sf-navy truncate">${item.name}</p>
                    <p class="text-[11px] font-mono tabular-nums text-sf-muted mt-0.5">${item.sku} • On hand: <strong>${item.quantity}</strong> (Min: ${item.minStock})</p>
                  </div>
                  <button type="button" data-quick-restock="${item.id}" class="px-2.5 py-1 rounded text-[11px] font-semibold bg-sf-teal text-white hover:bg-sf-tealDark whitespace-nowrap shrink-0">
                    Restock
                  </button>
                </div>
              `
              )
              .join('');
          }
        }
      }

      function renderDashboardTables() {
        // Watchlist Table
        const watchTbody = document.getElementById('dash-watchlist-tbody');
        if (watchTbody) {
          const alerts = appState.products
            .map((p) => ({ ...p, status: getProductStatus(p) }))
            .filter((p) => p.status !== 'In Stock')
            .sort((a, b) => a.quantity - b.quantity)
            .slice(0, 6);

          if (alerts.length === 0) {
            watchTbody.innerHTML = '<tr><td colspan="4" class="py-8 text-center text-sf-muted">No low-stock warnings. All inventory levels healthy.</td></tr>';
          } else {
            watchTbody.innerHTML = alerts
              .map(
                (p) => `
                <tr class="hover:bg-slate-50 align-middle">
                  <td class="py-2.5 px-4">
                    <p class="font-semibold text-sf-navy truncate max-w-[200px]">${p.name}</p>
                    <span class="font-mono text-[11px] text-sf-muted">${p.sku}</span>
                  </td>
                  <td class="py-2.5 px-3 text-right font-mono tabular-nums whitespace-nowrap">
                    <strong class="${p.quantity === 0 ? 'text-rose-600' : 'text-amber-600'}">${p.quantity}</strong> / ${p.minStock}
                  </td>
                  <td class="py-2.5 px-3 whitespace-nowrap">${renderStatusBadge(p.status)}</td>
                  <td class="py-2.5 px-4 text-right whitespace-nowrap">
                    <button type="button" data-quick-restock="${p.id}" class="inline-flex items-center px-2.5 py-1 rounded border border-sf-border bg-white hover:bg-sf-teal hover:text-white hover:border-sf-teal text-[11px] font-semibold text-sf-navy whitespace-nowrap transition-colors">
                      + Stock In
                    </button>
                  </td>
                </tr>
              `
              )
              .join('');
          }
        }

        // Recent Transactions Table (Top 5)
        const recentTxTbody = document.getElementById('dash-recent-tx-tbody');
        if (recentTxTbody) {
          recentTxTbody.innerHTML = appState.transactions
            .slice(0, 5)
            .map((tx) => {
              const isIn = tx.type === 'Stock In';
              return `
                <tr class="hover:bg-slate-50 align-middle">
                  <td class="py-2.5 px-4 font-mono text-xs font-semibold text-sf-navy whitespace-nowrap">${tx.ref}</td>
                  <td class="py-2.5 px-4 font-mono text-xs text-sf-muted whitespace-nowrap">${tx.date}</td>
                  <td class="py-2.5 px-4 whitespace-nowrap">
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap ${isIn ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}">
                      ${isIn ? '↓ Stock In' : '↑ Stock Out'}
                    </span>
                  </td>
                  <td class="py-2.5 px-4 font-medium text-sf-navy">${tx.productName} <span class="font-mono text-[11px] text-sf-muted whitespace-nowrap">(${tx.sku})</span></td>
                  <td class="py-2.5 px-4 text-right font-mono text-xs font-semibold tabular-nums whitespace-nowrap ${isIn ? 'text-emerald-600' : 'text-rose-600'}">${isIn ? '+' : '-'}${tx.quantity}</td>
                  <td class="py-2.5 px-4 text-right font-mono text-xs tabular-nums text-sf-navy whitespace-nowrap">${formatMoney(tx.totalValue)}</td>
                  <td class="py-2.5 px-4 text-xs text-sf-muted whitespace-nowrap">${tx.partner}</td>
                </tr>
              `;
            })
            .join('');
        }
      }

      // ====================================================================
      // 5. CHART.JS ANALYTICS (Monthly Movement, Category Dist, Stock Overview)
      // ====================================================================
      function renderCharts() {
        if (!window.Chart) return;

        // Calculate live current-month Stock In & Stock Out totals from transactions
        let currentInUnits = 0;
        let currentOutUnits = 0;
        appState.transactions.forEach((tx) => {
          if (tx.type === 'Stock In') currentInUnits += Number(tx.quantity);
          else currentOutUnits += Number(tx.quantity);
        });

        // 1. Monthly Stock Movement Chart
        const ctxMonthly = document.getElementById('chart-monthly-movement');
        if (ctxMonthly) {
          if (charts.monthly) charts.monthly.destroy();
          charts.monthly = new Chart(ctxMonthly, {
            type: 'line',
            data: {
              labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov (Live)'],
              datasets: [
                {
                  label: 'Stock In (Units)',
                  data: [310, 345, 290, 410, 385, 280 + currentInUnits],
                  borderColor: '#14B8A6',
                  backgroundColor: 'rgba(20, 184, 166, 0.12)',
                  borderWidth: 2.5,
                  tension: 0.25,
                  fill: true,
                  pointRadius: 3.5
                },
                {
                  label: 'Stock Out (Units)',
                  data: [265, 310, 275, 360, 340, 220 + currentOutUnits],
                  borderColor: '#1E293B',
                  backgroundColor: 'rgba(30, 41, 59, 0.06)',
                  borderWidth: 2.5,
                  tension: 0.25,
                  fill: false,
                  pointRadius: 3.5
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 12, font: { family: 'Inter', size: 11 } } }
              },
              scales: {
                x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 11 } } },
                y: { border: { display: false }, grid: { color: '#F1F5F9' }, ticks: { font: { family: 'JetBrains Mono', size: 11 } } }
              }
            }
          });
        }

        // 2. Category Distribution Doughnut Chart
        const ctxCat = document.getElementById('chart-category-dist');
        if (ctxCat) {
          const catLabels = appState.categories;
          const catValues = catLabels.map((cat) =>
            appState.products
              .filter((p) => p.category === cat)
              .reduce((sum, p) => sum + Number(p.quantity) * Number(p.purchasePrice), 0)
          );

          if (charts.category) charts.category.destroy();
          charts.category = new Chart(ctxCat, {
            type: 'doughnut',
            data: {
              labels: catLabels,
              datasets: [
                {
                  data: catValues,
                  backgroundColor: ['#14B8A6', '#1E293B', '#3B82F6', '#F59E0B', '#64748B', '#10B981'],
                  borderWidth: 2,
                  borderColor: '#FFFFFF'
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              cutout: '64%',
              plugins: {
                legend: { position: 'right', labels: { boxWidth: 12, font: { family: 'Inter', size: 11 } } }
              }
            }
          });
        }

        // 3. Stock Overview Grouped Bar Chart
        const ctxOverview = document.getElementById('chart-stock-overview');
        if (ctxOverview) {
          const cats = appState.categories;
          const inStockData = cats.map((c) => appState.products.filter((p) => p.category === c && getProductStatus(p) === 'In Stock').length);
          const lowStockData = cats.map((c) => appState.products.filter((p) => p.category === c && getProductStatus(p) === 'Low Stock').length);
          const outStockData = cats.map((c) => appState.products.filter((p) => p.category === c && getProductStatus(p) === 'Out of Stock').length);

          if (charts.overview) charts.overview.destroy();
          charts.overview = new Chart(ctxOverview, {
            type: 'bar',
            data: {
              labels: cats,
              datasets: [
                { label: 'In Stock', data: inStockData, backgroundColor: '#22C55E', borderRadius: 3 },
                { label: 'Low Stock', data: lowStockData, backgroundColor: '#F59E0B', borderRadius: 3 },
                { label: 'Out of Stock', data: outStockData, backgroundColor: '#EF4444', borderRadius: 3 }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 12, font: { family: 'Inter', size: 11 } } }
              },
              scales: {
                x: { stacked: true, grid: { display: false }, ticks: { font: { family: 'Inter', size: 11 } } },
                y: { stacked: true, border: { display: false }, grid: { color: '#F1F5F9' }, ticks: { stepSize: 1, font: { family: 'JetBrains Mono', size: 11 } } }
              }
            }
          });
        }
      }

      // ====================================================================
      // 6. PRODUCTS PAGE: FILTER, SORT, PAGINATION & ROW ACTIONS
      // ====================================================================
      function getFilteredProducts() {
        let list = appState.products.map((p) => ({
          ...p,
          status: getProductStatus(p),
          stockValue: Number(p.quantity) * Number(p.purchasePrice)
        }));

        if (uiState.prodCategory !== 'all') {
          list = list.filter((p) => p.category === uiState.prodCategory);
        }
        if (uiState.prodStatus !== 'all') {
          list = list.filter((p) => p.status === uiState.prodStatus);
        }
        if (uiState.prodSearch.trim() !== '') {
          const q = uiState.prodSearch.toLowerCase();
          list = list.filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.sku.toLowerCase().includes(q) ||
              p.supplier.toLowerCase().includes(q)
          );
        }

        // Sort
        switch (uiState.prodSort) {
          case 'name-desc':
            list.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case 'sku-asc':
            list.sort((a, b) => a.sku.localeCompare(b.sku));
            break;
          case 'qty-asc':
            list.sort((a, b) => a.quantity - b.quantity);
            break;
          case 'qty-desc':
            list.sort((a, b) => b.quantity - a.quantity);
            break;
          case 'price-desc':
            list.sort((a, b) => b.sellingPrice - a.sellingPrice);
            break;
          case 'value-desc':
            list.sort((a, b) => b.stockValue - a.stockValue);
            break;
          default:
            list.sort((a, b) => a.name.localeCompare(b.name));
        }

        return list;
      }

      function renderProductsTable() {
        const tbody = document.getElementById('products-tbody');
        const infoEl = document.getElementById('prod-pagination-info');
        const controlsEl = document.getElementById('prod-pagination-controls');
        if (!tbody) return;

        const filtered = getFilteredProducts();
        const total = filtered.length;
        const totalPages = Math.max(1, Math.ceil(total / uiState.prodPerPage));
        if (uiState.prodPage > totalPages) uiState.prodPage = totalPages;

        const startIdx = (uiState.prodPage - 1) * uiState.prodPerPage;
        const pageSlice = filtered.slice(startIdx, startIdx + uiState.prodPerPage);

        if (pageSlice.length === 0) {
          tbody.innerHTML = '<tr><td colspan="9" class="py-10 text-center text-sf-muted">No products match your active filter criteria.</td></tr>';
        } else {
          tbody.innerHTML = pageSlice
            .map(
              (p) => `
              <tr class="hover:bg-slate-50/90 transition-colors align-middle">
                <td class="py-3 px-4 font-semibold text-sf-navy">${p.name}</td>
                <td class="py-3 px-3 font-mono text-xs text-sf-muted whitespace-nowrap">${p.sku}</td>
                <td class="py-3 px-3 whitespace-nowrap"><span class="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 text-sf-text text-xs font-medium whitespace-nowrap">${p.category}</span></td>
                <td class="py-3 px-3 text-xs text-sf-muted whitespace-nowrap">${p.supplier}</td>
                <td class="py-3 px-3 text-right font-mono text-xs tabular-nums whitespace-nowrap">${formatMoney(p.purchasePrice)}</td>
                <td class="py-3 px-3 text-right font-mono text-xs font-semibold text-sf-navy tabular-nums whitespace-nowrap">${formatMoney(p.sellingPrice)}</td>
                <td class="py-3 px-3 text-right font-mono text-xs tabular-nums whitespace-nowrap">
                  <strong class="${p.quantity === 0 ? 'text-rose-600' : p.quantity <= p.minStock ? 'text-amber-600' : 'text-sf-navy'}">${p.quantity}</strong>
                  <span class="text-slate-400">/ ${p.minStock}</span>
                </td>
                <td class="py-3 px-3 whitespace-nowrap">${renderStatusBadge(p.status)}</td>
                <td class="py-3 px-4 text-right whitespace-nowrap">
                  <div class="inline-flex items-center justify-end gap-1.5">
                    <button type="button" data-quick-restock="${p.id}" title="Quick Stock In" class="p-1.5 rounded border border-sf-border bg-white hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 flex items-center justify-center">
                      <i data-lucide="arrow-down-left" class="w-3.5 h-3.5 shrink-0"></i>
                    </button>
                    <button type="button" data-quick-dispatch="${p.id}" title="Quick Stock Out" class="p-1.5 rounded border border-sf-border bg-white hover:bg-rose-50 hover:text-rose-700 text-slate-600 flex items-center justify-center">
                      <i data-lucide="arrow-up-right" class="w-3.5 h-3.5 shrink-0"></i>
                    </button>
                    <button type="button" data-edit-product="${p.id}" title="Edit Product" class="p-1.5 rounded border border-sf-border bg-white hover:bg-slate-100 text-sf-navy flex items-center justify-center">
                      <i data-lucide="pencil" class="w-3.5 h-3.5 shrink-0"></i>
                    </button>
                    <button type="button" data-delete-product="${p.id}" title="Delete Product" class="p-1.5 rounded border border-sf-border bg-white hover:bg-rose-50 hover:text-rose-600 text-slate-500 flex items-center justify-center">
                      <i data-lucide="trash-2" class="w-3.5 h-3.5 shrink-0"></i>
                    </button>
                  </div>
                </td>
              </tr>
            `
            )
            .join('');
        }

        if (infoEl) {
          const from = total === 0 ? 0 : startIdx + 1;
          const to = Math.min(total, startIdx + uiState.prodPerPage);
          infoEl.textContent = `Showing ${from}–${to} of ${total} products`;
        }

        if (controlsEl) {
          let btns = `<button type="button" data-page="${uiState.prodPage - 1}" ${uiState.prodPage === 1 ? 'disabled' : ''} class="px-2.5 py-1 rounded border border-sf-border bg-white disabled:opacity-40 hover:bg-slate-100">Prev</button>`;
          for (let i = 1; i <= totalPages; i++) {
            const activeCls = i === uiState.prodPage ? 'bg-sf-navy text-white border-sf-navy font-bold' : 'bg-white text-sf-navy border-sf-border hover:bg-slate-100';
            btns += `<button type="button" data-page="${i}" class="px-2.5 py-1 rounded border ${activeCls} font-mono">${i}</button>`;
          }
          btns += `<button type="button" data-page="${uiState.prodPage + 1}" ${uiState.prodPage === totalPages ? 'disabled' : ''} class="px-2.5 py-1 rounded border border-sf-border bg-white disabled:opacity-40 hover:bg-slate-100">Next</button>`;
          controlsEl.innerHTML = btns;
        }
      }

      // Wire Products Filter & Sort Events
      document.getElementById('prod-search-input')?.addEventListener('input', (e) => {
        uiState.prodSearch = e.target.value;
        uiState.prodPage = 1;
        renderProductsTable();
        if (window.lucide) lucide.createIcons();
      });

      document.getElementById('prod-category-filter')?.addEventListener('change', (e) => {
        uiState.prodCategory = e.target.value;
        uiState.prodPage = 1;
        renderProductsTable();
        if (window.lucide) lucide.createIcons();
      });

      document.getElementById('prod-status-filter')?.addEventListener('change', (e) => {
        uiState.prodStatus = e.target.value;
        uiState.prodPage = 1;
        renderProductsTable();
        if (window.lucide) lucide.createIcons();
      });

      document.getElementById('prod-sort-select')?.addEventListener('change', (e) => {
        uiState.prodSort = e.target.value;
        renderProductsTable();
        if (window.lucide) lucide.createIcons();
      });

      document.getElementById('prod-reset-filters')?.addEventListener('click', () => {
        uiState.prodSearch = '';
        uiState.prodCategory = 'all';
        uiState.prodStatus = 'all';
        uiState.prodSort = 'name-asc';
        uiState.prodPage = 1;
        document.getElementById('prod-search-input').value = '';
        document.getElementById('prod-category-filter').value = 'all';
        document.getElementById('prod-status-filter').value = 'all';
        document.getElementById('prod-sort-select').value = 'name-asc';
        renderProductsTable();
        if (window.lucide) lucide.createIcons();
      });

      document.getElementById('prod-pagination-controls')?.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-page]');
        if (!btn || btn.disabled) return;
        uiState.prodPage = Number(btn.getAttribute('data-page'));
        renderProductsTable();
        if (window.lucide) lucide.createIcons();
      });

      // ====================================================================
      // 7. ADD / EDIT / DELETE PRODUCT MODALS
      // ====================================================================
      const productModal = document.getElementById('product-modal');
      const productForm = document.getElementById('product-form');

      function updateModalLivePreview() {
        const pur = parseFloat(document.getElementById('prod-form-purchase').value) || 0;
        const sel = parseFloat(document.getElementById('prod-form-selling').value) || 0;
        const qty = parseInt(document.getElementById('prod-form-qty').value, 10) || 0;
        const min = parseInt(document.getElementById('prod-form-min').value, 10) || 0;

        const profit = sel - pur;
        const pct = sel > 0 ? ((profit / sel) * 100).toFixed(1) : '0.0';
        const marginEl = document.getElementById('modal-margin-preview');
        if (marginEl) marginEl.textContent = `${formatMoney(profit)} (${pct}%)`;

        const status = getProductStatus({ quantity: qty, minStock: min });
        const statusEl = document.getElementById('modal-status-preview');
        if (statusEl) {
          statusEl.textContent = status;
          statusEl.className = status === 'Out of Stock' ? 'font-semibold text-rose-600' : status === 'Low Stock' ? 'font-semibold text-amber-600' : 'font-semibold text-emerald-600';
        }
      }

      ['prod-form-purchase', 'prod-form-selling', 'prod-form-qty', 'prod-form-min'].forEach((id) => {
        document.getElementById(id)?.addEventListener('input', updateModalLivePreview);
      });

      function openProductModal(productToEdit = null) {
        if (!productModal || !productForm) return;
        populateDropdownOptions();
        document.getElementById('product-form-error').classList.add('hidden');

        if (productToEdit) {
          document.getElementById('product-modal-title').textContent = `Edit Product — ${productToEdit.sku}`;
          document.getElementById('edit-product-id').value = productToEdit.id;
          document.getElementById('prod-form-name').value = productToEdit.name;
          document.getElementById('prod-form-sku').value = productToEdit.sku;
          document.getElementById('prod-form-category').value = productToEdit.category;
          document.getElementById('prod-form-supplier').value = productToEdit.supplier;
          document.getElementById('prod-form-purchase').value = productToEdit.purchasePrice;
          document.getElementById('prod-form-selling').value = productToEdit.sellingPrice;
          document.getElementById('prod-form-qty').value = productToEdit.quantity;
          document.getElementById('prod-form-min').value = productToEdit.minStock;
        } else {
          document.getElementById('product-modal-title').textContent = 'Add New Product';
          productForm.reset();
          document.getElementById('edit-product-id').value = '';
          document.getElementById('prod-form-min').value = appState.settings.defaultMinStock || 10;
        }

        updateModalLivePreview();
        productModal.classList.remove('hidden');
        productModal.classList.add('flex');
      }

      function closeProductModal() {
        productModal?.classList.add('hidden');
        productModal?.classList.remove('flex');
      }

      document.getElementById('open-add-product-modal')?.addEventListener('click', () => openProductModal(null));
      document.getElementById('dash-add-product-btn')?.addEventListener('click', () => openProductModal(null));
      document.getElementById('close-product-modal')?.addEventListener('click', closeProductModal);
      document.getElementById('cancel-product-modal')?.addEventListener('click', closeProductModal);

      productForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const editId = document.getElementById('edit-product-id').value;
        const name = document.getElementById('prod-form-name').value.trim();
        const sku = document.getElementById('prod-form-sku').value.trim().toUpperCase();
        const category = document.getElementById('prod-form-category').value;
        const supplier = document.getElementById('prod-form-supplier').value;
        const purchasePrice = parseFloat(document.getElementById('prod-form-purchase').value);
        const sellingPrice = parseFloat(document.getElementById('prod-form-selling').value);
        const quantity = parseInt(document.getElementById('prod-form-qty').value, 10);
        const minStock = parseInt(document.getElementById('prod-form-min').value, 10);
        const errBox = document.getElementById('product-form-error');

        // Duplicate SKU validation
        const duplicate = appState.products.find((p) => p.sku.toUpperCase() === sku && p.id !== editId);
        if (duplicate) {
          errBox.textContent = `SKU "${sku}" is already assigned to "${duplicate.name}". Please enter a unique SKU.`;
          errBox.classList.remove('hidden');
          return;
        }

        if (editId) {
          const idx = appState.products.findIndex((p) => p.id === editId);
          if (idx !== -1) {
            appState.products[idx] = { ...appState.products[idx], name, sku, category, supplier, purchasePrice, sellingPrice, quantity, minStock };
            showToast(`Updated ${sku} — ${name}`);
          }
        } else {
          const newProd = {
            id: 'p-' + Date.now(),
            name,
            sku,
            category,
            supplier,
            purchasePrice,
            sellingPrice,
            quantity,
            minStock
          };
          appState.products.unshift(newProd);

          if (quantity > 0) {
            appState.transactions.unshift({
              id: 'tx-' + Date.now(),
              ref: 'INIT-' + Math.floor(100 + Math.random() * 900),
              date: getCurrentTimestamp(),
              type: 'Stock In',
              productId: newProd.id,
              productName: newProd.name,
              sku: newProd.sku,
              quantity,
              unitPrice: purchasePrice,
              totalValue: quantity * purchasePrice,
              partner: supplier,
              notes: 'Initial catalog opening stock'
            });
          }
          showToast(`Added new product ${sku} — ${name}`);
        }

        saveWorkspaceState();
        closeProductModal();
        refreshAllUI();
      });

      // Delete Confirmation Modal
      const deleteModal = document.getElementById('delete-modal');
      function openDeleteModal(prodId) {
        const prod = appState.products.find((p) => p.id === prodId);
        if (!prod || !deleteModal) return;
        uiState.pendingDeleteId = prodId;
        document.getElementById('delete-modal-desc').textContent = `Are you sure you want to delete "${prod.name}" (${prod.sku})? This action removes the SKU from your active inventory catalog.`;
        deleteModal.classList.remove('hidden');
        deleteModal.classList.add('flex');
      }

      function closeDeleteModal() {
        uiState.pendingDeleteId = null;
        deleteModal?.classList.add('hidden');
        deleteModal?.classList.remove('flex');
      }

      document.getElementById('cancel-delete-btn')?.addEventListener('click', closeDeleteModal);
      document.getElementById('confirm-delete-btn')?.addEventListener('click', () => {
        if (!uiState.pendingDeleteId) return;
        const target = appState.products.find((p) => p.id === uiState.pendingDeleteId);
        appState.products = appState.products.filter((p) => p.id !== uiState.pendingDeleteId);
        saveWorkspaceState();
        closeDeleteModal();
        refreshAllUI();
        if (target) showToast(`Deleted ${target.sku} from catalog`, 'warning');
      });

      // Global Event Delegation for Table Buttons (Edit, Delete, Quick Restock, Quick Dispatch)
      document.body.addEventListener('click', (e) => {
        const editBtn = e.target.closest('[data-edit-product]');
        if (editBtn) {
          const prod = appState.products.find((p) => p.id === editBtn.getAttribute('data-edit-product'));
          if (prod) openProductModal(prod);
          return;
        }

        const delBtn = e.target.closest('[data-delete-product]');
        if (delBtn) {
          openDeleteModal(delBtn.getAttribute('data-delete-product'));
          return;
        }

        const restockBtn = e.target.closest('[data-quick-restock]');
        if (restockBtn) {
          const prodId = restockBtn.getAttribute('data-quick-restock');
          notifDropdown?.classList.add('hidden');
          switchView('stock-in');
          const sel = document.getElementById('stockin-product');
          if (sel) {
            sel.value = prodId;
            sel.dispatchEvent(new Event('change'));
          }
          return;
        }

        const dispatchBtn = e.target.closest('[data-quick-dispatch]');
        if (dispatchBtn) {
          const prodId = dispatchBtn.getAttribute('data-quick-dispatch');
          switchView('stock-out');
          const sel = document.getElementById('stockout-product');
          if (sel) {
            sel.value = prodId;
            sel.dispatchEvent(new Event('change'));
          }
          return;
        }

        const filterCatBtn = e.target.closest('[data-jump-category]');
        if (filterCatBtn) {
          const cat = filterCatBtn.getAttribute('data-jump-category');
          uiState.prodCategory = cat;
          uiState.prodPage = 1;
          switchView('products');
          const sel = document.getElementById('prod-category-filter');
          if (sel) sel.value = cat;
          renderProductsTable();
          if (window.lucide) lucide.createIcons();
        }
      });

      // ====================================================================
      // 8. CATEGORIES & SUPPLIERS VIEWS
      // ====================================================================
      function renderCategoriesView() {
        const grid = document.getElementById('categories-cards-grid');
        if (!grid) return;

        grid.innerHTML = appState.categories
          .map((cat) => {
            const items = appState.products.filter((p) => p.category === cat);
            const totalUnits = items.reduce((s, p) => s + Number(p.quantity), 0);
            const totalVal = items.reduce((s, p) => s + Number(p.quantity) * Number(p.purchasePrice), 0);
            const alertCount = items.filter((p) => getProductStatus(p) !== 'In Stock').length;

            return `
              <div class="sf-card p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div class="flex items-center justify-between gap-2">
                    <h3 class="text-base font-bold text-sf-navy truncate">${cat}</h3>
                    <span class="px-2 py-0.5 rounded text-xs font-mono font-semibold tabular-nums bg-slate-100 text-sf-navy whitespace-nowrap shrink-0">${items.length} SKUs</span>
                  </div>
                  <div class="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-sf-border text-xs">
                    <div>
                      <span class="text-sf-muted block">Units On Hand</span>
                      <span class="font-mono font-bold tabular-nums text-sm text-sf-navy mt-0.5 block">${totalUnits.toLocaleString()}</span>
                    </div>
                    <div>
                      <span class="text-sf-muted block">Cost Valuation</span>
                      <span class="font-mono font-bold tabular-nums text-sm text-sf-tealDark mt-0.5 block">${formatMoney(totalVal)}</span>
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-between gap-2 pt-3 border-t border-sf-border text-xs">
                  <span class="${alertCount > 0 ? 'text-amber-600 font-semibold' : 'text-emerald-600 font-medium'}">
                    ${alertCount > 0 ? `${alertCount} SKU(s) low/out` : 'All stock healthy'}
                  </span>
                  <button type="button" data-jump-category="${cat}" class="font-semibold text-sf-navy hover:text-sf-tealDark whitespace-nowrap shrink-0">
                    Filter Products →
                  </button>
                </div>
              </div>
            `;
          })
          .join('');
      }

      document.getElementById('add-category-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('new-category-name');
        const val = input.value.trim();
        if (!val) return;
        if (!appState.categories.some((c) => c.toLowerCase() === val.toLowerCase())) {
          appState.categories.push(val);
          saveWorkspaceState();
          refreshAllUI();
          showToast(`Added category "${val}"`);
        } else {
          showToast(`Category "${val}" already exists`, 'warning');
        }
        input.value = '';
      });

      function renderSuppliersView() {
        const tbody = document.getElementById('suppliers-tbody');
        if (!tbody) return;

        tbody.innerHTML = appState.suppliers
          .map((sup) => {
            const linked = appState.products.filter((p) => p.supplier === sup.name);
            const sourcedVal = linked.reduce((s, p) => s + Number(p.quantity) * Number(p.purchasePrice), 0);
            return `
              <tr class="hover:bg-slate-50 align-middle">
                <td class="py-3 px-4 font-semibold text-sf-navy whitespace-nowrap">${sup.name}</td>
                <td class="py-3 px-4 text-sf-text whitespace-nowrap">${sup.contact}</td>
                <td class="py-3 px-4 text-xs whitespace-nowrap">
                  <span class="block text-sf-navy font-mono">${sup.email}</span>
                  <span class="text-sf-muted font-mono tabular-nums">${sup.phone}</span>
                </td>
                <td class="py-3 px-3 whitespace-nowrap"><span class="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 font-mono text-xs whitespace-nowrap">${sup.leadTime}</span></td>
                <td class="py-3 px-3 text-right font-mono font-semibold tabular-nums text-sf-navy whitespace-nowrap">${linked.length}</td>
                <td class="py-3 px-4 text-right font-mono font-semibold tabular-nums text-sf-tealDark whitespace-nowrap">${formatMoney(sourcedVal)}</td>
              </tr>
            `;
          })
          .join('');
      }

      // Add Supplier Modal
      const supModal = document.getElementById('supplier-modal');
      document.getElementById('open-add-supplier-modal')?.addEventListener('click', () => {
        supModal?.classList.remove('hidden');
        supModal?.classList.add('flex');
      });
      document.getElementById('close-supplier-modal')?.addEventListener('click', () => {
        supModal?.classList.add('hidden');
        supModal?.classList.remove('flex');
      });
      document.getElementById('cancel-supplier-modal')?.addEventListener('click', () => {
        supModal?.classList.add('hidden');
        supModal?.classList.remove('flex');
      });
      document.getElementById('supplier-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('sup-name').value.trim();
        const contact = document.getElementById('sup-contact').value.trim();
        const leadTime = document.getElementById('sup-lead').value.trim() || '3–5 Days';
        const email = document.getElementById('sup-email').value.trim();
        const phone = document.getElementById('sup-phone').value.trim();

        appState.suppliers.push({ id: 'sup-' + Date.now(), name, contact, leadTime, email, phone });
        saveWorkspaceState();
        supModal?.classList.add('hidden');
        supModal?.classList.remove('flex');
        e.target.reset();
        refreshAllUI();
        showToast(`Added supplier "${name}"`);
      });

      // ====================================================================
      // 9. STOCK IN & STOCK OUT WORKFLOWS
      // ====================================================================
      document.getElementById('stockin-product')?.addEventListener('change', (e) => {
        const prod = appState.products.find((p) => p.id === e.target.value);
        const preview = document.getElementById('stockin-current-preview');
        const costIn = document.getElementById('stockin-cost');
        const supSel = document.getElementById('stockin-supplier');
        if (prod) {
          if (preview) preview.textContent = `Current Stock: ${prod.quantity} units | Min Threshold: ${prod.minStock} | Default Cost: ${formatMoney(prod.purchasePrice)}`;
          if (costIn) costIn.value = prod.purchasePrice;
          if (supSel) supSel.value = prod.supplier;
        } else if (preview) {
          preview.textContent = 'Select a product to inspect current stock level.';
        }
      });

      document.getElementById('stock-in-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const prodId = document.getElementById('stockin-product').value;
        const qty = parseInt(document.getElementById('stockin-qty').value, 10);
        const unitCost = parseFloat(document.getElementById('stockin-cost').value);
        const supplier = document.getElementById('stockin-supplier').value;
        const ref = document.getElementById('stockin-ref').value.trim() || 'PO-' + Math.floor(1000 + Math.random() * 9000);
        const notes = document.getElementById('stockin-notes').value.trim() || 'Inbound stock receipt';

        const prod = appState.products.find((p) => p.id === prodId);
        if (!prod || qty <= 0) return;

        prod.quantity = Number(prod.quantity) + qty;
        prod.purchasePrice = unitCost;

        appState.transactions.unshift({
          id: 'tx-' + Date.now(),
          ref,
          date: getCurrentTimestamp(),
          type: 'Stock In',
          productId: prod.id,
          productName: prod.name,
          sku: prod.sku,
          quantity: qty,
          unitPrice: unitCost,
          totalValue: qty * unitCost,
          partner: supplier,
          notes
        });

        saveWorkspaceState();
        e.target.reset();
        document.getElementById('stockin-current-preview').textContent = 'Select a product to inspect current stock level.';
        refreshAllUI();
        showToast(`Received +${qty} units of ${prod.sku} (New Qty: ${prod.quantity})`);
      });

      document.getElementById('stockout-product')?.addEventListener('change', (e) => {
        const prod = appState.products.find((p) => p.id === e.target.value);
        const preview = document.getElementById('stockout-current-preview');
        const errBox = document.getElementById('stockout-error-msg');
        errBox?.classList.add('hidden');
        if (prod && preview) {
          preview.textContent = `Available Stock: ${prod.quantity} units | Selling Price: ${formatMoney(prod.sellingPrice)} | Status: ${getProductStatus(prod)}`;
        } else if (preview) {
          preview.textContent = 'Select a product to check available stock.';
        }
      });

      document.getElementById('stock-out-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const prodId = document.getElementById('stockout-product').value;
        const qty = parseInt(document.getElementById('stockout-qty').value, 10);
        const ref = document.getElementById('stockout-ref').value.trim() || 'SO-' + Math.floor(1000 + Math.random() * 9000);
        const dest = document.getElementById('stockout-destination').value.trim();
        const notes = document.getElementById('stockout-notes').value.trim() || 'Outbound order dispatch';
        const errBox = document.getElementById('stockout-error-msg');

        const prod = appState.products.find((p) => p.id === prodId);
        if (!prod) return;

        if (qty > Number(prod.quantity)) {
          errBox.textContent = `Insufficient stock: only ${prod.quantity} units of ${prod.sku} are currently available.`;
          errBox.classList.remove('hidden');
          return;
        }

        errBox.classList.add('hidden');
        prod.quantity = Number(prod.quantity) - qty;

        appState.transactions.unshift({
          id: 'tx-' + Date.now(),
          ref,
          date: getCurrentTimestamp(),
          type: 'Stock Out',
          productId: prod.id,
          productName: prod.name,
          sku: prod.sku,
          quantity: qty,
          unitPrice: prod.sellingPrice,
          totalValue: qty * Number(prod.sellingPrice),
          partner: dest,
          notes
        });

        saveWorkspaceState();
        e.target.reset();
        document.getElementById('stockout-current-preview').textContent = 'Select a product to check available stock.';
        refreshAllUI();

        const newStatus = getProductStatus(prod);
        if (newStatus === 'Out of Stock') {
          showToast(`Dispatched -${qty} of ${prod.sku}. Warning: SKU is now Out of Stock!`, 'error');
        } else if (newStatus === 'Low Stock') {
          showToast(`Dispatched -${qty} of ${prod.sku}. Alert: Low Stock threshold reached (${prod.quantity} left).`, 'warning');
        } else {
          showToast(`Dispatched -${qty} units of ${prod.sku} to ${dest}`);
        }
      });

      function renderStockInAndOutTables() {
        const inTbody = document.getElementById('stockin-history-tbody');
        const outTbody = document.getElementById('stockout-history-tbody');

        if (inTbody) {
          const inList = appState.transactions.filter((t) => t.type === 'Stock In').slice(0, 8);
          inTbody.innerHTML = inList
            .map(
              (t) => `
              <tr class="hover:bg-slate-50 align-middle">
                <td class="py-2.5 px-4 font-mono font-semibold text-sf-navy whitespace-nowrap">${t.ref}</td>
                <td class="py-2.5 px-3 font-mono text-sf-muted whitespace-nowrap">${t.date}</td>
                <td class="py-2.5 px-3 font-medium text-sf-navy">${t.productName}</td>
                <td class="py-2.5 px-3 text-right font-mono font-bold tabular-nums text-emerald-600 whitespace-nowrap">+${t.quantity}</td>
                <td class="py-2.5 px-3 text-right font-mono tabular-nums whitespace-nowrap">${formatMoney(t.totalValue)}</td>
                <td class="py-2.5 px-4 text-sf-muted whitespace-nowrap">${t.partner}</td>
              </tr>
            `
            )
            .join('');
        }

        if (outTbody) {
          const outList = appState.transactions.filter((t) => t.type === 'Stock Out').slice(0, 8);
          outTbody.innerHTML = outList
            .map(
              (t) => `
              <tr class="hover:bg-slate-50 align-middle">
                <td class="py-2.5 px-4 font-mono font-semibold text-sf-navy whitespace-nowrap">${t.ref}</td>
                <td class="py-2.5 px-3 font-mono text-sf-muted whitespace-nowrap">${t.date}</td>
                <td class="py-2.5 px-3 font-medium text-sf-navy">${t.productName}</td>
                <td class="py-2.5 px-3 text-right font-mono font-bold tabular-nums text-rose-600 whitespace-nowrap">-${t.quantity}</td>
                <td class="py-2.5 px-3 text-right font-mono tabular-nums whitespace-nowrap">${formatMoney(t.totalValue)}</td>
                <td class="py-2.5 px-4 text-sf-muted whitespace-nowrap">${t.partner}</td>
              </tr>
            `
            )
            .join('');
        }
      }

      // ====================================================================
      // 10. TRANSACTIONS AUDIT LEDGER & REPORTS VIEW
      // ====================================================================
      function renderTransactionsTable() {
        const tbody = document.getElementById('transactions-tbody');
        const label = document.getElementById('tx-count-label');
        if (!tbody) return;

        let list = [...appState.transactions];
        if (uiState.txType !== 'all') {
          list = list.filter((t) => t.type === uiState.txType);
        }
        if (uiState.txSearch.trim() !== '') {
          const q = uiState.txSearch.toLowerCase();
          list = list.filter(
            (t) =>
              t.ref.toLowerCase().includes(q) ||
              t.sku.toLowerCase().includes(q) ||
              t.productName.toLowerCase().includes(q) ||
              t.partner.toLowerCase().includes(q)
          );
        }

        if (label) label.textContent = `${list.length} transaction${list.length === 1 ? '' : 's'} logged`;

        tbody.innerHTML = list
          .map((t) => {
            const isIn = t.type === 'Stock In';
            return `
              <tr class="hover:bg-slate-50 align-middle">
                <td class="py-3 px-4 font-mono text-xs font-semibold text-sf-navy whitespace-nowrap">${t.ref}</td>
                <td class="py-3 px-3 font-mono text-xs text-sf-muted whitespace-nowrap">${t.date}</td>
                <td class="py-3 px-3 whitespace-nowrap">
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap ${isIn ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}">
                    ${t.type}
                  </span>
                </td>
                <td class="py-3 px-3 font-medium text-sf-navy">${t.productName} <span class="font-mono text-xs text-sf-muted whitespace-nowrap">(${t.sku})</span></td>
                <td class="py-3 px-3 text-right font-mono font-bold tabular-nums whitespace-nowrap ${isIn ? 'text-emerald-600' : 'text-rose-600'}">${isIn ? '+' : '-'}${t.quantity}</td>
                <td class="py-3 px-3 text-right font-mono tabular-nums whitespace-nowrap">${formatMoney(t.totalValue)}</td>
                <td class="py-3 px-4 text-xs text-sf-navy whitespace-nowrap">${t.partner}</td>
                <td class="py-3 px-4 text-xs text-sf-muted">${t.notes}</td>
              </tr>
            `;
          })
          .join('');
      }

      document.getElementById('tx-search-input')?.addEventListener('input', (e) => {
        uiState.txSearch = e.target.value;
        renderTransactionsTable();
      });
      document.getElementById('tx-type-filter')?.addEventListener('change', (e) => {
        uiState.txType = e.target.value;
        renderTransactionsTable();
      });

      function renderReportsView() {
        let totalCost = 0;
        let totalRetail = 0;
        const reorderItems = [];

        appState.products.forEach((p) => {
          totalCost += Number(p.quantity) * Number(p.purchasePrice);
          totalRetail += Number(p.quantity) * Number(p.sellingPrice);
          const status = getProductStatus(p);
          if (status !== 'In Stock') {
            const suggestedQty = Math.max(5, Math.ceil(Number(p.minStock) * 2.5) - Number(p.quantity));
            reorderItems.push({
              ...p,
              suggestedQty,
              estCost: suggestedQty * Number(p.purchasePrice)
            });
          }
        });

        const margin = totalRetail - totalCost;
        const marginPct = totalRetail > 0 ? ((margin / totalRetail) * 100).toFixed(1) : '0.0';

        document.getElementById('rep-total-cost').textContent = formatMoney(totalCost);
        document.getElementById('rep-total-retail').textContent = formatMoney(totalRetail);
        document.getElementById('rep-gross-margin').textContent = `${formatMoney(margin)} (${marginPct}%)`;

        const totalPoCost = reorderItems.reduce((s, r) => s + r.estCost, 0);
        document.getElementById('rep-reorder-est-cost').textContent = `Est. PO Cost: ${formatMoney(totalPoCost)}`;

        const tbody = document.getElementById('report-reorder-tbody');
        if (tbody) {
          if (reorderItems.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="py-8 text-center text-sf-muted">No SKUs require reordering at this time.</td></tr>';
          } else {
            tbody.innerHTML = reorderItems
              .map(
                (r) => `
                <tr class="hover:bg-slate-50 align-middle">
                  <td class="py-3 px-4 font-mono text-xs font-semibold text-sf-navy whitespace-nowrap">${r.sku}</td>
                  <td class="py-3 px-3 font-medium text-sf-navy">${r.name}</td>
                  <td class="py-3 px-3 text-xs text-sf-muted whitespace-nowrap">${r.supplier}</td>
                  <td class="py-3 px-3 text-right font-mono font-bold tabular-nums whitespace-nowrap ${r.quantity === 0 ? 'text-rose-600' : 'text-amber-600'}">${r.quantity}</td>
                  <td class="py-3 px-3 text-right font-mono tabular-nums text-sf-muted whitespace-nowrap">${r.minStock}</td>
                  <td class="py-3 px-3 text-right font-mono font-bold tabular-nums text-sf-tealDark whitespace-nowrap">+${r.suggestedQty}</td>
                  <td class="py-3 px-4 text-right font-mono font-semibold tabular-nums text-sf-navy whitespace-nowrap">${formatMoney(r.estCost)}</td>
                </tr>
              `
              )
              .join('');
          }
        }
      }

      // ====================================================================
      // 11. CSV & JSON EXPORTS + SETTINGS RESET
      // ====================================================================
      function downloadCSV(filename, rows) {
        const csvContent = rows
          .map((row) =>
            row
              .map((cell) => {
                const str = String(cell ?? '').replace(/"/g, '""');
                return `"${str}"`;
              })
              .join(',')
          )
          .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast(`Exported ${filename}`);
      }

      function exportProductsCSV() {
        const headers = ['SKU', 'Product Name', 'Category', 'Supplier', 'Purchase Price', 'Selling Price', 'Quantity', 'Min Stock', 'Status', 'Stock Value'];
        const rows = appState.products.map((p) => [
          p.sku,
          p.name,
          p.category,
          p.supplier,
          p.purchasePrice.toFixed(2),
          p.sellingPrice.toFixed(2),
          p.quantity,
          p.minStock,
          getProductStatus(p),
          (p.quantity * p.purchasePrice).toFixed(2)
        ]);
        downloadCSV('stockflow-inventory-catalog.csv', [headers, ...rows]);
      }

      document.getElementById('products-export-csv')?.addEventListener('click', exportProductsCSV);
      document.getElementById('dash-export-btn')?.addEventListener('click', exportProductsCSV);
      document.getElementById('report-export-valuation')?.addEventListener('click', exportProductsCSV);

      document.getElementById('tx-export-csv')?.addEventListener('click', () => {
        const headers = ['Reference', 'Date', 'Type', 'SKU', 'Product Name', 'Quantity', 'Total Value', 'Partner/Destination', 'Notes'];
        const rows = appState.transactions.map((t) => [
          t.ref,
          t.date,
          t.type,
          t.sku,
          t.productName,
          t.quantity,
          t.totalValue.toFixed(2),
          t.partner,
          t.notes
        ]);
        downloadCSV('stockflow-transactions-ledger.csv', [headers, ...rows]);
      });

      document.getElementById('report-export-reorder')?.addEventListener('click', () => {
        const headers = ['SKU', 'Product Name', 'Supplier', 'Current Qty', 'Min Stock', 'Suggested Order Qty', 'Est. PO Cost'];
        const rows = appState.products
          .filter((p) => getProductStatus(p) !== 'In Stock')
          .map((p) => {
            const sug = Math.max(5, Math.ceil(Number(p.minStock) * 2.5) - Number(p.quantity));
            return [p.sku, p.name, p.supplier, p.quantity, p.minStock, sug, (sug * p.purchasePrice).toFixed(2)];
          });
        downloadCSV('stockflow-priority-reorder-sheet.csv', [headers, ...rows]);
      });

      // Settings Form & Reset Demo Data
      document.getElementById('set-org-name').value = appState.settings.orgName;
      document.getElementById('set-currency').value = appState.settings.currency;
      document.getElementById('set-default-min').value = appState.settings.defaultMinStock;

      document.getElementById('settings-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        appState.settings.orgName = document.getElementById('set-org-name').value.trim() || 'StockFlow';
        appState.settings.currency = document.getElementById('set-currency').value;
        appState.settings.defaultMinStock = parseInt(document.getElementById('set-default-min').value, 10) || 10;
        saveWorkspaceState();
        refreshAllUI();
        showToast('Workspace settings saved');
      });

      document.getElementById('export-json-backup')?.addEventListener('click', () => {
        const blob = new Blob([JSON.stringify(appState, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'stockflow-backup.json';
        a.click();
        URL.revokeObjectURL(url);
        showToast('Downloaded JSON workspace backup');
      });

      document.getElementById('reset-demo-data-btn')?.addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEY);
        appState = loadWorkspaceState();
        saveWorkspaceState();
        refreshAllUI();
        showToast('Restored default 26-item demo dataset');
      });

      // Initial Boot
      saveWorkspaceState();
      refreshAllUI();
    });
