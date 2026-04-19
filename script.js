/**
 * SmartTools Hub FINAL STABLE ENGINE
 * (UI SAFE + WORKING TOOLS)
 */

// ================= TOOLS =================
const TOOLS = [
    { id: 'qr-code-generator', nameKey: 'QR Generator', icon: 'qr-code', desc: 'Generate QR codes' },
    { id: 'notes-app', nameKey: 'Notes', icon: 'pen-tool', desc: 'Save notes' },
    { id: 'todo-list', nameKey: 'Todo', icon: 'check-square', desc: 'Task manager' },
    { id: 'color-picker', nameKey: 'Color Picker', icon: 'palette', desc: 'Pick colors' },
    { id: 'unit-converter', nameKey: 'Unit Converter', icon: 'ruler', desc: 'Convert units' }
];

// ================= STATE =================
let state = {
    theme: localStorage.getItem('theme') || 'light',
    todo: JSON.parse(localStorage.getItem('tool_todo') || '[]'),
    notes: localStorage.getItem('tool_notes') || ''
};

// ================= RENDER =================
function createToolCard(t) {
    return `
    <div onclick="openModal('${t.id}')" 
    class="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow hover:scale-105 transition cursor-pointer">
        <i data-lucide="${t.icon}" class="mb-3"></i>
        <h3 class="font-bold">${t.nameKey}</h3>
        <p class="text-sm opacity-70">${t.desc}</p>
    </div>`;
}

function render() {
    const grid = document.getElementById('tool-grid');
    if (!grid) return;

    grid.innerHTML = TOOLS.map(createToolCard).join('');
    lucide.createIcons();
}

// ================= MODAL =================
function openModal(id) {
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

        // 🔥 QR GENERATOR (FIXED)
        case 'qr-code-generator':
            c.innerHTML = `
            <div class="space-y-5">
                <input id="qr-text" class="w-full p-4 border rounded-xl" placeholder="Enter text">
                <button onclick="genQR()" class="w-full py-3 bg-blue-600 text-white rounded-xl">Generate</button>
                <img id="qr-img" class="mx-auto hidden mt-4"/>
            </div>`;
            break;

        // NOTES
        case 'notes-app':
            c.innerHTML = `
            <textarea id="notes" class="w-full h-60 p-4 border rounded-xl">${state.notes}</textarea>`;
            document.getElementById('notes').oninput = saveNotes;
            break;

        // TODO
        case 'todo-list':
            c.innerHTML = `
            <div class="space-y-4">
                <input id="todo-in" class="w-full p-3 border rounded-xl">
                <button onclick="addTodo()" class="w-full py-2 bg-blue-600 text-white rounded-xl">Add</button>
                <ul id="todo-list" class="space-y-2"></ul>
            </div>`;
            renderTodo();
            break;

        // COLOR
        case 'color-picker':
            c.innerHTML = `
            <input type="color" id="color" onchange="pickColor()">
            <div id="color-val" class="mt-2 font-bold"></div>`;
            break;

        // UNIT
        case 'unit-converter':
            c.innerHTML = `
            <input id="unit" class="p-3 border rounded">
            <button onclick="convertUnit()" class="ml-2 px-4 py-2 bg-blue-600 text-white rounded">Convert</button>
            <div id="unit-out" class="mt-3"></div>`;
            break;

        default:
            c.innerHTML = `<h2>Coming Soon</h2>`;
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
    img.classList.remove('hidden');
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

    ul.innerHTML = state.todo.map(t => `<li class="bg-gray-100 p-2 rounded">${t}</li>`).join('');
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

// ================= EVENTS =================
document.getElementById('modal-close').onclick = closeModal;
document.getElementById('modal-overlay').onclick = closeModal;

document.getElementById('theme-toggle').onclick = () => {
    document.documentElement.classList.toggle('dark');
};

// ================= BOOT =================
render();
