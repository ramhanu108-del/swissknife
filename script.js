// --- FULL TOOLS DATABASE (33 TOOLS) ---
const TOOLS = [
    // IMAGE
    { id: 'image-compressor', name: 'Image Compressor', icon: 'minimize', cat: 'Image', desc: 'Reduce file size without quality loss.' },
    { id: 'background-remover', name: 'BG Remover', icon: 'trash-2', cat: 'Image', desc: 'Remove image backgrounds easily.' },
    { id: 'image-resizer', name: 'Image Resizer', icon: 'image', cat: 'Image', desc: 'Resize dimensions of any image.' },
    { id: 'jpg-to-png', name: 'JPG to PNG', icon: 'image', cat: 'Image', desc: 'Convert format instantly.' },
    // PDF
    { id: 'pdf-merger', name: 'PDF Merger', icon: 'file-text', cat: 'PDF', desc: 'Combine multiple PDFs into one.' },
    { id: 'pdf-splitter', name: 'PDF Splitter', icon: 'scissors', cat: 'PDF', desc: 'Extract pages from a PDF.' },
    // TEXT
    { id: 'word-counter', name: 'Word Counter', icon: 'type', cat: 'Text', desc: 'Count words and characters.' },
    { id: 'case-converter', name: 'Case Converter', icon: 'type', cat: 'Text', desc: 'Uppercase, lowercase, title case.' },
    { id: 'text-to-speech', name: 'Text to Speech', icon: 'volume-2', cat: 'Text', desc: 'Convert text to natural voice.' },
    { id: 'speech-to-text', name: 'Speech to Text', icon: 'mic', cat: 'Text', desc: 'Real-time voice typing.' },
    { id: 'notes-app', name: 'Notes App', icon: 'pen-tool', cat: 'Text', desc: 'Quickly write and auto-save notes.' },
    // FINANCE
    { id: 'emi-calculator', name: 'EMI Calculator', icon: 'landmark', cat: 'Finance', desc: 'Loan EMI with interest.' },
    { id: 'sip-calculator', name: 'SIP Calculator', icon: 'banknote', cat: 'Finance', desc: 'Mutual fund future wealth.' },
    { id: 'tax-calculator', name: 'Tax Calculator', icon: 'wallet', cat: 'Finance', desc: 'Tax planning tool.' },
    { id: 'credit-card-interest', name: 'Card Interest', icon: 'credit-card', cat: 'Finance', desc: 'Calculate unpaid balance interest.' },
    { id: 'insurance-estimator', name: 'Insurance Premium', icon: 'shield-check', cat: 'Finance', desc: 'Estimate monthly premiums.' },
    { id: 'website-cost', name: 'Website Cost', icon: 'globe', cat: 'Finance', desc: 'Project budget estimation.' },
    { id: 'freelancer-earning', name: 'Freelancer Earning', icon: 'briefcase', cat: 'Finance', desc: 'Hourly to monthly income.' },
    { id: 'domain-estimator', name: 'Domain Value', icon: 'search', cat: 'Finance', desc: 'Website market value.' },
    { id: 'crypto-profit', name: 'Crypto Profit', icon: 'coins', cat: 'Finance', desc: 'Trade ROI analyzer.' },
    { id: 'roi-calculator', name: 'Ads ROI', icon: 'line-chart', cat: 'Finance', desc: 'Google Ads profit calc.' },
    // INSTAGRAM
    { id: 'username-generator', name: 'IG Username Gen', icon: 'instagram', cat: 'Instagram', desc: 'Unique handles for IG.' },
    { id: 'caption-generator', name: 'IG Caption Gen', icon: 'message-circle', cat: 'Instagram', desc: 'Attractive captions with AI.' },
    { id: 'bio-generator', name: 'IG Bio Gen', icon: 'sparkles', cat: 'Instagram', desc: 'Stylish profile bios.' },
    // UTILITY
    { id: 'password-generator', name: 'Password Gen', icon: 'lock', cat: 'Utility', desc: 'Strong secure passwords.' },
    { id: 'age-calculator', name: 'Age Calculator', icon: 'calendar', cat: 'Utility', desc: 'Exact age in days/hours.' },
    { id: 'qr-code-generator', name: 'QR Code Gen', icon: 'qr-code', cat: 'Utility', desc: 'Instant QR for links.' },
    { id: 'color-picker', name: 'Color Picker', icon: 'palette', cat: 'Utility', desc: 'Hex/RGB color generator.' },
    { id: 'base64-converter', name: 'Base64 Tool', icon: 'hash', cat: 'Utility', desc: 'Encode/Decode Base64.' },
    { id: 'url-converter', name: 'URL Encoder', icon: 'link', cat: 'Utility', desc: 'Sanitize web links.' },
    { id: 'unit-converter', name: 'Unit Converter', icon: 'ruler', cat: 'Utility', desc: 'Measurement conversion.' },
    { id: 'stopwatch', name: 'Stopwatch', icon: 'timer', cat: 'Utility', desc: 'Accurate split timer.' },
    { id: 'todo-list', name: 'To-Do List', icon: 'check-square', cat: 'Utility', desc: 'Task management with sync.' }
];

