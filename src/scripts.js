import './css/main.scss';
import domUpdates from './domUpdates.js';

import { getData, postData } from './network-requests';

import Pantry from './pantry';
import Recipe from './recipe';
import User from './user';
import Cookbook from './cookbook';

const favButton = document.querySelector('#viewFavoritesButton');
const cardArea = document.querySelector('#allCards');
const tagArea = document.querySelector('#allTags');
const searchBar = document.getElementById('search-bar')
const expandFilters = document.querySelector('#expandFilters');
const showPantryButton = document.querySelector('#viewPantryButton')
const pantrySection = document.querySelector('#pantry')
let user, pantry, cookbook, ingredients, recipe, randomUser;

window.onload = onStartup();

favButton.addEventListener('click', viewFavorites);
cardArea.addEventListener('click', cardButtonConditionals);
tagArea.addEventListener('click', filterByTag);
searchBar.addEventListener('keyup', filterBySearch)
expandFilters.addEventListener('click', toggleFilters);
showPantryButton.addEventListener('click', showPantry);
cardArea.addEventListener('click', toggleViewRecipeDetails);
cardArea.addEventListener('click', cookRecipe);
cardArea.addEventListener('click', addIngredients);
cardArea.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    toggleViewRecipeDetails(event);
  }
})

function onStartup() {
  getData()
    .then(allData => {
      const randomIndexInArray = Math.floor(
        Math.random() * allData.userData.length);
      randomUser = allData.userData[randomIndexInArray];
      user = new User(randomUser.id, randomUser.name, randomUser.pantry);
      cookbook = new Cookbook(allData.recipeData);
      ingredients = allData.ingredientData;
      pantry = new Pantry(randomUser.pantry);
      populatePantryList(pantry, ingredients);
      domUpdates.populateCards(user, cookbook.recipes, cardArea);
      filterTags(cookbook.recipes);
      greetUser();
    });
}

function filterTags(recipes) {
  const showAllFilters = document
    .querySelector('#allTags')
    .classList.contains('show-all-filters');

  const recipeTags = recipes.reduce((acc, recipe) => {
    return [...acc, ...recipe.tags]
  }, []);
  const uniqueTags = [...new Set(recipeTags)].reverse();
  let filters = [];
  if (showAllFilters) {
    filters = uniqueTags;
  } else {
    filters = uniqueTags.slice(0, 5);
  }

  const tagMarkup = filters.map(tag => {
    return `<button class='nav-button' id="${tag}">${tag}</button>`
  }).join("");
  const showAllButton = `<button class='nav-button active' id='showAll'>
                        Show All</button>`;

  tagArea.innerHTML = showAllButton + tagMarkup;
}

function filterByTag(event) {
  const tag = event.target.id;
  const navButtons = document.querySelectorAll('#allTags .nav-button');
  navButtons.forEach(function(button) {
    if (button.id === tag) {
      button.classList.add('active');
    }
    if (button.id === 'showAll') {
      button.classList.remove('active');
    }
  });
  if (tag === 'showAll') {
    domUpdates.populateCards(user, cookbook.recipes, cardArea);
    navButtons.forEach(function(button) {
      button.classList.remove('active');
      if (button.id === 'showAll') {
        button.classList.add('active');
      }
    });
  } else {
    renderFilteredCards();
  }
}

function renderFilteredCards() {
  const activeFilterButtons = document
    .querySelectorAll('#allTags .nav-button.active');
  const activeTags = [...activeFilterButtons].map(button => button.id);
  const filteredRecipes = activeTags.reduce((acc, tag) => {
    return [...acc, ...cookbook.filterByTag(tag, cookbook.recipes)];
  }, []);

  domUpdates.populateCards(user, filteredRecipes, cardArea);
}

function toggleFilters() {
  const allTags = document.querySelector('#allTags');

  if (allTags.classList.contains('show-all-filters')) {
    allTags.classList.remove('show-all-filters');
    allTags.nextElementSibling.innerHTML = 'Expand Filters';
  } else {
    allTags.classList.add('show-all-filters');
    allTags.nextElementSibling.innerHTML = 'Minimize Filters';
  }

  filterTags(cookbook.recipes);
}

