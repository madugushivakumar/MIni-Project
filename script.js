/* ===============================
   Player Initial Stats
================================ */
let energy = 100;
let hunger = 60;
let money = 120;
let playerName = "";
/* ===============================
   Getting HTML Elements
================================ */
const energyText = document.getElementById("energyText");
const hungerText = document.getElementById("hungerText");
const moneyText = document.getElementById("moneyText");

const text = document.getElementById("text");

/* Main control buttons */
const classBtn = document.getElementById("classBtn");
const foodBtn = document.getElementById("foodBtn");
const hostelBtn = document.getElementById("hostelBtn");

/* Story navigation buttons */
const nextBtn = document.getElementById("nextBtn");
const continueBtn = document.getElementById("continueBtn");
const outBtn = document.getElementById("outBtn");

const nextBtn1 = document.getElementById("nextBtn1");
const nextBtn2 = document.getElementById("nextBtn2");

/* Fast food ordering button */
const orderBtn = document.getElementById("orderBtn");
const feedbackBtn = document.getElementById("feedbackBtn");
const backtoclassBtn = document.getElementById("backtoclassBtn");

/* ===============================
   Story Dialogue System
================================ */
let storyIndex = 0;

let story = [
{speaker:"Narrator",text:"You grab your bag and walk toward the college campus."},
{speaker:"Sai",text:"Hey {name}! Good morning. Did you prepare for today's lecture?"},
{speaker:"You",text:"Not really. I was planning to study last night."},
{speaker:"Sai",text:"Same here! But the professor will explain something important today."},
{speaker:"You",text:"Really? Then we should pay attention in class."},
{speaker:"Sai",text:"Yeah hurry {name}! The class is about to start."},
{speaker:"Narrator",text:"{name} and Sai walk into the classroom as the lecture begins."}
];

/* ===============================
   Fast Food Menu Items
================================ */
let foodItems = [
{name:"Egg Fried Rice", price:5},
{name:"Chicken Fried Rice", price:7},
{name:"Veg Fried Rice", price:4},
{name:"Egg Noodles", price:6},
{name:"Chicken Noodles", price:8}
];

/* ===============================
   Update Player Stats
================================ */
function updateStats(){
energyText.innerText = energy;
hungerText.innerText = hunger;
moneyText.innerText = money;
}

/* ===============================
   Show Story Dialogue
================================ */
function showStory(){
let current = story[storyIndex];
if(storyIndex === 0){
text.innerHTML = `
<strong>${current.speaker}:</strong> ${current.text}
<br><br>
Enter your name:
<input type="text" id="nameInput">
<button id="submitName">Start</button>
`;
document.getElementById("submitName").onclick = function(){
playerName = document.getElementById("nameInput").value;
if(playerName === ""){
playerName = "Student";
}
storyIndex++;
showStory();
};
}
else{
let dialogue = current.text.replaceAll("{name}", playerName);
text.innerHTML = `<strong>${current.speaker}:</strong> ${dialogue}`;
}

}

/* ===============================
   Go To Class
================================ */
classBtn.onclick = function(){

nextBtn.style.display = "block";

orderBtn.style.display = "none";
nextBtn1.style.display = "none";
continueBtn.style.display = "none";
outBtn.style.display = "none";
backtoclassBtn.style.display="none";
feedbackBtn.style.display = "none";

storyIndex = 0;
showStory();
updateStats();
}

/* ===============================
   Next Story
================================ */
nextBtn.onclick = function(){

storyIndex++;

if(storyIndex < story.length){
showStory();
}
else{

text.innerText = "The lecture continues... What will you do next?";

nextBtn.style.display = "none";
continueBtn.style.display = "block";
outBtn.style.display = "block";
}
}

/* ===============================
   Continue Class
================================ */
continueBtn.onclick = function(){

text.innerText = "My attendance is very low, so I decide to stay in class and continue the lecture.";

continueBtn.style.display = "none";
outBtn.style.display = "block";
}

/* ===============================
   Leave Class → Fast Food
================================ */
outBtn.onclick = function(){

text.innerText = "The class is too boring, so I decide to go to the fast food center.";

outBtn.style.display = "none";
continueBtn.style.display = "none";

nextBtn2.style.display = "block";

/* move to fast food center */
nextBtn2.onclick = foodBtn.onclick;
}

/* ===============================
   Fast Food Center
================================ */
foodBtn.onclick = function(){

text.innerText = "Welcome to Fast Food Center.";

orderBtn.style.display = "block";
backtoclassBtn.style.display = "block";

nextBtn2.style.display = "none";
}

/* ===============================
   Display Food Menu
================================ */
orderBtn.onclick = function(){

text.innerHTML = "Available food items:<br><br>";

feedbackBtn.style.display = "none";

foodItems.forEach((item,index)=>{
text.innerHTML += `
<button onclick="buyFood(${index})">
${item.name} - $${item.price}
</button><br>
`;
});
orderBtn.style.display = "none";
}
/* ===============================
   Buy Food
================================ */
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
/* show feedback button */
feedbackBtn.style.display = "block";
}
/* ===============================
   Hostel Rest
================================ */
hostelBtn.onclick = function(){
energy += 20;
text.innerText = "You return to the hostel and rest for a while.";
updateStats();
}
/* ===============================
   Feedback System
================================ */
feedbackBtn.onclick = function(){
text.innerText = "How was the food? Thanks for your feedback!";
feedbackBtn.style.display = "none";
}
/* ===============================
   Back To Class
================================ */
backtoclassBtn.onclick = function(){
text.innerText = "You return to the classroom.";
backtoclassBtn.style.display ="none";
 nextBtn.style.display = "none";
classBtn.onclick();
}
/* ===============================
   Initial UI Setup
================================ */
orderBtn.style.display = "none";
nextBtn.style.display = "none";
nextBtn1.style.display = "none";
continueBtn.style.display = "none";
outBtn.style.display = "none";
nextBtn2.style.display = "none";
feedbackBtn.style.display ="none";
backtoclassBtn.style.display ="none";

updateStats();