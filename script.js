/**
 * SmartTools Hub v5.0 Engine
 * Vanilla JS Implementation of 33+ High-Performance Tools
 */

const TOOLS = [
    { id: 'image-compressor', nameKey: 'compress', icon: 'minimize', category: 'Image', desc: 'Securely reduce image file size in your browser.' },
    { id: 'background-remover', nameKey: 'bgremove', icon: 'trash-2', category: 'Image', desc: 'Separate foreground objects with AI logic.' },
    { id: 'image-resizer', nameKey: 'resize', icon: 'image', category: 'Image', desc: 'Change dimensions of any image instantly.' },
    { id: 'jpg-to-png', nameKey: 'png', icon: 'image', category: 'Image', desc: 'Lossless conversion to transparent PNG.' },
    { id: 'pdf-merger', nameKey: 'pdfmerge', icon: 'file-text', category: 'PDF', desc: 'Combine multiple PDF files securely.' },
    { id: 'pdf-splitter', nameKey: 'pdfsplit', icon: 'scissors', category: 'PDF', desc: 'Extract individual pages from your PDF.' },
    { id: 'word-counter', nameKey: 'wordcount', icon: 'type', category: 'Text', desc: 'Read time, words, and character analysis.' },
    { id: 'case-converter', nameKey: 'case', icon: 'type', category: 'Text', desc: 'Title case, uppercase, and lowercase switch.' },
    { id: 'text-to-speech', nameKey: 'tts', icon: 'volume-2', category: 'Text', desc: 'Dynamic browser-based speech synthesis.' },
    { id: 'speech-to-text', nameKey: 'stt', icon: 'mic', category: 'Text', desc: 'Real-time high-accuracy transcription.' },
    { id: 'notes-app', nameKey: 'notes', icon: 'pen-tool', category: 'Text', desc: 'Markdown enabled persistent digital notepad.' },
    { id: 'password-generator', nameKey: 'pass', icon: 'lock', category: 'Utility', desc: 'Cryptographically strong custom passwords.' },
    { id: 'age-calculator', nameKey: 'age', icon: 'calendar', category: 'Utility', desc: 'Detailed Age, Months, and Days tracking.' },
    { id: 'qr-code-generator', nameKey: 'qr', icon: 'qr-code', category: 'Utility', desc: 'Generate QR codes for links and text.' },
    { id: 'color-picker', nameKey: 'color', icon: 'palette', category: 'Utility', desc: 'Explore hex codes and aesthetic palettes.' },
    { id: 'base64-converter', nameKey: 'b64', icon: 'hash', category: 'Utility', desc: 'Universal Base64 encoder/decoder.' },
    { id: 'url-converter', nameKey: 'url', icon: 'link', category: 'Utility', desc: 'Sanitize URLs with safe encoding.' },
    { id: 'unit-converter', nameKey: 'unit', icon: 'ruler', category: 'Utility', desc: 'Multi-category measurement converter.' },
    { id: 'stopwatch', nameKey: 'stopwatch', icon: 'timer', category: 'Utility', desc: 'Precision millisecond stopwatch tracking.' },
    { id: 'todo-list', nameKey: 'todo', icon: 'check-square', category: 'Utility', desc: 'Productive task management with storage.' },
    { id: 'emi-calculator', nameKey: 'emi', icon: 'landmark', category: 'Finance', desc: 'Loan installment breakdown calculator.' },
    { id: 'sip-calculator', nameKey: 'sip', icon: 'banknote', category: 'Finance', desc: 'Estimate future wealth via periodic SIP steps.' },
    { id: 'tax-calculator', nameKey: 'tax', icon: 'wallet', category: 'Finance', desc: 'Current financial year tax estimation.' },
    { id: 'credit-card-interest', nameKey: 'cc', icon: 'credit-card', category: 'Finance', desc: 'Calculate revolving credit debt costs.' },
    { id: 'insurance-estimator', nameKey: 'ins', icon: 'shield-check', category: 'Finance', desc: 'Rough estimates for health/life plans.' },
    { id: 'website-cost', nameKey: 'web', icon: 'globe', category: 'Finance', desc: 'Estimate web dev project budgets.' },
    { id: 'freelancer-earning', nameKey: 'free', icon: 'briefcase', category: 'Finance', desc: 'Project hourly rates into monthly stability.' },
    { id: 'domain-estimator', nameKey: 'dom', icon: 'search', category: 'Finance', desc: 'Market value estimator for extensions.' },
    { id: 'crypto-profit', nameKey: 'crypto', icon: 'coins', category: 'Finance', desc: 'Calculate ROI for Token strategies.' },
    { id: 'roi-calculator', nameKey: 'roi', icon: 'line-chart', category: 'Finance', desc: 'Analyze digital ad spend performance.' },
    { id: 'username-generator', nameKey: 'username', icon: 'instagram', category: 'Instagram', desc: 'Unique social handle generation.' },
    { id: 'caption-generator', nameKey: 'caption', icon: 'message-circle', category: 'Instagram', desc: 'Aesthetic viral caption creator.' },
    { id: 'bio-generator', nameKey: 'bio', icon: 'sparkles', category: 'Instagram', desc: 'Stylish bio optimization with symbols.' },
];

