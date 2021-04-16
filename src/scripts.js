import './css/base.scss';
import './css/styles.scss';

import getData from './network-requests';

import Pantry from './pantry';
import Recipe from './recipe';
import User from './user';
import Cookbook from './cookbook';

const favButton = document.querySelector('#viewFavoritesButton');
//let homeButton = document.querySelector('.home')
const cardArea = document.querySelector('#allCards');
const tagArea = document.querySelector('#allTags');
let user, pantry, cookbook;

window.onload = onStartup();

//homeButton.addEventListener('click', cardButtonConditionals);
favButton.addEventListener('click', viewFavorites);
cardArea.addEventListener('click', cardButtonConditionals);
tagArea.addEventListener('click', filterByTag);

function onStartup() {
  getData()
    .then(allData => {
      const randomIndexInArray = Math.floor(
        Math.random() * allData.userData.length);
      const randomUser = allData.userData[randomIndexInArray];
      user = new User(randomUser.id, randomUser.name, randomUser.pantry);
      //pantry = new Pantry(randomUser.pantry);
      cookbook = new Cookbook(allData.recipeData);
      populateCards(cookbook.recipes);
      filterTags(cookbook.recipes);
      greetUser();
    });
}

function filterTags(recipes) {
  const recipeTags = recipes.reduce((acc, recipe) => {
    return [...acc, ...recipe.tags]
  }, []);
  const uniqueTags = [...new Set(recipeTags)];

  const tagMarkup = uniqueTags.map(tag => {
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
    button.classList.remove('active');
    if (button.id === tag) {
      button.classList.add('active');
    }
  });
  if (tag === 'showAll') {
    populateCards(cookbook.recipes);
  } else {
    const filteredRecipes = cookbook.findRecipeByTags(tag);
    populateCards(filteredRecipes);
  }
}

function viewFavorites(event) {
  if (event.target.innerHTML === 'Home') {
    populateCards(cookbook.recipes);
    favButton.innerHTML = 'View Favorites'
  } else {
    favButton.innerHTML = 'Home';
    if (!user.favoriteRecipes.length) {
      cardArea.innerHTML = 'You have no favorites!'
    } else {
      populateCards(user.favoriteRecipes);
    }
  }
}

function greetUser() {
  const userName = document.querySelector('.user-name');
  userName.innerHTML =
    user.name.split(' ')[0] + ' ' + user.name.split(' ')[1][0];
}

function favoriteCard(event) {
  //const specificRecipe = "";
  getData()
    .then(allData => {
      let cookbook = new Cookbook(allData.recipeData);
      let specificRecipe = cookbook.recipes.find(recipe => {
        if (recipe.id === Number(event.target.id)) {
          return recipe;
        }
      })
      if (!event.target.classList.contains('favorite-active')) {
        event.target.classList.add('favorite-active');
        favButton.innerHTML = 'View Favorites';
        user.addToFavorites(specificRecipe);
      } else if (event.target.classList.contains('favorite-active')) {
        event.target.classList.remove('favorite-active');
        user.removeFromFavorites(specificRecipe)
      }
    })
}

function cardButtonConditionals(event) {
  // getData()
  //   .then(allData => {
  if (event.target.classList.contains('favorite')) {
    favoriteCard(event);
  } else if (event.target.classList.contains('card-picture')) {
    displayDirections(event);
  } else if (event.target.classList.contains('home')) {
    favButton.innerHTML = 'View Favorites';
    // let cookbook = new Cookbook(allData.recipeData);
    populateCards(cookbook);
  }
  // })
  //WIP - need to refactor!!!!
}


function displayDirections(event) {
  getData()
    .then(allData => {
      let cookbook = new Cookbook(allData.recipeData);
      let newRecipeInfo = cookbook.recipes.find(recipe => {
        if (recipe.id === Number(event.target.id)) {
          return recipe;
        }
      })
      let recipeObject = new Recipe(newRecipeInfo, allData.ingredientData);
      let cost = recipeObject.calculateCost()
      let costInDollars = (cost / 100).toFixed(2)
      cardArea.classList.add('all');
      cardArea.innerHTML = `<h3>${recipeObject.name}</h3>
      <p class='all-recipe-info'>
      <strong>It will cost: </strong><span class='cost recipe-info'>
      $${costInDollars}</span><br><br>
      <strong>You will need: </strong><span class='ingredients recipe-info'></span>
      <strong>Instructions: </strong><ol><span class='instructions recipe-info'>
      </span></ol>
      </p>`;
      let ingredientsSpan = document.querySelector('.ingredients');
      let instructionsSpan = document.querySelector('.instructions');
      recipeObject.ingredients.forEach(ingredient => {
        ingredientsSpan.insertAdjacentHTML('afterbegin', `<ul><li>
        ${ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit}
        ${ingredient.name}</li></ul>
        `)
      })
      recipeObject.instructions.forEach(instruction => {
        instructionsSpan.insertAdjacentHTML('beforebegin', `<li>
        ${instruction.instruction}</li>
        `)
      })
    })
}

function populateCards(recipes) {
  const markup = recipes.map(recipe => {
    const isFavorite = user.favoriteRecipes.some(favoriteRecipe => {
      return favoriteRecipe.id === recipe.id;
    });

    return `
    <article id='${recipe.id}' class='card'>
        <header id='${recipe.id}' class='card-header'>
          <label for='add-button' class='hidden'>Click to add recipe</label>
          <button id='${recipe.id}' 
              aria-label='add-button' 
              class='add-button card-button'>
            <img id='${recipe.id} favorite' class='add'
            src='https://image.flaticon.com/icons/svg/32/32339.svg' alt='Add to
            recipes to cook'>
          </button>
          <label for='favorite-button' class='hidden'>Click to favorite recipe
          </label>
          <button id='${recipe.id}' 
              aria-label='favorite-button' 
              class='favorite 
                ${isFavorite ? "favorite-active" : ""} 
              card-button'>
          </button>
        </header>
          <span id='${recipe.id}' class='recipe-name'>${recipe.name}</span>
          <img id='${recipe.id}' tabindex='0' class='card-picture'
          src='${recipe.image}' alt='click to view recipe for ${recipe.name}'>
    </article>`
  }).join("");

  cardArea.innerHTML = markup;
}
