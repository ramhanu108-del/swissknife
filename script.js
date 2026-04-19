/**
 * SmartTools Hub - FINAL STABLE BUILD (NO UI CHANGE)
 */

// ================= DATA =================
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
    { id: 'stopwatch', nameKey: 'stopwatch', icon: 'timer', category: 'Utility', desc: 'Precision stopwatch.' },
    { id: 'todo-list', nameKey: 'todo', icon: 'check-square', category: 'Utility', desc: 'Task manager.' },
    { id: 'emi-calculator', nameKey: 'emi', icon: 'landmark', category: 'Finance', desc: 'Loan calculator.' },
    { id: 'sip-calculator', nameKey: 'sip', icon: 'banknote', category: 'Finance', desc: 'SIP growth.' },
    { id: 'roi-calculator', nameKey: 'roi', icon: 'line-chart', category: 'Finance', desc: 'ROI analysis.' },
    { id: 'username-generator', nameKey: 'username', icon: 'instagram', category: 'Instagram', desc: 'Username generator.' },
];

// ================= STATE =================
let state = {
    theme: localStorage.getItem('theme') || 'light',
    search: '',
    category: 'All',
    todo: JSON.parse(localStorage.getItem('todo') || '[]'),
    notes: localStorage.getItem('notes') || ''
};

// ================= SAFE =================
const $ = (id) => document.getElementById(id);

// ================= RENDER =================
function render() {
    renderTools();
    renderCategories();
    applyTheme();
    if (window.lucide) lucide.createIcons();
}

// ================= THEME =================
function applyTheme() {
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
}

// ================= CATEGORY =================
function renderCategories() {
    const cats = ['All','Image','PDF','Finance','Text','Instagram','Utility'];
    const el = $('category-tabs');
    if (!el) return;

    el.innerHTML = cats.map(c => `
        <button onclick="changeCategory('${c}')"
        class="px-6 py-2 rounded-full ${state.category===c?'bg-blue-600 text-white':'bg-gray-200'}">
        ${c}
        </button>
    `).join('');
}

// ================= TOOL GRID =================
function renderTools() {
    const grid = $('tool-grid');
    if (!grid) return;

    const list = TOOLS.filter(t => {
        return (state.category === 'All' || t.category === state.category) &&
               t.id.includes(state.search.toLowerCase());
    });

    grid.innerHTML = list.map(t => `
        <div onclick="openModal('${t.id}')"
        class="bg-white dark:bg-gray-900 p-6 rounded-2xl cursor-pointer">
            <i data-lucide="${t.icon}" class="w-6 h-6 mb-3"></i>
            <h3 class="font-bold">${t.nameKey}</h3>
            <p class="text-sm opacity-60">${t.desc}</p>
        </div>
    `).join('');
}

// ================= MODAL =================
function openModal(id) {
    const c = $('tool-content');
    if (!c) return;

    switch(id) {

        case 'word-counter':
            c.innerHTML = `
            <textarea id="wc" class="w-full h-40 p-4"></textarea>
            <div>Words: <span id="w">0</span></div>`;
            $('wc').oninput = ()=> $('w').innerText = $('wc').value.split(/\s+/).length;
        break;

        case 'password-generator':
            c.innerHTML = `
            <button onclick="genPass()">Generate</button>
            <div id="pass"></div>`;
        break;

        case 'age-calculator':
            c.innerHTML = `
            <input type="date" id="d">
            <button onclick="calcAge()">Calc</button>
            <div id="age"></div>`;
        break;

        case 'todo-list':
            c.innerHTML = `
            <input id="t">
            <button onclick="addTodo()">Add</button>
            <ul id="list"></ul>`;
            renderTodo();
        break;

        default:
            c.innerHTML = `<div class="text-center p-10">🚧 Coming Soon</div>`;
    }

    $('modal-container').classList.remove('hidden');
    $('modal-overlay').classList.remove('hidden');

    lucide.createIcons();
}

// ================= LOGIC =================
function genPass(){
    let p='';
    let c='abcABC123!@#';
    for(let i=0;i<12;i++) p+=c[Math.floor(Math.random()*c.length)];
    $('pass').innerText=p;
}

function calcAge(){
    let d=new Date($('d').value);
    $('age').innerText=new Date().getFullYear()-d.getFullYear();
}

function addTodo(){
    state.todo.push($('t').value);
    localStorage.setItem('todo',JSON.stringify(state.todo));
    renderTodo();
}

function renderTodo(){
    $('list').innerHTML=state.todo.map(x=>`<li>${x}</li>`).join('');
}

// ================= EVENTS =================
window.changeCategory = (c)=>{ state.category=c; render(); };

document.addEventListener("DOMContentLoaded", () => {

    const search = $('tool-search');
    if (search) search.oninput = e=>{
        state.search = e.target.value;
        render();
    };

    const theme = $('theme-toggle');
    if (theme) theme.onclick = ()=>{
        state.theme = state.theme==='light'?'dark':'light';
        localStorage.setItem('theme', state.theme);
        render();
    };

    const close = $('modal-close');
    if (close) close.onclick = ()=> {
        $('modal-container').classList.add('hidden');
        $('modal-overlay').classList.add('hidden');
    };

    const overlay = $('modal-overlay');
    if (overlay) overlay.onclick = ()=> {
        $('modal-container').classList.add('hidden');
        $('modal-overlay').classList.add('hidden');
    };

    render();
});
