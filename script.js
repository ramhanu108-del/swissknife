/**
 * SmartTools Hub FINAL STABLE ENGINE
 * UI SAME — ONLY LOGIC FIXED
 */

const TOOLS = [...window.TOOLS || []]; // fallback safe

// --- SAFE STATE ---
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

// --- SAFE INIT ---
function safe(id) {
    return document.getElementById(id);
}

// --- RENDER ---
function render() {
    try {
        updateTheme();
        updateLocalization();
        renderCategoryTabs();
        renderToolsList();
        lucide.createIcons();
    } catch (e) {
        console.error("Render Error:", e);
    }
}

// --- THEME ---
function updateTheme() {
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
}

// --- LOCALIZATION SAFE ---
function updateLocalization() {
    if (!window.TRANSLATIONS) return;
    const t = TRANSLATIONS[state.lang];

    if (safe('nav-hub-name')) safe('nav-hub-name').innerText = t.nav.logo;
    if (safe('nav-home')) safe('nav-home').innerText = t.nav.home;
    if (safe('nav-tools')) safe('nav-tools').innerText = t.nav.tools;
    if (safe('nav-about')) safe('nav-about').innerText = t.nav.about;
    if (safe('hero-title')) safe('hero-title').innerHTML =
        `${t.hero.title1}<span class="text-blue-600">${t.hero.title2}</span>`;
    if (safe('hero-subtitle')) safe('hero-subtitle').innerText = t.hero.sub;
}

// --- CATEGORY ---
function renderCategoryTabs() {
    const categories = ['All','Image','PDF','Finance','Text','Instagram','Utility'];
    const container = safe('category-tabs');
    if (!container) return;

    container.innerHTML = categories.map(c => `
        <button onclick="changeCategory('${c}')"
        class="px-6 py-2 rounded-full ${state.category===c?'bg-blue-600 text-white':'bg-gray-200'}">
        ${c}
        </button>
    `).join('');
}

// --- TOOL GRID ---
function renderToolsList() {
    const container = safe('tool-grid');
    if (!container) return;

    const list = TOOLS.filter(t => {
        const name = TRANSLATIONS?.[state.lang]?.tools?.[t.nameKey] || t.nameKey;
        return name.toLowerCase().includes(state.search.toLowerCase()) &&
               (state.category === 'All' || t.category === state.category);
    });

    container.innerHTML = list.map(t => `
        <div onclick="openModal('${t.id}')"
        class="p-6 bg-white dark:bg-gray-900 rounded-xl cursor-pointer">
            <i data-lucide="${t.icon}"></i>
            <h3>${TRANSLATIONS[state.lang].tools[t.nameKey]}</h3>
            <p>${t.desc}</p>
        </div>
    `).join('');

    lucide.createIcons();
}

// --- MODAL ---
function openModal(id) {
    const tool = TOOLS.find(t => t.id === id);
    if (!tool) return;

    safe('modal-title').innerText =
        TRANSLATIONS[state.lang].tools[tool.nameKey];

    injectToolUI(id);

    safe('modal-container').classList.remove('hidden');
    safe('modal-overlay').classList.remove('hidden');

    lucide.createIcons();
}

// --- CLOSE ---
function closeModal() {
    safe('modal-container').classList.add('hidden');
    safe('modal-overlay').classList.add('hidden');
}

// --- TOOL UI ENGINE ---
function injectToolUI(id) {
    const c = safe('tool-content');

    switch(id) {

        case 'word-counter':
            c.innerHTML = `
            <textarea id="wc-in" oninput="runWC()" class="w-full h-40"></textarea>
            <div>Words: <span id="wc-w">0</span></div>
            <div>Chars: <span id="wc-c">0</span></div>`;
        break;

        case 'password-generator':
            c.innerHTML = `
            <button onclick="runPG()">Generate</button>
            <div id="pg-out"></div>`;
            runPG();
        break;

        case 'age-calculator':
            c.innerHTML = `
            <input type="date" id="age-date">
            <button onclick="calcAge()">Calc</button>
            <div id="age-result"></div>`;
        break;

        case 'todo-list':
            c.innerHTML = `
            <input id="todo-in">
            <button onclick="addTodo()">Add</button>
            <ul id="todo-list"></ul>`;
            renderTodo();
        break;

        default:
            c.innerHTML = `
            <div class="text-center p-10">
                <h2>🚧 Tool Coming Soon</h2>
            </div>`;
    }
}

// --- LOGIC ---
function runWC() {
    const t = safe('wc-in').value.trim();
    safe('wc-w').innerText = t ? t.split(/\s+/).length : 0;
    safe('wc-c').innerText = t.length;
}

function runPG() {
    let chars="abcABC123!@#";
    let pass="";
    for(let i=0;i<12;i++) pass+=chars[Math.floor(Math.random()*chars.length)];
    safe('pg-out').innerText = pass;
}

function calcAge() {
    let d = new Date(safe('age-date').value);
    let age = new Date().getFullYear() - d.getFullYear();
    safe('age-result').innerText = age + " years";
}

function addTodo() {
    let val = safe('todo-in').value;
    state.todo.push(val);
    localStorage.setItem('tool_todo', JSON.stringify(state.todo));
    renderTodo();
}

function renderTodo() {
    let ul = safe('todo-list');
    ul.innerHTML = state.todo.map(t=>`<li>${t}</li>`).join('');
}

// --- EVENTS ---
window.changeCategory = (c)=>{ state.category=c; render(); };
safe('tool-search').oninput = e=>{ state.search=e.target.value; render(); };
safe('theme-toggle').onclick = ()=>{
    state.theme = state.theme==='light'?'dark':'light';
    render();
};

safe('modal-close').onclick = closeModal;
safe('modal-overlay').onclick = closeModal;

// --- BOOT ---
window.onload = ()=>{
    render();
    lucide.createIcons();
};
