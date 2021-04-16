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

    it("should store a user's ingredient amounts and id's", () => {
      pantry1.populatePantry();
      pantry2.populatePantry();
      expect(pantry1.pantryIngredients).to.deep.equal([1234, 12345, 123456, 1234567]);
      expect(pantry2.pantryAmounts).to.deep.equal([ 5, 3, 5, 1 ]);
    });

  })

  describe("a method to check the pantry for recipe supplies", () => {

    it("should return an array of missing ingredients and amounts", () => {
      expect(pantry1.checkForIngr(recipe2)).to.deep.equal([
  { name: 'Ahi tuna', amount: 0.5 },
  { name: 'rice', amount: 2 },
  { name: 'avocado', amount: 1 },
  { name: 'seaweed salad', amount: 0.5 }
]);
    });

    it("should return a message if all ingredients are available", () => {
      expect(pantry1.checkForIngr(recipe1)).to.equal("You have all of the ingredients that you need!");
    });

  })


    describe("a method to remove recipe ingredients from the pantry", () => {
      it("should remove ingredients used in a recipe from the pantry", () => {
        pantry1.cookMeal(recipe1);
        pantry2.cookMeal(recipe2);

        expect(pantry1.pantryAmounts).to.deep.equal([ 3, 2.5, 4, 0 ]);
        expect(pantry2.pantryAmounts).to.deep.equal([ 4.5, 1, 4, 0.5 ]);
        expect(pantry2.cookMeal(recipe1)).to.equal("Sorry, you dont have the required ingredients");
      });
    });

});
