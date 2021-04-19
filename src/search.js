class Searchable {
    constructor() {

    }

    filterFavorites(tag) {
    return this.favoriteRecipes.filter(recipe => {
      return recipe.tags.includes(tag);
    });
  }

  findFavorites(nameOrIngredient) {
    const newSearchText = nameOrIngredient.toLowerCase();
    return this.favoriteRecipes.filter(recipe => {
      return recipe.name.toLowerCase().includes(newSearchText)
      || recipe.ingredients.find(ingredient => {
        return ingredient.name.toLowerCase().includes(newSearchText)
      });
    });
  }
}


export default Searchable;