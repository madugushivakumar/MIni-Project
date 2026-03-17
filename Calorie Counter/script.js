const addEntryBtn = document.getElementById("addEntry");
const entryType = document.getElementById("entry-type");
const calculateBtn = document.getElementById("calculate");
const budgetInput = document.getElementById("budget");
const statusText = document.getElementById("status");
const budgetResult = document.getElementById("budgetResult");
const consumedResult = document.getElementById("consumedResult");
const burnedResult = document.getElementById("burnedResult");
const resultBox = document.getElementById("result");
const clearBtn = document.getElementById("clear");

// Hide default breakfast entry
document.querySelector("#breakfast .entry").style.display = "none";

// Track entry counts
const entryCount = {
  breakfast: 1,
  lunch: 1,
  dinner: 1,
  snacks: 1,
  exercise: 1
};
const mealTypes = ["breakfast", "lunch", "dinner", "snacks", "exercise"];
/* ---------- ADD ENTRY ---------- */
addEntryBtn.addEventListener("click", () => {
  const type = entryType.value;
  const section = document.getElementById(type);
  const count = entryCount[type]++;
  const entry = document.createElement("div");
  entry.className = "entry";
  entry.innerHTML = `
    <label for="${type}-name-${count}">Entry ${count} Name</label>
    <input type="text" id="${type}-name-${count}" placeholder="Food name">

    <label for="${type}-calories-${count}">Entry ${count} Calories</label>
    <input type="number" id="${type}-calories-${count}" class="${type}-calories" placeholder="Calories">
  `;
  section.appendChild(entry);
});

/* ---------- HELPER FUNCTION ---------- */
const getCalories = (selector) =>
  [...document.querySelectorAll(selector)]
    .reduce((sum, input) => sum + (+input.value || 0), 0);

/* ---------- CALCULATE ---------- */
calculateBtn.addEventListener("click", () => {
  resultBox.style.display = "block";
  const consumed =
    getCalories(".breakfast-calories") +
    getCalories(".lunch-calories") +
    getCalories(".dinner-calories") +
    getCalories(".snacks-calories");
  const burned = getCalories(".exercise-calories");
  const budget = +budgetInput.value || 0;
  const remaining = budget - consumed + burned;
  statusText.textContent =
    `${Math.abs(remaining)} Calorie ${remaining >= 0 ? "Surplus" : "Deficit"}`;
  statusText.style.color = remaining >= 0 ? "#9cff57" : "red";
  budgetResult.textContent = `${budget} Calories Budgeted`;
  consumedResult.textContent = `${consumed} Calories Consumed`;
  burnedResult.textContent = `${burned} Calories Burned`;
});
clearBtn.addEventListener("click", () => {
  // Reset budget
  budgetInput.value = "";
  // Clear all sections
  mealTypes.forEach(type => {
    const section = document.getElementById(type);
    const entries = section.querySelectorAll(".entry");
    entries.forEach((entry, i) => {
      if (i === 0) {
        // clear inputs in first entry
        entry.querySelectorAll("input").forEach(input => input.value = "");
      } else {
        entry.remove(); // remove extra entries
      }
    });
  });
  // Reset counters
  Object.keys(entryCount).forEach(type => entryCount[type] = 1);
  // Hide result box
  resultBox.style.display = "none";
  // Clear result text
  [statusText, budgetResult, consumedResult, burnedResult]
    .forEach(el => el.textContent = "");

});