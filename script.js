const tools = [
    "EMI Calculator","SIP Calculator","Password Generator","Age Calculator",
    "Word Counter","ToDo List","Username Generator",
    "Tax Calculator","QR Generator","Stopwatch",
    "Image Compressor","PDF Merger","PDF Splitter","Crypto Profit",
    "ROI Calculator","Insurance","Domain Value","Freelancer Tool",
    "Website Cost","Notes","Speech to Text","Text to Speech",
    "Case Converter","Unit Converter","URL Encoder","Base64",
    "Color Picker","Image Resizer","JPG to PNG","BG Remover",
    "Instagram Bio","Caption Generator","Card Interest"
];

document.addEventListener("DOMContentLoaded", ()=>{
    render();
    document.getElementById("search").oninput = (e)=>{
        render(e.target.value.toLowerCase());
    };
});

function render(search=""){
    const grid = document.getElementById("grid");

    grid.innerHTML = tools
    .filter(t=>t.toLowerCase().includes(search))
    .map(t=>`
        <div onclick="openTool('${t}')" class="card">
            <h3 class="font-bold">${t}</h3>
        </div>
    `).join("");
}

function openTool(name){
    document.getElementById("modal").classList.remove("hidden");
    document.getElementById("title").innerText = name;

    let html = "";

    if(name==="EMI Calculator"){
        html = `
        <input id="p" class="input" placeholder="Amount">
        <input id="r" class="input" placeholder="Rate">
        <input id="n" class="input" placeholder="Months">
        <button class="btn" onclick="emi()">Calculate</button>
        <h3 id="res"></h3>`;
    }

    else if(name==="SIP Calculator"){
        html = `
        <input id="m" class="input" placeholder="Monthly">
        <input id="r" class="input" placeholder="Rate">
        <input id="y" class="input" placeholder="Years">
        <button class="btn" onclick="sip()">Calculate</button>
        <h3 id="res"></h3>`;
    }

    else if(name==="Password Generator"){
        html = `<button class="btn" onclick="pass()">Generate</button><h3 id="res"></h3>`;
    }

    else if(name==="Age Calculator"){
        html = `<input type="date" id="dob" class="input">
        <button class="btn" onclick="age()">Find Age</button>
        <h3 id="res"></h3>`;
    }

    else if(name==="Word Counter"){
        html = `<textarea id="txt" class="input"></textarea>
        <h3 id="res">0 words</h3>`;
        setTimeout(()=>{
            txt.oninput=()=>res.innerText=txt.value.split(/\s+/).length+" words";
        },100);
    }

    else if(name==="ToDo List"){
        html = `<input id="t" class="input">
        <button class="btn" onclick="addTodo()">Add</button>
        <div id="list"></div>`;
        loadTodo();
    }

    else if(name==="Username Generator"){
        html = `<input id="k" class="input">
        <button class="btn" onclick="gen()">Generate</button>
        <div id="res"></div>`;
    }

    else{
        html = `<div class="text-center p-10">🚀 Coming Soon</div>`;
    }

    document.getElementById("body").innerHTML = html;
}

function closeModal(){
    modal.classList.add("hidden");
}

/* FUNCTIONS */
function emi(){
    let P=+p.value, r=+r.value/12/100, n=+n.value;
    let e=(P*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
    res.innerText="₹ "+Math.round(e);
}

function sip(){
    let P=+m.value, r=+r.value/12/100, n=+y.value*12;
    let f=P*((Math.pow(1+r,n)-1)/r)*(1+r);
    res.innerText="₹ "+Math.round(f);
}

function pass(){
    let c="abcABC123!@#"; let p="";
    for(let i=0;i<12;i++) p+=c[Math.floor(Math.random()*c.length)];
    res.innerText=p;
}

function age(){
    let d=new Date(dob.value);
    let a=(new Date()-d)/(1000*60*60*24*365);
    res.innerText=Math.floor(a)+" years";
}

function addTodo(){
    let arr=JSON.parse(localStorage.getItem("todo")||"[]");
    arr.push(t.value);
    localStorage.setItem("todo",JSON.stringify(arr));
    loadTodo();
}

function loadTodo(){
    let arr=JSON.parse(localStorage.getItem("todo")||"[]");
    list.innerHTML=arr.map(i=>`<div>${i}</div>`).join("");
}

function gen(){
    let k=document.getElementById("k").value||"user";
    res.innerHTML=Array.from({length:5}).map(()=>k+Math.floor(Math.random()*100)).join("<br>");
}

function toggleTheme(){
    document.body.classList.toggle("dark");
}
