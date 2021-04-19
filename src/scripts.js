// import './css/base.scss';
// import './css/styles.scss';
import './css/main.scss';

import getData from './network-requests';

import Pantry from './pantry';
import Recipe from './recipe';
import User from './user';
import Cookbook from './cookbook';

const favButton = document.querySelector('#viewFavoritesButton');
//let homeButton = document.querySelector('.home')
const cardArea = document.querySelector('#allCards');
const tagArea = document.querySelector('#allTags');
const searchBar = document.getElementById('search-bar')
const expandFilters = document.querySelector('#expandFilters');
const showPantryButton = document.querySelector('#viewPantryButton')
const pantrySection = document.querySelector('#pantry')
let user, pantry, cookbook, ingredients;

window.onload = onStartup();

favButton.addEventListener('click', viewFavorites);
cardArea.addEventListener('click', cardButtonConditionals);
tagArea.addEventListener('click', filterByTag);
searchBar.addEventListener('keyup', filterBySearch)
expandFilters.addEventListener('click', toggleFilters);
cardArea.addEventListener('click', toggleViewRecipeDetails);
showPantryButton.addEventListener('click', showPantry);

function onStartup() {
  getData()
    .then(allData => {
      const randomIndexInArray = Math.floor(
        Math.random() * allData.userData.length);
      const randomUser = allData.userData[randomIndexInArray];
      user = new User(randomUser.id, randomUser.name, randomUser.pantry);
      cookbook = new Cookbook(allData.recipeData);
      ingredients = allData.ingredientData;
      pantry = new Pantry(randomUser.pantry);
      populatePantryList(pantry, ingredients);
      populateCards(cookbook.recipes);
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
    populateCards(cookbook.recipes);
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
  //select any filter with the active class
  const activeFilterButtons = document
    .querySelectorAll('#allTags .nav-button.active');
  //turns nodeList into array, maps to get just the id(the string for the tag)
  const activeTags = [...activeFilterButtons].map(button => button.id);
  //for each tag, call cookbook.findRecipeByTag method
  //spread contents of result into filtered recipes
  //populate cards with the filtered recipes
  const filteredRecipes = activeTags.reduce((acc, tag) => {
    return [...acc, ...cookbook.findRecipeByTags(tag)];
  }, []);

  populateCards(filteredRecipes);
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
        // favButton.innerHTML = 'View Favorites';
        user.addToFavorites(specificRecipe);
      } else if (event.target.classList.contains('favorite-active')) {
        event.target.classList.remove('favorite-active');
        user.removeFromFavorites(specificRecipe)
      }
    })
}

function cardButtonConditionals(event) {
  // console.log(event.target)
  // getData()
  //   .then(allData => {
  if (event.target.classList.contains('favorite')) {
    favoriteCard(event);
  } else if (event.target.classList.contains('add-button')) {
    addCardToCook(event);
    event.target.classList.add('is-added-to-cookbook');//dom manipulation!
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

function toggleViewRecipeDetails(event) {
  if (event.target.classList.contains('card-picture')) {
    const recipeInfo = cookbook.recipes.find(recipe => {
      if (recipe.id === Number(event.target.id)) {
        return recipe;
      }
    })
    cardArea.classList.add('all');
    const recipe = new Recipe(recipeInfo, ingredients);
    const missingIngredients = `<p>${showMissingIngredients(recipe, ingredients)}</p>`
    const recipeName = `<div><h1>${recipe.name}</h1></div>`
    const recipeImg = `<img src=${recipe.image} alt=${recipe.name}>`
    const ingredientsList = `
      <div>
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
    <div>
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
                            ${missingIngredients}
                            ${recipeName}
                            <div>${recipeImg}${ingredientsList}</div>
                            ${recipeDirections}
                            ${recipeCost}
                          </article>`
  }
}

//do not Delete this function just yet - we might need to look at some of these
//classes in CSS
function displayDirections(event) {
  // getData()
  //   .then(allData => {
  //     let cookbook = new Cookbook(allData.recipeData);
  //     let newRecipeInfo = cookbook.recipes.find(recipe => {
  //       if (recipe.id === Number(event.target.id)) {
  //         return recipe;
  //       }
  //     })
  //     let recipeObject = new Recipe(newRecipeInfo, allData.ingredientData);
  //     let cost = recipeObject.calculateCost()
  //     let costInDollars = (cost / 100).toFixed(2)
  //     cardArea.classList.add('all');
  //     cardArea.innerHTML = `<h3>${recipeObject.name}</h3>
  //     <p class='all-recipe-info'>
  //     <strong>It will cost: </strong><span class='cost recipe-info'>
  //     $${costInDollars}</span><br><br>
  //     <strong>You will need: </strong><span class='ingredients recipe-info'></span>
  //     <strong>Instructions: </strong><ol><span class='instructions recipe-info'>
  //     </span></ol>
  //     </p>`;
  //     let ingredientsSpan = document.querySelector('.ingredients');
  //     let instructionsSpan = document.querySelector('.instructions');
  //     recipeObject.ingredients.forEach(ingredient => {
  //       ingredientsSpan.insertAdjacentHTML('afterbegin', `<ul><li>
  //       ${ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit}
  //       ${ingredient.name}</li></ul>
  //       `)
  //     })
  //     recipeObject.instructions.forEach(instruction => {
  //       instructionsSpan.insertAdjacentHTML('beforebegin', `<li>
  //       ${instruction.instruction}</li>
  //       `)
  //     })
  //   })
}

function populateCards(recipes) {
  const htmlString = recipes.map(recipe => {
    const { id, name, image } = recipe;
    const isFavorite = user.favoriteRecipes.some(favoriteRecipe => favoriteRecipe.id === id);
    const isRecipeToCook = user.recipesToCook.some(toCookRecipeID=> toCookRecipeID === id);
    return `
    <article id='${id}' class='card'>
        <header id='${id}' class='card-header'>
          <label for='add-button' class='hidden'>Click to add recipe</label>
          <button
              aria-label='add-button'
              class='add-button card-button ${isRecipeToCook ? "is-added-to-cookbook" : ''}'>
            <img id='${id} favorite' class='add'
            src='https://image.flaticon.com/icons/svg/32/32339.svg' alt='Add to
            recipes to cook'>
          </button>
          <label for='favorite-button' class='hidden'>Click to favorite recipe
          </label>
          <button id='${id}'
              aria-label='favorite-button'
              class='favorite
                ${isFavorite ? "favorite-active" : ""}
              card-button'>
          </button>
        </header>
          <span id='${id}' class='recipe-name'>${name}</span>
          <img id='${id}' tabindex='0' class='card-picture'
          src='${image}' alt='click to view recipe for ${name}'>
    </article>`
  })

  cardArea.innerHTML = htmlString.join("");
}

function addCardToCook(event) {
  const { id } = event.target.closest('.card');
  const idAsInteger = parseInt(id);
  user.addToRecipesToCook(idAsInteger);
  return idAsInteger;
}



function helper(recipes, search) {
  let result = [];
  result = recipes.filter(recipe => {
    return recipe.name.toLowerCase().includes(search)
  })
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      if (ingredient.name.toLowerCase().includes(search)) {
        result.push(recipe)
      }
    })
  })
  return result;
}

