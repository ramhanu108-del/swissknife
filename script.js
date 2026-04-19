// --- DATABASE: THE COMPLETE 33 TOOLS ---
const TOOLS = [
    // Image Tools
    { id: 'img-comp', name: 'Image Compressor', icon: 'minimize', cat: 'Image', desc: 'Reduce file size without quality loss.' },
    { id: 'bg-rem', name: 'Background Remover', icon: 'trash-2', cat: 'Image', desc: 'Remove backgrounds easily (Simulation).' },
    { id: 'img-res', name: 'Image Resizer', icon: 'maximize', cat: 'Image', desc: 'Change dimensions in pixels.' },
    { id: 'j-to-p', name: 'JPG to PNG', icon: 'image', cat: 'Image', desc: 'Convert format instantly.' },
    
    // PDF Tools
    { id: 'pdf-m', name: 'PDF Merger', icon: 'file-text', cat: 'PDF', desc: 'Combine multiple PDFs into one (UI Demo).' },
    { id: 'pdf-s', name: 'PDF Splitter', icon: 'scissors', cat: 'PDF', desc: 'Extract pages from PDF (UI Demo).' },
    
    // Text Tools
    { id: 'word-c', name: 'Word Counter', icon: 'type', cat: 'Text', desc: 'Live word and char analysis.' },
    { id: 'case-v', name: 'Case Converter', icon: 'case-upper', cat: 'Text', desc: 'Upper, lower, title, sentence.' },
    { id: 'tts', name: 'Text to Speech', icon: 'volume-2', cat: 'Text', desc: 'Browser native voice output.' },
    { id: 'stt', name: 'Speech to Text', icon: 'mic', cat: 'Text', desc: 'Real-time voice typing.' },
    { id: 'notes', name: 'Notes App', icon: 'pen-tool', cat: 'Text', desc: 'Auto-save notes locally.' },
    
    // Finance Tools
    { id: 'emi', name: 'EMI Calculator', icon: 'landmark', cat: 'Finance', desc: 'Loan installment calculator.' },
    { id: 'sip', name: 'SIP Calculator', icon: 'trending-up', cat: 'Finance', desc: 'Future wealth prediction.' },
    { id: 'tax', name: 'Tax Calculator', icon: 'wallet', cat: 'Finance', desc: 'Income tax estimator.' },
    { id: 'cc-int', name: 'Card Interest', icon: 'credit-card', cat: 'Finance', desc: 'Interest cost calculator.' },
    { id: 'ins-est', name: 'Insurance Estimator', icon: 'shield-check', cat: 'Finance', desc: 'Policy premium estimator.' },
    { id: 'web-cost', name: 'Website Cost', icon: 'globe', cat: 'Finance', desc: 'Development cost helper.' },
    { id: 'free-earn', name: 'Freelancer Earning', icon: 'briefcase', cat: 'Finance', desc: 'Project rate calculator.' },
    { id: 'dom-val', name: 'Domain Value', icon: 'search', cat: 'Finance', desc: 'Estimate domain appraisal.' },
    { id: 'cryp-p', name: 'Crypto Profit', icon: 'coins', cat: 'Finance', desc: 'Profit/Loss trader tool.' },
    { id: 'roi-a', name: 'Ads ROI', icon: 'line-chart', cat: 'Finance', desc: 'Marketing spend analyzer.' },

    // Instagram Tools
    { id: 'ig-user', name: 'Username Generator', icon: 'instagram', cat: 'Instagram', desc: 'Cool handle suggestions.' },
    { id: 'ig-cap', name: 'Caption Generator', icon: 'message-circle', cat: 'Instagram', desc: 'Hook-based IG captions.' },
    { id: 'ig-bio', name: 'Bio Generator', icon: 'sparkles', cat: 'Instagram', desc: 'Stylish bio templates.' },

    // Utility Tools
    { id: 'pass-g', name: 'Password Gen', icon: 'lock', cat: 'Utility', desc: 'Strong random passwords.' },
    { id: 'age-c', name: 'Age Calculator', icon: 'calendar', cat: 'Utility', desc: 'Exact age in days/hours.' },
    { id: 'qr-g', name: 'QR Generator', icon: 'qr-code', cat: 'Utility', desc: 'Instant QR for links.' },
    { id: 'col-p', name: 'Color Picker', icon: 'palette', cat: 'Utility', desc: 'Hex/RGB code generator.' },
    { id: 'base-64', name: 'Base64 Tool', icon: 'hash', cat: 'Utility', desc: 'Binary to text encoding.' },
    { id: 'url-e', name: 'URL Encoder', icon: 'link-2', cat: 'Utility', desc: 'Safe web link conversion.' },
    { id: 'unit-v', name: 'Unit Converter', icon: 'ruler', cat: 'Utility', desc: 'Universal metric converter.' },
    { id: 'stopw', name: 'Stopwatch', icon: 'timer', cat: 'Utility', desc: 'Precision split timer.' },
    { id: 'todo', name: 'To-Do List', icon: 'check-square', cat: 'Utility', desc: 'Daily task manager.' }
];

