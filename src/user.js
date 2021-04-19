import Search from './search';

class User extends Search {
  constructor(id, name, pantry) {
    super();
    this.id = id;
    this.name = name;
    this.pantry = pantry;
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