function viewFavorites(event) {
  if (event.target.innerHTML === 'Home') {
    domUpdates.populateCards(user, cookbook.recipes, cardArea);
    favButton.innerHTML = 'View Favorites'
  } else {
    favButton.innerHTML = 'Home';
    if (!user.favoriteRecipes.length) {
      cardArea.innerHTML = 'You have no favorites!'
    } else {
      domUpdates.populateCards(user, user.favoriteRecipes, cardArea);
    }
  }
}

function greetUser() {
  const userName = document.querySelector('.user-name');
  userName.innerHTML =
    user.name.split(' ')[0] + ' ' + user.name.split(' ')[1][0];
}

function getId(idString) {
  return Number(idString.split('-').pop())
}

function favoriteCard(event) {
  let specificRecipe = cookbook.recipes.find(recipe => {
    if (recipe.id === getId(event.target.id)) {
      return recipe;
    }
  })
  if (!event.target.classList.contains('favorite-active')) {
    event.target.classList.add('favorite-active');
    user.addToFavorites(specificRecipe);
  } else if (event.target.classList.contains('favorite-active')) {
    event.target.classList.remove('favorite-active');
    user.removeFromFavorites(specificRecipe)
  }
}

function cardButtonConditionals(event) {
  if (event.target.classList.contains('favorite')) {
    favoriteCard(event);
  } else if (event.target.classList.contains('add-button')) {
    addCardToCook(event);
    event.target.classList.add('is-added-to-cookbook');
  } else if (event.target.classList.contains('home')) {
    favButton.innerHTML = 'View Favorites';
    domUpdates.populateCards(user, cookbook, cardArea);
  }
}

function toggleViewRecipeDetails(event) {
  if (event.target.classList.contains('card-picture')) {
    const recipeInfo = cookbook.recipes.find(recipe => {
      if (recipe.id === getId(event.target.id)) {
        return recipe;
      }
    })
    cardArea.classList.add('all');
    recipe = new Recipe(recipeInfo, ingredients);
    const missingIngredients = `
      <div>
        <h3>Missing Ingredients</h3>
        <p>${showMissingIngredients(recipe, ingredients)}</p>
      </div>`
    const recipeName = `<div><h1>${recipe.name}</h1></div>`
    const cookRecipeButton = `<button id='cookRecipeButton' class='view-favorites cook-recipe nav-button'>Cook Recipe</button>`
    const addIngredients = `<button id='addIngredients' class='view-favorites add-ingredients nav-button'>Add Ingredients</button>`
    const recipeImg = `<img src=${recipe.image} alt=${recipe.name}>`
    const ingredientsList = `
      <div class='ingredients recipe-info'>
        <h3>Ingredients</h3>
        <ul>
          ${recipe.returnIngredients().map(ingredient => {
    return `<li>${ingredient.name} -
              ${ingredient.quantity.amount}
              ${ingredient.quantity.unit} </li>`
  }).join('')}
        </ul>
      </div>`
    const recipeDirections = `
    <div class='instructions recipe-info'>
      <h3>Directions</h3>
      <p>${recipe.returnInstructions()}</p>
    </div>`
    const recipeCost = `
    <div>
      <h3>Estimated Cost</h3>
      ${recipe.calculateCost()}
    </div>
    `

    cardArea.innerHTML = `<article>
                            ${recipeName}
                            <div>${recipeImg}${ingredientsList}</div>
                            ${recipeDirections}
                            ${missingIngredients}
                            ${addIngredients}
                            ${recipeCost}
                            ${cookRecipeButton}
                          </article>`
  }
}

function addCardToCook(event) {
  const { id } = event.target.closest('.card');
  const idAsInteger = parseInt(id);
  user.addToRecipesToCook(idAsInteger);
  return idAsInteger;
}

