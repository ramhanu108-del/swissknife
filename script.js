// ===== TOOLS DATA =====
const TOOLS = [
    { id: 'word-c', name: 'Word Counter', icon: 'type', cat: 'Text', desc: 'Count words and characters' },
    { id: 'emi', name: 'EMI Calculator', icon: 'calculator', cat: 'Finance', desc: 'Loan EMI calculator' },
    { id: 'sip', name: 'SIP Calculator', icon: 'trending-up', cat: 'Finance', desc: 'Investment calculator' },
    { id: 'pass-g', name: 'Password Generator', icon: 'lock', cat: 'Utility', desc: 'Generate secure passwords' },
    { id: 'todo', name: 'ToDo List', icon: 'check-square', cat: 'Utility', desc: 'Task manager' },
    { id: 'age-c', name: 'Age Calculator', icon: 'calendar', cat: 'Utility', desc: 'Calculate your age' }
];

const CATEGORIES = ['All', 'Text', 'Finance', 'Utility'];

let state = {
    search: '',
    category: 'All',
    isDark: localStorage.getItem('theme') === 'dark'
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderCategories();
    renderTools();
    lucide.createIcons();

    document.getElementById('toolSearch').addEventListener('input', (e) => {
        state.search = e.target.value.toLowerCase();
        renderTools();
    });
});

// ===== THEME =====
function initTheme() {
    if (state.isDark) document.documentElement.classList.add('dark');

    document.getElementById('themeToggle').onclick = () => {
        state.isDark = !state.isDark;
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', state.isDark ? 'dark' : 'light');
    };
}

// ===== RENDER =====
function renderCategories() {
    const el = document.getElementById('categoryTabs');
    el.innerHTML = CATEGORIES.map(c => `
        <button onclick="setCategory('${c}')" 
        class="px-4 py-2 rounded-xl border ${state.category===c?'bg-blue-600 text-white':'bg-white dark:bg-gray-900'}">
        ${c}</button>
    `).join('');
}

function setCategory(c) {
    state.category = c;
    renderCategories();
    renderTools();
}

function renderTools() {
    const grid = document.getElementById('toolGrid');

    const filtered = TOOLS.filter(t =>
        (state.category === 'All' || t.cat === state.category) &&
        (t.name.toLowerCase().includes(state.search))
    );

    grid.innerHTML = filtered.map(t => `
        <div onclick="openTool('${t.id}')" class="tool-card p-5 cursor-pointer">
            <i data-lucide="${t.icon}"></i>
            <h3 class="font-bold mt-3">${t.name}</h3>
            <p class="text-sm text-gray-500">${t.desc}</p>
        </div>
    `).join('');

    lucide.createIcons();
}

// ===== MODAL =====
function openTool(id) {
    const tool = TOOLS.find(t => t.id === id);
    document.getElementById('modalTitle').innerText = tool.name;

    injectTool(id);

    document.getElementById('toolModal').classList.remove('hidden');
}

function closeTool() {
    document.getElementById('toolModal').classList.add('hidden');
}

// ===== TOOL LOGIC =====
function injectTool(id) {
    const body = document.getElementById('modalBody');

    switch(id) {

        // WORD COUNTER
        case 'word-c':
            body.innerHTML = `
                <textarea id="txt" class="tool-input"></textarea>
                <p id="res"></p>
            `;
            document.getElementById('txt').oninput = e => {
                let t = e.target.value;
                document.getElementById('res').innerText =
                    "Words: " + (t.split(/\s+/).filter(Boolean).length);
            };
            break;

        // EMI
        case 'emi':
            body.innerHTML = `
                <input id="p" placeholder="Amount" class="tool-input">
                <input id="r" placeholder="Rate" class="tool-input">
                <input id="n" placeholder="Months" class="tool-input">
                <button onclick="calcEMI()" class="tool-btn">Calc</button>
                <h2 id="out"></h2>
            `;
            window.calcEMI = () => {
                let P = +p.value;
                let R = +r.value / 1200;
                let N = +n.value;
                let emi = (P*R*Math.pow(1+R,N))/(Math.pow(1+R,N)-1);
                out.innerText = "₹ " + Math.round(emi);
            };
            break;

        // SIP
        case 'sip':
            body.innerHTML = `
                <input id="m" placeholder="Monthly" class="tool-input">
                <input id="rate" placeholder="Rate" class="tool-input">
                <input id="y" placeholder="Years" class="tool-input">
                <button onclick="calcSIP()" class="tool-btn">Calc</button>
                <h2 id="sout"></h2>
            `;
            window.calcSIP = () => {
                let P = +m.value;
                let r = +rate.value/100/12;
                let n = +y.value*12;
                let fv = P*((Math.pow(1+r,n)-1)/r)*(1+r);
                sout.innerText = "₹ "+Math.round(fv);
            };
            break;

        // PASSWORD
        case 'pass-g':
            body.innerHTML = `
                <button onclick="genPass()" class="tool-btn">Generate</button>
                <h2 id="pw"></h2>
            `;
            window.genPass = () => {
                let c="abcABC123!@#";
                let p="";
                for(let i=0;i<10;i++) p+=c[Math.floor(Math.random()*c.length)];
                pw.innerText=p;
            };
            break;

        // TODO
        case 'todo':
            body.innerHTML = `
                <input id="t" class="tool-input">
                <button onclick="add()" class="tool-btn">Add</button>
                <div id="list"></div>
            `;
            let items=[];
            window.add=()=>{
                items.push(t.value);
                list.innerHTML=items.map(i=>"<p>"+i+"</p>").join("");
            };
            break;

        // AGE
        case 'age-c':
            body.innerHTML = `
                <input type="date" id="d" class="tool-input">
                <button onclick="age()" class="tool-btn">Calc</button>
                <h2 id="a"></h2>
            `;
            window.age=()=>{
                let dob=new Date(d.value);
                let age=Math.floor((new Date()-dob)/31557600000);
                a.innerText=age+" years";
            };
            break;

        default:
            body.innerHTML = `<p>Tool coming soon</p>`;
    }
}
