import './scripts.js'

let domUpdates = {
  populateCards(recipes) {
    const htmlString = recipes.map(recipe => {
      const { id, name, image } = recipe;
      const isFavorite = user.favoriteRecipes
        .some(favoriteRecipe => favoriteRecipe.id === id);
      const isRecipeToCook = user.recipesToCook
        .some(toCookRecipeID=> toCookRecipeID === id);
      return `
      <article class='card'>
          <div id='${id}' class='card-header'>
            <label for='add-button' class='hidden'>Click to add recipe</label>
            <button
                aria-label='add-button'
                class='
                  add-button
                  card-button
                  ${isRecipeToCook ? "is-added-to-cookbook" : ''}'>
              <img class='add'
              src='https://image.flaticon.com/icons/svg/32/32339.svg' alt='Add to
              recipes to cook'>
            </button>
            <label for='favorite-button' class='hidden'>Click to favorite recipe
            </label>
            <button id='favorite-${id}'
                aria-label='favorite-button'
                class='favorite
                  ${isFavorite ? "favorite-active" : ""}
                card-button'>
            </button>
          </div>
            <span class='recipe-name'>${name}</span>
            <img id='img-${id}'
                  tabindex='0'
                  class='card-picture'
                  src='${image}'
                  alt='click to view recipe for ${name}'>
      </article>`
    })

    cardArea.innerHTML = htmlString.join("");
  }

}







export default domUpdates;
