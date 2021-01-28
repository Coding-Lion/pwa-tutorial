"use strict"

let dbRecipes = [];
let renderedRecipes = [];

function updateData() {
    dbRecipes.forEach(recipe => {
        if (!renderedRecipes.includes(recipe.id)) {
            renderRecipe(recipe, recipe.id);
        }
    })
    renderedRecipes.forEach(renderedRecipe => {
        if (!dbRecipes.includes(renderedRecipe.id)) {
            removeRecipe(recipe.id);
        }
    })
}

window.addEventListener("load", () => {
  const recipes = localStorage.getItem("recipes");
  if (recipes) {
    dbRecipes = JSON.parse(recipes);
    updateData();
  }
})


// add new recipe
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
  evt.preventDefault();
  
  const recipe = {
    id: Math.random().toString(36).substr(2, 9),
    name: form.title.value,
    ingredients: form.ingredients.value
  };

  dbRecipes.push(recipe);
  renderedRecipes.push(recipe);
  localStorage.setItem("recipes",JSON.stringify(dbRecipes))

  renderRecipe(recipe, recipe.id);

  form.title.value = '';
  form.ingredients.value = '';
});


// remove a recipe
const recipeContainer = document.querySelector('.recipes');
recipeContainer.addEventListener('click', evt => {
  if(evt.target.tagName === 'I'){
    const id = evt.target.getAttribute('data-id');
    const recipe = dbRecipes.find(recipe => recipe.id === id);
    removeRecipe(recipe.id);
    dbRecipes.slice(dbRecipes.indexOf(recipe),0);
    renderedRecipes.slice(dbRecipes.indexOf(recipe),0);
    localStorage.setItem("recipes",JSON.stringify(dbRecipes))
            
  }
})

