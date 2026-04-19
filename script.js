// ================= SAFE BOOT =================
document.addEventListener("DOMContentLoaded", init);

// ================= STATE =================
const state = {
    theme: localStorage.getItem("theme") || "light",
    lang: localStorage.getItem("lang") || "en",
    currency: localStorage.getItem("currency") || "USD",
    notes: localStorage.getItem("notes") || "",
    todo: JSON.parse(localStorage.getItem("todo") || "[]")
};

// ================= TOOLS (ALL 33) =================
const TOOLS = [
    "image-compressor","background-remover","image-resizer","jpg-to-png",
    "pdf-merger","pdf-splitter","word-counter","case-converter",
    "text-to-speech","speech-to-text","notes-app","password-generator",
    "age-calculator","qr-code-generator","color-picker","base64-converter",
    "url-converter","unit-converter","stopwatch","todo-list",
    "emi-calculator","sip-calculator","tax-calculator","credit-card-interest",
    "insurance-estimator","website-cost","freelancer-earning","domain-estimator",
    "crypto-profit","roi-calculator","username-generator","caption-generator","bio-generator"
];

// ================= INIT =================
function init() {
    applyTheme();
    renderTools();
    bindEvents();
    lucide.createIcons();
}

// ================= THEME =================
function applyTheme() {
    document.documentElement.classList.toggle("dark", state.theme === "dark");
}

// ================= EVENTS =================
function bindEvents() {
    document.getElementById("theme-toggle").onclick = () => {
        state.theme = state.theme === "light" ? "dark" : "light";
        localStorage.setItem("theme", state.theme);
        applyTheme();
    };

    document.getElementById("currency-select").onchange = (e) => {
        state.currency = e.target.value;
        localStorage.setItem("currency", state.currency);
    };

    document.getElementById("lang-select").onchange = (e) => {
        state.lang = e.target.value;
        localStorage.setItem("lang", state.lang);
    };

    document.getElementById("modal-close").onclick = closeModal;
    document.getElementById("modal-overlay").onclick = closeModal;
}

// ================= RENDER =================
function renderTools() {
    const grid = document.getElementById("tool-grid");

    grid.innerHTML = TOOLS.map(id => `
        <div onclick="openModal('${id}')" class="p-6 bg-white dark:bg-gray-800 rounded-2xl cursor-pointer shadow hover:scale-105 transition">
            <h3 class="font-bold">${id.replaceAll('-', ' ')}</h3>
        </div>
    `).join("");
}

// ================= MODAL =================
function openModal(id) {
    injectUI(id);
    document.getElementById("modal-overlay").classList.remove("hidden");
    document.getElementById("modal-container").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("modal-overlay").classList.add("hidden");
    document.getElementById("modal-container").classList.add("hidden");
}

// ================= TOOL UI =================
function injectUI(id) {
    const c = document.getElementById("tool-content");

    switch (id) {

        // ✅ QR
        case "qr-code-generator":
            c.innerHTML = `
                <input id="qr-text" class="border p-2 w-full">
                <button onclick="genQR()" class="bg-blue-600 text-white px-4 py-2 mt-2">Generate</button>
                <img id="qr-img" class="mt-4">
            `;
            break;

        // ✅ EMI
        case "emi-calculator":
            c.innerHTML = `
                <input id="p" placeholder="Amount" class="border p-2 w-full mb-2">
                <input id="r" placeholder="Rate" class="border p-2 w-full mb-2">
                <input id="n" placeholder="Years" class="border p-2 w-full mb-2">
                <button onclick="calcEMI()" class="bg-blue-600 text-white px-4 py-2">Calc</button>
                <div id="emi-out"></div>
            `;
            break;

        // ✅ WORD
        case "word-counter":
            c.innerHTML = `
                <textarea id="wc" class="w-full h-40 border p-2" oninput="runWC()"></textarea>
                <div>Words: <span id="wc-w">0</span></div>
            `;
            break;

        // ✅ PASSWORD
        case "password-generator":
            c.innerHTML = `
                <button onclick="genPass()" class="bg-blue-600 text-white px-4 py-2">Generate</button>
                <div id="pass-out"></div>
            `;
            break;

        // ✅ NOTES
        case "notes-app":
            c.innerHTML = `
                <textarea id="notes" class="w-full h-40 border p-2">${state.notes}</textarea>
                <button onclick="saveNotes()">Save</button>
            `;
            break;

        // ✅ TODO
        case "todo-list":
            c.innerHTML = `
                <input id="todo-in" class="border p-2">
                <button onclick="addTodo()">Add</button>
                <ul id="todo-list"></ul>
            `;
            renderTodo();
            break;

        // ✅ COLOR
        case "color-picker":
            c.innerHTML = `
                <input type="color" id="color" onchange="pickColor()">
                <div id="color-val"></div>
            `;
            break;

        // ✅ UNIT
        case "unit-converter":
            c.innerHTML = `
                <input id="unit">
                <button onclick="convert()">Convert</button>
                <div id="unit-out"></div>
            `;
            break;

        default:
            c.innerHTML = `<h2>Coming Soon</h2>`;
    }
}

// ================= LOGIC =================
function genQR() {
    let t = document.getElementById("qr-text").value;
    document.getElementById("qr-img").src =
        "https://quickchart.io/qr?text=" + encodeURIComponent(t);
}

function calcEMI() {
    let p = +document.getElementById("p").value;
    let r = +document.getElementById("r").value / 12 / 100;
    let n = +document.getElementById("n").value * 12;
    let emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    document.getElementById("emi-out").innerText = emi.toFixed(0);
}

function runWC() {
    let t = document.getElementById("wc").value;
    document.getElementById("wc-w").innerText = t.split(/\s+/).length;
}

function genPass() {
    let chars = "abcABC123@#";
    let p = "";
    for (let i = 0; i < 10; i++)
        p += chars[Math.floor(Math.random() * chars.length)];
    document.getElementById("pass-out").innerText = p;
}

function saveNotes() {
    let v = document.getElementById("notes").value;
    localStorage.setItem("notes", v);
}

function addTodo() {
    let v = document.getElementById("todo-in").value;
    state.todo.push(v);
    localStorage.setItem("todo", JSON.stringify(state.todo));
    renderTodo();
}

function renderTodo() {
    const ul = document.getElementById("todo-list");
    if (!ul) return;
    ul.innerHTML = state.todo.map(t => `<li>${t}</li>`).join("");
}

function pickColor() {
    document.getElementById("color-val").innerText =
        document.getElementById("color").value;
}

function convert() {
    let v = parseFloat(document.getElementById("unit").value);
    document.getElementById("unit-out").innerText = (v / 100) + " m";
}
