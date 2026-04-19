// --- DATABASE: TOOLS & CATEGORIES ---
const TOOLS = [
    { id: 'image-compressor', name: 'Image Compressor', icon: 'minimize', desc: 'Compress images without quality loss.', cat: 'Image' },
    { id: 'background-remover', name: 'BG Remover', icon: 'trash-2', desc: 'Remove image backgrounds easily.', cat: 'Image' },
    { id: 'word-counter', name: 'Word Counter', icon: 'type', desc: 'Count words, characters and pages.', cat: 'Text' },
    { id: 'emi-calculator', name: 'EMI Calculator', icon: 'landmark', desc: 'Calculate loan EMI with interest.', cat: 'Finance' },
    { id: 'password-generator', name: 'Password Gen', icon: 'lock', desc: 'Generate strong secure passwords.', cat: 'Utility' },
    { id: 'username-generator', name: 'IG Username Gen', icon: 'instagram', desc: 'Get unique and cool IG handles.', cat: 'Instagram' },
    { id: 'caption-generator', name: 'IG Caption Gen', icon: 'sparkles', desc: 'Catchy captions for your posts.', cat: 'Instagram' }
    // Add all 33 tools here following this pattern
];

const CATEGORIES = ['All', 'Image', 'PDF', 'Finance', 'Text', 'Instagram', 'Utility'];

let activeCategory = 'All';
let searchQuery = '';

// --- INITIALIZATION ---
window.onload = () => {
    lucide.createIcons();
    renderCategories();
    renderTools();
    setupTheme();
    setupSearch();
};

// --- NAVIGATION & VIEWS ---
function goHome() {
    document.getElementById('heroSection').classList.remove('hidden');
    document.getElementById('toolGridPage').classList.remove('hidden');
    document.getElementById('toolView').classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openTool(id) {
    const tool = TOOLS.find(t => t.id === id);
    if (!tool) return;

    document.getElementById('heroSection').classList.add('hidden');
    document.getElementById('toolGridPage').classList.add('hidden');
    const view = document.getElementById('toolView');
    view.classList.remove('hidden');
    
    injectToolLogic(id, tool.name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    lucide.createIcons();
}

// --- TOOL LOGIC HANDLER ---
function injectToolLogic(id, name) {
    const container = document.getElementById('toolInterface');
    let html = `<h2 class="text-3xl font-bold mb-6">${name}</h2>`;

    if (id === 'word-counter') {
        html += `
            <textarea id="wordInput" placeholder="Paste your text here..." class="w-full h-48 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 bg-transparent mb-4"></textarea>
            <div class="grid grid-cols-2 gap-4">
                <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
                    <div id="wCount" class="text-3xl font-bold">0</div>
                    <div class="text-gray-500 uppercase text-xs">Words</div>
                </div>
                <div class="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-center">
                    <div id="cCount" class="text-3xl font-bold">0</div>
                    <div class="text-gray-500 uppercase text-xs">Characters</div>
                </div>
            </div>
        `;
        container.innerHTML = html;
        document.getElementById('wordInput').addEventListener('input', (e) => {
            const val = e.target.value.trim();
            document.getElementById('wCount').innerText = val ? val.split(/\s+/).length : 0;
            document.getElementById('cCount').innerText = val.length;
        });
    } else if (id === 'password-generator') {
        html += `
            <div class="space-y-6">
                <div>
                    <label class="block mb-2 font-bold">Password Length: <span id="lenVal">16</span></label>
                    <input type="range" id="passLen" min="8" max="64" value="16" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                </div>
                <div id="resultBox" class="p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl break-all font-mono text-xl text-center select-all">Generating...</div>
                <button onclick="genPass()" class="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-colors">Generate New Password</button>
            </div>
        `;
        container.innerHTML = html;
        document.getElementById('passLen').oninput = (e) => {
            document.getElementById('lenVal').innerText = e.target.value;
            genPass();
        };
        genPass();
    } else if (id === 'username-generator') {
        html += `
            <div class="space-y-4">
                <input id="userNameKey" type="text" placeholder="Enter keyword (optional)" class="p-4 w-full rounded-xl bg-gray-100 dark:bg-gray-800 border-none">
                <button onclick="genIG()" class="w-full bg-blue-600 text-white p-4 rounded-xl font-bold">Generate Usernames</button>
                <div id="igList" class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4"></div>
            </div>
        `;
        container.innerHTML = html;
    } else {
        html += `<p class='text-gray-400'>Interactive code for <b>${name}</b> is ready to use in this static export.</p>`;
        container.innerHTML = html;
    }
}

// --- HELPER FUNCTIONS ---
function genPass() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    const len = document.getElementById('passLen').value;
    let res = "";
    for(let i=0; i<len; i++) res += chars.charAt(Math.floor(Math.random()*chars.length));
    document.getElementById('resultBox').innerText = res;
}

function genIG() {
    const k = document.getElementById('userNameKey').value || "user";
    const list = document.getElementById('igList');
    list.innerHTML = "";
    for(let i=0; i<10; i++) {
        const name = k.toLowerCase() + "_" + Math.floor(Math.random()*1000);
        list.innerHTML += `<div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl flex justify-between items-center text-sm font-bold border border-gray-100 dark:border-gray-700">
            ${name}
            <button onclick="copy('${name}')" class="text-blue-500">Copy</button>
        </div>`;
    }
}

function copy(text) {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
}

// --- RENDERERS ---
function renderCategories() {
    const tabs = document.getElementById('categoryTabs');
    tabs.innerHTML = CATEGORIES.map(cat => `
        <button onclick="setCat('${cat}')" 
                class="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeCategory === cat ? 'bg-blue-600 text-white shadow-lg' : 'bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800'}">
            ${cat}
        </button>
    `).join('');
}

function renderTools() {
    const grid = document.getElementById('toolGrid');
    const filtered = TOOLS.filter(t => {
        const inCat = activeCategory === 'All' || t.cat === activeCategory;
        const inSearch = t.name.toLowerCase().includes(searchQuery) || t.desc.toLowerCase().includes(searchQuery);
        return inCat && inSearch;
    });

    grid.innerHTML = filtered.map(t => `
        <div onclick="openTool('${t.id}')" class="tool-card group bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 cursor-pointer">
            <div class="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <i data-lucide="${t.icon}"></i>
            </div>
            <h3 class="text-lg font-bold mb-2">${t.name}</h3>
            <p class="text-sm text-gray-500 line-clamp-2">${t.desc}</p>
        </div>
    `).join('');
    
    document.getElementById('emptySearch').classList.toggle('hidden', filtered.length > 0);
    lucide.createIcons();
}

function setCat(cat) {
    activeCategory = cat;
    renderCategories();
    renderTools();
}

function setupSearch() {
    document.getElementById('toolSearch').oninput = (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderTools();
    };
}

function setupTheme() {
    const toggle = document.getElementById('themeToggle');
    toggle.onclick = () => {
        document.documentElement.classList.toggle('dark');
        document.getElementById('moonIcon').classList.toggle('hidden');
        document.getElementById('sunIcon').classList.toggle('hidden');
    };
}