import { expect } from 'chai';

import Recipe from '../src/recipe.js';
import { recipeData } from '../src/data/testData.js';
import { ingredientsData } from '../src/data/testData.js';

let recipe;

describe('Recipe', () => {
  beforeEach(() => {

    recipe = new Recipe(recipeData[0], ingredientsData);
  });

  describe('Recipe Data', () => {

    it('Should hold its own ingredient data', () => {
      expect(recipe.ingredients).to.equal(recipeData[0].ingredients);
    })

    it('Should hold its own instruction data', () => {
      expect(recipe.instructions).to.equal(recipeData[0].instructions);
    })

    it('Should store a name', () => {
      expect(recipe.name).to.equal(recipeData[0].name);
    })

    it('Should store an id', () => {
      expect(recipe.id).to.equal(recipeData[0].id);
    })

    it('Should store tags', () => {
      expect(recipe.tags).to.equal(recipeData[0].tags);
    })

    it('Should store ingredient data', () => {
      expect(recipe.ingredientsData).to.deep.equal(ingredientsData);
    })

    it('Should store the image of the recipe', () => {
      expect(recipe.image).to.equal(recipeData[0].image);
    })

  })

  it('Should be able to calculate the cost of its ingredients', () => {
    expect(recipe.calculateCost()).to.equal(17776);
  });

  it('Should be able to return the recipe ingredients', () => {
    const mockRecipe = {
      ingredients: [
        {id: 5, some: "property"},
        {id: 7, some: "property"}
      ]
    }
    const mockIngredients = [
      {id: 5, name: "wheat flour"},
      {id: 7, name: "corn"},
      {id: 9, name: "doesn't appear"}
    ]
    const expectedResult = [
      {id: 5, name: "wheat flour", some: "property"},
      {id: 7, name: "corn", some: "property"},
    ]

    recipe = new Recipe(mockRecipe, mockIngredients);
    expect(recipe.returnIngredients()).to.deep.equal(expectedResult);
  });

  it('Should be able to return the recipe instructions', () => {
    const mockRecipe = {
      instructions: [
        {instruction: 'blah', number: 3},
        {instruction: 'boo', number: 4}
      ]
    }
    recipe = new Recipe(mockRecipe, []);
    expect(recipe.returnInstructions()).to.equal('3. blah. 4. boo.');
  });


});
