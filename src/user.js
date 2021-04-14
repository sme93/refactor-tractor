class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.recipesToCook = [];
    this.favoriteRecipes = [];
  }

  addToFavorites(recipe) {
    if (!this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.push(recipe);
    }
  }

  removeFromFavorites(recipe) {
    const i = this.favoriteRecipes.indexOf(recipe);
    this.favoriteRecipes.splice(i, 1);
  }

  addToRecipesToCook(recipe) {
    if (!this.recipesToCook.includes(recipe)) {
      this.recipesToCook.push(recipe);
    }
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

export default User;
