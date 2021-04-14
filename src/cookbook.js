class Cookbook {
  constructor(data) {
    this.recipes = data;//an array of 50 recipes
  }

  // findRecipe(searchText) {
  //   let newSearchText = searchText.toLowerCase();
  //   return this.recipes.filter(recipe => {
  //     return recipe.ingredients.find(ingredient => {
  //       return (ingredient.name.includes(newSearchText)) ||
  //       (recipe.name.toLowerCase().includes(newSearchText))
  //     });
  //   })
  // }

  findRecipeByIngredient(searchText) {
    return this.recipes.filter(recipe => {
     return recipe.ingredients.some(ingredient => {
       return ingredient.name.toLowerCase().includes(searchText.toLowerCase())
     })
    })
  }

  findRecipeByName(searchText) {
    return this.recipes.filter(recipe => recipe.name.toLowerCase().includes(searchText.toLowerCase()));
  }
}



export default Cookbook;



// It should have a parameter to take in recipe data.
// It should have methods to determine:
//   A filtered list of recipes based on one or more tags.
//   A filtered list of recipes based on its name or ingredients.
