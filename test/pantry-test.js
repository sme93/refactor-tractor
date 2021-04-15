import { expect } from 'chai';

import Pantry from '../src/pantry.js';
// import recipeData from '../src/data/recipes.js'
// import userData from '../src/data/users.js'

let user1, user2, recipe1, recipe2, pantry1, pantry2;

describe('Pantry class', () => {
  beforeEach(() => {
    // user = userData[12];
    // console.log("user 13, Valerie Grant", user);
    // recipe1 = recipeData[13]; // "Brown Butter Garlic Shrimp", missing three ingredients
    // console.log("recipe for Brown Butter Garlic Shrimp", recipe);
    // recipe2 = recipeData[27];
    user1 = {
      "id": 1,
      "name": "Ahsoka Tano",
      "pantry": [
        {
          "ingredient": 1234,
          "amount": 5
        },
        {
          "ingredient": 12345,
          "amount": 3
        },
        {
          "ingredient": 123456,
          "amount": 5
        },
        {
          "ingredient": 1234567,
          "amount": 1
        }]};
    // console.log("Ahsoka", user1);
    let user1Pantry = user1.pantry;
    user2 = {
      "id": 2,
      "name": "Yaddle",
      "pantry": [
        {
          "ingredient": 2345,
          "amount": 5
        },
        {
          "ingredient": 23456,
          "amount": 3
        },
        {
          "ingredient": 234567,
          "amount": 5
        },
        {
          "ingredient": 2345678,
          "amount": 1
        }]};
    // console.log("Yaddle", user2);
    let user2Pantry = user2.pantry;
    // console.log("userPantry", user2Pantry);
    // let recipe1Ingr = recipe1.ingredients; // an array of objects with a length of 8
    // let recipe2Ingr = recipe2.ingredients; // an array of objects with a length of 12
    // console.log("recipeIngr", recipe2Ingr);
    pantry1 = new Pantry(user1Pantry);
  })

  describe("pantry setup", () => { // constructor properties
    it.only("should should create a new pantry", () => {
      expect(pantry1).to.be.an.instanceof(Pantry);
    });

    it.skip("should take in a user pantry", () => {
      expect(pantry1.userPantry).to.deep.equal(user.pantry);
    });
  })

  describe("a method to check the pantry for recipe supplies", () => { // pantry.checkForIngr()
    it.skip("should be able to check the pantry to see if it has the ingredients for the recipe", () => {
      expect(pantry1.checkForIngr(recipe1)).to.return.a(Boolean);
    });

    it.skip("should return an error if an ingredient is missing", () => {
      expect(pantry1.checkForIngr(recipe1)).to.return("You don't have everything you need for this recipe.");
    });

    it.skip("should return a message if all ingredients are available", () => {
      expect(pantry1.checkForIngr(recipe2).to.return("You have everything you need to make this recipe!"));
    });

    // describe("a method to check the available amount of each ingredient", () => {
    //  should there be a separate method to check the ingredient amounts?
    // })

    it.skip("should be able to check the amount available for each ingredient", () => {
      expect(pantry1.checkForIngr())
    });

    it.skip("should return the amount available for use", () => {

    });

    it.skip("should return the amount needed if the full amount is not available", () => {

    });

    describe("a method to remove recipe ingredients from the pantry", () => { // pantry.removeIngr()
      it("should have a method to remove recipe ingredients from the pantry", () => {

      });
      it.skip("should remove ingredients used in a recipe from the pantry", () => {

      });

      it.skip("should return a message if the ingredient amount is now zero", () => {

      });
    });

    describe("an extra fancy method to check the pantry for a specific ingredient", () => { // pantry.rummage()
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
