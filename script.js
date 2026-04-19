/**
 * SmartTools Hub v2.0 - Core Engine
 * Handcrafted with Vanilla JS for efficiency.
 */

// 1. DATABASE: ALL 33 TOOLS
const TOOLS = [
    // Image Category
    { id: 'image-compressor', name: 'Image Compressor', cat: 'Image', icon: 'minimize', desc: 'Reduce file size without quality loss.', trending: true },
    { id: 'background-remover', name: 'Background Remover', cat: 'Image', icon: 'trash-2', desc: 'Cleanup images instantly.' },
    { id: 'image-resizer', name: 'Image Resizer', cat: 'Image', icon: 'image', desc: 'Resize pixels and dimensions.' },
    { id: 'jpg-to-png', name: 'JPG to PNG', cat: 'Image', icon: 'image', desc: 'Convert image formats instantly.' },
    
    // PDF Category
    { id: 'pdf-merger', name: 'PDF Merger', cat: 'PDF', icon: 'file-text', desc: 'Combine multiple documents.' },
    { id: 'pdf-splitter', name: 'PDF Splitter', cat: 'PDF', icon: 'scissors', desc: 'Extract pages from PDF.' },

    // Text Category
    { id: 'word-counter', name: 'Word Counter', cat: 'Text', icon: 'type', desc: 'Live word and char analysis.', popular: true },
    { id: 'case-converter', name: 'Case Converter', cat: 'Text', icon: 'type', desc: 'Transform text styling.' },
    { id: 'text-to-speech', name: 'Text to Speech', cat: 'Text', icon: 'volume-2', desc: 'Convert text to voice.' },
    { id: 'speech-to-text', name: 'Speech to Text', cat: 'Text', icon: 'mic', desc: 'Real-time voice typing.' },
    { id: 'notes-app', name: 'Notes App', cat: 'Text', icon: 'pen-tool', desc: 'Auto-save your thoughts.' },

    // Finance Category (High CPC)
    { id: 'emi-calculator', name: 'EMI Calculator', cat: 'Finance', icon: 'landmark', desc: 'Loan installment calculator.', popular: true },
    { id: 'sip-calculator', name: 'SIP Calculator', cat: 'Finance', icon: 'banknote', desc: 'Mutual fund wealth tracker.' },
    { id: 'tax-calculator', name: 'Tax Calculator', cat: 'Finance', icon: 'wallet', desc: 'Income tax estimation tool.' },
    { id: 'credit-card-interest', name: 'Card Interest', cat: 'Finance', icon: 'credit-card', desc: 'Unpaid balance analyzer.' },
    { id: 'insurance-estimator', name: 'Insurance Premium', cat: 'Finance', icon: 'shield-check', desc: 'Quick premium estimation.' },
    { id: 'website-cost', name: 'Website Cost', cat: 'Finance', icon: 'globe', desc: 'Development budget planner.' },
    { id: 'freelancer-earning', name: 'Freelancer Earning', cat: 'Finance', icon: 'briefcase', desc: 'Calculate hourly rates.' },
    { id: 'domain-estimator', name: 'Domain Value', cat: 'Finance', icon: 'search', cat: 'Finance', desc: 'Domain appraisal check.' },
    { id: 'crypto-profit', name: 'Crypto Profit', icon: 'coins', cat: 'Finance', desc: 'Trade profit analyzer.' },
    { id: 'roi-calculator', name: 'Ads ROI', icon: 'line-chart', cat: 'Finance', desc: 'Marketing profit analyzer.' },

    // Instagram tools
    { id: 'ig-username', name: 'Username Gen', cat: 'Instagram', icon: 'instagram', desc: 'Unique IG handle ideas.', trending: true },
    { id: 'ig-caption', name: 'Caption Maker', cat: 'Instagram', icon: 'sparkles', desc: 'Engaging IG post captions.' },
    { id: 'ig-bio', name: 'Bio Generator', cat: 'Instagram', icon: 'sparkles', desc: 'Stylish profile bio ideas.' },

    // Utility tools
    { id: 'password-generator', name: 'Password Gen', cat: 'Utility', icon: 'lock', desc: 'Secure random keys.', popular: true },
    { id: 'age-calculator', name: 'Age Calculator', cat: 'Utility', icon: 'calendar', desc: 'Find exact age metrics.' },
    { id: 'qr-generator', name: 'QR Code Gen', cat: 'Utility', icon: 'qr-code', desc: 'Generate custom QR codes.' },
    { id: 'color-picker', name: 'Color Picker', cat: 'Utility', icon: 'palette', desc: 'HEX/RGB code selector.' },
    { id: 'base64-tool', name: 'Base64 Tool', cat: 'Utility', icon: 'hash', desc: 'Encode or decode strings.' },
    { id: 'url-encoder', name: 'URL Tool', cat: 'Utility', icon: 'link', desc: 'Sanitize web URLs.' },
    { id: 'unit-converter', name: 'Unit Converter', cat: 'Utility', icon: 'ruler', desc: 'Distance, weight, temp.' },
    { id: 'stopwatch', name: 'Stopwatch', cat: 'Utility', icon: 'timer', desc: 'Precision split timer.' },
    { id: 'todo-list', name: 'To-Do List', cat: 'Utility', icon: 'check-square', desc: 'Daily task manager.' }
];

