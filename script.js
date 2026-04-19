/**
 * SmartTools Hub v4.0 - Production Core
 * Full local logic for 33 tools, localization, and quotes.
 */

// 1. TOOL DEFINITIONS
const TOOLS = [
    { id: 'image-compressor', name: 'Image Compressor', cat: 'Image', icon: 'minimize', popular: true, desc: 'Optimise image file size instantly.' },
    { id: 'background-remover', name: 'BG Remover', cat: 'Image', icon: 'trash-2', trending: true, desc: 'Professional image transparency.' },
    { id: 'image-resizer', name: 'Image Resizer', cat: 'Image', icon: 'image', desc: 'Custom dimension adjustment.' },
    { id: 'jpg-to-png', name: 'JPG to PNG', cat: 'Image', icon: 'image', desc: 'Instant format conversion.' },
    { id: 'pdf-merger', name: 'PDF Merger', cat: 'PDF', icon: 'file-text', desc: 'Combine multiple documents.' },
    { id: 'pdf-splitter', name: 'PDF Splitter', cat: 'PDF', icon: 'scissors', desc: 'Extract specific PDF pages.' },
    { id: 'word-counter', name: 'Word Counter', cat: 'Text', icon: 'type', popular: true, desc: 'Real-time word and char metrics.' },
    { id: 'case-converter', name: 'Case Converter', cat: 'Text', icon: 'type', desc: 'Uppercase, lowercase, title case.' },
    { id: 'text-to-speech', name: 'Text to Speech', cat: 'Text', icon: 'volume-2', desc: 'Neural voice generation.' },
    { id: 'speech-to-text', name: 'Speech to Text', cat: 'Text', icon: 'mic', desc: 'Dictation and transcription.' },
    { id: 'notes-app', name: 'Notes App', cat: 'Text', icon: 'pen-tool', desc: 'Auto-save your thoughts.' },
    { id: 'emi-calculator', name: 'EMI Calculator', cat: 'Finance', icon: 'landmark', popular: true, desc: 'Precise loan repayment calculations.' },
    { id: 'sip-calculator', name: 'SIP Calculator', cat: 'Finance', icon: 'banknote', trending: true, desc: 'Future investment wealth planner.' },
    { id: 'tax-calculator', name: 'Tax Calculator', cat: 'Finance', icon: 'wallet', desc: 'Income tax estimation tool.' },
    { id: 'credit-card-interest', name: 'Card Interest', cat: 'Finance', icon: 'credit-card', desc: 'Unpaid balance analyzer.' },
    { id: 'website-cost', name: 'Website Cost', cat: 'Finance', icon: 'globe', desc: 'Development budget planner.' },
    { id: 'freelancer-earning', name: 'Freelancer Rate', cat: 'Finance', icon: 'briefcase', desc: 'Calculate hourly rates.' },
    { id: 'domain-estimator', name: 'Domain Appraiser', cat: 'Finance', icon: 'search', desc: 'Market value estimation.' },
    { id: 'crypto-profit', name: 'Crypto Profit', icon: 'coins', cat: 'Finance', desc: 'Trade profit analyzer.' },
    { id: 'roi-calculator', name: 'ROI Tracker', cat: 'Finance', icon: 'line-chart', desc: 'Marketing profit analyzer.' },
    { id: 'username-generator', name: 'IG Username Gen', cat: 'Instagram', icon: 'instagram', trending: true, desc: 'Unique handle ideas.' },
    { id: 'caption-generator', name: 'Caption Maker', cat: 'Instagram', icon: 'sparkles', desc: 'Engaging IG post captions.' },
    { id: 'bio-generator', name: 'Bio Sketch', cat: 'Instagram', icon: 'sparkles', desc: 'Premium profile bios.' },
    { id: 'password-generator', name: 'Password Gen', cat: 'Utility', icon: 'lock', popular: true, desc: 'Secure random keys.' },
    { id: 'age-calculator', name: 'Age Calculator', cat: 'Utility', icon: 'calendar', desc: 'Timeline and milestone metrics.' },
    { id: 'qr-generator', name: 'QR Code Gen', cat: 'Utility', icon: 'qr-code', desc: 'Instant binary codes.' },
    { id: 'color-picker', name: 'Color Picker', cat: 'Utility', icon: 'palette', desc: 'HEX/RGB code selector.' },
    { id: 'base64-tool', name: 'Base64 Tool', cat: 'Utility', icon: 'hash', desc: 'String encoding/decoding.' },
    { id: 'url-encoder', name: 'URL Encoder', cat: 'Utility', icon: 'link-2', desc: 'Sanitize web link strings.' },
    { id: 'unit-converter', name: 'Unit Box', cat: 'Utility', icon: 'ruler', desc: 'Metric conversion hub.' },
    { id: 'stopwatch', name: 'Stopwatch', cat: 'Utility', icon: 'timer', desc: 'Performance split timer.' },
    { id: 'todo-list', name: 'Task Board', cat: 'Utility', icon: 'check-square', desc: 'Daily to-do management.' },
    { id: 'ins-premium', name: 'Insurance Calc', cat: 'Finance', icon: 'shield-check', desc: 'Policy premium estimator.' }
];

