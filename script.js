const tools = [
    {id:"emi", name:"EMI Calculator"},
    {id:"sip", name:"SIP Calculator"},
    {id:"pass", name:"Password Generator"}
];

let state = {
    search:"",
    dark:false
};

document.addEventListener("DOMContentLoaded", ()=>{
    render();
    document.getElementById("search").addEventListener("input", (e)=>{
        state.search = e.target.value.toLowerCase();
        render();
    });

    document.getElementById("themeToggle").onclick = ()=>{
        document.body.classList.toggle("dark");
    };
});

function render(){
    const grid = document.getElementById("grid");

    const filtered = tools.filter(t=>t.name.toLowerCase().includes(state.search));

    grid.innerHTML = filtered.map(t=>`
        <div onclick="openTool('${t.id}')" class="p-4 bg-white dark:bg-gray-800 rounded-xl shadow cursor-pointer hover:scale-105 transition">
            <h2 class="font-bold">${t.name}</h2>
        </div>
    `).join("");
}

function openTool(id){
    const modal = document.getElementById("modal");
    const body = document.getElementById("modalBody");
    const title = document.getElementById("modalTitle");

    modal.classList.remove("hidden");

    if(id==="emi"){
        title.innerText="EMI Calculator";

        body.innerHTML=`
            <input id="p" placeholder="Amount" class="input"><br><br>
            <input id="r" placeholder="Rate" class="input"><br><br>
            <input id="n" placeholder="Months" class="input"><br><br>
            <button onclick="calcEMI()" class="btn">Calculate</button>
            <h3 id="res"></h3>
        `;
    }

    if(id==="sip"){
        title.innerText="SIP Calculator";

        body.innerHTML=`
            <input id="m" placeholder="Monthly" class="input"><br><br>
            <input id="r" placeholder="Rate" class="input"><br><br>
            <input id="y" placeholder="Years" class="input"><br><br>
            <button onclick="calcSIP()" class="btn">Calculate</button>
            <h3 id="res"></h3>
        `;
    }

    if(id==="pass"){
        title.innerText="Password Generator";

        body.innerHTML=`
            <button onclick="genPass()" class="btn">Generate</button>
            <h3 id="res"></h3>
        `;
    }
}

function closeModal(){
    document.getElementById("modal").classList.add("hidden");
}

function calcEMI(){
    let P = +document.getElementById("p").value;
    let r = +document.getElementById("r").value/12/100;
    let n = +document.getElementById("n").value;

    let emi = (P*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);

    document.getElementById("res").innerText = "₹ "+Math.round(emi);
}

function calcSIP(){
    let P = +document.getElementById("m").value;
    let r = +document.getElementById("r").value/12/100;
    let n = +document.getElementById("y").value*12;

    let fv = P*((Math.pow(1+r,n)-1)/r)*(1+r);

    document.getElementById("res").innerText = "₹ "+Math.round(fv);
}

function genPass(){
    let chars="abcABC123!@#";
    let pass="";
    for(let i=0;i<12;i++){
        pass+=chars[Math.floor(Math.random()*chars.length)];
    }
    document.getElementById("res").innerText = pass;
}
