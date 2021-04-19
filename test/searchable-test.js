import { expect } from 'chai';

import Searchable from '../src/searchable.js';
import { recipeData } from '../src/data/testData.js'

let search;

describe('Searchable', () => {

  beforeEach(() => {
    search = new Searchable();
  });

  it('should be an instance of a Searchable', () => {
    expect(search).to.be.an.instanceof(Searchable);
  });

  it('should be able to filter through favoriteRecipes by tag', () => {
    search.addToFavorites(recipeData[0]);
    search.addToFavorites(recipeData[1]);

    expect(search.filterFavorites('snack')).to.eql([recipeData[0]]);
  });

  it('should be able to search favoriteRecipes by name', () => {
    search.addToFavorites(recipeData[0]);
    search.addToFavorites(recipeData[1]);

    expect(search.findFavorites('cookie')).to.eql([recipeData[0]]);
  });

  it(`should be able to search favoriteRecipes,
            without regard to capitalization`, () => {
    search.addToFavorites(recipeData[0]);
    search.addToFavorites(recipeData[1]);

    expect(search.findFavorites('PUDDING')).to.eql([recipeData[0]]);
  });

  it('should be able to search favoriteRecipes by ingredient', () => {
    search.addToFavorites(recipeData[0]);
    search.addToFavorites(recipeData[1]);

    expect(search.findFavorites('apples')).to.eql([recipeData[1]]);
  });
});