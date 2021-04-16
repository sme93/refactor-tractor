import { expect } from 'chai';

import Pantry from '../src/pantry.js';
import { users, recipes } from '../src/data/pantry-test-data.js';

describe('Pantry class', () => {
  let user1, user2, recipe1, recipe2, pantry1, pantry2;
  beforeEach(() => {

    pantry1 = new Pantry(users[0].pantry);
    pantry2 = new Pantry(users[1].pantry);
  })

  describe("pantry setup", () => { // constructor properties
    it("should should create a new pantry", () => {
      console.log(users);
      expect(pantry1).to.be.an.instanceof(Pantry);
      expect(pantry2).to.be.an.instanceof(Pantry);
    });

    it.skip("should store a user's pantry", () => {
      expect(pantry1.userPantry).to.deep.equal(user1Pantry);
      expect(pantry2.userPantry).to.deep.equal(user2Pantry);
    });
  })

  describe("a method to check the pantry for recipe supplies", () => { // pantry.checkForIngr()
    it.skip("should be able to check the pantry to see if it has the ingredients for the recipe", () => {
      expect(pantry1.checkForIngr(recipe1)).to.deep.equal([]);
    });

    it.skip("should be able to check another recipe to see if it has the ingredients", () => {
      expect(pantry2.checkForIngr(recipe2)).to.deep.equal([{id: 2345, needAmt: .5}, {id: 23456, needAmt: 2}, {id: 234567, needAmt: 1}, {id: 2345678, needAmt: .5}]);
    })

    it.skip("should return an error if an ingredient is missing", () => {
      expect(pantry1.checkForIngr(recipe2)).to.return("You don't have everything you need for this recipe.");
    });

    it.skip("should return a message if all ingredients are available", () => {
      expect(pantry1.checkForIngr(recipe1).to.return("You have everything you need to make this recipe!"));
    });
  })

  describe("a method to list ingredients available", () => {
    it.skip("should return the amount available for use", () => {
      expect(pantry1.listIngr(recipe1)).to.deep.equal([{id: 1234, needAmt: 2}, {id: 12345, needAmt: .5}, {id: 123456, needAmt: 1}, {id: 1234567, needAmt: 1}]);
    });

    it.skip("should return the amount needed if the full amount is not available", () => {
      expect(pantry2.listIngr(recipe2)).to.return("You need 2 slices of bread, .5 piece of cucumber, 1 large radish, and 1 TBSP of cream cheese to make a Cucumber Sandwich");
    });
  })

    describe("a method to remove recipe ingredients from the pantry", () => { // pantry.removeIngr()
      it.skip("should remove ingredients used in a recipe from the pantry", () => {
        pantry1.removeIngr(recipe1);
        pantry2.removeIngr(recipe2);

        expect(pantry1.userPantry).to.deep.equal([]);
        expect(pantry2.userPantry).to.deep.equal([]);
      });

      it.skip("should return a message if the ingredient amount is now zero", () => {
        expect(pantry1.removeIngr(recipe1)).to.return("Your pantry is out of the following items: bread, radish, cucumber, cream cheese");
      });
    });

    describe("an extra fancy method to check the pantry for a specific ingredient", () => { // pantry.rummage()
      it.skip("should be able to check the pantry for a specific ingredient", () => {
        expect(pantry1.rummage(12345)).to.return("You have 5 cucumbers!")
      });
    })
  // })
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
