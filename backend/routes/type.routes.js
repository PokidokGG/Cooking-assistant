const Router = require("express");
const router = new Router();
const typeController = require("../controller/type.controller");
<<<<<<< HEAD
const authenticateToken = require("../middleware/jwtMiddleware");

//? Отримання всіх типів рецептів
router.get("/recipe-types", authenticateToken, typeController.getAllRecipeTypes);

//? Створення нового типу рецепта
router.post("/recipe-types", authenticateToken, typeController.createRecipeType);

//? Оновлення типу рецепта
router.put("/recipe-type/:id", authenticateToken, typeController.updateRecipeType);

//? Видалення типу рецепта
router.delete("/recipe-type/:id", authenticateToken, typeController.deleteRecipeType);

//? Отримання типу рецепта за ID
router.get("/recipe-type/:id", authenticateToken, typeController.getRecipeTypeById);

module.exports = router;
=======

// Get all recipe types
router.get("/recipe-types", typeController.getAllRecipeTypes);

// Create a new recipe type
router.post("/recipe-type", typeController.createRecipeType);

// Update a recipe type
router.put("/recipe-type/:id", typeController.updateRecipeType);

// Delete a recipe type
router.delete("/recipe-type/:id", typeController.deleteRecipeType);

// Duplicate route (can be removed if unnecessary)
router.post("/recipe-types", typeController.createRecipeType);

// Get a recipe type by ID
router.get("/recipe-type/:id", typeController.getRecipeTypeById);

module.exports = router;
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
