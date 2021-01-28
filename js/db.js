let recipes = [];
let renderedRecipes = [];

function updateData() {
    recipes.forEach(recipe => {
        if (!renderedRecipes.includes(recipe.id)) {
            renderRecipe(recipe, recipe.id);
        }
    })
    renderedRecipes.forEach(renderedRecipe => {
        if (!recipes.includes(renderedRecipe.id)) {
            removeRecipe(recipe.id);
        }
    })
}


// add new recipe
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
  evt.preventDefault();
  
  const recipe = {
    id: Math.random().toString(36).substr(2, 9),
    name: form.title.value,
    ingredients: form.ingredients.value
  };

  recipes.push(recipe);
  renderedRecipes.push(recipe);

  renderRecipe(recipe, recipe.id);

  form.title.value = '';
  form.ingredients.value = '';
});


// remove a recipe
const recipeContainer = document.querySelector('.recipes');
recipeContainer.addEventListener('click', evt => {
  if(evt.target.tagName === 'I'){
    const id = evt.target.getAttribute('data-id');
    removeRecipe(recipe.id);
    recipes.slice(recipes.indexOf(recipe),0);
    renderedRecipes.slice(recipes.indexOf(recipe),0);
            
  }
})


// // real-time listener
// db.collection('recipes').onSnapshot(snapshot => {
//   snapshot.docChanges().forEach(change => {
//     if(change.type === 'added'){
//       renderRecipe(change.doc.data(), change.doc.id);
//     }
//     if(change.type === 'removed'){
//       removeRecipe(change.doc.id);
//     }
//   });
// });

// // add new recipe
// const form = document.querySelector('form');
// form.addEventListener('submit', evt => {
//   evt.preventDefault();
  
//   const recipe = {
//     name: form.title.value,
//     ingredients: form.ingredients.value
//   };

//   db.collection('recipes').add(recipe)
//     .catch(err => console.log(err));

//   form.title.value = '';
//   form.ingredients.value = '';
// });

// // remove a recipe
// const recipeContainer = document.querySelector('.recipes');
// recipeContainer.addEventListener('click', evt => {
//   if(evt.target.tagName === 'I'){
//     const id = evt.target.getAttribute('data-id');
//     //console.log(id);
//     db.collection('recipes').doc(id).delete();
//   }
// })