function filterBySearch(e) {//helper(user.favoriteRecipes)
  const searchText = e.target.value.toLowerCase();
  // let result;
  if (favButton.innerHTML === 'Home') {
    combineDataSets(user.favoriteRecipes, ingredients)
    let result = helper(user.favoriteRecipes, searchText)
    const finalResult = [...new Set(result)];
    populateCards(finalResult);
  } else {
    // const searchText = e.target.value.toLowerCase();
    combineDataSets(cookbook.recipes, ingredients);
    let result;
    result = cookbook.recipes.filter(recipe => {
      return recipe.name.toLowerCase().includes(searchText)
    })
    cookbook.recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (ingredient.name.toLowerCase().includes(searchText)) {
          result.push(recipe)
        }
      })
    })
    const finalResult = [...new Set(result)];
    populateCards(finalResult);
  }
}


// function filterBySearch(e) {
//   if (favButton.innerHTML === 'Home') {
//     combineDataSets(user.favoriteRecipes, ingredients)
//     const searchText = e.target.value.toLowerCase();
//     let result;
//     result = user.favoriteRecipes.filter(recipe => {
//       return recipe.name.toLowerCase().includes(searchText)
//     })
//     user.favoriteRecipes.forEach(recipe => {
//       recipe.ingredients.forEach(ingredient => {
//         if (ingredient.name.toLowerCase().includes(searchText)) {
//           result.push(recipe)
//         }
//       })
//     })
//     const finalResult = [...new Set(result)];
//     populateCards(finalResult);
//   } else {
//     const searchText = e.target.value.toLowerCase();
//     combineDataSets(cookbook.recipes, ingredients);
//     let result;
//     result = cookbook.recipes.filter(recipe => {
//       return recipe.name.toLowerCase().includes(searchText)
//     })
//     cookbook.recipes.forEach(recipe => {
//       recipe.ingredients.forEach(ingredient => {
//         if (ingredient.name.toLowerCase().includes(searchText)) {
//           result.push(recipe)
//         }
//       })
//     })
//     const finalResult = [...new Set(result)];
//     populateCards(finalResult);
//   }
// }

function combineDataSets(recipeData, ingredientsData) {
  recipeData.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      let ingredientID = ingredient.id;
      ingredientsData.forEach(ingredientOnList => {
        if (ingredientOnList.id === ingredientID) {
          ingredient['name'] = ingredientOnList.name;
          ingredient['estimatedCostInCents'] = ingredientOnList.estimatedCostInCents;
        }
      })
    })
  })
}

function showPantry() {
  pantrySection.classList.toggle('hidden');
  cardArea.classList.toggle('hidden')
  if (showPantryButton.innerText === "View Pantry") {
    showPantryButton.innerHTML = "Home"
  } else {
    showPantryButton.innerHTML = "View Pantry"
  }
}

function populatePantryList(pantry, ingredients) {
  pantry.populatePantry();
  ingredients.forEach((ingredient, i) => {
    if (pantry.pantryIngredients.some((item) => item === ingredient.id)) {
      pantry.pantryIngredients.forEach((item, i) => {
        if (item === ingredient.id) {
          let currentAmount = pantry.pantryAmounts[i]
          pantrySection.innerHTML +=
            `<li class='pantry-items' id='pantryItems'>${ingredient.name}: ${currentAmount}</li>`
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
    missingIngredients.forEach(ingredient => ingredientValues.push(ingredient.amount));

    ingredients.forEach((ingredient, i) => {
      if (missingIngredients.some((item, i) => item.name === ingredient.id)) {
        ingredientNames.push(ingredient.name);
      }
    });
    ingredientNames.forEach((item, i) => {
      response.push(`${ingredientNames[i]}: ${ingredientValues[i]}`)
    });
    return response.join(", ")
  }
}
