/**
 * SmartTools Hub v5.0 Engine (FINAL STABLE - NO BREAK)
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
    { id: 'speech-to-text', nameKey: 'stt', icon: 'mic', category: 'Text', desc: 'Real-time transcription.' },
    { id: 'notes-app', nameKey: 'notes', icon: 'pen-tool', category: 'Text', desc: 'Persistent notepad.' },
    { id: 'password-generator', nameKey: 'pass', icon: 'lock', category: 'Utility', desc: 'Strong passwords.' },
    { id: 'age-calculator', nameKey: 'age', icon: 'calendar', category: 'Utility', desc: 'Calculate age.' },
    { id: 'qr-code-generator', nameKey: 'qr', icon: 'qr-code', category: 'Utility', desc: 'Generate QR.' },
    { id: 'color-picker', nameKey: 'color', icon: 'palette', category: 'Utility', desc: 'Pick colors.' },
    { id: 'base64-converter', nameKey: 'b64', icon: 'hash', category: 'Utility', desc: 'Encode/Decode Base64.' },
    { id: 'url-converter', nameKey: 'url', icon: 'link', category: 'Utility', desc: 'Encode URLs.' },
    { id: 'unit-converter', nameKey: 'unit', icon: 'ruler', category: 'Utility', desc: 'Convert units.' },
    { id: 'stopwatch', nameKey: 'stopwatch', icon: 'timer', category: 'Utility', desc: 'Stopwatch.' },
    { id: 'todo-list', nameKey: 'todo', icon: 'check-square', category: 'Utility', desc: 'Todo list.' },
    { id: 'emi-calculator', nameKey: 'emi', icon: 'landmark', category: 'Finance', desc: 'Loan EMI.' },
    { id: 'sip-calculator', nameKey: 'sip', icon: 'banknote', category: 'Finance', desc: 'SIP returns.' },
    { id: 'roi-calculator', nameKey: 'roi', icon: 'trending-up', category: 'Finance', desc: 'ROI calc.' },
    { id: 'username-generator', nameKey: 'username', icon: 'at-sign', category: 'Instagram', desc: 'Username generator.' }
];

let state = {
    todo: JSON.parse(localStorage.getItem('todo')||'[]'),
    notes: localStorage.getItem('notes')||''
};

// ================= RENDER =================
function createToolCard(t){
    return `
    <div onclick="openModal('${t.id}')" class="card">
        <i data-lucide="${t.icon}"></i>
        <h3>${t.nameKey}</h3>
        <p>${t.desc}</p>
    </div>`;
}

function render(){
    document.getElementById('tool-grid').innerHTML =
        TOOLS.map(createToolCard).join('');
    lucide.createIcons();
}

// ================= MODAL =================
function openModal(id){
    injectToolUI(id);
    document.getElementById('modal').style.display='block';
}

// ================= TOOL UI (FIXED) =================
function injectToolUI(id){
    const c = document.getElementById('tool-content');

    switch(id){

        case 'age-calculator':
            c.innerHTML=`<input type="date" id="age-date"><button onclick="calcAge()">Calc</button><div id="age-result"></div>`;
        break;

        case 'qr-code-generator':
            c.innerHTML=`<input id="qr-text"><button onclick="genQR()">Gen</button><img id="qr-img"/>`;
        break;

        case 'password-generator':
            c.innerHTML=`<button onclick="runPG()">Generate</button><div id="pg-out"></div>`;
            runPG();
        break;

        case 'word-counter':
            c.innerHTML=`<textarea id="wc" oninput="runWC()"></textarea><div id="wc-w"></div>`;
        break;

        case 'todo-list':
            c.innerHTML=`<input id="todo-in"><button onclick="addTodo()">Add</button><ul id="todo-list"></ul>`;
            renderTodo();
        break;

        case 'notes-app':
            c.innerHTML=`<textarea oninput="saveNotes()">${state.notes}</textarea>`;
        break;

        case 'color-picker':
            c.innerHTML=`<input type="color" onchange="pickColor()" id="color"><div id="color-val"></div>`;
        break;

        case 'unit-converter':
            c.innerHTML=`<input id="unit"><button onclick="convertUnit()">Convert</button><div id="unit-out"></div>`;
        break;

        case 'roi-calculator':
            c.innerHTML=`<input id="roi-i"><input id="roi-r"><button onclick="calcROI()">Calc</button><div id="roi-out"></div>`;
        break;

        case 'sip-calculator':
            c.innerHTML=`<input id="sip-m"><input id="sip-r"><input id="sip-y"><button onclick="calcSIP()">Calc</button><div id="sip-out"></div>`;
        break;

        case 'base64-converter':
            c.innerHTML=`<textarea id="b64-in"></textarea><button onclick="toBase64()">Encode</button><button onclick="fromBase64()">Decode</button><textarea id="b64-out"></textarea>`;
        break;

        case 'url-converter':
            c.innerHTML=`<input id="url-in"><button onclick="encodeURL()">Encode</button><button onclick="decodeURL()">Decode</button><input id="url-out">`;
        break;

        case 'stopwatch':
            c.innerHTML=`<div id="sw">0</div><button onclick="startSW()">Start</button><button onclick="stopSW()">Stop</button>`;
        break;

        default:
            c.innerHTML=`<h2>Tool Coming Soon</h2>`;
    }

    lucide.createIcons();
}

// ================= LOGIC =================

function calcAge(){
    const d=new Date(document.getElementById('age-date').value);
    document.getElementById('age-result').innerText =
    new Date().getFullYear()-d.getFullYear()+" Years";
}

function genQR(){
    const text=document.getElementById('qr-text').value.trim();
    if(!text) return alert("Enter text");

    document.getElementById('qr-img').src =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data="+encodeURIComponent(text);
}

function runPG(){
    let chars="abcABC123!@#";
    let pass="";
    for(let i=0;i<10;i++) pass+=chars[Math.floor(Math.random()*chars.length)];
    document.getElementById('pg-out').innerText=pass;
}

function runWC(){
    let t=document.getElementById('wc').value;
    document.getElementById('wc-w').innerText=t.split(" ").length;
}

function addTodo(){
    let v=document.getElementById('todo-in').value;
    state.todo.push(v);
    localStorage.setItem('todo',JSON.stringify(state.todo));
    renderTodo();
}

function renderTodo(){
    const ul=document.getElementById('todo-list');
    if(!ul) return;
    ul.innerHTML=state.todo.map(t=>`<li>${t}</li>`).join('');
}

function saveNotes(){
    state.notes=document.querySelector('textarea').value;
    localStorage.setItem('notes',state.notes);
}

function pickColor(){
    document.getElementById('color-val').innerText =
    document.getElementById('color').value;
}

function convertUnit(){
    let v=parseFloat(document.getElementById('unit').value);
    document.getElementById('unit-out').innerText=(v/100)+" meters";
}

function calcROI(){
    let i=+document.getElementById('roi-i').value;
    let r=+document.getElementById('roi-r').value;
    document.getElementById('roi-out').innerText=((r-i)/i*100).toFixed(2)+"%";
}

function calcSIP(){
    const m=+document.getElementById('sip-m').value;
    const r=+document.getElementById('sip-r').value/100/12;
    const n=+document.getElementById('sip-y').value*12;
    const future=m*((Math.pow(1+r,n)-1)/r)*(1+r);
    document.getElementById('sip-out').innerText=future.toFixed(0);
}

function toBase64(){
    document.getElementById('b64-out').value=btoa(document.getElementById('b64-in').value);
}

function fromBase64(){
    document.getElementById('b64-out').value=atob(document.getElementById('b64-in').value);
}

function encodeURL(){
    document.getElementById('url-out').value=encodeURIComponent(document.getElementById('url-in').value);
}

function decodeURL(){
    document.getElementById('url-out').value=decodeURIComponent(document.getElementById('url-in').value);
}

let swInt, swTime=0;
function startSW(){
    swInt=setInterval(()=>{swTime++;document.getElementById('sw').innerText=swTime;},1000);
}
function stopSW(){ clearInterval(swInt); }

// ================= BOOT =================
render();
