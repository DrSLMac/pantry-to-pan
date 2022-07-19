import "./styles.css";
import { usersAPIData, ingredientsAPIData, recipeAPIData } from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";
import "./images/banner-design.png";
import RecipeRepository from "../src/classes/RecipeRepository";
// import recipeData from "./data/recipes";
// import usersData from "./data/users";
// import ingredientsData from "./data/ingredients";
import Recipe from "../src/classes/Recipe";
import User from "../src/classes/User-class";
//import "../data/ingredients.js";


// Promise.all([usersAPIData, ingredientsAPIData, recipeAPIData])
// console.log(usersAPIData)
// console.log(ingredientsAPIData)
// console.log(recipeAPIData)
// // 👇🏽 Global variables 👇🏽
let savedRecipes = [];
let recipeRepo;
let user;
let recipeData;
let usersData;

function getPromises() {
Promise.all([usersAPIData, recipeAPIData, ingredientsAPIData]).then(data => {
  usersData = data[0].usersData;
  console.log(usersData)
  recipeData = data[1].recipeData;
  user = new User(usersData[getRandomIndex(usersData)])
  console.log(user)
  recipeRepo = new RecipeRepository(recipeData)
  showHomeScreen()
})
}

// // 👇🏽 Query Selectors👇🏽
const allRecipeBtn = document.querySelector("#all-recipe-button");
const allRecipesView = document.querySelector(".filter-panel");
const homeBtn = document.querySelector("#home-button");
const homeView = document.querySelector(".home-view");
const savedRecipeBtn = document.querySelector("#saved-button");
const savedRecipesView = document.querySelector(".saved-recipes");
const pantryBtn = document.querySelector("#pantry-button");
const allRecipeGrid = document.querySelector(".recipe-tile-grid");
const recipeTile = document.querySelector(".recipe-tile");
const tileImage = document.getElementById("tileImage");
const recipePage = document.querySelector(".recipe-page");
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const tagSelectionBoxes = document.getElementById("filter-input-wrapper");
const searchBar = document.querySelector("#recipe-search");
const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector(".input");

const saveThisRecipeBtn = document.querySelector(".save-this-recipe");
const breakfastCategory = document.getElementById("breakfast");
const lunchCategory = document.getElementById("lunch");
const dinnerCategory = document.getElementById("dinner");

// 👇🏽 Event Handlers & Functions 👇🏽
window.addEventListener("load", getPromises)
allRecipeBtn.addEventListener("click", showAllRecipes);
homeBtn.addEventListener("click", showHomeScreen);
savedRecipeBtn.addEventListener("click", showSavedRecipes);
saveThisRecipeBtn.addEventListener("click", saveThisRecipe);
pantryBtn.addEventListener("click", showPantry);
recipeTile.addEventListener("click", viewRecipe);
checkboxes.forEach((box) => {
  box.checked = false;
  box.addEventListener("change", () => displayFiltered(recipeRepo));
});
recipePage.addEventListener("click", (event)=> {saveThisRecipe(event)});
searchButton.addEventListener("click", filterByName);
searchInput.addEventListener("input", getInput);


console.log(recipeRepo)
console.log(usersData)
console.log(recipeData)


// 👇🏽 Filter recipes by tag
// function recipeByCategory(tag) {
//   recipeRepo.filterTag(tag);
//   return recipeRepo.filtered;
// }

// breakfastCategory.addEventListener("click", recipeByCategory("breakfast"));
// lunchCategory.addEventListener("click", recipeByCategory("lunch"));
// dinnerCategory.addEventListener("click", recipeByCategory("dinner"));
allRecipeBtn.addEventListener("click", showAllRecipes);
homeBtn.addEventListener("click", showHomeScreen);
savedRecipeBtn.addEventListener("click", showSavedRecipes);
pantryBtn.addEventListener("click", showPantry);

function showAllRecipes() {
  const hideElements = [homeView, allRecipeBtn, savedRecipesView, recipePage];
  const showElements = [allRecipesView, homeBtn, savedRecipeBtn];
  hideElements.forEach((element) => element.classList.add("hidden"));
  showElements.forEach((element) => element.classList.remove("hidden"));

  addRecipeCards(recipeRepo);
}

