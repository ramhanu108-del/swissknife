// ================= STATE =================
let state = {
    theme: localStorage.getItem('theme') || 'light',
    lang: localStorage.getItem('lang') || 'en',
    currency: localStorage.getItem('currency') || 'USD',
    search: '',
    category: 'All',
    recent: JSON.parse(localStorage.getItem('tool_recent') || '[]'),
    todo: JSON.parse(localStorage.getItem('tool_todo') || '[]'),
    notes: localStorage.getItem('tool_notes') || ''
};

// ================= INIT =================
function boot() {
    document.getElementById('lang-select').value = state.lang;
    document.getElementById('currency-select').value = state.currency;
    applyTheme();
}
boot();

// ================= THEME =================
function applyTheme() {
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
}

document.getElementById('theme-toggle').onclick = () => {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', state.theme);
    applyTheme();
};

// ================= MODAL =================
function openModal(id) {
    const modal = document.getElementById('modal-container');
    const overlay = document.getElementById('modal-overlay');

    injectToolUI(id);

    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal-container').classList.add('hidden');
    document.getElementById('modal-overlay').classList.add('hidden');
}

// ================= TOOL UI =================
function injectToolUI(id) {
    const c = document.getElementById('tool-content');

    switch(id) {

        case 'emi-calculator':
            c.innerHTML = `
                <input id="emi-p" placeholder="Amount">
                <input id="emi-r" placeholder="Rate">
                <input id="emi-n" placeholder="Years">
                <button onclick="runEMI()">Calculate</button>
                <div id="emi-out"></div>`;
        break;

        case 'word-counter':
            c.innerHTML = `
                <textarea id="wc-in" oninput="runWC()"></textarea>
                <div>Words: <span id="wc-w">0</span></div>
                <div>Chars: <span id="wc-c">0</span></div>`;
        break;

        case 'password-generator':
            c.innerHTML = `
                <input type="range" id="pg-l" min="8" max="50" value="16">
                <button onclick="runPG()">Generate</button>
                <div id="pg-out"></div>`;
        break;

        case 'age-calculator':
            c.innerHTML = `
                <input type="date" id="age-date">
                <button onclick="calcAge()">Calculate</button>
                <div id="age-result"></div>`;
        break;

        case 'qr-code-generator':
            c.innerHTML = `
                <input id="qr-text">
                <button onclick="genQR()">Generate</button>
                <img id="qr-img">`;
        break;

        case 'base64-converter':
            c.innerHTML = `
                <textarea id="b64-in"></textarea>
                <button onclick="toBase64()">Encode</button>
                <button onclick="fromBase64()">Decode</button>
                <textarea id="b64-out"></textarea>`;
        break;

        case 'url-converter':
            c.innerHTML = `
                <input id="url-in">
                <button onclick="encodeURL()">Encode</button>
                <button onclick="decodeURL()">Decode</button>
                <input id="url-out">`;
        break;

        case 'color-picker':
            c.innerHTML = `
                <input type="color" id="color" onchange="pickColor()">
                <div id="color-val"></div>`;
        break;

        case 'stopwatch':
            c.innerHTML = `
                <div id="sw">0</div>
                <button onclick="startSW()">Start</button>
                <button onclick="stopSW()">Stop</button>`;
        break;

        case 'todo-list':
            c.innerHTML = `
                <input id="todo-in">
                <button onclick="addTodo()">Add</button>
                <ul id="todo-list"></ul>`;
            renderTodo();
        break;

        case 'notes-app':
            c.innerHTML = `
                <textarea id="notes" oninput="saveNotes()">${state.notes}</textarea>`;
        break;

        case 'text-to-speech':
            c.innerHTML = `
                <textarea id="tts"></textarea>
                <button onclick="speak()">Speak</button>`;
        break;

        case 'speech-to-text':
            c.innerHTML = `
                <button onclick="startSTT()">Start Mic</button>
                <div id="stt-out"></div>`;
        break;

        case 'unit-converter':
            c.innerHTML = `
                <input id="unit-in">
                <button onclick="convertUnit()">Convert</button>
                <div id="unit-out"></div>`;
        break;

        case 'sip-calculator':
            c.innerHTML = `
                <input id="sip-m">
                <input id="sip-r">
                <input id="sip-y">
                <button onclick="calcSIP()">Calculate</button>
                <div id="sip-out"></div>`;
        break;

        case 'roi-calculator':
            c.innerHTML = `
                <input id="roi-i">
                <input id="roi-r">
                <button onclick="calcROI()">Calculate</button>
                <div id="roi-out"></div>`;
        break;

        default:
            c.innerHTML = `<div>🚧 Tool Coming Soon</div>`;
    }
}

// ================= LOGIC =================

// EMI
function runEMI() {
    let p = +emi-p.value, r = emi-r.value/12/100, n = emi-n.value*12;
    let emi = p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
    emi_out.innerText = emi.toFixed(0);
}

// WORD
function runWC() {
    let t = wc_in.value.trim();
    wc_w.innerText = t ? t.split(/\s+/).length : 0;
    wc_c.innerText = t.length;
}

// PASSWORD
function runPG() {
    let l = pg_l.value;
    let ch="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let p="";
    for(let i=0;i<l;i++) p+=ch[Math.floor(Math.random()*ch.length)];
    pg_out.innerText=p;
}

// AGE
function calcAge() {
    let d=new Date(age_date.value);
    let diff=Date.now()-d;
    let a=new Date(diff);
    age_result.innerText=(a.getUTCFullYear()-1970)+" years";
}

// QR
function genQR() {
    qr_img.src=`https://api.qrserver.com/v1/create-qr-code/?data=${qr_text.value}`;
}

// BASE64
function toBase64(){ b64_out.value=btoa(b64_in.value);}
function fromBase64(){ try{b64_out.value=atob(b64_in.value)}catch{alert("error")}}

// URL
function encodeURL(){url_out.value=encodeURIComponent(url_in.value)}
function decodeURL(){url_out.value=decodeURIComponent(url_in.value)}

// COLOR
function pickColor(){color_val.innerText=color.value}

// STOPWATCH
let t=0,int;
function startSW(){int=setInterval(()=>{sw.innerText=++t},1000)}
function stopSW(){clearInterval(int)}

// TODO
function addTodo(){
    state.todo.push(todo_in.value);
    localStorage.setItem('tool_todo',JSON.stringify(state.todo));
    renderTodo();
}
function renderTodo(){
    todo_list.innerHTML=state.todo.map((t,i)=>`<li onclick="removeTodo(${i})">${t}</li>`).join('');
}
function removeTodo(i){
    state.todo.splice(i,1);
    renderTodo();
}

// NOTES
function saveNotes(){localStorage.setItem('tool_notes',notes.value)}

// TTS
function speak(){speechSynthesis.speak(new SpeechSynthesisUtterance(tts.value))}

// STT
function startSTT(){
    let r=new (webkitSpeechRecognition||SpeechRecognition)();
    r.onresult=e=>stt_out.innerText=e.results[0][0].transcript;
    r.start();
}

// UNIT
function convertUnit(){unit_out.innerText=(unit_in.value/2.54).toFixed(2)+" inch"}

// SIP
function calcSIP(){
    let m=+sip_m.value,r=sip_r.value/12/100,n=sip_y.value*12;
    let fv=m*((Math.pow(1+r,n)-1)/r)*(1+r);
    sip_out.innerText=fv.toFixed(0);
}

// ROI
function calcROI(){
    let i=+roi_i.value,r=+roi_r.value;
    roi_out.innerText=((r-i)/i*100).toFixed(2)+"%";
}
