const db = require("../db");

class TypeController {
<<<<<<< HEAD

  //? Створення нового типу рецепта
=======
  //? Create a new recipe type
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
  async createRecipeType(req, res) {
    const { type_name, description } = req.body;

    try {
      const newType = await db.query(
<<<<<<< HEAD
        `INSERT INTO recipe_types (type_name, description) VALUES ($1, $2) RETURNING *`,
        [type_name, description]
=======
          `INSERT INTO recipe_types (type_name, description) VALUES ($1, $2) RETURNING *`,
          [type_name, description]
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
      );
      res.json(newType.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

<<<<<<< HEAD
  //? Отримання всіх типів рецептів
=======
  //? Get all recipe types
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
  async getAllRecipeTypes(req, res) {
    try {
      const recipeTypes = await db.query(`SELECT * FROM recipe_types`);
      res.json(recipeTypes.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

<<<<<<< HEAD
  //? Оновлення типу рецепта
=======
  //? Update a recipe type
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
  async updateRecipeType(req, res) {
    const { id } = req.params;
    const { type_name, description } = req.body;

    try {
      const updatedType = await db.query(
<<<<<<< HEAD
        `UPDATE recipe_types SET type_name = $1, description = $2 WHERE id = $3 RETURNING *`,
        [type_name, description, id]
      );

      if (updatedType.rowCount === 0) {
        return res.status(404).json({ error: "Тип рецепта не знайдено" });
=======
          `UPDATE recipe_types SET type_name = $1, description = $2 WHERE id = $3 RETURNING *`,
          [type_name, description, id]
      );

      if (updatedType.rowCount === 0) {
        return res.status(404).json({ error: "Recipe type not found" });
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
      }

      res.json(updatedType.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

<<<<<<< HEAD
  //? Видалення типу рецепта
=======
  //? Delete a recipe type
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
  async deleteRecipeType(req, res) {
    const { id } = req.params;

    try {
<<<<<<< HEAD
      await db.query(
        "DELETE FROM recipe_ingredients WHERE recipe_id IN (SELECT id FROM recipes WHERE type_id = $1)",
        [id]
      );
      await db.query("DELETE FROM recipes WHERE type_id = $1", [id]);

      const result = await db.query(
        "DELETE FROM recipe_types WHERE id = $1 RETURNING *",
        [id]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Тип рецепта не знайдено" });
      }

      res.json({
        message: "Тип рецепта та всі пов'язані рецепти успішно видалено",
=======
      // First, delete all recipes that belong to this type
      await db.query(
          "DELETE FROM recipe_ingredients WHERE recipe_id IN (SELECT id FROM recipes WHERE type_id = $1)",
          [id]
      );
      await db.query("DELETE FROM recipes WHERE type_id = $1", [id]);

      // Then delete the recipe type itself
      const result = await db.query(
          "DELETE FROM recipe_types WHERE id = $1 RETURNING *",
          [id]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Recipe type not found" });
      }

      res.json({
        message: "Recipe type and all related recipes successfully deleted",
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

<<<<<<< HEAD
  //? Отримання типа рецепта по ID
=======
  //? Get recipe type by ID
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
  async getRecipeTypeById(req, res) {
    const typeId = req.params.id;

    try {
      const recipeType = await db.query(
<<<<<<< HEAD
        `SELECT * FROM recipe_types WHERE id = $1`,
        [typeId]
      );

      if (recipeType.rows.length === 0) {
        return res.status(404).json({ error: "Тип рецепта не знайдено" });
=======
          `SELECT * FROM recipe_types WHERE id = $1`,
          [typeId]
      );

      if (recipeType.rows.length === 0) {
        return res.status(404).json({ error: "Recipe type not found" });
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
      }

      res.json(recipeType.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TypeController();
