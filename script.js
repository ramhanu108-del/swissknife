/**
 * SmartTools Hub v5.1 (STABLE + UI FIXED + MORE TOOLS)
 */

const TOOLS = [
    { id:'age-calculator', nameKey:'Age', icon:'calendar', category:'Utility', desc:'Calculate age' },
    { id:'qr-code-generator', nameKey:'QR', icon:'qr-code', category:'Utility', desc:'Generate QR' },
    { id:'password-generator', nameKey:'Password', icon:'lock', category:'Utility', desc:'Generate password' },
    { id:'word-counter', nameKey:'Words', icon:'type', category:'Text', desc:'Word counter' },
    { id:'todo-list', nameKey:'Todo', icon:'check-square', category:'Utility', desc:'Todo list' },
    { id:'notes-app', nameKey:'Notes', icon:'pen-tool', category:'Text', desc:'Notes app' },
    { id:'color-picker', nameKey:'Color', icon:'palette', category:'Utility', desc:'Pick color' },
    { id:'unit-converter', nameKey:'Unit', icon:'ruler', category:'Utility', desc:'Convert units' },
    { id:'roi-calculator', nameKey:'ROI', icon:'trending-up', category:'Finance', desc:'ROI calc' },
    { id:'sip-calculator', nameKey:'SIP', icon:'banknote', category:'Finance', desc:'SIP calc' },
    { id:'base64-converter', nameKey:'Base64', icon:'hash', category:'Utility', desc:'Encode Decode' },
    { id:'url-converter', nameKey:'URL', icon:'link', category:'Utility', desc:'URL encode' },
    { id:'stopwatch', nameKey:'Stopwatch', icon:'timer', category:'Utility', desc:'Timer' }
];

let state = {
    todo: JSON.parse(localStorage.getItem('todo')||'[]'),
    notes: localStorage.getItem('notes')||''
};