const CATEGORIES = ['All', 'Image', 'PDF', 'Finance', 'Text', 'Instagram', 'Utility'];
let currentCat = 'All';
let search = '';

// --- RENDERING ENGINE ---
function renderTools() {
    const grid = document.getElementById('toolGrid');
    const filtered = TOOLS.filter(t => {
        const matchesCat = currentCat === 'All' || t.cat === currentCat;
        const matchesSearch = t.name.toLowerCase().includes(search) || t.desc.toLowerCase().includes(search);
        return matchesCat && matchesSearch;
    });

    grid.innerHTML = filtered.map(t => `
        <div onclick="openTool('${t.id}')" class="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 hover:border-blue-500 cursor-pointer transition-all hover:-translate-y-2 group">
            <div class="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <i data-lucide="${t.icon}"></i>
            </div>
            <h3 class="text-lg font-bold mb-2">${t.name}</h3>
            <p class="text-sm text-gray-500 line-clamp-2">${t.desc}</p>
        </div>
    `).join('');
    
    document.getElementById('emptySearch').classList.toggle('hidden', filtered.length > 0);
    lucide.createIcons();
}

// --- NAV & STATE ---
function goHome() {
    document.getElementById('toolView').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function openTool(id) {
    const tool = TOOLS.find(t => t.id === id);
    if(!tool) return;
    
    const view = document.getElementById('toolView');
    const container = document.getElementById('toolInterface');
    view.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Inject dynamic logic for tool (Simplified demo version for export)
    container.innerHTML = `<h2 class="text-3xl font-bold mb-4">${tool.name}</h2>
                           <p class="text-gray-500 mb-8">${tool.desc}</p>
                           <div class="p-10 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl text-center">
                             Interactive functionality for <b>${tool.name}</b> initialized.
                           </div>`;
    lucide.createIcons();
}

function setCat(cat) {
    currentCat = cat;
    renderCategories();
    renderTools();
}

function renderCategories() {
    const container = document.getElementById('categoryTabs');
    container.innerHTML = CATEGORIES.map(cat => `
        <button onclick="setCat('${cat}')" class="px-5 py-2 rounded-xl text-sm font-bold transition-all ${currentCat === cat ? 'bg-blue-600 text-white shadow-lg' : 'bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800'}">
            ${cat}
        </button>
    `).join('');
}

// --- INIT ---
window.onload = () => {
    renderCategories();
    renderTools();
    document.getElementById('toolSearch').oninput = (e) => {
        search = e.target.value.toLowerCase();
        renderTools();
    };
    document.getElementById('themeToggle').onclick = () => {
        document.documentElement.classList.toggle('dark');
        document.getElementById('sunIcon').classList.toggle('hidden');
        document.getElementById('moonIcon').classList.toggle('hidden');
    };
    lucide.createIcons();
};
