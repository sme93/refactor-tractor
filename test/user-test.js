import { expect } from 'chai';

import User from '../src/user.js';
import recipeData from '../src/data/recipes.js'


let defaultUser;

describe('User', () => {
  beforeEach(() => {
    defaultUser = new User(2, 'Ruth');
  });

  it('should be an instance of a User', () => {
    expect(defaultUser).to.be.an.instanceof(User);
  });

  it("should have an id", () => {
    expect(defaultUser.id).to.equal(2);
  });

  it("should have a name", () => {
    expect(defaultUser.name).to.equal('Ruth');
  });

  it('should not have any favorite recipes by default', () => {
    expect(defaultUser.favoriteRecipes).to.eql([]);
  });

  it('should be able to add recipes to favoriteRecipes', () => {
    defaultUser.addToFavorites(recipeData[0]);

    expect(defaultUser.favoriteRecipes[0]).to.eql(recipeData[0]);
  });

  it('should not add duplicate tests to favoriteRecipes', () => {
    defaultUser.addToFavorites(recipeData[0]);
    defaultUser.addToFavorites(recipeData[0]);

    expect(defaultUser.favoriteRecipes.length).to.equal(1);
  });

  it('should be able to remove recipes from favoriteRecipes', () => {
    defaultUser.addToFavorites(recipeData[0]);
    defaultUser.addToFavorites(recipeData[1]);
    defaultUser.addToFavorites(recipeData[2]);
    defaultUser.removeFromFavorites(recipeData[0]);

    expect(defaultUser.favoriteRecipes[0]).to.eql(recipeData[1]);
  });

  it('should be able to add recipes to recipesToCook', () => {
    defaultUser.addToRecipesToCook(recipeData[0]);

    expect(defaultUser.recipesToCook[0]).to.eql(recipeData[0]);
  });

  it('should be able to add not add duplicate recipe to recipesToCook', () => {
    defaultUser.addToRecipesToCook(recipeData[0]);
    defaultUser.addToRecipesToCook(recipeData[0]);

    expect(defaultUser.recipesToCook.length).to.equal(1);
  });

  it('should be able to filter through favoriteRecipes by tag', () => {
    defaultUser.addToFavorites(recipeData[0]);
    defaultUser.addToFavorites(recipeData[1]);

    expect(defaultUser.filterFavorites('snack')).to.eql([recipeData[0]]);
  });

  it('should be able to search favoriteRecipes by name', () => {
    defaultUser.addToFavorites(recipeData[0]);
    defaultUser.addToFavorites(recipeData[1]);

    expect(defaultUser.findFavorites('cookie')).to.eql([recipeData[0]]);
  });

  it(`should be able to search favoriteRecipes,
            without regard to capitalization`, () => {
    defaultUser.addToFavorites(recipeData[0]);
    defaultUser.addToFavorites(recipeData[1]);

    expect(defaultUser.findFavorites('PUDDING')).to.eql([recipeData[0]]);
  });

  it('should be able to search favoriteRecipes by ingredient', () => {
    defaultUser.addToFavorites(recipeData[0]);
    defaultUser.addToFavorites(recipeData[1]);

    expect(defaultUser.findFavorites('apples')).to.eql([recipeData[1]]);
  });
});
