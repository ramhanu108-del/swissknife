// ================= TOOLS =================

const TOOLS = [
    { id: 'qr-code-generator', name: 'QR Generator', icon: 'qr-code' },
    { id: 'emi-calculator', name: 'EMI Calculator', icon: 'calculator' },
    { id: 'word-counter', name: 'Word Counter', icon: 'type' },
    { id: 'password-generator', name: 'Password Generator', icon: 'lock' },
    { id: 'notes-app', name: 'Notes', icon: 'file-text' },
    { id: 'todo-list', name: 'Todo List', icon: 'check-square' },
    { id: 'color-picker', name: 'Color Picker', icon: 'palette' },
    { id: 'unit-converter', name: 'Unit Converter', icon: 'ruler' }
];

// ================= STATE =================

let state = {
    theme: localStorage.getItem('theme') || 'light',
    currency: localStorage.getItem('currency') || 'USD',
    lang: localStorage.getItem('lang') || 'en',
    notes: localStorage.getItem('notes') || '',
    todo: JSON.parse(localStorage.getItem('todo') || '[]'),
    quoteIndex: 0
};

// ================= INIT =================

document.addEventListener("DOMContentLoaded", init);

function init() {
    applyTheme();
    renderTools();
    setupEvents();
    rotateQuotes();
    setInterval(rotateQuotes, 5000);
}

// ================= THEME =================

function applyTheme() {
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
}

// ================= EVENTS =================

function setupEvents() {
    document.getElementById('theme-toggle').onclick = () => {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', state.theme);
        applyTheme();
    };

    document.getElementById('currency-select').onchange = e => {
        state.currency = e.target.value;
        localStorage.setItem('currency', state.currency);
    };

    document.getElementById('lang-select').onchange = e => {
        state.lang = e.target.value;
        localStorage.setItem('lang', state.lang);
    };

    document.getElementById('modal-close').onclick = closeModal;
    document.getElementById('modal-overlay').onclick = closeModal;
}

// ================= RENDER =================

function renderTools() {
    const grid = document.getElementById('tool-grid');

    grid.innerHTML = TOOLS.map(t => `
        <div onclick="openModal('${t.id}')" class="p-6 bg-white dark:bg-gray-800 rounded-2xl cursor-pointer shadow hover:scale-105 transition">
            <i data-lucide="${t.icon}"></i>
            <h3 class="font-bold mt-2">${t.name}</h3>
        </div>
    `).join('');

    lucide.createIcons();
}

// ================= MODAL =================

function openModal(id) {
    const tool = TOOLS.find(t => t.id === id);

    document.getElementById('modal-title').innerText = tool.name;
    document.getElementById('modalIcon').innerHTML =
        `<i data-lucide="${tool.icon}" class="w-6 h-6"></i>`;

    injectToolUI(id);

    document.getElementById('modal-overlay').classList.remove('hidden');
    document.getElementById('modal-container').classList.remove('hidden');

    lucide.createIcons();
}

function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
    document.getElementById('modal-container').classList.add('hidden');
}

// ================= TOOL UI =================

function injectToolUI(id) {
    const c = document.getElementById('tool-content');

    switch (id) {

        case 'qr-code-generator':
            c.innerHTML = `
                <input id="qr-text" class="p-3 border rounded w-full" placeholder="Enter text">
                <button onclick="genQR()" class="mt-3 px-4 py-2 bg-blue-600 text-white rounded">Generate</button>
                <img id="qr-img" class="mt-4"/>
            `;
            break;

        case 'emi-calculator':
            c.innerHTML = `
                <input id="p" placeholder="Amount" class="p-2 border w-full mb-2">
                <input id="r" placeholder="Rate" class="p-2 border w-full mb-2">
                <input id="n" placeholder="Years" class="p-2 border w-full mb-2">
                <button onclick="calcEMI()" class="bg-blue-600 text-white px-4 py-2">Calc</button>
                <div id="emi-out" class="mt-3"></div>
            `;
            break;

        case 'word-counter':
            c.innerHTML = `
                <textarea id="wc" oninput="runWC()" class="w-full h-40 border p-3"></textarea>
                <div>Words: <span id="wc-w">0</span></div>
            `;
            break;

        case 'password-generator':
            c.innerHTML = `
                <button onclick="genPass()" class="bg-blue-600 text-white px-4 py-2">Generate</button>
                <div id="pass-out" class="mt-3"></div>
            `;
            break;

        case 'notes-app':
            c.innerHTML = `
                <textarea id="notes" class="w-full h-40 border p-3" oninput="saveNotes()">${state.notes}</textarea>
            `;
            break;

        case 'todo-list':
            c.innerHTML = `
                <input id="todo-in" class="border p-2">
                <button onclick="addTodo()">Add</button>
                <ul id="todo-list"></ul>
            `;
            renderTodo();
            break;

        case 'color-picker':
            c.innerHTML = `
                <input type="color" id="color" onchange="pickColor()">
                <div id="color-val"></div>
            `;
            break;

        case 'unit-converter':
            c.innerHTML = `
                <input id="unit" placeholder="cm">
                <button onclick="convert()">Convert</button>
                <div id="unit-out"></div>
            `;
            break;
    }

    lucide.createIcons();
}

// ================= LOGIC =================

// QR
function genQR() {
    const text = document.getElementById('qr-text').value.trim();
    const img = document.getElementById('qr-img');

    if (!text) return alert("Enter text");

    img.src = "";
    img.src = "https://quickchart.io/qr?size=200&text=" + encodeURIComponent(text);
}

// EMI
function calcEMI() {
    let p = +document.getElementById('p').value;
    let r = +document.getElementById('r').value / 12 / 100;
    let n = +document.getElementById('n').value * 12;

    if (!p || !r || !n) return alert("Fill all fields");

    let emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    document.getElementById('emi-out').innerText = emi.toFixed(0);
}

// WC
function runWC() {
    let t = document.getElementById('wc').value.trim();
    document.getElementById('wc-w').innerText = t ? t.split(/\s+/).length : 0;
}

// PASS
function genPass() {
    let chars = "abcABC123@#";
    let p = "";
    for (let i = 0; i < 10; i++)
        p += chars[Math.floor(Math.random() * chars.length)];

    document.getElementById('pass-out').innerText = p;
}

// NOTES
function saveNotes() {
    let v = document.getElementById('notes').value;
    state.notes = v;
    localStorage.setItem('notes', v);
}

// TODO
function addTodo() {
    let v = document.getElementById('todo-in').value;
    if (!v) return;

    state.todo.push(v);
    localStorage.setItem('todo', JSON.stringify(state.todo));
    renderTodo();
}

function renderTodo() {
    const ul = document.getElementById('todo-list');
    ul.innerHTML = state.todo.map(t => `<li>${t}</li>`).join('');
}

// COLOR
function pickColor() {
    document.getElementById('color-val').innerText =
        document.getElementById('color').value;
}

// UNIT
function convert() {
    let v = parseFloat(document.getElementById('unit').value);
    if (!v) return;

    document.getElementById('unit-out').innerText = (v / 100) + " m";
}

// ================= QUOTES =================

const quotes = [
    "Simplicity is the ultimate sophistication.",
    "Code is like humor. When you have to explain it, it’s bad.",
    "First, solve the problem. Then, write the code."
];

function rotateQuotes() {
    const el = document.getElementById('quote-text');
    if (!el) return;

    state.quoteIndex = (state.quoteIndex + 1) % quotes.length;
    el.innerText = quotes[state.quoteIndex];
}
