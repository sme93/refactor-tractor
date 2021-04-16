class Pantry {
  constructor(userPantry) {
    this.contents = userPantry;
    this.pantryIngredients = [];
    this.pantryAmounts = [];
  }

  populatePantry() {
    this.contents.forEach(item => {
      this.pantryIngredients.push(item.ingredient);
      this.pantryAmounts.push(item.amount);
      return
    })
  }

  checkForIngr(recipe) {
    this.populatePantry()
    const checkedIngredients = [];
    let difference;
    recipe.ingredients.forEach(ingredient => {
      if(!this.pantryIngredients.includes(ingredient.id)) {
        return checkedIngredients.push(`You don't have ${ingredient.name}, you need ${ingredient.quantity.amount} more`)
      } else if (ingredient.quantity.amount > this.pantryAmounts[this.pantryIngredients.indexOf(ingredient.id)]) {
        difference = this.pantryAmounts[this.pantryIngredients.indexOf(ingredient.id)] - ingredient.quantity.amount;
        return checkedIngredients.push(`You don't have enough ${ingredient.name} you need ${difference} more`)
      } else {
        return checkedIngredients.push(`You have enough ${ingredient.name}`)
      }
    });
    return checkedIngredients.join(", ");
  }

  removeIngr(recipe) {
    if(this.checkForIngr(recipe).includes("don't")) {
      return "Sorry, you dont have the required ingredients"
    } else {
      recipe.ingredients.forEach(ingredient => {
        return this.pantryAmounts[this.pantryIngredients.indexOf(ingredient.id)] -= ingredient.quantity.amount;
      });
    }
  }
}

export default Pantry;
