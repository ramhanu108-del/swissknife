// ================= FULL TOOLS =================

const TOOLS = [
    { id: 'qr-code-generator', nameKey: 'qr', icon: 'qr-code', category: 'Utility' },
    { id: 'emi-calculator', nameKey: 'emi', icon: 'calculator', category: 'Finance' },
    { id: 'word-counter', nameKey: 'word', icon: 'type', category: 'Text' },
    { id: 'password-generator', nameKey: 'pass', icon: 'lock', category: 'Utility' },
    { id: 'notes-app', nameKey: 'notes', icon: 'file-text', category: 'Text' },
    { id: 'todo-list', nameKey: 'todo', icon: 'check-square', category: 'Utility' },
    { id: 'color-picker', nameKey: 'color', icon: 'palette', category: 'Utility' },
    { id: 'unit-converter', nameKey: 'unit', icon: 'ruler', category: 'Utility' }
];

// ================= TRANSLATIONS =================

const T = {
    en: {
        qr: "QR Generator",
        emi: "EMI Calculator",
        word: "Word Counter",
        pass: "Password Generator",
        notes: "Notes",
        todo: "Todo",
        color: "Color Picker",
        unit: "Unit Converter"
    },
    hi: {
        qr: "QR जनरेटर",
        emi: "EMI कैलकुलेटर",
        word: "शब्द गणना",
        pass: "पासवर्ड जनरेटर",
        notes: "नोट्स",
        todo: "कार्य सूची",
        color: "रंग चयन",
        unit: "यूनिट कनवर्टर"
    }
};

// ================= STATE =================

let state = {
    theme: localStorage.getItem('theme') || 'light',
    lang: localStorage.getItem('lang') || 'en',
    currency: localStorage.getItem('currency') || 'INR',
    notes: localStorage.getItem('notes') || '',
    todo: JSON.parse(localStorage.getItem('todo') || '[]')
};

// ================= INIT =================

document.addEventListener("DOMContentLoaded", () => {
    applyTheme();
    renderTools();
    bindUI();
});

// ================= THEME =================

function applyTheme() {
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
}

// ================= UI BIND =================

function bindUI() {

    document.getElementById('theme-toggle').onclick = () => {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', state.theme);
        applyTheme();
    };

    document.getElementById('lang-select').onchange = e => {
        state.lang = e.target.value;
        localStorage.setItem('lang', state.lang);
        renderTools();
    };

    document.getElementById('currency-select').onchange = e => {
        state.currency = e.target.value;
        localStorage.setItem('currency', state.currency);
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
            <h3 class="font-bold mt-2">${T[state.lang][t.nameKey]}</h3>
        </div>
    `).join('');

    lucide.createIcons();
}

// ================= MODAL =================

function openModal(id) {
    const tool = TOOLS.find(t => t.id === id);

    document.getElementById('modal-title').innerText = T[state.lang][tool.nameKey];
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
                <input id="qr-text" class="p-3 border w-full" placeholder="Enter text">
                <button onclick="genQR()" class="mt-3 bg-blue-600 text-white px-4 py-2">Generate</button>
                <img id="qr-img" class="mt-4"/>
            `;
            break;

        case 'emi-calculator':
            c.innerHTML = `
                <input id="p" placeholder="Amount">
                <input id="r" placeholder="Rate">
                <input id="n" placeholder="Years">
                <button onclick="calcEMI()">Calculate</button>
                <div id="emi-out"></div>
            `;
            break;

        case 'notes-app':
            c.innerHTML = `
                <textarea id="notes" class="w-full h-40" oninput="saveNotes()">${state.notes}</textarea>
            `;
            break;

        case 'todo-list':
            c.innerHTML = `
                <input id="todo-in">
                <button onclick="addTodo()">Add</button>
                <ul id="todo-list"></ul>
            `;
            renderTodo();
            break;

        default:
            c.innerHTML = `<h2>Tool Ready</h2>`;
    }
}

// ================= LOGIC =================

function genQR() {
    const text = document.getElementById('qr-text').value;
    document.getElementById('qr-img').src =
        "https://quickchart.io/qr?text=" + encodeURIComponent(text);
}

function calcEMI() {
    let p = +document.getElementById('p').value;
    let r = +document.getElementById('r').value / 12 / 100;
    let n = +document.getElementById('n').value * 12;

    let emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    document.getElementById('emi-out').innerText = emi.toFixed(0);
}

function saveNotes() {
    const val = document.getElementById('notes').value;
    state.notes = val;
    localStorage.setItem('notes', val);
}

function addTodo() {
    const val = document.getElementById('todo-in').value;
    state.todo.push(val);
    localStorage.setItem('todo', JSON.stringify(state.todo));
    renderTodo();
}

function renderTodo() {
    const ul = document.getElementById('todo-list');
    ul.innerHTML = state.todo.map(t => `<li>${t}</li>`).join('');
}

// ================= GLOBAL FIX =================

window.openModal = openModal;
window.genQR = genQR;
window.calcEMI = calcEMI;
window.addTodo = addTodo;
window.saveNotes = saveNotes;
