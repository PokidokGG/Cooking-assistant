const Router = require("express");
const router = new Router();
const recipeController = require("../controller/recipe.controller");

// Create a recipe
router.post("/recipe", recipeController.createRecipe);

// Get all recipes
router.get("/recipes", recipeController.getAllRecipes);

// Get a recipe by ID
router.get("/recipe/:id", recipeController.getRecipeWithIngredients);

// Get all ingredients
router.get("/ingredients", recipeController.getAllIngredients);

// Update a recipe by ID
router.put("/recipe/:id", recipeController.updateRecipe);

// Delete a recipe by ID
router.delete("/recipe/:id", recipeController.deleteRecipe);

// Route for filtering recipes by types and dates
router.get("/recipes-by-filters", recipeController.searchRecipes);

// Get recipe statistics
router.get("/recipes-stats", recipeController.getRecipesStats);

module.exports = router;
