import {expect} from 'chai';


import { recipeData } from '../src/data/testData.js';
import Cookbook from '../src/cookbook.js';

let cookbook;

describe('Cookbook', () => {
  beforeEach(() => {
    cookbook = new Cookbook(recipeData);
  });

  it('Should have an array of all recipes', () => {
    expect(cookbook.recipes).to.be.an('array');
  });

  it('Should filter recipes based on an ingredient', () => {
    expect(cookbook.findRecipe('all purpose flour').length).to.equal(2);
  })

  it('Should filter by an ingredient regardless of capitalization', () => {
    expect(cookbook.findRecipe('ALL purpose FLOUR').length).to.equal(2);
  })

  it('Should filter recipes based on a name', () => {
    expect(cookbook.findRecipe('Elvis Pancakes').length).to.equal(1);
  })

  it('Should filter by a name regardless of capitalization', () => {
    expect(cookbook.findRecipe('ElViS PaNcAkEs').length).to.equal(1);
  })

  it('Should filter recipes based on one or more tags', () => {
    expect(cookbook.findRecipeByTags('appetizer').length).to.equal(1);
  })
})