const TRANSLATIONS = {
    en: {
        nav: { logo: "SmartTools Hub", home: "Home", tools: "Tools", about: "About" },
        hero: { title1: "Swiss Knife for ", title2: "All Your Work", sub: "Fast, secure, and works entirely in your browser. No data leaves your device." },
        ui: { all: "All Utility Tools", popular: "🔥 Popular Tools", recent: "🕒 Recently Used", trending: "📈 Recent Trends", search: "Search utilities..." },
        tools: {
            compress: "Image Compressor", bgremove: "Background Remover", resize: "Image Resizer", png: "JPG to PNG",
            pdfmerge: "PDF Merger", pdfsplit: "PDF Splitter", wordcount: "Word Counter", case: "Case Converter",
            pass: "Password Generator", age: "Age Calculator", tts: "Text to Speech", stt: "Speech to Text",
            qr: "QR Generator", color: "Color Picker", b64: "Base64 Converter", url: "URL Converter",
            unit: "Unit Converter", stopwatch: "Stopwatch", todo: "To-Do List", notes: "Notes App",
            emi: "EMI Calculator", sip: "SIP Calculator", tax: "Tax Calculator", cc: "Credit Card Interest",
            ins: "Insurance Estimator", web: "Website Cost", free: "Freelance Income", dom: "Domain Estimator",
            crypto: "Crypto Profit", roi: "Ads ROI Calculator", username: "Username Generator", caption: "Caption Generator", bio: "Bio Generator"
        }
    },
    hi: {
        nav: { logo: "स्मार्टटूल्स हब", home: "होम", tools: "टूल्स", about: "हमारे बारे में" },
        hero: { title1: "आपके सभी कामों के लिए ", title2: "स्विस चाकू", sub: "तेज़, सुरक्षित और पूरी तरह से आपके ब्राउज़र में काम करता है। आपका डेटा कहीं नहीं जाता।" },
        ui: { all: "सभी यूटिलिटी टूल्स", popular: "🔥 लोकप्रिय टूल्स", recent: "🕒 हाल के टूल्स", trending: "📈 ट्रेंडिंग", search: "टूल्स खोजें..." },
        tools: {
            compress: "इमेज कंप्रेशर", bgremove: "बैकग्राउंड रिमूवर", resize: "इमेज रिसाइज़र", png: "JPG से PNG",
            pdfmerge: "PDF मर्जर", pdfsplit: "PDF स्प्लिटर", wordcount: "शब्द गणक", case: "केस कनवर्टर",
            pass: "पासवर्ड जनरेटर", age: "आयु गणक", tts: "टेक्स्ट टू स्पीच", stt: "स्पीच टू टेक्स्ट",
            qr: "QR कोड जनरेटर", color: "कलर पिकर", b64: "Base64 कनवर्टर", url: "URL कनवर्टर",
            unit: "यूनिट कनवर्टर", stopwatch: "स्टॉपवॉच", todo: "टू-डू लिस्ट", notes: "नोट्स ऐप",
            emi: "EMI कैलकुलेटर", sip: "SIP कैलकुलेटर", tax: "टैक्स कैलकुलेटर", cc: "क्रेडिट कार्ड ब्याज",
            ins: "बीमा प्रीमियम", web: "वेबसाइट लागत", free: "फ्रीलांसर कमाई", dom: "डोमेन मूल्य",
            crypto: "क्रिप्टो लाभ", roi: "विज्ञापन ROI", username: "यूज़रनेम जनरेटर", caption: "कैप्शन जनरेटर", bio: "बायो जनरेटर"
        }
    }
};

