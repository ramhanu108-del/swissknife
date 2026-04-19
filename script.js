// ================= TOOLS DATABASE =================
const TOOLS = [
    { id: 'word-c', name: 'Word Counter', icon: 'type', cat: 'Text' },
    { id: 'case-v', name: 'Case Converter', icon: 'case-upper', cat: 'Text' },
    { id: 'tts', name: 'Text to Speech', icon: 'volume-2', cat: 'Text' },

    { id: 'emi', name: 'EMI Calculator', icon: 'landmark', cat: 'Finance' },
    { id: 'sip', name: 'SIP Calculator', icon: 'trending-up', cat: 'Finance' },
    { id: 'tax', name: 'Tax Calculator', icon: 'wallet', cat: 'Finance' },

    { id: 'pass-g', name: 'Password Generator', icon: 'lock', cat: 'Utility' },
    { id: 'age-c', name: 'Age Calculator', icon: 'calendar', cat: 'Utility' },
    { id: 'todo', name: 'ToDo List', icon: 'check-square', cat: 'Utility' },

    { id: 'ig-user', name: 'Username Generator', icon: 'instagram', cat: 'Instagram' },

    // remaining (coming soon)
    { id: 'img-comp', name: 'Image Compressor', icon: 'image', cat: 'Image' },
    { id: 'bg-rem', name: 'Background Remover', icon: 'image', cat: 'Image' },
    { id: 'img-res', name: 'Image Resizer', icon: 'image', cat: 'Image' },

    { id: 'pdf-m', name: 'PDF Merger', icon: 'file', cat: 'PDF' },
    { id: 'pdf-s', name: 'PDF Splitter', icon: 'file', cat: 'PDF' },

    { id: 'qr-g', name: 'QR Generator', icon: 'qr-code', cat: 'Utility' },
    { id: 'stopw', name: 'Stopwatch', icon: 'timer', cat: 'Utility' }
];

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
    renderTools();
    lucide.createIcons();
});

// ================= RENDER =================
function renderTools() {
    const grid = document.getElementById("toolGrid");

    grid.innerHTML = TOOLS.map(t => `
        <div onclick="openTool('${t.id}')" class="tool-card bg-white dark:bg-gray-900 p-6 rounded-2xl cursor-pointer">
            <i data-lucide="${t.icon}" class="mb-2"></i>
            <h3 class="font-bold">${t.name}</h3>
        </div>
    `).join("");

    lucide.createIcons();
}

// ================= MODAL =================
function openTool(id) {
    const modal = document.getElementById("toolModal");
    const body = document.getElementById("modalBody");
    const title = document.getElementById("modalTitle");

    modal.classList.remove("hidden");

    switch(id){

        // ================= WORD COUNTER =================
        case 'word-c':
            title.innerText = "Word Counter";
            body.innerHTML = `
                <textarea id="txt" class="tool-input h-40"></textarea>
                <div class="mt-4">Words: <span id="w">0</span></div>
            `;
            document.getElementById("txt").oninput = (e)=>{
                let words = e.target.value.trim().split(/\s+/).length;
                document.getElementById("w").innerText = words;
            }
        break;

        // ================= EMI =================
        case 'emi':
            title.innerText="EMI Calculator";
            body.innerHTML=`
                <input id="p" class="tool-input" placeholder="Amount"><br>
                <input id="r" class="tool-input" placeholder="Rate"><br>
                <input id="n" class="tool-input" placeholder="Months"><br>
                <button onclick="calcEMI()" class="tool-btn">Calculate</button>
                <h3 id="res"></h3>
            `;
        break;

        // ================= SIP =================
        case 'sip':
            title.innerText="SIP Calculator";
            body.innerHTML=`
                <input id="m" class="tool-input" placeholder="Monthly"><br>
                <input id="r" class="tool-input" placeholder="Rate"><br>
                <input id="y" class="tool-input" placeholder="Years"><br>
                <button onclick="calcSIP()" class="tool-btn">Calculate</button>
                <h3 id="res"></h3>
            `;
        break;

        // ================= PASSWORD =================
        case 'pass-g':
            title.innerText="Password Generator";
            body.innerHTML=`
                <button onclick="genPass()" class="tool-btn">Generate</button>
                <h3 id="res"></h3>
            `;
        break;

        // ================= AGE =================
        case 'age-c':
            title.innerText="Age Calculator";
            body.innerHTML=`
                <input type="date" id="dob" class="tool-input">
                <button onclick="calcAge()" class="tool-btn">Calculate</button>
                <h3 id="res"></h3>
            `;
        break;

        // ================= TODO =================
        case 'todo':
            title.innerText="ToDo List";
            body.innerHTML=`
                <input id="t" class="tool-input" placeholder="Task">
                <button onclick="addTodo()" class="tool-btn">Add</button>
                <div id="list"></div>
            `;
            loadTodo();
        break;

        // ================= IG =================
        case 'ig-user':
            title.innerText="Username Generator";
            body.innerHTML=`
                <input id="k" class="tool-input" placeholder="Keyword">
                <button onclick="genIG()" class="tool-btn">Generate</button>
                <div id="res"></div>
            `;
        break;

        // ================= DEFAULT =================
        default:
            title.innerText="Coming Soon";
            body.innerHTML=`<div class="text-center p-10">🚀 Tool coming soon</div>`;
    }
}

// ================= FUNCTIONS =================

function calcEMI(){
    let P=+p.value;
    let r=+r.value/12/100;
    let n=+n.value;
    let emi=(P*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
    res.innerText="₹ "+Math.round(emi);
}

function calcSIP(){
    let P=+m.value;
    let r=+r.value/12/100;
    let n=+y.value*12;
    let fv=P*((Math.pow(1+r,n)-1)/r)*(1+r);
    res.innerText="₹ "+Math.round(fv);
}

function genPass(){
    let chars="abcABC123!@#";
    let pass="";
    for(let i=0;i<12;i++){
        pass+=chars[Math.floor(Math.random()*chars.length)];
    }
    res.innerText=pass;
}

function calcAge(){
    let d=new Date(dob.value);
    let age=(new Date()-d)/(1000*60*60*24*365);
    res.innerText=Math.floor(age)+" years";
}

// ================= TODO =================
function addTodo(){
    let val=t.value;
    let arr=JSON.parse(localStorage.getItem("todo")||"[]");
    arr.push(val);
    localStorage.setItem("todo",JSON.stringify(arr));
    loadTodo();
}

function loadTodo(){
    let arr=JSON.parse(localStorage.getItem("todo")||"[]");
    list.innerHTML=arr.map(i=>`<div>${i}</div>`).join("");
}

function genIG(){
    let k=document.getElementById("k").value||"user";
    res.innerHTML=Array.from({length:5}).map(()=>k+Math.floor(Math.random()*100)).join("<br>");
}
