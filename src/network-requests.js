const getData = () => {
  let userData = fetch('http://localhost:3001/api/v1/users')
    .then(response => response.json())
    .then(userData => {
      return userData;
    })
    .catch(err => console.log('ERROR'))

  let ingredientData = fetch('http://localhost:3001/api/v1/ingredients')
    .then(response => response.json())
    .then(ingredientData => {
      return ingredientData;
    })
    .catch(err => console.log('ERROR'))

  let recipeData = fetch('http://localhost:3001/api/v1/recipes')
    .then(response => response.json())
    .then(recipeData => {
      return recipeData;
    })
    .catch(err => console.log('ERROR'))

  return Promise.all([userData, ingredientData, recipeData])
    .then(data => {
      let allData = {};
      allData.userData = data[0];
      allData.ingredientData = data[1];
      allData.recipeData = data[2];
      return allData;
    })
}

export default getData;
