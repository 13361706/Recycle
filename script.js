const items = {
"紙": 6,
"紙板": 5,
"寶特瓶": 18,
"鐵": 10,
"白鐵": 42,
"鋁": 55,
"紅銅": 250,
"黃銅": 180
};

const select = document.getElementById("item");

// 初始化
for (let k in items) {
let opt = document.createElement("option");
opt.value = k;
opt.innerText = k;
select.appendChild(opt);
}

// 讀取紀錄
let logs = JSON.parse(localStorage.getItem("logs") || "[]");

function analyze() {

let item = document.getElementById("item").value;
let price = Number(document.getElementById("price").value);
let weight = Number(document.getElementById("weight").value);
let level = document.getElementById("level").value;

if(!price || !weight){
alert("請輸入完整資料");
return;
}

// 基礎係數
let rate = 0.94;

// 競爭
if(level === "low") rate -= 0.02;
if(level === "high") rate += 0.02;

// 重量
if(weight > 1000) rate -= 0.02;
else if(weight < 200) rate += 0.01;

// 限制
if(rate > 0.97) rate = 0.97;
if(rate < 0.88) rate = 0.88;

// 計算
let buy = Math.round(price * rate);
let total = buy * weight;
let profit = price - buy;

// 顯示結果
document.getElementById("result").innerHTML = `
<p>品項：${item}</p>
<p>建議收購價：${buy} 元/kg</p>
<p>利潤：${profit} 元/kg</p>
<p>總金額：${total} 元</p>
<p>策略係數：${rate.toFixed(2)}</p>
`;

// 存紀錄
let record = {
item,
price,
weight,
buy,
total,
profit,
time: new Date().toLocaleString()
};

logs.push(record);
localStorage.setItem("logs", JSON.stringify(logs));

renderLogs();
}

function renderLogs() {

let html = "";
let totalMoney = 0;
let totalWeight = 0;

logs.forEach(l => {
html += `<p>${l.time}｜${l.item}｜${l.weight}kg｜${l.buy}元｜${l.total}元</p>`;
totalMoney += l.total;
totalWeight += l.weight;
});

document.getElementById("log").innerHTML = html;

document.getElementById("summary").innerHTML =
`今日總金額：${totalMoney} 元｜總重量：${totalWeight} kg`;
}

renderLogs();
