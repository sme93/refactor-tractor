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
    expect(cookbook.findRecipe('instant vanilla pudding mix').length).to.equal(2);
  })

  it('Should filter by an ingredient regardless of capitalization', () => {
    expect(cookbook.findRecipe('INSTANT vanilla PUDDING mix').length).to.equal(2);
  })

  it('Should filter recipes based on a name', () => {
    expect(cookbook.findRecipe('Ambrosia Cupcakes').length).to.equal(1);
  })

  it('Should filter by a name regardless of capitalization', () => {
    expect(cookbook.findRecipe('ambrosia CUPCAKES').length).to.equal(1);
  })

  it('Should filter recipes based on one or more tags', () => {
    expect(cookbook.findRecipeByTags('appetizer').length).to.equal(9);
  })
})
