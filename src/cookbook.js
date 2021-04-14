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


  findRecipeByTags(tags) {
   return this.recipes.filter(recipe => {
     return recipe.tags.every(tag => recipe.tags.includes(tag));
   });
 }
}

export default Cookbook;




//   A filtered list of recipes based on one or more tags.
