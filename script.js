const tools = [
  {id:'emi',name:'EMI Calculator'},
  {id:'sip',name:'SIP Calculator'},
  {id:'qr',name:'QR Generator'},
  {id:'pass',name:'Password Generator'},
  {id:'age',name:'Age Calculator'},
  {id:'base',name:'Base64 Tool'},
  {id:'url',name:'URL Encoder'},
  {id:'todo',name:'Todo List'}
];

const grid = document.getElementById("grid");

tools.forEach(t=>{
  grid.innerHTML += `
    <div onclick="openTool('${t.id}')" 
    class="card cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h2 class="text-xl font-bold">${t.name}</h2>
    </div>`;
});

function openTool(id){
  document.getElementById("modal").classList.remove("hidden");
  const c = document.getElementById("content");

  switch(id){

    case 'emi':
      c.innerHTML=`
        <input id="p" placeholder="Loan" class="border p-2 w-full mb-2">
        <input id="r" placeholder="Rate" class="border p-2 w-full mb-2">
        <input id="n" placeholder="Months" class="border p-2 w-full mb-2">
        <button onclick="calcEMI()" class="bg-blue-500 text-white p-2 w-full">Calculate</button>
        <h2 id="res"></h2>
        <canvas id="chart"></canvas>
      `;
    break;

    case 'sip':
      c.innerHTML=`
        <input id="m" placeholder="Monthly" class="border p-2 w-full mb-2">
        <input id="r" placeholder="Rate" class="border p-2 w-full mb-2">
        <input id="y" placeholder="Years" class="border p-2 w-full mb-2">
        <button onclick="calcSIP()" class="bg-green-500 text-white p-2 w-full">Calculate</button>
        <h2 id="res"></h2>
        <canvas id="chart"></canvas>
      `;
    break;

    case 'qr':
      c.innerHTML=`
        <input id="q" class="border p-2 w-full mb-2">
        <button onclick="genQR()" class="bg-purple-500 text-white p-2 w-full">Generate</button>
        <canvas id="qr"></canvas>
      `;
    break;

    case 'pass':
      c.innerHTML=`
        <button onclick="genPass()" class="bg-black text-white p-2 w-full">Generate</button>
        <h2 id="res"></h2>
      `;
    break;

    case 'age':
      c.innerHTML=`
        <input type="date" id="dob" class="border p-2 w-full">
        <button onclick="calcAge()" class="bg-blue-500 text-white p-2 w-full">Find</button>
        <h2 id="res"></h2>
      `;
    break;

    case 'base':
      c.innerHTML=`
        <textarea id="t" class="border w-full"></textarea>
        <button onclick="enc()" class="bg-blue-500 text-white p-2">Encode</button>
        <button onclick="dec()" class="bg-red-500 text-white p-2">Decode</button>
        <h2 id="res"></h2>
      `;
    break;

    case 'url':
      c.innerHTML=`
        <input id="u" class="border p-2 w-full">
        <button onclick="encodeURL()" class="bg-green-500 text-white p-2">Encode</button>
        <h2 id="res"></h2>
      `;
    break;

    case 'todo':
      c.innerHTML=`
        <input id="task" class="border p-2 w-full">
        <button onclick="addTask()" class="bg-blue-500 text-white p-2">Add</button>
        <div id="list"></div>
      `;
    break;
  }
}

function closeModal(){
  document.getElementById("modal").classList.add("hidden");
}

// FUNCTIONS

function calcEMI(){
  let P=+p.value,r=+r.value/12/100,n=+n.value;
  let emi=(P*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
  res.innerText="₹"+Math.round(emi);
}

function calcSIP(){
  let P=+m.value,r=+r.value/100/12,n=+y.value*12;
  let fv=P*((Math.pow(1+r,n)-1)/r)*(1+r);
  res.innerText="₹"+Math.round(fv);
}

function genQR(){
  QRCode.toCanvas(document.getElementById("qr"), q.value);
}

function genPass(){
  let c="abcABC123!@#",r="";
  for(let i=0;i<12;i++) r+=c[Math.random()*c.length|0];
  res.innerText=r;
}

function calcAge(){
  let d=new Date(dob.value);
  let a=Math.floor((Date.now()-d)/(1000*60*60*24*365));
  res.innerText=a+" years";
}

function enc(){ res.innerText=btoa(t.value); }
function dec(){ res.innerText=atob(t.value); }
function encodeURL(){ res.innerText=encodeURIComponent(u.value); }

let tasks=[];
function addTask(){
  tasks.push(task.value);
  list.innerHTML=tasks.map(t=>"<div>"+t+"</div>").join("");
}
