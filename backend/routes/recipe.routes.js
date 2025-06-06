const Router = require("express");
const router = new Router();
const recipeController = require("../controller/recipe.controller");
<<<<<<< HEAD
const authenticateToken = require("../middleware/jwtMiddleware");

//? Створення рецепта
router.post("/recipe", authenticateToken, recipeController.createRecipe);

//? Отримання всіх рецептів
router.get("/recipes", authenticateToken, recipeController.getAllRecipes);

//? Отримання рецепта за ID
router.get("/recipe/:id", authenticateToken, recipeController.getRecipeWithIngredients);

//? Отримання всіх інгредієнтів
router.get("/ingredients", authenticateToken, recipeController.getAllIngredients);

//? Зміна рецепта за ID
router.put("/recipe/:id", authenticateToken, recipeController.updateRecipe);

//? Видалення рецепта за ID
router.delete("/recipe/:id", authenticateToken, recipeController.deleteRecipe);

//? Фільтрація рецептів за типами та датами
router.get("/recipes-by-filters", authenticateToken, recipeController.searchRecipes);

//? Фільтрації рецептів за типами та датами та за користувачем
router.get("/recipes-filters-person/:id", authenticateToken, recipeController.searchPersonRecipes);

//? Отримання статистики
router.get("/recipes-stats", authenticateToken, recipeController.getRecipesStats);
=======

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
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d

module.exports = router;
