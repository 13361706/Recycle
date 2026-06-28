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

// 初始化品項
for (let k in items) {
let opt = document.createElement("option");
opt.value = k;
opt.innerText = k;
select.appendChild(opt);
}

function analyze() {

let item = document.getElementById("item").value;
let price = Number(document.getElementById("price").value);
let weight = Number(document.getElementById("weight").value);
let level = document.getElementById("level").value;

if(!price || !weight){
document.getElementById("result").innerHTML = "請輸入完整資料";
return;
}

// 基礎係數（核心邏輯）
let baseRate = 0.94;

// 競爭調整
if(level === "low") baseRate -= 0.02;   // 穩定：更保守
if(level === "mid") baseRate += 0;      // 正常
if(level === "high") baseRate += 0.02;  // 搶貨：提高

// 重量調整
if(weight > 1000) baseRate -= 0.02;
else if(weight < 200) baseRate += 0.01;

// 限制範圍
if(baseRate > 0.97) baseRate = 0.97;
if(baseRate < 0.88) baseRate = 0.88;

// 計算
let buyPrice = Math.round(price * baseRate);
let profit = price - buyPrice;
let total = buyPrice * weight;

let strategy = "";

if(baseRate <= 0.90){
strategy = "🔴 保守利潤（大貨/低風險）";
} else if(baseRate <= 0.94){
strategy = "🟡 穩定收貨（建議模式）";
} else {
strategy = "🟢 搶貨模式（提高競爭力）";
}

document.getElementById("result").innerHTML = `
<p>品項：${item}</p>
<p>建議收購價：<b>${buyPrice}</b> 元/kg</p>
<p>利潤：${profit} 元/kg</p>
<p>總成本：${total} 元</p>
<p>策略判斷：${strategy}</p>
<p>使用係數：${baseRate.toFixed(2)}</p>
`;
}
