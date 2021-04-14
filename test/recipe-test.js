import { expect } from 'chai';

import Recipe from '../src/recipe.js';
import recipeData from '../src/data/recipes.js';
import ingredientsData from '../src/data/ingredients.js';

let recipe;

describe('Recipe', () => {
  beforeEach(() => {

    recipe = new Recipe(recipeData[47], ingredientsData);
  });

  describe('Recipe Data', () => {

    it('Should hold its own ingredient data', () => {
      expect(recipe.ingredients).to.equal(recipeData[47].ingredients);
    })

    it('Should hold its own instruction data', () => {
      expect(recipe.instructions).to.equal(recipeData[47].instructions);
    })

    it('Should store a name', () => {
      expect(recipe.name).to.equal(recipeData[47].name);
    })

    it('Should store an id', () => {
      expect(recipe.id).to.equal(recipeData[47].id);
    })

    it('Should store tags', () => {
      expect(recipe.tags).to.equal(recipeData[47].tags);
    })

    it('Should store ingredient data', () => {
      expect(recipe.ingredientsData).to.deep.equal(ingredientsData);
    })

    it('Should store the image of the recipe', () => {
      expect(recipe.image).to.equal(recipeData[47].image);
    })

  })

  it('Should be able to calculate the cost of its ingredients', () => {
    expect(recipe.calculateCost()).to.equal(4166);
  });

  it('Should be able to return the recipe ingredients', () => {
    expect(recipe.returnIngredients()).to.deep.equal(recipeData[47].ingredients);
  });

  it('Should be able to return the recipe instructions', () => {
    expect(recipe.returnInstructions()).to.deep.equal(recipeData[47].instructions);
  });


});
