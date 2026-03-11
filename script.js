/* ===============================
   Player Initial Stats
================================ */
let energy = 100;
let hunger = 60;
let money = 120;

/* ===============================
   Getting HTML Elements
================================ */
const energyText = document.getElementById("energyText");
const hungerText = document.getElementById("hungerText");
const moneyText = document.getElementById("moneyText");

const text = document.getElementById("text");

/* Main control buttons */
const classBtn = document.getElementById("class");
const foodBtn = document.getElementById("food");
const hostelBtn = document.getElementById("hostel");

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

/* Dialogue lines for class scene */
let story = [
{speaker:"Narrator",text:"You grab your bag and walk toward the college campus. The morning air is cool and students rush to class. Someone calling your name"},
{speaker:"Sai",text:"Hey! Good morning. Did you prepare for today's lecture?"},
{speaker:"You",text:"Not really. I was planning to study last night."},
{speaker:"Sai",text:"Same here! But the professor will explain something important today."},
{speaker:"You",text:"Really? Then we should pay attention in class."},
{speaker:"Sai",text:"Yeah hurry! The class is about to start."},
{speaker:"Narrator",text:"You both walk into the classroom as the lecture begins."}
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
   Update Player Stats on Screen
================================ */
function updateStats(){
energyText.innerText = energy;
hungerText.innerText = hunger;
moneyText.innerText = money;
}


/* ===============================
   Show Current Story Dialogue
================================ */
function showStory(){
let current = story[storyIndex];
text.innerHTML = `<strong>${current.speaker}:</strong> ${current.text}`;
}


/* ===============================
   Go To Class Button Logic
================================ */
classBtn.onclick = function(){

nextBtn.style.display = "block";

/* hide unrelated buttons */
orderBtn.style.display = "none";
nextBtn1.style.display = "none";
continueBtn.style.display = "none";
outBtn.style.display = "none";

/* start story from beginning */
storyIndex = 0;
showStory();
updateStats();
}


/* ===============================
   Next Button For Story Progress
================================ */
nextBtn.onclick = function(){

storyIndex++;

if(storyIndex < story.length){
showStory();
}
else{

/* Story finished, show player choices */
text.innerText = "The lecture continues... What will you do next?";

nextBtn.style.display = "none";
continueBtn.style.display = "block";
outBtn.style.display = "block";
}
}


/* ===============================
   Continue Class Choice
================================ */
continueBtn.onclick = function(){

text.innerText = "My attendance is very low, so I decide to stay in class and continue the lecture.";

/* show other option again */
continueBtn.style.display = "none";
outBtn.style.display = "block";

}


/* ===============================
   Leave Class → Go To Fast Food
================================ */
outBtn.onclick = function(){

text.innerText = "The class is too boring, so I decide to go to the fast food center.";

outBtn.style.display = "none";
continueBtn.style.display = "none";

/* show next step button */
nextBtn2.style.display = "block";

/* clicking next moves player to fast food center */
nextBtn2.onclick = foodBtn.onclick;
}


/* ===============================
   Fast Food Center Entrance
================================ */
foodBtn.onclick = function(){

text.innerText = "Welcome to Fast Food Center.";

nextBtn1.style.display="none";
outBtn.style.display = "none";
continueBtn.style.display = "none";

/* allow ordering food */
orderBtn.style.display = "block";
feedbackBtn.style.display ="block";
nextBtn2.style.display = "none";
}


/* ===============================
   Display Food Menu
================================ */
orderBtn.onclick = function(){

text.innerHTML = "Available food items:<br><br>";

foodItems.forEach((item,index)=>{

text.innerHTML += `
<button onclick="buyFood(${index})">
${item.name} - $${item.price}
</button><br>
`;

});

/* hide order button after showing menu */
orderBtn.style.display = "none";
}


/* ===============================
   Buy Food Logic
================================ */
function buyFood(index){

let item = foodItems[index];

/* Check if player has enough money */
if(money < item.price){

text.innerText = "You don't have enough money.";
return;
}

/* Deduct money and reduce hunger */
money -= item.price;
hunger -= 20;

if(hunger < 0) hunger = 0;

/* show purchase result */
text.innerText = `You bought ${item.name}.`;

/* update stats on screen */
updateStats();
feedbackBtn.style.display = "block";
}


/* ===============================
   Hostel Button (Rest System)
================================ */
hostelBtn.onclick = function(){

energy += 20;

text.innerText = "You return to the hostel and rest for a while.";

updateStats();

}

feedbackBtn.onclick = function(){
text.innerText = "How was the food? Thanks for your feedback!";
feedbackBtn.style.display = "none";

}
backtoclassBtn.onclick = function() {
    backtoclassBtn.style.display ="none";
}
/* ===============================
   Initial UI Setup
================================ */

/* hide buttons initially */
orderBtn.style.display = "none";
nextBtn.style.display = "none";
nextBtn1.style.display = "none";
continueBtn.style.display = "none";
outBtn.style.display = "none";
nextBtn2.style.display = "none";
feedbackBtn.style.display ="none";
backtoclassBtn.style.display ="none";
/* display starting stats */
updateStats();