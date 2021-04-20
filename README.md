# Refactor Tractor - What's Cookin'

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Walkthrough](#walkthrough)
- [Authors](#authors)
- [Technologies](#technologies)
- [Systems Practices](#systemspractices)

## Description

In this project, our group was given the task of building on top someone else's pre-existing What's Cookin' codebase. We needed to get comfortable navigating the existing code so we could add features and start working with network requests to retrieve and manipulate data from an API. Other goals for this project included refactoring the pre-existing code to add a parent class, incorporating Sass to update the UI, making sure our site was accessible through Lighthouse and Wave audits, and thoroughly testing our Classes.

### Notable features

- Users can filter recipes by multiple tags, or search for recipes by their name or ingredients
- Users can favorite or unfavorite reipes, or add a recipe to list of Recipes to Cook
- Users can view what ingredients exist inside of their pantries, and check to see what ingredients are needed to cook a recipe
- Items inside of a users pantry are removed if the user decides to cook a recipe, and their pantry is updated to reflect that change
- Users can navigate through the site using tab to advance and the spacebar to select elements

## Installation

1. Fork this repo
2. Clone down to your machine
3. Access cloned directory
4. Run npm install
5. Run npm start
6. View site http://localhost:8080/ with API also running on your machine

## Walkthrough

1. View any recipe displayed on the main page by clicking the image for the recipe, or by tabbing to it and using the spacebar when the image is selected. Click the Show All Button to go back to the home page showing all your recipes.

![Viewing a recipe](https://media.giphy.com/media/3zA1wuE0nckswvolNp/giphy.gif)

2. Favorite a recipe by clicking the star on the recipe card, or selecting it with the spacebar. You can view all your favorite recipes by selecting the View Favorites button at the top of the page. Select Home to navigate back to the main page. Add recipes to your Recipes to Cook list by selecting the plus sign icon on the left side of the recipe card. You can also use the spacebar to select this button.

![Favoriting a recipe](https://media.giphy.com/media/U86IcUVbaUzgUTmctf/giphy.gif)

3. Search through all your recipes by their names or by ingredients by using the search bar in the top right corner of the page. You can also use the search bar while you are on the favorites page and it will find only your favorite recipes that have that name or keyword.

![Search Recipes](https://media.giphy.com/media/3QGOXLQkXnGezqPLlt/giphy.gif)

4. See what items you have in your pantry by clicking on the View Pantry button on the top of page. Click Hide Pantry to navigate back to the home page.

![View Pantry](https://media.giphy.com/media/PyYG3uXjVToQN549eA/giphy.gif)

5. Use the filter buttons to filter through the recipes by their tags. You can click the Expand Filters button to see all of the available tags. Click the Show All Button to go back to the home page and see all the recipes again.

![Filter by Tag](https://media.giphy.com/media/8fH2y0wZ5uFrwslzvl/giphy.gif)

## Authors

<table>
    <tr>
        <td> Matt Craig <a href="https://github.com/mcraig2342">GH</td>
        <td> Sarah Lane <a href="https://github.com/sarahlane8">GH</td>
        <td> Nichele Dunn<a href="https://github.com/nichelicorn">GH</td>
        <td> Sarah Fitzsimons <a href="https://github.com/sme93">GH</td>
    </tr>
    </tr>
        <td><img src="https://avatars.githubusercontent.com/u/75296592?v=4" alt="M. Craig" width="125" height="auto" /></td>
        <td><img src="https://avatars.githubusercontent.com/u/70901622?v=4" alt="S. Lane" width="125" height="auto" /></td>
        <td><img src="https://avatars.githubusercontent.com/u/63027000?v=4" alt="N. Dunn" width="125" height="auto" /></td>
        <td><img src="https://avatars.githubusercontent.com/u/74980483?s=400&u=666d5f139d0c221d8555a16e7f1b99069b6b9b0b&v=4" alt="S. Fitzsimons" width="125" height="auto" /></td>
    </tr>
</table>

## Technologies Used

- JavaScript, ES6
- SCSS / SASS
- Webpack

## Systems/Practices

- git/Version Control
- PR Template
- Project Board
- TDD
