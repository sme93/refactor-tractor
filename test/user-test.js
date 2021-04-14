import { expect } from 'chai';

import User from '../src/user.js';
import recipeData from '../src/data/recipes.js'

let id;
let username;

describe('User', () => {
  beforeEach(() => {
    id = 2;
    username = 'Ruth';
  });

  it('should be an instance of a User', () => {
    const user = new User(id, username);

    expect(user).to.be.an.instanceof(User);
  });

  it("should have an id", () => {
    const user = new User(41, username);

    expect(user.id).to.equal(41);
  });

  it("should have a name", () => {
    const user = new User(id, "Marvin Gaye");

    expect(user.name).to.equal("Marvin Gaye");
  });

  it('should not have any favorite recipes by default', () => {
    const user = new User(id, username);

    expect(user.favoriteRecipes).to.eql([]);
  });

  it('should be able to add recipes to favoriteRecipes', () => {
    const user = new User(id, username);

    user.addToFavorites(recipeData[0]);
    expect(user.favoriteRecipes[0]).to.eql(recipeData[0]);
  });

  it('should not add duplicate tests to favoriteRecipes', () => {
    const user = new User(id, username);

    user.addToFavorites(recipeData[0]);
    user.addToFavorites(recipeData[0]);
    expect(user.favoriteRecipes.length).to.equal(1);
  });

  it('should be able to remove recipes from favoriteRecipes', () => {
    const user = new User(id, username);

    user.addToFavorites(recipeData[0]);
    user.addToFavorites(recipeData[1]);
    user.addToFavorites(recipeData[2]);
    user.removeFromFavorites(recipeData[0]);

    expect(user.favoriteRecipes[0]).to.eql(recipeData[1]);
  });

  it('should be able to add recipes to recipesToCook', () => {
    const user = new User(id, username);

    user.addToRecipesToCook(recipeData[0]);
    expect(user.recipesToCook[0]).to.eql(recipeData[0]);
  });

  it('should be able to add not add duplicate recipe to recipesToCook', () => {
    const user = new User(id, username);

    user.addToRecipesToCook(recipeData[0]);
    user.addToRecipesToCook(recipeData[0]);
    expect(user.recipesToCook.length).to.equal(1);
  });

  it('should be able to filter through favoriteRecipes by tag', () => {
    const user = new User(id, username);

    user.addToFavorites(recipeData[0]);
    user.addToFavorites(recipeData[1]);
    expect(user.filterFavorites('snack')).to.eql([recipeData[0]]);
  });

  it('should be able to search favoriteRecipes by name', () => {
    const user = new User(id, username);

    user.addToFavorites(recipeData[0]);
    user.addToFavorites(recipeData[1]);
    expect(user.findFavorites('Cookie')).to.eql([recipeData[0]]);
  });

  it('should be able to search favoriteRecipes by ingredient', () => {
    const user = new User(id, username);

    user.addToFavorites(recipeData[0]);
    user.addToFavorites(recipeData[1]);
    expect(user.findFavorites('apples')).to.eql([recipeData[1]]);
  });

});