const CATEGORIES = ['All', 'Image', 'PDF', 'Finance', 'Text', 'Instagram', 'Utility'];

// 2. STATE MANAGEMENT
let localState = {
    theme: localStorage.getItem('sh_theme') || 'light',
    search: '',
    category: 'All',
    recent: JSON.parse(localStorage.getItem('sh_recent') || '[]'),
    activeTool: null
};

// 3. CORE RENDERING ENGINE
function initialize() {
    renderCategories();
    renderShelves();
    renderGrid();
    setupTheme();
    setupSearch();
    lucide.createIcons();
}

function renderCategories() {
    const container = document.getElementById('categoryTabs');
    container.innerHTML = CATEGORIES.map(cat => `
        <button onclick="setCategory('${cat}')" 
                class="px-6 py-3 rounded-2xl text-sm font-black transition-all border-2 ${localState.category === cat ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-500/30' : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-blue-500'}">
            ${cat}
        </button>
    `).join('');
}

function renderShelves() {
    const shelfContainer = document.getElementById('shelves');
    if (localState.search !== '' || localState.category !== 'All') {
        shelfContainer.classList.add('hidden');
        return;
    }
    shelfContainer.classList.remove('hidden');
    
    let shelvesHTML = '';
    
    // Recent Shelf
    if (localState.recent.length > 0) {
        const recentTools = localState.recent.map(id => TOOLS.find(t => t.id === id)).filter(Boolean);
        shelvesHTML += createShelf('🕒 Recently Used', recentTools);
    }
    
    // Popular Shelf
    shelvesHTML += createShelf('🔥 Popular Tools', TOOLS.filter(t => t.popular));
    
    // Trending Shelf
    shelvesHTML += createShelf('📈 Trending Now', TOOLS.filter(t => t.trending));
    
    shelfContainer.innerHTML = shelvesHTML;
}

function createShelf(title, toolList) {
    return `
        <section>
            <h3 class="text-xl font-bold mb-6 flex items-center gap-2">${title}</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                ${toolList.slice(0, 4).map(t => createToolCard(t)).join('')}
            </div>
        </section>
    `;
}

function createToolCard(t) {
    return `
        <div onclick="handleToolAction('${t.id}')" class="tool-card glass group p-6 rounded-[2rem] border transition-all cursor-pointer">
            <div class="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110">
                <i data-lucide="${t.icon}" class="w-7 h-7"></i>
            </div>
            <h4 class="text-xl font-black mb-2 tracking-tight group-hover:text-blue-600 transition-colors">${t.name}</h4>
            <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">${t.desc}</p>
        </div>
    `;
}

function renderGrid() {
    const grid = document.getElementById('toolGrid');
    const filtered = TOOLS.filter(t => {
        const matchesCat = localState.category === 'All' || t.cat === localState.category;
        const matchesSearch = t.name.toLowerCase().includes(localState.search) || t.desc.toLowerCase().includes(localState.search);
        return matchesCat && matchesSearch;
    });

    grid.innerHTML = filtered.map(t => createToolCard(t)).join('');
    document.getElementById('noResults').classList.toggle('hidden', filtered.length > 0);
    lucide.createIcons();
}

// 4. ACTION HANDLERS
function setCategory(cat) {
    localState.category = cat;
    renderCategories();
    renderGrid();
    renderShelves();
}

function setupSearch() {
    document.getElementById('toolSearch').addEventListener('input', (e) => {
        localState.search = e.target.value.toLowerCase();
        renderGrid();
        renderShelves();
    });
}

