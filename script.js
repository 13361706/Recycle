const items = [
{name:"紙", price:6},
{name:"紙板", price:5},
{name:"寶特瓶", price:18},
{name:"鐵", price:10},
{name:"白鐵", price:42},
{name:"鋁", price:55},
{name:"紅銅", price:250},
{name:"黃銅", price:180}
];

// 模式：manual = 手動 / auto = 公式
let mode = "mix";

// 手動收購價（你設定）
let manualPrice = {
"紙":5,
"紙板":4,
"寶特瓶":16,
"鐵":9,
"白鐵":40,
"鋁":52,
"紅銅":240,
"黃銅":170
};

// 公式扣價
let deduct = {
"紙":1,
"紙板":1,
"寶特瓶":2,
"鐵":1,
"白鐵":2,
"鋁":3,
"紅銅":10,
"黃銅":10
};

function render(){
let tbody = document.getElementById("tableBody");
let select = document.getElementById("itemSelect");

tbody.innerHTML = "";
select.innerHTML = "";

items.forEach(i=>{

let buy = 0;

if(mode=="manual"){
buy = manualPrice[i.name];
}else if(mode=="auto"){
buy = i.price - deduct[i.name];
}else{
buy = manualPrice[i.name]; // 預設手動
}

let profit = i.price - buy;

tbody.innerHTML += `
<tr>
<td>${i.name}</td>
<td>${i.price}</td>
<td>${mode}</td>
<td>${manualPrice[i.name]}</td>
<td>${deduct[i.name]}</td>
<td>${buy}</td>
<td>${profit}</td>
</tr>
`;

select.innerHTML += `<option value="${i.name}">${i.name}</option>`;
});
}

function calc(){
let item = document.getElementById("itemSelect").value;
let w = Number(document.getElementById("weight").value);

let p = manualPrice[item];
let total = p * w;

document.getElementById("result").innerText =
`${item} 總金額：${total} 元`;
}

render();
