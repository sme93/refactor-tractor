import { expect } from 'chai';

import Pantry from '../src/pantry.js';

describe('Pantry class', () => {
  let user1, user2, recipe1, recipe2, pantry1, pantry2;
  beforeEach(() => {
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
    recipe1 = {
      "name": "Cucumber Sandwich",
      "id": 777333,
      "image": "https://thumbs.dreamstime.com/b/radish-cucumber-sandwich-dark-stone-background-62194116.jpg",
      "ingredients": [
        {
          "name": "bread",
          "id": 1234,
          "quantity": {
            "amount": 2,
            "unit": "slices"
          }
        },
        {
          "name": "cucumber",
          "id": 12345,
          "quantity": {
            "amount": 0.5,
            "unit": "piece"
          }
        },
        {
          "name": "radish",
          "id": 123456,
          "quantity": {
            "amount": 1,
            "unit": "large"
          }
        },
        {
          "name": "cream cheese",
          "id": 1234567,
          "quantity": {
            "amount": 1,
            "unit": "TBSP"
          }
    }]};
    recipe2 = {
      "name": "Ahi Rice Bowl",
      "id": 333777,
      "image": "https://media.istockphoto.com/photos/ahi-poke-bowl-on-brown-rice-picture-id860670422?k=6&m=860670422&s=612x612&w=0&h=dB613OdUL7YXsOltUB76AL5B0ExkzWpzRGrmTp6ZpUo=",
      "ingredients": [
        {
          "name": "Ahi tuna",
          "id": 2345,
          "quantity": {
            "amount": .5,
            "unit": "pound"
          }
        },
        {
          "name": "rice",
          "id": 23456,
          "quantity": {
            "amount": 2,
            "unit": "cups"
          }
        },
        {
          "name": "avocado",
          "id": 234567,
          "quantity": {
            "amount": 1,
            "unit": "large"
          }
        },
        {
          "name": "seaweed salad",
          "id": 2345678,
          "quantity": {
            "amount": .5,
            "unit": "cup"
          }
    }]};
    // console.log("Cucumber sandwich", recipe1);
    // console.log("Ahi tuna bowl", recipe2);
    pantry1 = new Pantry(user1Pantry);
    pantry2 = new Pantry(user2Pantry);
  })

  describe("pantry setup", () => { // constructor properties
    it.only("should should create a new pantry", () => {
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
      expect(pantry1.checkForIngr(recipe1)).to.deep.equal([]); // should return that no ingredits are needed for this recipe
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
