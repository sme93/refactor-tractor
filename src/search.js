class Search {
  constructor() {
  }

  filterByTag(tag, recipes) {
    return recipes.filter(recipe => {
      return recipe.tags.includes(tag);
    });
  }

}


export default Search;