import * as model from './model.js'
import recipeView from './views/recipeView'

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';

const { async } = require("regenerator-runtime");



///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}
const controlrecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // 0) Update results view to mark selected result
    resultsView.update(model.getSearchResultsPage());
    
    bookmarkView.update(model.state.bookmarks);
    // 1) Loading recipe
    await model.loadRecipe(id);
    
    recipeView.renderSpinner();
    //2) Rendering Recipe
    recipeView.render(model.state.recipe);
    
   
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};
const controlSearchResults = async function () { 
  try {
    resultsView.renderSpinner();
    
    // 1)Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load Search result
    await model.loadSearchResults(query);


    // 3)Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(1)); 
    
    // Render the initial Pagination Buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (gotoPage) {
  // 3)Render new results
  // resultsView.render(model.state.search.results);
  resultsView.render(model.getSearchResultsPage(gotoPage));

  // Render the new Pagination Buttons
  paginationView.render(model.state.search);
};
const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
};
const controlAddBookmark = function () { 
  // 1) Add or Remove the bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // 2) Update recipe view 
  recipeView.update(model.state.recipe);
  // 3) Render bookmarks
  bookmarkView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
}
const controlAddRecipe = async function (newRecipe) {
  try {
    // Upload Recipe Data
    await model.uploadRecipe(newRecipe)
    
  } catch (err) {
    console.error('😔', err);
   addRecipeView.renderError(err.message) 
  }
}

const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlrecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);  
}


init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();
