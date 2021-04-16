import './css/base.scss';
import './css/styles.scss';

import getData from './network-requests';

import Pantry from './pantry';
import Recipe from './recipe';
import User from './user';
import Cookbook from './cookbook';

let favButton = document.querySelector('.view-favorites');
let homeButton = document.querySelector('.home')
let cardArea = document.querySelector('.all-cards');
let user, pantry;

window.onload = onStartup();

homeButton.addEventListener('click', cardButtonConditionals);
favButton.addEventListener('click', viewFavorites);
cardArea.addEventListener('click', cardButtonConditionals);

function onStartup() {
  getData()
    .then(allData => {
      const randomIndexInArray = Math.floor(
        Math.random() * allData.userData.length);
      const randomUser = allData.userData[randomIndexInArray];
      user = new User(randomUser.id, randomUser.name, randomUser.pantry);
      //pantry = new Pantry(randomUser.pantry);
      const cookbook = new Cookbook(allData.recipeData);
      populateCards(cookbook);
      greetUser();
    });
}

function viewFavorites() {
  getData()
    .then(allData => {
      if (cardArea.classList.contains('all')) {
        cardArea.classList.remove('all')
      }
      if (!user.favoriteRecipes.length) {
        favButton.innerHTML = 'You have no favorites!';
        let cookbook = new Cookbook(allData.recipeData);
        populateCards(cookbook.recipes);
        return
      } else {
        favButton.innerHTML = 'Refresh Favorites'
        cardArea.innerHTML = '';
        user.favoriteRecipes.forEach(recipe => {
          cardArea.insertAdjacentHTML('afterbegin', `<div id='${recipe.id}'
      class='card'>
      <header id='${recipe.id}' class='card-header'>
      <label for='add-button' class='hidden'>Click to add recipe</label>
      <button id='${recipe.id}' aria-label='add-button' class='add-button card-button'>
      <img id='${recipe.id}' class='add'
      src='https://image.flaticon.com/icons/svg/32/32339.svg' alt='Add to
      recipes to cook'></button>
      <label for='favorite-button' class='hidden'>Click to favorite recipe
      </label>
      <button id='${recipe.id}' aria-label='favorite-button' class='favorite favorite-active card-button'>
      </button></header>
      <span id='${recipe.id}' class='recipe-name'>${recipe.name}</span>
      <img id='${recipe.id}' tabindex='0' class='card-picture'
      src='${recipe.image}' alt='Food from recipe'>
      </div>`)
        })
      }
    })
}

function greetUser() {
  const userName = document.querySelector('.user-name');
  userName.innerHTML =
    user.name.split(' ')[0] + ' ' + user.name.split(' ')[1][0];
}

function favoriteCard(event) {
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
  getData()
    .then(allData => {
      if (event.target.classList.contains('favorite')) {
        favoriteCard(event);
      } else if (event.target.classList.contains('card-picture')) {
        displayDirections(event);
      } else if (event.target.classList.contains('home')) {
        favButton.innerHTML = 'View Favorites';
        let cookbook = new Cookbook(allData.recipeData);
        populateCards(cookbook);
      }
    })
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

function populateCards(cookbook) {
  const { recipes } = cookbook;

  const markup = recipes.map(recipe => {
    const isFavorite = user.favoriteRecipes.some(favoriteRecipe => {
      return favoriteRecipe === recipe.id;
    });

    return `
    <div id='${recipe.id}' class='card'>
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
    </div>`
  }).join("");

  cardArea.innerHTML = markup;
}
