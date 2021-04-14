import { expect } from 'chai';

import Pantry from '../src/pantry.js'
import recipeData from '../src/data/recipes.js'
import userData from '../src/data/users.js'

let pantry, user, recipe;

describe('Pantry class', () => {
  beforeEach(() => {
    pantry = new Pantry();
    user = userData[12];
    recipe = recipeData[13];
    let userPantry = user.pantry;
    let recipeIngr = recipe.ingredients;
  })

  it("should should create a new pantry", () => {
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it.skip("should take in a user pantry", () => { // constructor properties
    // user.pantry

  });

  it.skip("should take in a recipe", () => { // constructor properties
    // recipe.ingredients

  });

  it.skip("should be able to check the pantry to see if it has the ingredients for the recipe", () => {

  });

  it.skip("should be able to check the pantry for a specific ingredient", () => {

  });

  it.skip("should return an error if an ingredient is missing", () => {

  });

  it.skip("should return a message if all ingredients are available", () => {

  });

  it.skip("should be able to check the amount available for each ingredient", () => {

  });

  it.skip("should return the amount available for use", () => {

  });

  it.skip("should return the amount needed if the full amount is not available", () => {

  });

  it.skip("should remove ingredients used in a recipe from the pantry", () => {

  });

  it.skip("should return a message if the ingredient amount is now zero", () => {

  });
});
// what data will i need to run these tests?
// 🧪 the pantry will need ingredients - these will be supplied by the user
// 🧪 recipe to check for necessary ingredients
//
// Create classes and methods that can:
// 🧪 Determine whether a user’s pantry has enough ingredients to cook a given meal.
  // 🧪 check the pantry for each ingredient
  // 🧪  if any of the ingredients are not present, return an error
  // 🧪  if all of the ingredients are present, the receipe/meal can be made
//
//🧪  Determine the amount of missing ingredients still needed to cook a given meal, based on what’s in the user’s pantry.
//
//🧪  Remove the ingredients used to cook a given recipe from a user’s pantry.

// User Stories
// As a user, I should be able to view what ingredients exist inside of my pantry.
// As a user, I should be able to check my list of recipes to cook and see if my pantry has enough ingredients to cook a meal.
// As a user, I should be told what ingredients are still needed if I don’t have enough ingredients in my pantry to cook the recipe.
// As a user, I should be able to cook a meal if I do have enough ingredients in my pantry. As a result, cooking the meal should remove the ingredients from my pantry.

// Testing
// You should NOT use the original data files in the data directory for testing. These are big files to begin with, and a real-world dataset would have millions of records. That’s far too big to use every time you want to run a test.
//
// Instead, for your tests, you should create small, sample datasets that match the structure of the application data. By creating this sample dataset, you will also know if your methods are working correctly because you can do the calculations by hand with a much smaller dataset.
//
// You are expected to test:
// All class properties
// All class methods and updates to their properties
// Any helper methods you build out

// You are not expected to test:
// DOM manipulation / DOM manipulating methods (like document.querySelector(...))