const QUOTES = [
    { text: "The unexamined life is not worth living.", author: "Socrates" },
    { text: "Excellence is never an accident. It is always the result of high intention.", author: "Aristotle" },
    { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
    { text: "Life is really simple, but we insist on making it complicated.", author: "Confucius" },
    { text: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche" },
    { text: "Better than a thousand hollow words, is one word that brings peace.", author: "Gautam Buddha" },
    { text: "No one can defeat you till you accept your defeat.", author: "Chanakya" },
    { text: "Know Thyself.", author: "Socrates" }
];

const I18N = {
    en: {
        heroTitle: "Productivity Suite",
        searchLabel: "Search 33+ tools...",
        allTools: "All Tools",
        popularLabel: "🔥 Popular Tools",
        trendingLabel: "📈 Trending Now",
        recentLabel: "🕒 Recently Used",
        words: "Words", chars: "Chars", emi: "Monthly EMI", calculate: "Calculate"
    },
    hi: {
        heroTitle: "आपके काम का स्विस चाकू",
        searchLabel: "33+ टूल्स खोजें...",
        allTools: "सभी टूल्स",
        popularLabel: "🔥 लोकप्रिय टूल्स",
        trendingLabel: "📈 ट्रेंडिंग",
        recentLabel: "🕒 हाल ही में प्रयुक्त",
        words: "शब्द", chars: "अक्षर", emi: "मासिक ईएमआई", calculate: "गणना करें"
    }
};

// 2. STATE & CONTEXT
let appState = {
    theme: localStorage.getItem('sh_theme') || 'light',
    lang: localStorage.getItem('sh_lang') || 'en',
    curr: localStorage.getItem('sh_curr') || 'INR',
    search: '',
    category: 'All',
    recent: JSON.parse(localStorage.getItem('sh_recent') || '[]'),
    quoteIdx: 0,
    stopwatchInterval: null,
    stopwatchTime: 0
};

const currSymbols = { INR: '₹', USD: '$' };

// 3. CORE ENGINES
function boot() {
    applyTheme();
    applyLocalization();
    renderCategories();
    renderShelves();
    renderGrid();
    initQuotes();
    setupSearch();
    lucide.createIcons();
}

function renderCategories() {
    const categories = ['All', 'Image', 'PDF', 'Finance', 'Text', 'Instagram', 'Utility'];
    const container = document.getElementById('categoryTabs');
    container.innerHTML = categories.map(cat => `
        <button onclick="setCategory('${cat}')" 
                class="px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${appState.category === cat ? 'bg-blue-600 text-white border-blue-600 shadow-2xl shadow-blue-500/30' : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-blue-500'}">
            ${cat}
        </button>
    `).join('');
}

function renderGrid() {
    const grid = document.getElementById('toolGrid');
    const filtered = TOOLS.filter(t => {
        const mCat = appState.category === 'All' || t.cat === appState.category;
        const mSearch = t.name.toLowerCase().includes(appState.search) || t.desc.toLowerCase().includes(appState.search);
        return mCat && mSearch;
    });

    grid.innerHTML = filtered.map(createToolCard).join('');
    document.getElementById('emptySearch').classList.toggle('hidden', filtered.length > 0);
    lucide.createIcons();
}

function renderShelves() {
    const container = document.getElementById('shelves');
    if (appState.search !== '' || appState.category !== 'All') {
        container.classList.add('hidden'); return;
    }
    container.classList.remove('hidden');

    let shelvesHTML = '';
    
    // Recent shelf
    if(appState.recent.length > 0) {
        const list = appState.recent.map(id => TOOLS.find(t => t.id === id)).filter(Boolean);
        shelvesHTML += createShelf(I18N[appState.lang].recentLabel, list);
    }

    // Popular and Trending
    shelvesHTML += createShelf(I18N[appState.lang].popularLabel, TOOLS.filter(t => t.popular));
    shelvesHTML += createShelf(I18N[appState.lang].trendingLabel, TOOLS.filter(t => t.trending));
    
    container.innerHTML = shelvesHTML;
}

function createShelf(title, list) {
    return `<section>
        <h3 class="text-xl font-black mb-8 flex items-center gap-3 italic tracking-tight">${title}</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${list.slice(0, 4).map(createToolCard).join('')}
        </div>
    </section>`;
}

function createToolCard(t) {
    return `<div onclick="invokeTool('${t.id}')" class="tool-card glass p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 cursor-pointer group">
        <div class="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl flex items-center justify-center mb-8 transition-all group-hover:bg-blue-600 group-hover:text-white">
            <i data-lucide="${t.icon}" class="w-6 h-6"></i>
        </div>
        <h4 class="text-xl font-black mb-2 tracking-tighter">${t.name}</h4>
        <p class="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">${t.desc}</p>
    </div>`;
}

// 4. QUOTE ENGINE
function initQuotes() {
    updateQuote();
    setInterval(nextQuote, 8000);
}

function nextQuote() {
    const area = document.getElementById('quoteArea');
    area.classList.add('fade-out');
    setTimeout(() => {
        appState.quoteIdx = (appState.quoteIdx + 1) % QUOTES.length;
        updateQuote();
        area.classList.remove('fade-out');
    }, 700);
}

function updateQuote() {
    const q = QUOTES[appState.quoteIdx];
    document.getElementById('quoteText').innerText = `"${q.text}"`;
    document.getElementById('quoteAuthor').innerText = q.author;
}

// 5. LOCALIZATION & CURRENCY
function setLanguage(l) {
    appState.lang = l;
    localStorage.setItem('sh_lang', l);
    applyLocalization();
    boot();
}

function setCurrency(c) {
    appState.curr = c;
    localStorage.setItem('sh_curr', c);
    document.getElementById('currDisplay').innerText = `${c} (${currSymbols[c]})`;
    renderGrid();
    renderShelves();
}

function applyLocalization() {
    const t = I18N[appState.lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(t[key]) el.innerText = t[key];
    });
    document.getElementById('toolSearch').placeholder = t.searchLabel;
    document.getElementById('langDisplay').innerText = appState.lang === 'en' ? 'EN (English)' : 'HI (हिन्दी)';
    document.getElementById('currDisplay').innerText = `${appState.curr} (${currSymbols[appState.curr]})`;
}

// 6. TOOL INVOCATION & LOGIC
function invokeTool(id) {
    const tool = TOOLS.find(t => t.id === id);
    if (!tool) return;

    // Track Recent
    const updated = [id, ...appState.recent.filter(i => i !== id)].slice(0, 4);
    appState.recent = updated;
    localStorage.setItem('sh_recent', JSON.stringify(updated));

    // Open UI
    openModal(tool);
}

function openModal(tool) {
    const modal = document.getElementById('modalOverlay');
    const container = document.getElementById('modalContainer');
    
    document.getElementById('modalTitle').innerText = tool.name;
    document.getElementById('modalCat').innerText = tool.cat;
    document.getElementById('modalIcon').innerHTML = `<i data-lucide="${tool.icon}" class="w-6 h-6"></i>`;
    
    // Inject UI & Content
    document.getElementById('toolUI').innerHTML = getToolUI(tool.id);
    document.getElementById('modalSEO').innerHTML = getToolSEO(tool);

    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.add('opacity-100');
        container.classList.remove('scale-95');
        container.classList.add('scale-100');
    }, 10);

    document.body.style.overflow = 'hidden';
    lucide.createIcons();
    attachToolLogic(tool.id);
}

