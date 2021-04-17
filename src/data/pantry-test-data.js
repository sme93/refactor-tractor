let users = [{
    "id": 1,
    "name": "Ahsoka Tano",
    "pantry": [{
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
      }
    ]
  },

  {
    "id": 2,
    "name": "Yaddle",
    "pantry": [{
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
      }
    ]
  }
];

let recipes = [{
    "name": "Cucumber Sandwich",
    "id": 777333,
    "image": "https://thumbs.dreamstime.com/b/radish-cucumber-sandwich-dark-stone-background-62194116.jpg",
    "ingredients": [{
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
      }
    ]
  },
  {
    "name": "Ahi Rice Bowl",
    "id": 333777,
    "image": "https://media.istockphoto.com/photos/ahi-poke-bowl-on-brown-rice-picture-id860670422?k=6&m=860670422&s=612x612&w=0&h=dB613OdUL7YXsOltUB76AL5B0ExkzWpzRGrmTp6ZpUo=",
    "ingredients": [{
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
      }
    ]
  }
];

export {
  users,
  recipes
}
