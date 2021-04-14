import { expect } from 'chai';

import Pantry from '../src/pantry.js'
import recipeData from '../src/data/recipes.js'
import userData from '../src/data/users.js'

let user, recipe, pantry;

describe('Pantry class', () => {
  beforeEach(() => {
    user = userData[12];
    recipe = recipeData[13];
    let userPantry = user.pantry; // an array of objects with a length of 130
    // console.log("userPantry", userPantry.length);
    let recipeIngr = recipe.ingredients; // an array of objects with a length of 8
    // console.log("recipeIngr", recipeIngr.length);
    pantry = new Pantry(userPantry);
  })

  describe("pantry setup", () => {
    it.only("should should create a new pantry", () => {
      expect(pantry).to.be.an.instanceof(Pantry);
    });

    it.skip("should take in a user pantry", () => { // constructor properties
      expect(pantry.userPantry).to.be.an(array);
    });
  })

  describe("a method to check the pantry for recipe supplies", () => {
    it.skip("hould have a method to check for ingredients in a recipe", () => {

    });

    it.skip("should take in a recipe", () => {

    });

    it.skip("should be able to check the pantry to see if it has the ingredients for the recipe", () => {

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

    describe("a method to remove recipe ingredients from the pantry", () => {
      it("should have a method to remove recipe ingredients from the pantry", () => {

      });
      it.skip("should remove ingredients used in a recipe from the pantry", () => {

      });

      it.skip("should return a message if the ingredient amount is now zero", () => {

      });
    });

    describe("an extra fancy method to check the pantry for a specific ingredient", () => {
      it.skip("should be able to check the pantry for a specific ingredient", () => {

      });
    })
  })
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
  // pantry.userPantry
// As a user, I should be able to check my list of recipes to cook and see if my pantry has enough ingredients to cook a meal.
  // pantry.checkForIngr()
// As a user, I should be told what ingredients are still needed if I don’t have enough ingredients in my pantry to cook the recipe.
  // pantry.checkForIngr() 😢 sad path testing
// As a user, I should be able to cook a meal if I do have enough ingredients in my pantry. As a result, cooking the meal should remove the ingredients from my pantry.
  // pantry.removeIngr()