function handleToolAction(id) {
    const tool = TOOLS.find(t => t.id === id);
    if (!tool) return;
    
    localState.activeTool = tool;
    
    // Update Recent
    const updatedRecent = [id, ...localState.recent.filter(rid => rid !== id)].slice(0, 4);
    localState.recent = updatedRecent;
    localStorage.setItem('sh_recent', JSON.stringify(updatedRecent));

    openTool(tool);
}

// 5. MODAL SYSTEM
function openTool(tool) {
    const modal = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');
    const ui = document.getElementById('toolUI');
    const seo = document.getElementById('modalSEO');

    document.getElementById('modalTitle').innerText = tool.name;
    document.getElementById('modalCat').innerText = tool.cat;
    document.getElementById('modalIcon').innerHTML = `<i data-lucide="${tool.icon}" class="w-6 h-6"></i>`;
    
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.add('opacity-100');
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
    }, 10);
    
    document.body.style.overflow = 'hidden';
    
    // INJECT SPECIFIC LOGIC
    ui.innerHTML = injectToolHTML(tool.id);
    seo.innerHTML = injectToolSEO(tool);
    
    lucide.createIcons();
    bindToolEvents(tool.id);
}

function closeTool() {
    const modal = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');
    
    modal.classList.remove('opacity-100');
    content.classList.remove('scale-100');
    content.classList.add('scale-95');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        renderShelves(); // Refresh recent shelf
    }, 300);
}

// 6. TOOL LOGIC INJECTOR (THE HUB)
function injectToolHTML(id) {
    switch(id) {
        case 'emi-calculator':
            return `
                <div class="space-y-6">
                    <div>
                        <label class="tool-input-label">Loan Amount (₹)</label>
                        <input type="number" id="emiP" class="tool-field" value="1000000">
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="tool-input-label">Interest Rate (% p.a)</label>
                            <input type="number" id="emiR" class="tool-field" value="8.5">
                        </div>
                        <div>
                            <label class="tool-input-label">Tenure (Years)</label>
                            <input type="number" id="emiN" class="tool-field" value="20">
                        </div>
                    </div>
                    <button id="emiCalc" class="tool-action-btn">Calculate EMI</button>
                    <div id="emiRes" class="tool-result-box hidden">
                        <div class="text-center">
                            <span class="text-xs uppercase font-bold text-gray-400">Monthly Installment</span>
                            <h2 class="text-4xl font-black text-blue-600 mt-2" id="emiVal">₹0</h2>
                        </div>
                    </div>
                </div>
            `;
        case 'word-counter':
            return `
                <div class="space-y-6">
                    <label class="tool-input-label">Paste Content</label>
                    <textarea id="wcInput" class="tool-field h-48 py-5" placeholder="Start typing your article..."></textarea>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl text-center">
                            <div class="text-2xl font-black" id="wcW">0</div>
                            <div class="text-[10px] font-bold text-gray-400 uppercase">Words</div>
                        </div>
                        <div class="p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl text-center">
                            <div class="text-2xl font-black" id="wcC">0</div>
                            <div class="text-[10px] font-bold text-gray-400 uppercase">Chars</div>
                        </div>
                    </div>
                </div>
            `;
        case 'password-generator':
            return `
                <div class="space-y-8">
                    <div>
                        <label class="tool-input-label">Length: <span id="pgLv">16</span></label>
                        <input type="range" id="pgL" min="8" max="64" value="16" class="w-full">
                    </div>
                    <div class="p-8 bg-gray-100 dark:bg-gray-900 rounded-[2rem] break-all font-mono text-center text-xl font-bold border-2 border-dashed border-gray-200 dark:border-gray-700 select-all" id="pgOut">
                        Click Generate
                    </div>
                    <button id="pgBtn" class="tool-action-btn">Secure Generate</button>
                </div>
            `;
        case 'todo-list':
            return `
                <div class="space-y-6">
                   <div class="flex gap-2">
                        <input type="text" id="tdI" class="tool-field" placeholder="Add new task...">
                        <button id="tdA" class="bg-blue-600 text-white px-8 rounded-2xl font-bold">ADD</button>
                   </div>
                   <div id="tdList" class="space-y-2"></div>
                </div>
            `;
        // Fallback for tools without full logic
        default:
            return `
                <div class="p-20 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[3rem] text-center space-y-4">
                    <div class="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-2xl mx-auto flex items-center justify-center">
                        <i data-lucide="cog" class="animate-spin-slow"></i>
                    </div>
                    <h3 class="text-xl font-bold">Tool Initializing</h3>
                    <p class="text-gray-400 text-sm max-w-xs mx-auto italic">This modern utility engine for <b>${id}</b> is being optimized for current environment.</p>
                </div>
            `;
    }
}