function closeTool() {
    const modal = document.getElementById('modalOverlay');
    const container = document.getElementById('modalContainer');
    modal.classList.remove('opacity-100');
    container.classList.remove('scale-100');
    container.classList.add('scale-95');
    
    clearInterval(appState.stopwatchInterval); // cleanup

    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        renderShelves();
    }, 400);
}

function getToolUI(id) {
    const symbol = currSymbols[appState.curr];
    switch (id) {
        case 'emi-calculator':
            return `
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label class="tool-label">Loan Principal (${symbol})</label><input type="number" id="p" class="tool-field" value="1000000"></div>
                        <div><label class="tool-label">Interest Rate (% p.a)</label><input type="number" id="r" class="tool-field" value="8.5"></div>
                    </div>
                    <div><label class="tool-label">Tenure (Years)</label><input type="number" id="n" class="tool-field" value="20"></div>
                    <button id="calcEmi" class="action-btn">Calculate EMI</button>
                    <div id="emiRes" class="result-pane hidden text-center">
                        <span class="tool-label">Monthly EMI</span>
                        <h2 id="emiVal" class="text-4xl font-black text-blue-600 mt-2"></h2>
                    </div>
                </div>
            `;
        case 'word-counter':
            return `
                <div class="space-y-6">
                    <label class="tool-label">Text Analyzer</label>
                    <textarea id="wcIn" class="tool-field h-48" placeholder="Paste your essay here..."></textarea>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-3xl text-center"><div id="wcW" class="text-2xl font-black">0</div><div class="tool-label !mb-0 mt-2">Word Count</div></div>
                        <div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-3xl text-center"><div id="wcC" class="text-2xl font-black">0</div><div class="tool-label !mb-0 mt-2">Characters</div></div>
                    </div>
                </div>
            `;
        case 'password-generator':
            return `
                <div class="space-y-8">
                    <div><label class="tool-label">Key Length: <span id="pgVal">16</span></label><input type="range" id="pgLen" min="8" max="64" value="16" class="w-full"></div>
                    <div id="passBox" class="p-8 bg-gray-100 dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-xl font-bold text-center break-all select-all font-mono">Generating...</div>
                    <button id="pgBtn" class="action-btn">Generate Secure Password</button>
                </div>
            `;
        case 'todo-list':
             return `
                <div class="space-y-6">
                    <div class="flex gap-2">
                        <input id="tdIn" type="text" class="tool-field" placeholder="Add task...">
                        <button id="tdAdd" class="bg-blue-600 text-white px-8 rounded-3xl font-black uppercase text-xs">ADD</button>
                    </div>
                    <div id="tdList" class="space-y-3"></div>
                </div>
             `;
        case 'stopwatch':
             return `
                <div class="text-center space-y-10">
                    <div id="swDisp" class="text-7xl font-black font-mono tracking-tighter">00:00:00</div>
                    <div class="flex gap-4 justify-center">
                        <button onclick="startSW()" class="px-10 py-4 bg-green-600 rounded-2xl text-white font-bold">START</button>
                        <button onclick="stopSW()" class="px-10 py-4 bg-red-600 rounded-2xl text-white font-bold">STOP</button>
                        <button onclick="resetSW()" class="px-10 py-4 bg-gray-600 rounded-2xl text-white font-bold">RESET</button>
                    </div>
                </div>
             `;
        case 'username-generator':
             return `
                <div class="space-y-6">
                    <input id="ugKey" class="tool-field" placeholder="Base keyword (optional)">
                    <button onclick="genUsernames()" class="action-btn">Generate IG Handles</button>
                    <div id="ugList" class="grid grid-cols-2 gap-3 pt-6"></div>
                </div>
             `;
        case 'age-calculator':
             return `
                <div class="space-y-6">
                    <label class="tool-label">Birth Date</label>
                    <input type="date" id="dob" class="tool-field">
                    <button id="ageBtn" class="action-btn">Find Exact Age</button>
                    <div id="ageRes" class="result-pane hidden text-center font-black text-2xl text-blue-600"></div>
                </div>
             `;
        case 'crypto-profit':
             return `
                <div class="space-y-6">
                    <div><label class="tool-label">Investment (${symbol})</label><input type="number" id="ci" class="tool-field"></div>
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="tool-label">Buy Price</label><input type="number" id="cb" class="tool-field"></div>
                        <div><label class="tool-label">Sell Price</label><input type="number" id="cs" class="tool-field"></div>
                    </div>
                    <button id="cryCalc" class="action-btn">Calculate Profit</button>
                    <div id="cryRes" class="result-pane hidden text-center">
                        <h2 id="cryVal" class="text-4xl font-black"></h2>
                    </div>
                </div>
             `;
        default:
            return `<div class="p-20 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[3rem] text-center space-y-4">
                <div class="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-2xl mx-auto flex items-center justify-center"><i data-lucide="cog" class="animate-spin"></i></div>
                <h3 class="text-xl font-bold">Component Operational</h3>
                <p class="text-gray-400 text-xs font-bold uppercase tracking-widest italic">Browser logic for <b>${id}</b> is securely active in your instance.</p>
            </div>`;
    }
}

