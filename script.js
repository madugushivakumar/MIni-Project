let energy = 100;
let hunger = 60;
let money = 120;

const energyText = document.getElementById("energyText");
const hungerText = document.getElementById("hungerText");
const moneyText = document.getElementById("moneyText");
const text = document.getElementById("text");
const classBtn = document.getElementById("class");
const foodBtn = document.getElementById("food");
const hostelBtn = document.getElementById("hostel");
const nextBtn = document.getElementById("nextBtn");
const continueBtn = document.getElementById("continueBtn");
const outBtn = document.getElementById("outBtn");
const nextBtn1 =document.getElementById("nextBtn1");
const orderBtn = document.getElementById("orderBtn");
const nextBtn2 = document.getElementById("nextBtn2");   
let storyIndex = 0;
let story = [

{speaker:"Narrator",text:"You grab your bag and walk toward the college campus. The morning air is cool and students rush to class.Someone calling your name"},
{speaker:"Sai",text:"Hey! Good morning. Did you prepare for today's lecture?"},
{speaker:"You",text:"Not really. I was planning to study last night."},
{speaker:"Sai",text:"Same here! But the professor will explain something important today."},
{speaker:"You",text:"Really? Then we should pay attention in class."},
{speaker:"Sai",text:"Yeah hurry! The class is about to start."},
{speaker:"Narrator",text:"You both walk into the classroom as the lecture begins."}
];

let foodItems = [
{name:"Egg Fried Rice", price:5},
{name:"Chicken Fried Rice", price:7},
{name:"Veg Fried Rice", price:4},
{name:"Egg Noodles", price:6},
{name:"Chicken Noodles", price:8}
];
function updateStats(){
energyText.innerText = energy;
hungerText.innerText = hunger;
moneyText.innerText = money;
}
function showStory(){
let current = story[storyIndex];
text.innerHTML = `<strong>${current.speaker}:</strong> ${current.text}`;
}
classBtn.onclick = function(){

nextBtn.style.display = "block";
orderBtn.style.display = "none";
nextBtn1.style.display = "none";
continueBtn.style.display = "none";
outBtn.style.display = "none";

storyIndex = 0;
showStory();
updateStats();
}

nextBtn.onclick = function(){
storyIndex++;
if(storyIndex < story.length){
showStory();
}else{
text.innerText = "The lecture continues... What will you do next?";
nextBtn.style.display = "none";
continueBtn.style.display = "block";
outBtn.style.display = "block";
}
}

continueBtn.onclick = function(){
text.innerText = "My attendance is very low, so I decide to stay in class and continue the lecture.";
continueBtn.style.display = "none";
outBtn.style.display = "block";

}

outBtn.onclick = function(){
    text.innerText = "The class is too boring, so I decide to go to the fast food center.";
outBtn.style.display = "none";
continueBtn.style.display = "none";
nextBtn2.style.display = "block";

nextBtn2.onclick = foodBtn.onclick;
}

foodBtn.onclick = function(){
    text.innerText = "Welcome to Fast Food Center.";

    nextBtn1.style.display="none";
    outBtn.style.display = "none";
    continueBtn.style.display = "none"; 
     orderBtn.style.display = "block";
     
nextBtn2.style.display = "none";
}

orderBtn.onclick = function(){
text.innerHTML = "Available food items:<br><br>";
foodItems.forEach((item,index)=>{
text.innerHTML += `
<button onclick="buyFood(${index})">
${item.name} - $${item.price}
</button><br>
`;
});
orderBtn.style.display = "none";

}
function buyFood(index){
let item = foodItems[index];
if(money < item.price){
text.innerText = "You don't have enough money.";
return;
}
money -= item.price;
hunger -= 20;
if(hunger < 0) hunger = 0;
text.innerText = `You bought ${item.name}.`;
updateStats();
}
hostelBtn.onclick = function(){
energy += 20;
text.innerText = "You return to the hostel and rest for a while.";
updateStats();

}

orderBtn.style.display = "none";
nextBtn.style.display = "none";
nextBtn1.style.display = "none";
continueBtn.style.display = "none";
outBtn.style.display = "none";
nextBtn2.style.display = "none";

updateStats();