const CATEGORIES = ['All', 'Image', 'PDF', 'Finance', 'Text', 'Instagram', 'Utility'];

// --- APP STATE ---
let state = {
    search: '',
    category: 'All',
    isDark: localStorage.getItem('theme') === 'dark' || false
};

// --- INITIALIZE ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderCategories();
    renderTools();
    lucide.createIcons();
    
    // Search Listener
    document.getElementById('toolSearch').addEventListener('input', (e) => {
        state.search = e.target.value.toLowerCase();
        renderTools();
    });
});

// --- THEME ENGINE ---
function initTheme() {
    if (state.isDark) document.documentElement.classList.add('dark');
    updateThemeIcons();
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}

function toggleTheme() {
    state.isDark = !state.isDark;
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', state.isDark ? 'dark' : 'light');
    updateThemeIcons();
}

function updateThemeIcons() {
    const moon = document.getElementById('moonIcon');
    const sun = document.getElementById('sunIcon');
    if (state.isDark) {
        moon.classList.add('hidden');
        sun.classList.remove('hidden');
    } else {
        sun.classList.add('hidden');
        moon.classList.remove('hidden');
    }
}

// --- RENDERING ---
function renderCategories() {
    const container = document.getElementById('categoryTabs');
    container.innerHTML = CATEGORIES.map(cat => `
        <button onclick="setCategory('${cat}')" 
                class="px-5 py-2.5 rounded-xl font-bold text-sm transition-all border ${state.category === cat ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-blue-500'}">
            ${cat}
        </button>
    `).join('');
}

function setCategory(cat) {
    state.category = cat;
    renderCategories();
    renderTools();
}

function renderTools() {
    const grid = document.getElementById('toolGrid');
    const filtered = TOOLS.filter(t => {
        const matchCat = state.category === 'All' || t.cat === state.category;
        const matchSearch = t.name.toLowerCase().includes(state.search) || t.desc.toLowerCase().includes(state.search);
        return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = '';
        document.getElementById('noResults').classList.remove('hidden');
    } else {
        document.getElementById('noResults').classList.add('hidden');
        grid.innerHTML = filtered.map(t => `
            <div onclick="openTool('${t.id}')" class="tool-card group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl cursor-pointer">
                <div class="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                    <i data-lucide="${t.icon}"></i>
                </div>
                <h3 class="text-xl font-bold mb-2">${t.name}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">${t.desc}</p>
            </div>
        `).join('');
        lucide.createIcons();
    }
}

// --- MODAL & TOOL ENGINE ---
function openTool(id) {
    const tool = TOOLS.find(t => t.id === id);
    const modal = document.getElementById('toolModal');
    const container = document.getElementById('modalContainer');
    
    document.getElementById('modalTitle').innerText = tool.name;
    document.getElementById('modalIcon').innerHTML = `<i data-lucide="${tool.icon}"></i>`;
    
    // Inject logic
    injectToolLogic(id);
    
    modal.classList.add('active');
    setTimeout(() => container.classList.add('show'), 10);
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
}

function closeTool() {
    const modal = document.getElementById('toolModal');
    const container = document.getElementById('modalContainer');
    container.classList.remove('show');
    setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }, 200);
}

