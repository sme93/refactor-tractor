class Recipe {
  constructor(recipe, ingredientsData) {
    this.name = recipe.name;
    this.id = recipe.id;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.tags = recipe.tags;
    this.ingredientsData = ingredientsData;
    this.image = recipe.image;
  }

  calculateCost() {
    let costCounter = 0;
    this.ingredients.forEach(ingredient => {
      this.ingredientsData.find(specificIngredient => {
        if (specificIngredient.id === ingredient.id) {
          costCounter += (Number(specificIngredient.estimatedCostInCents) *
          Number(ingredient.quantity.amount))
        }
      })
    });
    return costCounter;
  }

  returnIngredients() {
    const correctIngredient = this.ingredients.reduce((acc, ingredient) => {
      const ingredientId = ingredient.id
      const foundIngredient = this.ingredientsData.find(ingr => {
        return ingr.id === ingredientId;
      });
      
      const mergedIngredient = Object.assign(ingredient, foundIngredient)
      return [...acc, mergedIngredient]
    }, []);

    return correctIngredient;
  }

  returnInstructions() {
    const numberedInstructions = this.instructions.map(instruction => {
      return `${instruction.number}. ${instruction.instruction}.`
    })
    return numberedInstructions.join(' ');
  }

}

export default Recipe;
