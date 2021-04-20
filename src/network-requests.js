const fetchData = () => {
  const userData = fetch('http://localhost:3001/api/v1/users')
    .then(response => response.json())
    .then(userData => {
      return userData;
    })


  const ingredientData = fetch('http://localhost:3001/api/v1/ingredients')
    .then(response => response.json())
    .then(ingredientData => {
      return ingredientData;
    })

  const recipeData = fetch('http://localhost:3001/api/v1/recipes')
    .then(response => response.json())
    .then(recipeData => {
      return recipeData;
    })

  return Promise.all([userData, ingredientData, recipeData])
    .then(data => {
      const allData = {};
      allData.userData = data[0];
      allData.ingredientData = data[1];
      allData.recipeData = data[2];
      return allData;
    })
    .catch(err => console.log('ERROR', err))
}

const postData = (object) => {
  fetch("http://localhost:3001/api/v1/users", {
    method: "POST",
    body: JSON.stringify(object),
    headers: {
      "content-type": "application/json"
    }
  })
  .catch(err => console.log('ERROR', err))

}

export { fetchData, postData };