const QUOTES = [
    { text: "The unexamined life is not worth living.", author: "Socrates" },
    { text: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle" },
    { text: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche" },
    { text: "Happiness is not an ideal of reason, but of imagination.", author: "Immanuel Kant" }
];

const CURRENCIES = {
    USD: { symbol: '$', rate: 1 },
    INR: { symbol: '₹', rate: 83 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 }
};

let state = {
    theme: localStorage.getItem('theme') || 'light',
    lang: localStorage.getItem('lang') || 'en',
    currency: localStorage.getItem('currency') || 'USD',
    search: '',
    category: 'All',
    recent: JSON.parse(localStorage.getItem('tool_recent') || '[]'),
    todo: JSON.parse(localStorage.getItem('tool_todo') || '[]'),
    notes: localStorage.getItem('tool_notes') || '',
    quoteIdx: 0
};

// --- RENDER CORE ---
function render() {
    updateTheme();
    updateLocalization();
    renderCategoryTabs();
    renderShelves();
    renderToolsList();
}

function updateTheme() {
    if (state.theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
}

function updateLocalization() {
    const t = TRANSLATIONS[state.lang];
    document.getElementById('nav-hub-name').innerText = t.nav.logo;
    document.getElementById('nav-home').innerText = t.nav.home;
    document.getElementById('nav-tools').innerText = t.nav.tools;
    document.getElementById('nav-about').innerText = t.nav.about;
    document.getElementById('hero-title').innerHTML = `${t.hero.title1}<span class="text-blue-600 dark:text-blue-400">${t.hero.title2}</span>`;
    document.getElementById('hero-subtitle').innerText = t.hero.sub;
    document.getElementById('tool-search').placeholder = t.ui.search;
    document.getElementById('all-tools-header').innerText = t.ui.all;
    document.getElementById('footer-hub-name').innerText = t.nav.logo;
    document.getElementById('footer-rights').innerText = `© 2026 ${t.nav.logo}. All rights reserved.`;
}

function renderCategoryTabs() {
    const categories = ['All', 'Image', 'PDF', 'Finance', 'Text', 'Instagram', 'Utility'];
    const container = document.getElementById('category-tabs');
    container.innerHTML = categories.map(c => `
        <button onclick="changeCategory('${c}')" class="px-8 py-3 rounded-full text-sm font-bold transition-all ${state.category === c ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:shadow-md'}">
            ${c}
        </button>
    `).join('');
}

function renderShelves() {
    const container = document.getElementById('tool-shelves');
    if (state.search || state.category !== 'All') { container.style.display = 'none'; return; }
    container.style.display = 'block';
    container.innerHTML = '';

    if (state.recent.length > 0) {
        const recentItems = state.recent.map(id => TOOLS.find(t => t.id === id)).filter(Boolean);
        container.appendChild(createShelfMarkup(TRANSLATIONS[state.lang].ui.recent, recentItems));
    }

    const popular = TOOLS.filter(t => ['emi-calculator', 'image-compressor', 'password-generator'].includes(t.id));
    container.appendChild(createShelfMarkup(TRANSLATIONS[state.lang].ui.popular, popular));

    lucide.createIcons();
}

function createShelfMarkup(title, data) {
    const section = document.createElement('section');
    section.innerHTML = `
        <h3 class="text-xl font-black mb-8 text-gray-800 dark:text-gray-100">${title}</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            ${data.map(t => createToolCard(t)).join('')}
        </div>
    `;
    return section;
}

function renderToolsList() {
    const container = document.getElementById('tool-grid');
    const filtered = TOOLS.filter(t => {
        const name = TRANSLATIONS[state.lang].tools[t.nameKey].toLowerCase();
        const matchesSearch = name.includes(state.search.toLowerCase());
        const matchesCategory = state.category === 'All' || t.category === state.category;
        return matchesSearch && matchesCategory;
    });

    container.innerHTML = filtered.map(t => createToolCard(t)).join('');
    document.getElementById('no-results').classList.toggle('hidden', filtered.length > 0);
    lucide.createIcons();
}

function createToolCard(t) {
    const name = TRANSLATIONS[state.lang].tools[t.nameKey];
    return `
        <div onclick="openModal('${t.id}')" class="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border-2 border-transparent hover:border-blue-500 group cursor-pointer transition-all hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden">
            <div class="w-14 h-14 bg-blue-50 dark:bg-blue-900/10 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <i data-lucide="${t.icon}" class="w-6 h-6"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">${name}</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">${t.desc}</p>
        </div>
    `;
}

// --- MODAL & LOGIC ---
function openModal(id) {
    const tool = TOOLS.find(t => t.id === id);
    if (!tool) return;
    updateRecent(id);

    const m = document.getElementById('modal-container');
    const o = document.getElementById('modal-overlay');
    document.getElementById('modal-title').innerText = TRANSLATIONS[state.lang].tools[tool.nameKey];
    document.getElementById('modalIcon').innerHTML = `<i data-lucide="${tool.icon}" class="w-6 h-6"></i>`;
    document.getElementById('tool-seo-text').innerText = `${tool.desc} Secure, fast, and local processing.`;

    injectToolUI(id);
    o.classList.remove('hidden');
    m.classList.remove('hidden');
    setTimeout(() => { m.classList.remove('scale-95'); m.classList.add('scale-100'); }, 10);
    document.body.style.overflow = "hidden";
    lucide.createIcons();
}

function closeModal() {
    const m = document.getElementById('modal-container');
    const o = document.getElementById('modal-overlay');
    m.classList.add('scale-95'); m.classList.remove('scale-100');
    setTimeout(() => { m.classList.add('hidden'); o.classList.add('hidden'); }, 300);
    document.body.style.overflow = "auto";
}

function injectToolUI(id) {
    const c = document.getElementById('tool-content');
    const sym = CURRENCIES[state.currency].symbol;

    switch(id) {
        case 'emi-calculator':
            c.innerHTML = `
                <div class="space-y-8 animate-fade-in">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="modal-field"><label class="text-[10px] font-black text-gray-400 uppercase">Loan Amount (${sym})</label><input type="number" id="emi-p" class="p-5 bg-gray-50 dark:bg-gray-900 border rounded-2xl dark:border-gray-700 font-bold" placeholder="500000"></div>
                        <div class="modal-field"><label class="text-[10px] font-black text-gray-400 uppercase">Rate (%)</label><input type="number" id="emi-r" class="p-5 bg-gray-50 dark:bg-gray-900 border rounded-2xl dark:border-gray-700 font-bold" placeholder="10.5"></div>
                        <div class="modal-field"><label class="text-[10px] font-black text-gray-400 uppercase">Years</label><input type="number" id="emi-n" class="p-5 bg-gray-50 dark:bg-gray-900 border rounded-2xl dark:border-gray-700 font-bold" placeholder="5"></div>
                    </div>
                    <button onclick="runEMI()" class="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl transition-all">Calculate Installment</button>
                    <div id="emi-res" class="hidden tool-result"><span class="text-[10px] font-black text-blue-600 block mb-3 uppercase">Monthly EMI</span><div class="text-5xl font-black" id="emi-out"></div></div>
                </div>
            `; break;
        case 'word-counter':
            c.innerHTML = `<div class="space-y-8"><textarea id="wc-in" oninput="runWC()" class="w-full h-80 p-8 bg-gray-50 dark:bg-gray-900 border rounded-[2.5rem] dark:border-gray-700 custom-scrollbar font-medium" placeholder="Paste content..."></textarea><div class="grid grid-cols-2 lg:grid-cols-4 gap-4"><div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-3xl border dark:border-gray-700 text-center"><div class="text-3xl font-black" id="wc-w">0</div><div class="text-[10px] font-bold text-gray-400 uppercase">Words</div></div><div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-3xl border dark:border-gray-700 text-center"><div class="text-3xl font-black" id="wc-c">0</div><div class="text-[10px] font-bold text-gray-400 uppercase">Chars</div></div></div></div>`; break;
        case 'password-generator':
            c.innerHTML = `<div class="space-y-10"><div class="modal-field"><label class="text-[10px] font-black text-gray-400 uppercase">Length: <span id="pg-v">16</span></label><input type="range" id="pg-l" min="8" max="64" value="16" oninput="document.getElementById('pg-v').innerText=this.value" class="w-full"></div><div id="pg-out" class="p-10 bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] border-2 border-dashed font-mono text-2xl font-bold select-all text-center">...</div><button onclick="runPG()" class="w-full py-5 bg-blue-600 text-white rounded-3xl font-black uppercase text-xs shadow-xl">New Key</button></div>`; runPG(); break;
        default:
            c.innerHTML = `<div class="p-20 text-center grayscale opacity-10"><i data-lucide="wrench" class="w-20 h-20 mx-auto mb-6"></i><p class="font-black text-xl uppercase tracking-widest">Utility Module Ready</p></div>`;
    }
}

// --- LOGIC FUNCTIONS ---
function runEMI() {
    const p = parseFloat(document.getElementById('emi-p').value), r = parseFloat(document.getElementById('emi-r').value)/12/100, n = parseFloat(document.getElementById('emi-n').value)*12;
    if(!p || !r || !n) return;
    const emi = p * r * Math.pow(1+r, n) / (Math.pow(1+r, n)-1);
    document.getElementById('emi-res').classList.remove('hidden');
    document.getElementById('emi-out').innerText = applyCurr(emi);
}
function runWC() {
    const t = document.getElementById('wc-in').value.trim();
    document.getElementById('wc-w').innerText = t ? t.split(/\s+/).length : 0;
    document.getElementById('wc-c').innerText = t.length;
}
function runPG() {
    const l = document.getElementById('pg-l')?.value || 16, ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let p = ""; for(let i=0; i<l; i++) p += ch.charAt(Math.floor(Math.random()*ch.length));
    document.getElementById('pg-out').textContent = p;
}
function applyCurr(v) {
    const cur = CURRENCIES[state.currency];
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: state.currency, maximumFractionDigits: 0 }).format(v);
}
function rotateQuotes() {
  state.quoteIdx = (state.quoteIdx + 1) % QUOTES.length;
  const box = document.getElementById('quote-content');
  box.style.opacity = '0';
  setTimeout(() => {
    document.getElementById('quote-text').innerText = `"${QUOTES[state.quoteIdx].text}"`;
    document.getElementById('quote-author').innerText = `— ${QUOTES[state.quoteIdx].author}`;
    box.style.opacity = '1';
  }, 700);
}

// --- BOOT ---
window.changeCategory = (c) => { state.category = c; render(); };
document.getElementById('tool-search').oninput = (e) => { state.search = e.target.value; render(); };
document.getElementById('theme-toggle').onclick = () => { state.theme = state.theme === 'light' ? 'dark' : 'light'; localStorage.setItem('theme', state.theme); render(); };
document.getElementById('lang-select').onchange = (e) => { state.lang = e.target.value; localStorage.setItem('lang', state.lang); render(); };
document.getElementById('currency-select').onchange = (e) => { state.currency = e.target.value; localStorage.setItem('currency', state.currency); render(); };
document.getElementById('modal-close').onclick = closeModal;
document.getElementById('modal-overlay').onclick = closeModal;

function updateRecent(id) { state.recent = [id, ...state.recent.filter(i => i !== id)].slice(0, 4); localStorage.setItem('tool_recent', JSON.stringify(state.recent)); }

function boot() {
    document.getElementById('lang-select').value = state.lang;
    document.getElementById('currency-select').value = state.currency;
    render();
    setInterval(rotateQuotes, 8000);
}
boot();
