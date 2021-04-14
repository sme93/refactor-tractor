import { expect } from 'chai';

import User from '../src/user.js';
import recipeData from '../src/data/recipes.js'

let id;
let username;
let pantry;

describe('User', () => {
  beforeEach(() => {
    id = 2;
    username = 'Ruth';
    pantry = [{
      'ingredient': 1077,
      'amount': 1
    },
    {
      'ingredient': 14412,
      'amount': 1
    },
    {
      'ingredient': 1009054,
      'amount': 3
    }];
  });

  it('should be an instance of a User', () => {
    const user = new User(id, username, pantry);

    expect(user).to.be.an.instanceof(User);
  });

  it("should have an id", () => {
    const user = new User(41, username, pantry);

    expect(user.id).to.equal(41);
  });

  it("should have a name", () => {
    const user = new User(id, "Marvin Gaye", pantry);

    expect(user.name).to.equal("Marvin Gaye");
  });

  it("should have a pantry", () => {
    const user = new User(id, username, [{
      ingredient: 'PB',
      amount: 2
    }]);

    expect(user.pantry).to.deep.equal([{
      ingredient: 'PB',
      amount: 2
    }]);
  });

  it('should not have any favorite recipes by default', () => {
    const user = new User(id, username, pantry);

    expect(user.favoriteRecipes).to.eql([]);
  });

  it('should be able to add recipes to favoriteRecipes', () => {
    const user = new User(id, username, pantry);

    user.addToFavorites(recipeData[0]);
    expect(user.favoriteRecipes[0]).to.eql(recipeData[0]);
  });

  it('should be able to remove recipes from favoriteRecipes', () => {
    const user = new User(id, username, pantry);

    user.addToFavorites(recipeData[0]);
    user.addToFavorites(recipeData[1]);
    user.addToFavorites(recipeData[2]);
    user.removeFromFavorites(recipeData[0]);

    expect(user.favoriteRecipes[0]).to.eql(recipeData[1]);
  });

  it('should be able to filter through favoriteRecipes by tag', () => {
    const user = new User(id, username, pantry);

    user.addToFavorites(recipeData[0]);
    user.addToFavorites(recipeData[1]);
    expect(user.filterFavorites('snack')).to.eql([recipeData[0]]);
  });

  it('should be able to search favoriteRecipes by name', () => {
    const user = new User(id, username, pantry);

    user.addToFavorites(recipeData[0]);
    user.addToFavorites(recipeData[1]);
    expect(user.findFavorites('Cookie')).to.eql([recipeData[0]]);
  });

  it('should be able to search favoriteRecipes by ingredient', () => {
    const user = new User(id, username, pantry);

    user.addToFavorites(recipeData[0]);
    user.addToFavorites(recipeData[1]);
    expect(user.findFavorites('apples')).to.eql([recipeData[1]]);
  });

});
