// ================= SAFE BOOT =================
document.addEventListener("DOMContentLoaded", boot);

// ================= FIX: GLOBAL FUNCTIONS =================
window.openModal = openModal;
window.closeModal = closeModal;

// ================= FIX: ADD MISSING TOOLS UI =================
function injectToolUI(id) {
    const c = document.getElementById('tool-content');
    const sym = CURRENCIES[state.currency].symbol;

    switch(id) {

        // ✅ EMI
        case 'emi-calculator':
            c.innerHTML = `
            <input id="emi-p" placeholder="Amount (${sym})">
            <input id="emi-r" placeholder="Rate %">
            <input id="emi-n" placeholder="Years">
            <button onclick="runEMI()">Calculate</button>
            <div id="emi-out"></div>`;
            break;

        // ✅ WORD COUNTER
        case 'word-counter':
            c.innerHTML = `
            <textarea id="wc-in" oninput="runWC()" placeholder="Type..."></textarea>
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
            <img id="qr-img" style="margin-top:10px;">`;
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

        // ✅ BASE64
        case 'base64-converter':
            c.innerHTML = `
            <textarea id="b64-in"></textarea>
            <button onclick="encodeB64()">Encode</button>
            <button onclick="decodeB64()">Decode</button>
            <textarea id="b64-out"></textarea>`;
            break;

        // ✅ URL
        case 'url-converter':
            c.innerHTML = `
            <input id="url-in">
            <button onclick="encodeURL()">Encode</button>
            <button onclick="decodeURL()">Decode</button>
            <div id="url-out"></div>`;
            break;

        default:
            c.innerHTML = `<p>Tool ready (logic coming)</p>`;
    }

    lucide.createIcons();
}

// ================= LOGIC FIX =================

// QR
function genQR() {
    const text = document.getElementById('qr-text').value.trim();
    const img = document.getElementById('qr-img');

    if (!text) return alert("Enter text");

    img.src = "https://quickchart.io/qr?size=200&text=" + encodeURIComponent(text);
}

// EMI
function runEMI() {
    let p = +document.getElementById('emi-p').value;
    let r = +document.getElementById('emi-r').value / 12 / 100;
    let n = +document.getElementById('emi-n').value * 12;

    if (!p || !r || !n) return;

    let emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    document.getElementById('emi-out').innerText = applyCurr(emi);
}

// WORD
function runWC() {
    const t = document.getElementById('wc-in').value.trim();
    document.getElementById('wc-w').innerText = t ? t.split(/\s+/).length : 0;
    document.getElementById('wc-c').innerText = t.length;
}

// PASSWORD
function runPG() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let pass = "";
    for (let i = 0; i < 12; i++)
        pass += chars[Math.floor(Math.random() * chars.length)];

    document.getElementById('pg-out').innerText = pass;
}

// NOTES
function saveNotes() {
    const v = document.getElementById('notes').value;
    state.notes = v;
    localStorage.setItem('tool_notes', v);
}

// TODO
function addTodo() {
    const v = document.getElementById('todo-in').value;
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
    document.getElementById('unit-out').innerText = (v / 100) + " m";
}

// BASE64
function encodeB64() {
    const v = document.getElementById('b64-in').value;
    document.getElementById('b64-out').value = btoa(v);
}
function decodeB64() {
    const v = document.getElementById('b64-in').value;
    document.getElementById('b64-out').value = atob(v);
}

// URL
function encodeURL() {
    const v = document.getElementById('url-in').value;
    document.getElementById('url-out').innerText = encodeURIComponent(v);
}
function decodeURL() {
    const v = document.getElementById('url-in').value;
    document.getElementById('url-out').innerText = decodeURIComponent(v);
}
