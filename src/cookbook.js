import Search from './search';

class Cookbook extends Search {
  constructor(data) {
    super();
    this.recipes = data;
  }

  findRecipe(searchText) {
    const newSearchText = searchText.toLowerCase()
    return this.recipes.filter(recipe => {
      return recipe.ingredients.find(ingredient => {
        return (ingredient.name.toLowerCase().includes(newSearchText)) ||
       (recipe.name.toLowerCase().includes(newSearchText))
      });
    })
  }

}

export default Cookbook;
