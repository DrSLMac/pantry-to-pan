import "./styles.css";
import apiCalls from "./apiCalls";
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";
import "./images/banner-design.png";
import RecipeRepository from "../src/classes/RecipeRepository";
import recipeData from "./data/recipes";
import usersData from "./data/users";
import ingredientsData from "./data/ingredients";
import Recipe from "../src/classes/Recipe";
import User from "../src/classes/User-class";
//import "../data/ingredients.js";
// import {userAPIData, ingredientAPIData, recipeAPIData} from './apiCalls';

// 👇🏽 Global variables 👇🏽
let recipeRepo = new RecipeRepository(recipeData);
let randomUser = usersData[Math.floor(Math.random() * usersData.length)];
console.log(randomUser);
let user = new User(randomUser);
console.log(user);
let userAPIData;
let ingredientAPIData;
let recipeAPIData;
let savedRecipes = [];

// Promise.all([userAPIData, ingredientAPIData, recipeAPIData]).then(data => data.json()).catch(error => console.log(error));

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
const saveThisRecipeBtn = document.querySelector(".save-this-recipe");
const breakfastCategory = document.getElementById("breakfast"); 
const lunchCategory = document.getElementById("lunch");
const dinnerCategory = document.getElementById("dinner");

// 👇🏽 Event Handlers & Functions 👇🏽
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
recipePage.addEventListener("click", viewRecipe);

// 👇🏽 Filter recipes by tag
function recipeByCategory(tag) {
  recipeRepo.filterTag(tag);
  return recipeRepo.filtered;
}

breakfastCategory.addEventListener("click", recipeByCategory("breakfast"));
lunchCategory.addEventListener("click", recipeByCategory("lunch"));
dinnerCategory.addEventListener("click", recipeByCategory("dinner"));
allRecipeBtn.addEventListener("click", showAllRecipes);
homeBtn.addEventListener("click", showHomeScreen);
savedRecipeBtn.addEventListener("click", showSavedRecipes);
pantryBtn.addEventListener("click", showPantry);

function showAllRecipes() {
  const hideElements = [homeView, allRecipeBtn, savedRecipesView, recipePage];
  const showElements = [allRecipesView, homeBtn, savedRecipeBtn];
  hideElements.forEach((element) => element.classList.add("hidden"));
  showElements.forEach((element) => element.classList.remove("hidden"));
}

function showHomeScreen() {
  const hideElements = [allRecipesView, savedRecipesView, homeBtn];
  const showElements = [homeView, allRecipeBtn, savedRecipeBtn];
  hideElements.forEach((element) => element.classList.add("hidden"));
  showElements.forEach((element) => element.classList.remove("hidden"));
  homeView.innerHTML = `<button class="home-category-panel" id="breakfast">
        <h2 class="homeViewTitle">Breakfast</h2>
        <input type="image" alt="breakfastPic" src="${
          recipeByCategory("breakfast")[0][0].image
        }" id="breakfastImage" />
  </button>
      <button class="home-category-panel" id="lunch">
        <h2 class="homeViewTitle">Lunch</h2>
        <input type="image" alt="lunchPic" src="${
          recipeByCategory("lunch")[0][0].image
        }" id="lunchImage"/>
      </button>
      <button class="home-category-panel" id="dinner">
        <h2 class="homeViewTitle">Dinner</h2>
        <input type="image" alt="dinnerPic" src="${
          recipeByCategory("dinner")[0][1].image
        }" id="dinnerImage"/>
      </button>`;
}

showHomeScreen();
recipeByCategory();

function showSavedRecipes() {
  const hideElements = [homeView, allRecipesView, savedRecipeBtn];
  const showElements = [savedRecipesView, homeBtn, allRecipeBtn];
  hideElements.forEach((element) => element.classList.add("hidden"));
  showElements.forEach((element) => element.classList.remove("hidden"));
}

function showPantry() {
  window.alert("This page is under construction!");
}

let recipeCard = new Recipe(recipeData[0]);
function addRecipeCards() {
  const allRecipes = recipeRepo.recipes.forEach((recipe) => {
    recipeTile.innerHTML += `<input type="image" src="${recipe.image}" id="${recipe.id}"/><h3>"${recipe.name}"</h3>`;
  });
  return allRecipes;
}
addRecipeCards();

function viewRecipe(ev) {
  const hideElements = [homeView, allRecipesView, savedRecipesView];
  const showElements = [homeBtn, allRecipeBtn, savedRecipeBtn, recipePage];
  hideElements.forEach((element) => element.classList.add("hidden"));
  showElements.forEach((element) => element.classList.remove("hidden"));
  const targetRecipeId = parseInt(ev.target.id);

  recipeData.forEach((recipe) => {
    if (recipe.id === targetRecipeId) {
      const recipeInfo = recipeRepo.getById(targetRecipeId);
      const currentRecipe = new Recipe(recipeInfo);

      recipePage.innerHTML = `<h2 class="recipePageName">${recipe.name}</h2>
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


function saveThisRecipe() {
    //savedRecipes.push()
    user.toCook();
    //recipe information added to array
    //set this.id to date.time
    //
    //replace save button with remove button 
    //update saved page
}

// function addRecipeCards() {
//     const allRecipies = recipeRepo.recipes.forEach((recipe) => {
//       recipeTile.innerHTML += `<input type="image" src="${recipe.image}" id="${recipe.id}"/><h3>"${recipe.name}"</h3>`;
//     });
//     return allRecipies;
//     //allRecipeGrid.innerHTML += recipeTile;
//     //return newRecipeCard;
//   }

/*
// As a user, I should be able to add/remove a recipe to a list of recipes to cook
// click saved recipes
// hide main page
// show grid of saved recipes
// functionality to save or delete, similar to book covers
//Make a class for saved recipes?
//Add save recipe button to recipe card.
//Save button adds save class to recipe card.
//Removes save button and adds delete button.
//If recipe card id contains "save" push to array.
//Delete button will search saved array for recipe id and remove it.
//Update saved grid
to add to saved array, we need button to save recipe at bottom of recipe page, adds a saved class, and change add button to remove button, which will remove saved class
saved recipe grid will filter to only show recipes with saved class when we hit saved recipes button
*/