// ================= UI CARD =================
function createToolCard(t){
    return `
    <div onclick="openModal('${t.id}')"
    class="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow hover:shadow-xl cursor-pointer transition">

        <i data-lucide="${t.icon}" class="mb-3"></i>
        <h3 class="font-bold">${t.nameKey}</h3>
        <p class="text-sm text-gray-500">${t.desc}</p>
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

// ================= TOOL UI =================
function injectToolUI(id){
    const c = document.getElementById('tool-content');

    switch(id){

// AGE
case 'age-calculator':
c.innerHTML=`
<div class="space-y-4">
<input type="date" id="age-date" class="input">
<button onclick="calcAge()" class="btn">Calculate</button>
<div id="age-result"></div>
</div>`; break;

// QR
case 'qr-code-generator':
c.innerHTML=`
<div class="space-y-4">
<input id="qr-text" placeholder="Enter text" class="input">
<button onclick="genQR()" class="btn">Generate</button>
<img id="qr-img" class="mx-auto"/>
</div>`; break;

// PASSWORD
case 'password-generator':
c.innerHTML=`
<div class="space-y-4 text-center">
<button onclick="runPG()" class="btn">Generate</button>
<div id="pg-out" class="font-mono text-xl"></div>
</div>`;
runPG();
break;

// WORD
case 'word-counter':
c.innerHTML=`
<div class="space-y-4">
<textarea id="wc" oninput="runWC()" class="input h-32"></textarea>
<div id="wc-w"></div>
</div>`; break;

// TODO
case 'todo-list':
c.innerHTML=`
<div class="space-y-4">
<input id="todo-in" class="input">
<button onclick="addTodo()" class="btn">Add</button>
<ul id="todo-list"></ul>
</div>`;
renderTodo();
break;

// NOTES
case 'notes-app':
c.innerHTML=`
<textarea oninput="saveNotes()" class="input h-40">${state.notes}</textarea>`;
break;

// COLOR
case 'color-picker':
c.innerHTML=`
<div class="space-y-4">
<input type="color" id="color" onchange="pickColor()">
<div id="color-val"></div>
</div>`; break;

// UNIT
case 'unit-converter':
c.innerHTML=`
<div class="space-y-4">
<input id="unit" class="input">
<button onclick="convertUnit()" class="btn">Convert</button>
<div id="unit-out"></div>
</div>`; break;

// ROI
case 'roi-calculator':
c.innerHTML=`
<div class="space-y-4">
<input id="roi-i" placeholder="Invest" class="input">
<input id="roi-r" placeholder="Return" class="input">
<button onclick="calcROI()" class="btn">Calculate</button>
<div id="roi-out"></div>
</div>`; break;

// SIP
case 'sip-calculator':
c.innerHTML=`
<div class="space-y-4">
<input id="sip-m" placeholder="Monthly" class="input">
<input id="sip-r" placeholder="Rate" class="input">
<input id="sip-y" placeholder="Years" class="input">
<button onclick="calcSIP()" class="btn">Calculate</button>
<div id="sip-out"></div>
</div>`; break;

// BASE64
case 'base64-converter':
c.innerHTML=`
<div class="space-y-4">
<textarea id="b64-in" class="input"></textarea>
<button onclick="toBase64()" class="btn">Encode</button>
<button onclick="fromBase64()" class="btn">Decode</button>
<textarea id="b64-out" class="input"></textarea>
</div>`; break;

// URL
case 'url-converter':
c.innerHTML=`
<div class="space-y-4">
<input id="url-in" class="input">
<button onclick="encodeURL()" class="btn">Encode</button>
<button onclick="decodeURL()" class="btn">Decode</button>
<input id="url-out" class="input">
</div>`; break;

// STOPWATCH
case 'stopwatch':
c.innerHTML=`
<div class="text-center space-y-4">
<div id="sw">0</div>
<button onclick="startSW()" class="btn">Start</button>
<button onclick="stopSW()" class="btn">Stop</button>
</div>`; break;

default:
c.innerHTML=`<h2>Coming Soon</h2>`;
}

lucide.createIcons();
}

// ================= LOGIC =================

// AGE
function calcAge(){
    const d=new Date(document.getElementById('age-date').value);
    document.getElementById('age-result').innerText =
    new Date().getFullYear()-d.getFullYear()+" Years";
}

// QR FIXED
function genQR(){
    const text=document.getElementById('qr-text').value.trim();
    if(!text) return alert("Enter text");

    const img=document.getElementById('qr-img');
    img.src="";
    setTimeout(()=>{
        img.src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data="+encodeURIComponent(text);
    },50);
}

// PASSWORD
function runPG(){
    let chars="abcABC123!@#";
    let pass="";
    for(let i=0;i<12;i++)
        pass+=chars[Math.floor(Math.random()*chars.length)];
    document.getElementById('pg-out').innerText=pass;
}

// WORD
function runWC(){
    let t=document.getElementById('wc').value.trim();
    document.getElementById('wc-w').innerText=t? t.split(/\s+/).length:0;
}

// TODO
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

// NOTES
function saveNotes(){
    state.notes=document.querySelector('textarea').value;
    localStorage.setItem('notes',state.notes);
}

// COLOR
function pickColor(){
    document.getElementById('color-val').innerText =
    document.getElementById('color').value;
}

// UNIT
function convertUnit(){
    let v=parseFloat(document.getElementById('unit').value);
    document.getElementById('unit-out').innerText=(v/100)+" meters";
}

// ROI
function calcROI(){
    let i=+document.getElementById('roi-i').value;
    let r=+document.getElementById('roi-r').value;
    document.getElementById('roi-out').innerText=((r-i)/i*100).toFixed(2)+"%";
}

// SIP
function calcSIP(){
    const m=+document.getElementById('sip-m').value;
    const r=+document.getElementById('sip-r').value/100/12;
    const n=+document.getElementById('sip-y').value*12;

    const future=m*((Math.pow(1+r,n)-1)/r)*(1+r);
    document.getElementById('sip-out').innerText=future.toFixed(0);
}

// BASE64
function toBase64(){
    document.getElementById('b64-out').value=btoa(document.getElementById('b64-in').value);
}
function fromBase64(){
    document.getElementById('b64-out').value=atob(document.getElementById('b64-in').value);
}

// URL
function encodeURL(){
    document.getElementById('url-out').value=encodeURIComponent(document.getElementById('url-in').value);
}
function decodeURL(){
    document.getElementById('url-out').value=decodeURIComponent(document.getElementById('url-in').value);
}

// STOPWATCH
let swInt, swTime=0;
function startSW(){
    swInt=setInterval(()=>{
        swTime++;
        document.getElementById('sw').innerText=swTime;
    },1000);
}
function stopSW(){ clearInterval(swInt); }

// ================= BOOT =================
render();