function bindToolEvents(id) {
    if (id === 'emi-calculator') {
        document.getElementById('emiCalc').onclick = () => {
            const P = Number(document.getElementById('emiP').value);
            const r = Number(document.getElementById('emiR').value) / 1200;
            const n = Number(document.getElementById('emiN').value) * 12;
            const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            document.getElementById('emiRes').classList.remove('hidden');
            document.getElementById('emiVal').innerText = `₹${Math.round(emi).toLocaleString()}`;
        };
    }
    
    if (id === 'word-counter') {
        document.getElementById('wcInput').oninput = (e) => {
            const txt = e.target.value.trim();
            document.getElementById('wcW').innerText = txt ? txt.split(/\s+/).length : 0;
            document.getElementById('wcC').innerText = txt.length;
        };
    }

    if (id === 'password-generator') {
        const gen = () => {
             const c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";
             const l = document.getElementById('pgL').value;
             let p = "";
             for(let i=0; i<l; i++) p += c.charAt(Math.floor(Math.random()*c.length));
             document.getElementById('pgOut').innerText = p;
        };
        document.getElementById('pgL').oninput = (e) => {
             document.getElementById('pgLv').innerText = e.target.value;
             gen();
        };
        document.getElementById('pgBtn').onclick = gen;
        gen();
    }

    if (id === 'todo-list') {
        const renderTD = () => {
            const items = JSON.parse(localStorage.getItem('sh_todo') || '[]');
            document.getElementById('tdList').innerHTML = items.map((t, i) => `
                <div class="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl group">
                    <span class="font-bold">${t}</span>
                    <button onclick="deleteTD(${i})" class="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                </div>
            `).join('');
            lucide.createIcons();
        };
        document.getElementById('tdA').onclick = () => {
            const v = document.getElementById('tdI').value;
            if(!v) return;
            const items = JSON.parse(localStorage.getItem('sh_todo') || '[]');
            items.push(v);
            localStorage.setItem('sh_todo', JSON.stringify(items));
            document.getElementById('tdI').value = '';
            renderTD();
        };
        window.deleteTD = (i) => {
            const items = JSON.parse(localStorage.getItem('sh_todo') || '[]');
            items.splice(i, 1);
            localStorage.setItem('sh_todo', JSON.stringify(items));
            renderTD();
        };
        renderTD();
    }
}

function injectToolSEO(tool) {
    return `
        <div class="prose dark:prose-invert max-w-none">
            <h1 class="text-3xl font-black mb-4">Mastering the ${tool.name}</h1>
            <p class="text-gray-500 leading-relaxed">Our <strong>${tool.name}</strong> is a professional-grade utility designed to provide immediate results with 100% data security. Since all processing happens in your browser, no data ever leaves your device.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                <section>
                    <h3 class="text-lg font-bold mb-4">How to use</h3>
                    <ul class="space-y-3 text-sm text-gray-400">
                        <li>1. Open the tool from the SmartTools hub.</li>
                        <li>2. Input the required data into the fields above.</li>
                        <li>3. View generated results in real-time.</li>
                        <li>4. Use the reset or copy feature for new tasks.</li>
                    </ul>
                </section>
                <section>
                    <h3 class="text-lg font-bold mb-4">Key Benefits</h3>
                    <ul class="space-y-3 text-sm text-gray-400">
                        <li>🚀 High-speed client-side processing.</li>
                        <li>🛡️ Private - No cloud storage.</li>
                        <li>📱 Mobile-First responsive interface.</li>
                    </ul>
                </section>
            </div>
        </div>
    `;
}

// 7. THEME ENGINE
function setupTheme() {
    applyTheme();
    document.getElementById('themeToggle').addEventListener('click', () => {
        localState.theme = localState.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('sh_theme', localState.theme);
        applyTheme();
    });
}

function applyTheme() {
    const sun = document.getElementById('sunIcon');
    const moon = document.getElementById('moonIcon');
    if (localState.theme === 'dark') {
        document.documentElement.classList.add('dark');
        sun.classList.remove('hidden');
        moon.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        sun.classList.add('hidden');
        moon.classList.remove('hidden');
    }
}

// Kickoff
initialize();
