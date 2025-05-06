const Router = require("express");
const router = new Router();
const typeController = require("../controller/type.controller");

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