function filterBySearch(e) {
  const searchText = e.target.value.toLowerCase();
  if (favButton.innerHTML === 'Home') {
    combineDataSets(user.favoriteRecipes, ingredients);
    let result = returnFilteredRecipes(user.favoriteRecipes, searchText);
    const finalResult = [...new Set(result)];
    domUpdates.populateCards(user, finalResult, cardArea);
  } else {
    combineDataSets(cookbook.recipes, ingredients);
    let result = returnFilteredRecipes(cookbook.recipes, searchText);
    const finalResult = [...new Set(result)];
    domUpdates.populateCards(user, finalResult, cardArea);
  }
}

function combineDataSets(recipeData, ingredientsData) {
  recipeData.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      let ingredientID = ingredient.id;
      ingredientsData.forEach(ingredientOnList => {
        if (ingredientOnList.id === ingredientID) {
          ingredient['name'] = ingredientOnList.name;
          ingredient['estimatedCostInCents'] = ingredientOnList
            .estimatedCostInCents;
        }
      })
    })
  })
}

function returnFilteredRecipes(recipes, search) {
  let result = [];
  result = recipes.filter(recipe => {
    return recipe.name.toLowerCase().includes(search);
  })
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      if (ingredient.name.toLowerCase().includes(search)) {
        result.push(recipe);
      }
    })
  })
  return result;
}

function showPantry() {
  pantrySection.classList.toggle('hidden');
  cardArea.classList.toggle('hidden')
  if (showPantryButton.innerText === "View Pantry") {
    showPantryButton.innerHTML = "Hide pantry"
  } else {
    showPantryButton.innerHTML = "View Pantry"
  }
}

function populatePantryList(pantry, ingredients) {
  pantry.populatePantry();
  pantrySection.innerHTML = ""
  ingredients.forEach((ingredient) => {
    if (pantry.pantryIngredients.some((item) => item === ingredient.id)) {
      pantry.pantryIngredients.forEach((item, i) => {
        if (item === ingredient.id) {
          let currentAmount = pantry.pantryAmounts[i]
          if (currentAmount) {
          pantrySection.innerHTML +=
            `<li class='pantry-items' id='pantryItems-${i}'>
            ${ingredient.name}: ${currentAmount}
            </li>`
        }
      }
      });
    }
  });
}

function showMissingIngredients(recipe, ingredients) {
  var missingIngredients = pantry.checkForIngr(recipe);
  let ingredientNames = [];
  let ingredientValues = [];
  let response = ['To cook this recipe you need'];
  if (missingIngredients === 'You have all of the ingredients that you need!') {
    return missingIngredients;
  } else {
    missingIngredients.forEach(ingredient =>
      ingredientValues.push(ingredient.amount));

    ingredients.forEach((ingredient) => {
      if (missingIngredients.some((item) => item.name === ingredient.id)) {
        ingredientNames.push(ingredient.name);
      }
    });
    ingredientNames.forEach((item, i) => {
      response.push(`${ingredientNames[i]}: ${ingredientValues[i]}`)
    });
    return response.join(", ")
  }
}

function cookRecipe(event) {
  if(event.target.classList.contains('cook-recipe')) {
    let ingredientsUsed = pantry.checkForIngrUsed(recipe);
    pantry.cookMeal(recipe);
    populatePantryList(pantry, ingredients)
    ingredientsUsed.forEach(ingredient => {
      postData({ userID: user.id, ingredientID: ingredient.name, ingredientModification: ingredient.amount })
    });
  }
}

function addIngredients(event) {
  if(event.target.classList.contains('add-ingredients')) {
    let shoppingList = pantry.checkForIngr(recipe)
    console.log(shoppingList);
    console.log(user);
    shoppingList.forEach(ingredient => {
      postData({ userID: user.id, ingredientID: ingredient.name, ingredientModification: ingredient.amount })
    });

getData()
.then( allData => {
  let currentUserIndex;
  allData.userData.forEach((userObj, i) => {
    if (userObj.id === user.id)
    currentUserIndex = i;
  })
  let currentUser = allData.userData[currentUserIndex];
  user = new User(currentUser.id, currentUser.name, currentUser.pantry)
  pantry = new Pantry(user.pantry)
  pantry.populatePantry();
  populatePantryList(pantry, ingredients);

})
}
}
export {}
