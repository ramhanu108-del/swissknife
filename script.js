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

    // Logic Map
    switch(id) {
        case 'word-c':
            html = `
                <div class="space-y-4">
                    <label class="tool-label">Paste Content</label>
                    <textarea id="ti" class="tool-input h-48" placeholder="Start typing..."></textarea>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center"><div class="text-3xl font-bold" id="tw">0</div><div class="text-xs text-gray-400 font-bold">Words</div></div>
                        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center"><div class="text-3xl font-bold" id="tc">0</div><div class="text-xs text-gray-400 font-bold">Characters</div></div>
                    </div>
                </div>
            `;
            setTimeout(() => {
                document.getElementById('ti').oninput = (e) => {
                    const v = e.target.value.trim();
                    document.getElementById('tw').innerText = v ? v.split(/\s+/).length : 0;
                    document.getElementById('tc').innerText = v.length;
                };
            }, 100);
            break;

        case 'emi':
            html = `
                <div class="space-y-4">
                    <label class="tool-label">Loan Amount (₹)</label>
                    <input type="number" id="p" class="tool-input" value="100000">
                    <label class="tool-label">Interest Rate (% p.a)</label>
                    <input type="number" id="r" class="tool-input" value="8.5">
                    <label class="tool-label">Tenure (Months)</label>
                    <input type="number" id="n" class="tool-input" value="12">
                    <button onclick="calcEMI()" class="tool-btn">Calculate EMI</button>
                    <div id="res" class="result-box hidden">
                        <div class="text-center"><span class="text-sm text-gray-400">Monthly EMI</span><h2 id="emiVal" class="text-4xl font-black text-blue-600"></h2></div>
                    </div>
                </div>
            `;
            // Simple logic attach to global for ease
            window.calcEMI = () => {
                const P = parseFloat(document.getElementById('p').value);
                const r = parseFloat(document.getElementById('r').value) / (12 * 100);
                const n = parseFloat(document.getElementById('n').value);
                const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                document.getElementById('res').classList.remove('hidden');
                document.getElementById('emiVal').innerText = '₹' + Math.round(emi).toLocaleString();
            };
            break;




case 'sip':
    html = `
        <div class="space-y-4">
            <input type="number" id="monthly" class="tool-input" placeholder="Monthly Investment (₹)">
            <input type="number" id="rate" class="tool-input" placeholder="Interest Rate (%)">
            <input type="number" id="years" class="tool-input" placeholder="Years">

            <button onclick="calcSIP()" class="tool-btn">Calculate</button>

            <div id="sipRes" class="result-box hidden text-center">
                <h2 id="sipVal" class="text-3xl font-bold text-green-600"></h2>
            </div>

            <canvas id="sipChart" class="mt-6"></canvas>
        </div>
    `;

    window.calcSIP = () => {
        let P = +document.getElementById("monthly").value;
        let r = +document.getElementById("rate").value / 100 / 12;
        let n = +document.getElementById("years").value * 12;

        if(!P || !r || !n) return;

        let invested = P * n;
        let fv = P * ((Math.pow(1+r,n)-1)/r)*(1+r);

        document.getElementById("sipRes").classList.remove("hidden");
        document.getElementById("sipVal").innerText =
            "₹ " + Math.round(fv).toLocaleString();

        // GRAPH
        const ctx = document.getElementById('sipChart');

        if(window.sipChart) window.sipChart.destroy();

        window.sipChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Invested', 'Profit'],
                datasets: [{
                    data: [invested, fv - invested]
                }]
            }
        });
    };
    break;










            

        case 'pass-g':
            html = `
                <div class="space-y-4">
                    <label class="tool-label">Password Length: <span id="lenv">16</span></label>
                    <input type="range" id="len" min="8" max="64" value="16" class="w-full">
                    <div id="pw" class="p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl break-all font-mono text-center text-xl font-bold border-2 border-dashed border-gray-200">Generating...</div>
                    <button onclick="genPass()" class="tool-btn">New Password</button>
                </div>
            `;
            setTimeout(() => {
                document.getElementById('len').oninput = (e) => {
                    document.getElementById('lenv').innerText = e.target.value;
                    genPass();
                };
                window.genPass = () => {
                    const c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
                    const l = document.getElementById('len').value;
                    let r = "";
                    for(let i=0; i<l; i++) r += c.charAt(Math.floor(Math.random()*c.length));
                    document.getElementById('pw').innerText = r;
                };
                genPass();
            }, 100);
            break;

        case 'age-c':
            html = `
                <div class="space-y-4">
                    <label class="tool-label">Date of Birth</label>
                    <input type="date" id="dob" class="tool-input">
                    <button onclick="calcAge()" class="tool-btn">Find Age</button>
                    <div id="ares" class="result-box hidden text-center font-bold text-2xl"></div>
                </div>
            `;
            window.calcAge = () => {
                const b = new Date(document.getElementById('dob').value);
                const diff = new Date() - b;
                const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
                document.getElementById('ares').classList.remove('hidden');
                document.getElementById('ares').innerText = `You are ${age} years old`;
            };
            break;

        case 'ig-user':
            html = `
                <div class="space-y-4">
                    <label class="tool-label">Base Keyword</label>
                    <input type="text" id="igk" class="tool-input" placeholder="e.g. wanderer">
                    <button onclick="genIG()" class="tool-btn">Generate Ideas</button>
                    <div id="igList" class="grid grid-cols-2 gap-2 mt-4"></div>
                </div>
            `;
            window.genIG = () => {
                const k = document.getElementById('igk').value || 'user';
                const l = document.getElementById('igList');
                l.innerHTML = Array.from({length: 10}).map(() => {
                    const n = k + '_' + Math.floor(Math.random()*999);
                    return `<div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm font-bold border border-gray-100 dark:border-gray-700">${n}</div>`;
                }).join('');
            };
            break;
            
        case 'stopw':
            html = `
                <div class="text-center space-y-6">
                    <div id="stime" class="text-6xl font-black font-mono">00:00.0</div>
                    <div class="flex gap-2">
                        <button onclick="st_timer()" class="tool-btn bg-green-600 hover:bg-green-700">Start</button>
                        <button onclick="sp_timer()" class="tool-btn bg-red-600 hover:bg-red-700">Stop</button>
                        <button onclick="re_timer()" class="tool-btn bg-gray-600 hover:bg-gray-700">Reset</button>
                    </div>
                </div>
            `;
            let s_t = 0, s_iv = null;
            window.st_timer = () => {
                if(s_iv) return;
                s_iv = setInterval(() => {
                    s_t += 0.1;
                    document.getElementById('stime').innerText = s_t.toFixed(1);
                }, 100);
            };
            window.sp_timer = () => { clearInterval(s_iv); s_iv = null; };
            window.re_timer = () => { s_t = 0; document.getElementById('stime').innerText = "00:00.0"; sp_timer(); };
            break;

        case 'todo':
            html = `
                <div class="space-y-4">
                    <div class="flex gap-2">
                        <input id="tn" type="text" class="tool-input" placeholder="Task name...">
                        <button onclick="atodo()" class="w-20 bg-blue-600 text-white rounded-xl font-bold">Add</button>
                    </div>
                    <div id="tl" class="space-y-2 max-h-64 overflow-y-auto custom-scrollbar"></div>
                </div>
            `;
            setTimeout(() => {
                let items = JSON.parse(localStorage.getItem('todo_list') || '[]');
                const rt = () => {
                    document.getElementById('tl').innerHTML = items.map((t,i) => `
                        <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                            <span class="font-bold">${t}</span>
                            <button onclick="dtodo(${i})" class="text-red-500"><i data-lucide="trash-2"></i></button>
                        </div>
                    `).join('');
                    localStorage.setItem('todo_list', JSON.stringify(items));
                    lucide.createIcons();
                };
                window.atodo = () => {
                    const n = document.getElementById('tn').value;
                    if(!n) return;
                    items.push(n);
                    document.getElementById('tn').value = '';
                    rt();
                };
                window.dtodo = (idx) => { items.splice(idx,1); rt(); };
                rt();
            }, 100);
            break;

        case 'tts':
            html = `
                <div class="space-y-4">
                    <label class="tool-label">Enter Text</label>
                    <textarea id="ts" class="tool-input h-32" placeholder="Hello world..."></textarea>
                    <button onclick="playTTS()" class="tool-btn">Speak</button>
                </div>
            `;
            window.playTTS = () => {
                const msg = new SpeechSynthesisUtterance();
                msg.text = document.getElementById('ts').value;
                window.speechSynthesis.speak(msg);
            };
            break;
            
        case 'dom-val':
            html = `
                <div class="space-y-4">
                    <label class="tool-label">Domain Name</label>
                    <input id="dn" type="text" class="tool-input" placeholder="example.com">
                    <button onclick="estDom()" class="tool-btn">Appraise</button>
                    <div id="dr" class="result-box hidden text-center">
                        <div class="text-gray-400 text-sm">Estimated Value</div>
                        <h2 id="dv" class="text-4xl font-bold text-green-600"></h2>
                    </div>
                </div>
            `;
            window.estDom = () => {
                const dom = document.getElementById('dn').value;
                if(!dom) return;
                const score = dom.length < 5 ? 5000 : 500;
                document.getElementById('dr').classList.remove('hidden');
                document.getElementById('dv').innerText = '$' + (score + Math.floor(Math.random() * 2000)).toLocaleString();
            };
            break;

        default:
            html = `
                <div class="p-10 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-3xl text-center space-y-4">
                    <div class="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                        <i data-lucide="cog"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-xl">Tool Initialized</h3>
                        <p class="text-gray-500">The browser engine for <b>${id}</b> is ready for custom logic injection.</p>
                    </div>
                </div>
            `;
            break;
    }

    body.innerHTML = html;
}