function showHomeScreen() {
  const hideElements = [allRecipesView, savedRecipesView, homeBtn];
  const showElements = [homeView, allRecipeBtn, savedRecipeBtn];
  hideElements.forEach((element) => element.classList.add("hidden"));
  showElements.forEach((element) => element.classList.remove("hidden"));
//   homeView.innerHTML = `<button class="home-category-panel" id="breakfast">
//         <h2 class="homeViewTitle">Breakfast</h2>
//         <input type="image" alt="breakfastPic" src="${
//           recipeByCategory("breakfast")[0][0].image
//         }" id="breakfastImage" />
//   </button>
//       <button class="home-category-panel" id="lunch">
//         <h2 class="homeViewTitle">Lunch</h2>
//         <input type="image" alt="lunchPic" src="${
//           recipeByCategory("lunch")[0][0].image
//         }" id="lunchImage"/>
//       </button>
//       <button class="home-category-panel" id="dinner">
//         <h2 class="homeViewTitle">Dinner</h2>
//         <input type="image" alt="dinnerPic" src="${
//           recipeByCategory("dinner")[0][1].image
//         }" id="dinnerImage"/>
//       </button>`;
// }
}

showHomeScreen();
// recipeByCategory();

function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}



function showSavedRecipes() {
  const hideElements = [homeView, savedRecipeBtn, allRecipesView];
  const showElements = [allRecipesView, savedRecipesView, homeBtn, allRecipeBtn];
  hideElements.forEach((element) => element.classList.add("hidden"));
  showElements.forEach((element) => element.classList.remove("hidden"));
  recipeTile.innerHTML = "";
  user.toCook.shift();
  const savedRecipes = user.toCook.forEach((recipe) => {
    recipeTile.innerHTML += `<input type="image" src="${recipe.image}" id="${recipe.id}"/><h3>"${recipe.name}"</h3>`;
  });
}

function showPantry() {
  window.alert("This page is under construction!");
}

function addRecipeCards(repo) {
  const allRecipes = repo.recipes.forEach((recipe) => {

    recipeTile.innerHTML += `<input type="image" src="${recipe.image}" id="${recipe.id}"/><h3>"${recipe.name}"</h3>`;
  });
  return allRecipes;
}


function saveThisRecipe(ev) {
    user.recipeToCook(currentRecipe);
}

function removeThisRecipe(ev) {
    user.removeRecipeToCook(currentRecipe)
}


function viewRecipe(ev) {
  const hideElements = [homeView, allRecipesView, savedRecipesView];
  const showElements = [homeBtn, allRecipeBtn, savedRecipeBtn, recipePage];
  hideElements.forEach((element) => element.classList.add("hidden"));
  showElements.forEach((element) => element.classList.remove("hidden"));
  const targetRecipeId = parseInt(ev.target.id);

  recipeData.forEach((recipe) => {
    if (recipe.id === targetRecipeId) {
      const recipeInfo = recipeRepo.getById(targetRecipeId);
      currentRecipe = new Recipe(recipeInfo);

      recipePage.innerHTML = `<h2 class="recipePageName" id="${recipe.id}">${recipe.name}</h2>
      <img src="${recipe.image}">
      <h4>
        <ol>
          ${recipe.instructions
            .map((instruction) => {
              return `<li>${instruction.instruction}</li>`;
            })
            .join("")}
        </ol>
      </h4>
      <h4>${currentRecipe.getIngredients(ingredientsData)}</h4>
      <h4>${currentRecipe.getCost()}</h4>`;
        }
    });
    recipePage.innerHTML += `<button class="save-this-recipe">Save this recipe!</button>`;
}

let checked = [];
function grabCheckboxValues() {
  checked = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) checked.push(checkbox.id);
  });
  console.log(checked);
  return checked;
}

function returnFiltered(repo) {
  grabCheckboxValues();
  console.log(checked);
  recipeTile.innerHTML = ``;
  checked.forEach((value) => {
    repo.filterTag(value);
  });
  console.log(repo.filtered);
  return repo.filtered;
}

function displayFiltered(repo) {
  returnFiltered(repo);
  console.log(repo.filtered);
  var filteredRepo = repo.filtered.pop();
  var filteredRecipes = filteredRepo.forEach((recipe) => {
    recipeTile.innerHTML += ` <input type="image" src="${recipe.image}" id="${recipe.id}"/><h3>"${recipe.name}"</h3>`;
  });
  console.log(filteredRecipes);
  return filteredRecipes;
}

function getInput() {
  let value = searchBar.value;
  return value;
}
function filterByName() {
  let input = getInput();
  let result = recipeRepo.filterName(input);
  if (input && input.trim().length > 0 && result) {
    showAllRecipes();
    recipeTile.innerHTML = "";
    recipeTile.innerHTML += ` <input type="image" src="${result.image}" id="${result.id}"/><h3>"${result.name}"</h3>`;
  } else {
    alert("No results found");
  }
  return result;
}