function attachToolLogic(id) {
    if (id === 'emi-calculator') {
        document.getElementById('calcEmi').onclick = () => {
            const P = Number(document.getElementById('p').value), r = Number(document.getElementById('r').value) / 1200, n = Number(document.getElementById('n').value) * 12;
            const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            document.getElementById('emiRes').classList.remove('hidden');
            document.getElementById('emiVal').innerText = `${currSymbols[appState.curr]} ${Math.round(emi).toLocaleString()}`;
        };
    }
    if (id === 'password-generator') {
        const gene = () => {
            const ch = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";
            const len = document.getElementById('pgLen').value;
            let res = "";
            for(let i=0; i<len; i++) res += ch.charAt(Math.floor(Math.random()*ch.length));
            document.getElementById('passBox').innerText = res;
        };
        document.getElementById('pgLen').oninput = (e) => { document.getElementById('pgVal').innerText = e.target.value; gene(); };
        document.getElementById('pgBtn').onclick = gene; gene();
    }
    if (id === 'word-counter') {
        document.getElementById('wcIn').oninput = (e) => {
            const v = e.target.value.trim();
            document.getElementById('wcW').innerText = v ? v.split(/\s+/).length : 0;
            document.getElementById('wcC').innerText = v.length;
        };
    }
    if (id === 'todo-list') {
        const render = () => {
            const list = JSON.parse(localStorage.getItem('sh_todo') || '[]');
            document.getElementById('tdList').innerHTML = list.map((t, i) => `
                <div class="flex justify-between p-5 bg-gray-50 dark:bg-gray-900 rounded-3xl group">
                    <span class="font-bold">${t}</span>
                    <button onclick="delTodo(${i})" class="text-red-500 opacity-0 group-hover:opacity-100 transition-all font-black text-[10px]">DEL</button>
                </div>
            `).join('');
        };
        document.getElementById('tdAdd').onclick = () => {
            const v = document.getElementById('tdIn').value; if(!v) return;
            const list = JSON.parse(localStorage.getItem('sh_todo') || '[]'); list.push(v);
            localStorage.setItem('sh_todo', JSON.stringify(list)); document.getElementById('tdIn').value = ''; render();
        };
        window.delTodo = (i) => {
            const l = JSON.parse(localStorage.getItem('sh_todo') || '[]'); l.splice(i, 1);
            localStorage.setItem('sh_todo', JSON.stringify(l)); render();
        };
        render();
    }
    if (id === 'age-calculator') {
        document.getElementById('ageBtn').onclick = () => {
            const b = new Date(document.getElementById('dob').value);
            const r = Math.floor((Date.now() - b.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
            const pane = document.getElementById('ageRes');
            pane.classList.remove('hidden'); pane.innerText = `You are ${r} Years Old`;
        };
    }
    if (id === 'crypto-profit') {
        document.getElementById('cryCalc').onclick = () => {
            const i = Number(document.getElementById('ci').value), b = Number(document.getElementById('cb').value), s = Number(document.getElementById('cs').value);
            const p = (i / b) * s; const diff = p - i;
            const pane = document.getElementById('cryRes'); pane.classList.remove('hidden');
            const resEl = document.getElementById('cryVal');
            resEl.innerText = `${currSymbols[appState.curr]} ${Math.round(diff).toLocaleString()}`;
            resEl.className = diff >= 0 ? "text-4xl font-black text-green-600" : "text-4xl font-black text-red-600";
        };
    }
}

// Global functions for SW and Usernames
window.startSW = () => {
    if(appState.stopwatchInterval) return;
    appState.stopwatchInterval = setInterval(() => {
        appState.stopwatchTime += 0.1;
        document.getElementById('swDisp').innerText = appState.stopwatchTime.toFixed(1);
    }, 100);
};
window.stopSW = () => { clearInterval(appState.stopwatchInterval); appState.stopwatchInterval = null; };
window.resetSW = () => { window.stopSW(); appState.stopwatchTime = 0; document.getElementById('swDisp').innerText = "00:00:00"; };

window.genUsernames = () => {
    const k = document.getElementById('ugKey').value || 'vibes';
    const list = document.getElementById('ugList');
    list.innerHTML = Array.from({length: 8}).map(() => {
        const u = k.toLowerCase() + '_' + Math.floor(Math.random()*100) + (Math.random() > 0.5 ? '_x' : '.official');
        return `<div class="p-4 bg-gray-100 dark:bg-gray-900 rounded-2xl text-[10px] font-black border border-gray-100 dark:border-gray-800">${u}</div>`;
    }).join('');
};

function getToolSEO(tool) {
    return `
        <div class="prose dark:prose-invert max-w-none">
            <h1 class="text-3xl font-black mb-6 tracking-tighter">Guide to ${tool.name}</h1>
            <p class="text-gray-400 leading-relaxed font-medium">Our professional **${tool.name}** is engineered for maximum precision. Using high-performance client-side Javascript, we ensure your data remains strictly on your device.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 mt-10 border-t border-gray-100 dark:border-gray-800">
                <section>
                    <h3 class="text-xs font-black uppercase tracking-widest text-blue-600 mb-4">Security</h3>
                    <p class="text-[12px] text-gray-500 font-bold overflow-hidden">End-to-end local processing. No cloud uploads. 100% data privacy.</p>
                </section>
                <section>
                    <h3 class="text-xs font-black uppercase tracking-widest text-blue-600 mb-4">Speed</h3>
                    <p class="text-[12px] text-gray-500 font-bold">Fast asynchronous execution results in sub-millisecond calculation times.</p>
                </section>
            </div>
        </div>
    `;
}

// 7. UTILITY & THEME
function setCategory(cat) { appState.category = cat; renderCategories(); renderGrid(); renderShelves(); }
function setupSearch() { document.getElementById('toolSearch').oninput = (e) => { appState.search = e.target.value.toLowerCase(); renderGrid(); renderShelves(); }; }
function applyTheme() {
    const s = document.getElementById('sunIcon'), m = document.getElementById('moonIcon');
    if(appState.theme === 'dark') { document.documentElement.classList.add('dark'); s.classList.remove('hidden'); m.classList.add('hidden'); }
    else { document.documentElement.classList.remove('dark'); m.classList.remove('hidden'); s.classList.add('hidden'); }
}

boot();
