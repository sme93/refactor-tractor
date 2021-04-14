import {expect} from 'chai';


import recipeData from '../src/data/recipes';
import Cookbook from '../src/cookbook';

let cookbook;

describe('Cookbook', () => {
  beforeEach(() => {
    cookbook = new Cookbook(recipeData);
  });

  it('Should have an array of all recipes', () => {
    expect(cookbook.recipes).to.be.an('array');
  });

  it('Should filter recipes based on an ingredient', () => {
    expect(cookbook.findRecipeByIngredient('instant vanilla pudding mix').length).to.equal(2)
  })

})
