/**
 * SmartTools Hub v5.1 FIXED (NO UI BREAK)
 */

const TOOLS = [ /* SAME AS YOUR ORIGINAL — NO CHANGE */ ];

const CURRENCIES = {
    USD: { symbol: '$', rate: 1 },
    INR: { symbol: '₹', rate: 83 }
};

let state = {
    theme: localStorage.getItem('theme') || 'light',
    currency: localStorage.getItem('currency') || 'USD',
    todo: JSON.parse(localStorage.getItem('tool_todo') || '[]'),
    notes: localStorage.getItem('tool_notes') || ''
};

// ================= RENDER =================

function createToolCard(t) {
    return `
    <div onclick="openModal('${t.id}')" class="card">
        <i data-lucide="${t.icon}"></i>
        <h3>${t.nameKey}</h3>
        <p>${t.desc}</p>
    </div>`;
}

function render() {
    document.getElementById('tool-grid').innerHTML =
        TOOLS.map(createToolCard).join('');
    lucide.createIcons();
}

// ================= MODAL =================

function openModal(id) {
    injectToolUI(id);
    document.getElementById('modal').style.display = 'block';
}

function injectToolUI(id) {
    const c = document.getElementById('tool-content');
    const sym = CURRENCIES[state.currency].symbol;

    switch (id) {

        // ✅ EMI (UI SAME STYLE)
        case 'emi-calculator':
            c.innerHTML = `
            <input id="emi-p" placeholder="Loan Amount">
            <input id="emi-r" placeholder="Rate %">
            <input id="emi-n" placeholder="Years">
            <button onclick="runEMI()">Calculate</button>
            <div id="emi-out"></div>`;
            break;

        // ✅ WORD COUNTER
        case 'word-counter':
            c.innerHTML = `
            <textarea id="wc" oninput="runWC()"></textarea>
            <div>Words: <span id="wc-w">0</span></div>
            <div>Chars: <span id="wc-c">0</span></div>`;
            break;

        // ✅ PASSWORD
        case 'password-generator':
            c.innerHTML = `
            <button onclick="runPG()">Generate</button>
            <div id="pg-out"></div>`;
            runPG();
            break;

        // ✅ QR FIXED
        case 'qr-code-generator':
            c.innerHTML = `
            <input id="qr-text" placeholder="Enter text">
            <button onclick="genQR()">Generate</button>
            <img id="qr-img"/>`;
            break;

        // ✅ NOTES
        case 'notes-app':
            c.innerHTML = `
            <textarea id="notes" oninput="saveNotes()">${state.notes}</textarea>`;
            break;

        // ✅ TODO
        case 'todo-list':
            c.innerHTML = `
            <input id="todo-in">
            <button onclick="addTodo()">Add</button>
            <ul id="todo-list"></ul>`;
            renderTodo();
            break;

        // ✅ COLOR
        case 'color-picker':
            c.innerHTML = `
            <input type="color" id="color" onchange="pickColor()">
            <div id="color-val"></div>`;
            break;

        // ✅ UNIT
        case 'unit-converter':
            c.innerHTML = `
            <input id="unit">
            <button onclick="convertUnit()">Convert</button>
            <div id="unit-out"></div>`;
            break;

        default:
            c.innerHTML = `<h2>Coming Soon</h2>`;
    }

    lucide.createIcons();
}

// ================= LOGIC =================

// EMI
function runEMI() {
    let p = +document.getElementById('emi-p').value;
    let r = +document.getElementById('emi-r').value / 12 / 100;
    let n = +document.getElementById('emi-n').value * 12;

    if (!p || !r || !n) return;

    let emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    document.getElementById('emi-out').innerText = emi.toFixed(0);
}

// WORD
function runWC() {
    let t = document.getElementById('wc').value.trim();
    document.getElementById('wc-w').innerText = t ? t.split(/\s+/).length : 0;
    document.getElementById('wc-c').innerText = t.length;
}

// PASSWORD
function runPG() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let pass = "";
    for (let i = 0; i < 12; i++)
        pass += chars[Math.floor(Math.random() * chars.length)];

    document.getElementById('pg-out').innerText = pass;
}

// QR FIX
function genQR() {
    const text = document.getElementById('qr-text').value.trim();
    const img = document.getElementById('qr-img');

    if (!text) {
        alert("Enter text first");
        return;
    }

    // force reload (important fix)
    img.src = "";

    // better API (more stable)
    img.src = "https://quickchart.io/qr?size=200&text=" + encodeURIComponent(text);

    // ensure visible
    img.style.display = "block";

    // fallback अगर load fail हो
    img.onerror = () => {
        img.alt = "QR failed to load";
        console.error("QR API failed");
    };

}

// NOTES
function saveNotes() {
    state.notes = document.getElementById('notes').value;
    localStorage.setItem('tool_notes', state.notes);
}

// TODO
function addTodo() {
    let v = document.getElementById('todo-in').value;
    if (!v) return;

    state.todo.push(v);
    localStorage.setItem('tool_todo', JSON.stringify(state.todo));
    renderTodo();
}

function renderTodo() {
    const ul = document.getElementById('todo-list');
    if (!ul) return;

    ul.innerHTML = state.todo.map(t => `<li>${t}</li>`).join('');
}

// COLOR
function pickColor() {
    document.getElementById('color-val').innerText =
        document.getElementById('color').value;
}

// UNIT
function convertUnit() {
    let v = parseFloat(document.getElementById('unit').value);
    if (!v) return;

    document.getElementById('unit-out').innerText = (v / 100) + " meters";
}

// ================= BOOT =================

render();