function goHome() {
    state.search = '';
    state.category = 'All';
    document.getElementById('toolSearch').value = '';
    renderCategories();
    renderTools();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- TOOL SPECIFIC LOGIC AUTO-INJECTOR ---
function injectToolLogic(id) {
    const body = document.getElementById('modalBody');
    let html = '';

    switch(id) {

        // WORD COUNTER
        case 'word-c':
            html = `
                <textarea id="ti" class="tool-input h-48"></textarea>
                <div class="grid grid-cols-2 gap-4">
                    <div id="tw">0 Words</div>
                    <div id="tc">0 Characters</div>
                </div>
            `;
            setTimeout(() => {
                document.getElementById('ti').oninput = (e) => {
                    let v = e.target.value;
                    document.getElementById('tw').innerText = v.split(/\s+/).filter(Boolean).length + " Words";
                    document.getElementById('tc').innerText = v.length + " Characters";
                };
            },100);
        break;

        // EMI (WITH GRAPH)
        case 'emi':
            html = `
                <input id="p" class="tool-input" placeholder="Loan">
                <input id="r" class="tool-input" placeholder="Rate">
                <input id="n" class="tool-input" placeholder="Months">
                <button onclick="calcEMI()" class="tool-btn">Calculate</button>
                <div id="emiVal"></div>
                <canvas id="emiChart"></canvas>
            `;
            window.calcEMI = () => {
                let P=+p.value,r=+r.value/12/100,n=+n.value;
                let emi=(P*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
                emiVal.innerText="₹"+Math.round(emi);

                if(window.chart) window.chart.destroy();
                window.chart=new Chart(emiChart,{
                    type:'doughnut',
                    data:{labels:['Loan','Interest'],datasets:[{data:[P,(emi*n)-P]}]}
                });
            };
        break;

        // SIP (WITH GRAPH)
        case 'sip':
            html = `
                <input id="m" class="tool-input" placeholder="Monthly">
                <input id="r" class="tool-input" placeholder="Rate">
                <input id="y" class="tool-input" placeholder="Years">
                <button onclick="calcSIP()" class="tool-btn">Calculate</button>
                <div id="sipVal"></div>
                <canvas id="sipChart"></canvas>
            `;
            window.calcSIP = () => {
                let P=+m.value,r=+r.value/100/12,n=+y.value*12;
                let fv=P*((Math.pow(1+r,n)-1)/r)*(1+r);
                sipVal.innerText="₹"+Math.round(fv);

                if(window.chart2) window.chart2.destroy();
                window.chart2=new Chart(sipChart,{
                    type:'doughnut',
                    data:{labels:['Invested','Profit'],datasets:[{data:[P*n,fv-(P*n)]}]}
                });
            };
        break;

        // PASSWORD
        case 'pass-g':
            html = `
                <button onclick="gen()">Generate</button>
                <div id="pw"></div>
            `;
            window.gen=()=>{
                let c="abcABC123!@#",r="";
                for(let i=0;i<12;i++) r+=c[Math.random()*c.length|0];
                pw.innerText=r;
            };
        break;

        // AGE
        case 'age-c':
            html = `
                <input type="date" id="dob">
                <button onclick="age()">Find</button>
                <div id="out"></div>
            `;
            window.age=()=>{
                let d=new Date(dob.value);
                let a=Math.floor((Date.now()-d)/(1000*60*60*24*365));
                out.innerText=a+" years";
            };
        break;

        // BASE64
        case 'base-64':
            html = `
                <textarea id="b"></textarea>
                <button onclick="e()">Encode</button>
                <button onclick="d()">Decode</button>
                <div id="res"></div>
            `;
            window.e=()=>res.innerText=btoa(b.value);
            window.d=()=>res.innerText=atob(b.value);
        break;

        // URL
        case 'url-e':
            html = `
                <input id="u">
                <button onclick="ue()">Encode</button>
                <div id="ur"></div>
            `;
            window.ue=()=>ur.innerText=encodeURIComponent(u.value);
        break;

        // QR
        case 'qr-g':
            html = `
                <input id="q">
                <button onclick="qr()">Generate</button>
                <canvas id="qrCanvas"></canvas>
            `;
            window.qr=()=>{
                QRCode.toCanvas(qrCanvas,q.value);
            };
        break;

        // TODO
        case 'todo':
            html = `
                <input id="t">
                <button onclick="add()">Add</button>
                <div id="list"></div>
            `;
            let items=[];
            window.add=()=>{
                items.push(t.value);
                list.innerHTML=items.map(i=>"<div>"+i+"</div>").join("");
            };
        break;

        // DEFAULT
        default:
            html = `<div class="text-center">Tool coming soon</div>`;
    }

    body.innerHTML = html;
}
       
