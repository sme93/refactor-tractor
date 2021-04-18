class Pantry {
  constructor(userPantry) {
    this.contents = userPantry;
    this.pantryIngredients = [];
    this.pantryAmounts = [];
  }

  populatePantry() {
    if (!this.pantryIngredients.length) {
    this.contents.forEach(item => {
      this.pantryIngredients.push(item.ingredient);
      this.pantryAmounts.push(item.amount);
      return
    })
  }
  }

  checkForIngr(recipe) {
    this.populatePantry();
    const missingIngredients = [];
    let difference;
    recipe.ingredients.forEach(ingredient => {
      let currentIngredient = this.pantryIngredients.indexOf(ingredient.id);
      if (!this.pantryIngredients.includes(ingredient.id)) {
        missingIngredients.push({
          name: ingredient,
          amount: ingredient.quantity.amount
        })
      } else if (ingredient.quantity.amount > this.pantryAmounts[currentIngredient]) {
        difference = ingredient.quantity.amount - this.pantryAmounts[currentIngredient];
        missingIngredients.push({
          name: ingredient,
          amount: difference
        })
      }
    });
    if (missingIngredients.length) {
      return missingIngredients
    } else {
      return "You have all of the ingredients that you need!"
    }
  }

  cookMeal(recipe) {
    if (this.checkForIngr(recipe) !== "You have all of the ingredients that you need!") {
      return "Sorry, you dont have the required ingredients"
    } else {
      recipe.ingredients.forEach(ingredient => {
        let currentIngredient = this.pantryIngredients.indexOf(ingredient.id);
        return this.pantryAmounts[currentIngredient] -= ingredient.quantity.amount;
      });
    }
  }
}

export default Pantry;
