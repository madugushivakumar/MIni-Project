/* ===============================
   Player Initial Stats
================================ */
let energy = 100;
let hunger = 60;
let money = 120;
let attendance = 60;
let day = 1;
let playerName = "";

/* ===============================
   Getting HTML Elements
================================ */
const energyText = document.getElementById("energyText");
const hungerText = document.getElementById("hungerText");
const moneyText = document.getElementById("moneyText");
const attendanceText = document.getElementById("attendanceText");
const dayText = document.getElementById("dayText");
const text = document.getElementById("text");

/* Main control buttons */
const classBtn = document.getElementById("classBtn");
const foodBtn = document.getElementById("foodBtn");
const hostelBtn = document.getElementById("hostelBtn");
const jobBtn = document.getElementById("jobBtn");

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
const nextBtn3 = document.getElementById("nextBtn3");

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

let originalStory = story;

let backToClassStory = [
{speaker:"Sai",text:"You are back! The professor already started the lecture."},
{speaker:"You",text:"Yeah I just went out for a few minutes."},
{speaker:"Sai",text:"You missed an important topic about the exam."},
{speaker:"Narrator",text:"You quickly sit down and try to understand the lecture."}
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
attendanceText.innerText = attendance + "%";
dayText.innerText = "Day " + day;
}

/* ===============================
   Game Over System
================================ */
function checkGameOver(){

if(energy <= 0){
text.innerText = "You fainted from exhaustion. Game Over.";
disableButtons();
}

if(hunger >= 100){
text.innerText = "You are starving. Game Over.";
disableButtons();
}

if(day === 7 && attendance >= 75){
text.innerText = "Congratulations! You survived the week and passed the exams!";
disableButtons();
}
}

function disableButtons(){
classBtn.disabled = true;
foodBtn.disabled = true;
hostelBtn.disabled = true;
jobBtn.disabled = true;
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

energy -= 10;
hunger += 5;
attendance += 5;

updateStats();

nextBtn.style.display = "block";
continueBtn.style.display = "none";
outBtn.style.display = "none";
backtoclassBtn.style.display="none";
feedbackBtn.style.display = "none";

storyIndex = 0;

showStory();

updateStats();
checkGameOver();

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

if(story === backToClassStory){

text.innerText = "The lecture continues quietly.";

continueBtn.style.display = "none";
outBtn.style.display = "none";
nextBtn.style.display = "none";
nextBtn3.style.display = "block"

story = originalStory;

}
else{

text.innerText = "The lecture continues... What will you do next?";

nextBtn.style.display = "none";
continueBtn.style.display = "block";
outBtn.style.display = "block";
nextBtn3.style.display = "block";

}

}

}

/* ===============================
   Continue Class
================================ */
continueBtn.onclick = function(){

text.innerText = "My attendance is low so I stay in class.";

continueBtn.style.display = "none";
outBtn.style.display = "block";

energy -= 5;
hunger += 5;

updateStats();
checkGameOver();

}

/* ===============================
   Leave Class → Fast Food
================================ */
outBtn.onclick = function(){

text.innerText = "The class is boring so I go to the fast food center.";

attendance -= 3;

outBtn.style.display = "none";
continueBtn.style.display = "none";
nextBtn2.style.display = "block";
nextBtn3.style.display = "none";

nextBtn2.onclick = foodBtn.onclick;

energy -= 2;

/* Random event */
if(Math.random() < 0.3){
money += 5;
text.innerText += " On the way you found ₹5 on the ground!";
}

updateStats();
checkGameOver();

}

/* ===============================
   Fast Food Center
================================ */
foodBtn.onclick = function(){

text.innerText = "Welcome to Fast Food Center.";

orderBtn.style.display = "block";
backtoclassBtn.style.display = "none";
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
hunger -= 25;
energy += 5;

if(hunger < 0) hunger = 0;
if(energy > 100) energy = 100;

text.innerText = `You bought ${item.name}.`;

updateStats();

/* show feedback button */
feedbackBtn.style.display = "block";
backtoclassBtn.style.display= "block";

checkGameOver();

}

/* ===============================
   Hostel Rest
================================ */
hostelBtn.onclick = function(){

energy += 30;
hunger += 10;
day++;

if(energy > 100) energy = 100;

text.innerText = "You return to the hostel and rest for the night.";

updateStats();
checkGameOver();

}

/* ===============================
   Part Time Job
================================ */
jobBtn.onclick = function(){

money += 20;
energy -= 15;

text.innerText = "You worked part time and earned $20.";

updateStats();
checkGameOver();

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

story = backToClassStory;

storyIndex = 0;

showStory();

text.innerText = "You return to the classroom.";

backtoclassBtn.style.display ="none";
nextBtn.style.display = "none";

classBtn.onclick();

}

nextBtn3.onclick = function(){

nextBtn3.style.display = "none";

hostelBtn.onclick();

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
nextBtn3.style.display="none";

updateStats();