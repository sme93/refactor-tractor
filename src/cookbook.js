class Cookbook {
  constructor(data) {
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

  findRecipeByTags(tag) {
    return this.recipes.filter(recipe => recipe.tags.includes(tag))
  }

}

export default Cookbook;
