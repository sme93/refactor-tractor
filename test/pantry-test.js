import { expect } from 'chai';



it('should be able to check ingredients in User/s pantry for a given recipe', () => {
  expect(pantry.checkPantry(recipeIngredients)).to.eql('You have the ingredients!');
});

it('should inform User if they lack required ingredients for a given recipe', () => {
  expect(pantry.checkPantry(recipeIngredients)).to.eql(missingIngredientsWithPrice);
});