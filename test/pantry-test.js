import { expect } from 'chai';

import Pantry from '../src/pantry.js';
import Recipe from '../src/recipe.js';
import { users, recipes } from '../src/data/pantry-test-data.js';

describe('Pantry class', () => {
  let user1, user2, recipe1, recipe2, pantry1, pantry2;
  beforeEach(() => {
    pantry1 = new Pantry(users[0].pantry);
    pantry2 = new Pantry(users[1].pantry);
    recipe1 = new Recipe(recipes[0]);
    recipe2 = new Recipe(recipes[1]);

  })

  describe("pantry setup", () => { // constructor properties
    it("should should create a new pantry", () => {
      expect(pantry1).to.be.an.instanceof(Pantry);
      expect(pantry2).to.be.an.instanceof(Pantry);
    });

    it("should store a user's pantry", () => {
      expect(pantry1.contents).to.deep.equal(users[0].pantry);
      expect(pantry2.contents).to.deep.equal(users[1].pantry);
    });
  })

  describe("a method to check the pantry for recipe supplies", () => {

    it.skip("should return an error if an ingredient is missing", () => {
      expect(pantry1.checkForIngr(recipe2)).to.equal("You don't have everything you need for this recipe.");
    });

    // it.skip("should return a message if all ingredients are available", () => {
    //   expect(pantry1.checkForIngr(recipe1)).to.equal("You have everything you need to make this recipe!"));
    // });
  })


    describe("a method to remove recipe ingredients from the pantry", () => { // pantry.removeIngr()
      it("should remove ingredients used in a recipe from the pantry", () => {
        pantry1.removeIngr(recipe1);
        pantry2.removeIngr(recipe2);

        expect(pantry1.pantryAmounts).to.deep.equal([ 3, 2.5, 4, 0 ]);
        expect(pantry2.pantryAmounts).to.deep.equal([ 4.5, 1, 4, 0.5 ]);
        expect(pantry2.removeIngr(recipe1)).to.equal("Sorry, you dont have the required ingredients");
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
