const db = require("../db");

class RecipeController {
    //? Create a recipe
    async createRecipe(req, res) {
        const { title, content, person_id, ingredients, type_id, cooking_time } =
            req.body;

        try {
            const newRecipe = await db.query(
                `INSERT INTO recipes (title, content, person_id, type_id, cooking_time) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                [title, content, person_id, type_id, cooking_time]
            );

            const recipeId = newRecipe.rows[0].id;

            for (let ingredientId of ingredients) {
                await db.query(
                    `INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES ($1, $2)`,
                    [recipeId, ingredientId]
                );
            }

            res.json(newRecipe.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    //? Get all recipes
    async getAllRecipes(req, res) {
        try {
            const recipes = await db.query(
                `SELECT r.*, rt.type_name, array_agg(i.name) AS ingredients
                 FROM recipes r
                          LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
                          LEFT JOIN ingredients i ON ri.ingredient_id = i.id
                          LEFT JOIN recipe_types rt ON r.type_id = rt.id
                 GROUP BY r.id, rt.type_name`
            );

            res.json(recipes.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    //? Get a recipe by ID
    async getRecipeWithIngredients(req, res) {
        const recipeId = req.params.id;

        try {
            const recipe = await db.query(
                `SELECT r.*, array_agg(i.name) AS ingredients, rt.type_name
                 FROM recipes r
                          LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
                          LEFT JOIN ingredients i ON ri.ingredient_id = i.id
                          LEFT JOIN recipe_types rt ON r.type_id = rt.id
                 WHERE r.id = $1
                 GROUP BY r.id, rt.type_name`,
                [recipeId]
            );

            if (recipe.rows.length === 0) {
                return res.status(404).json({ error: "Recipe not found" });
            }

            res.json(recipe.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    //? Update a recipe by ID
    async updateRecipe(req, res) {
        const recipeId = req.params.id;
        const {
            title,
            content,
            ingredients: newIngredients,
            type_id,
            cooking_time,
        } = req.body;

        try {
            if (!title || !content) {
                return res
                    .status(400)
                    .json({ error: "Title and content cannot be empty" });
            }

            const result = await db.query(
                `UPDATE recipes SET title = $1, content = $2, type_id = $3, cooking_time = $4 WHERE id = $5 RETURNING *`,
                [title, content, type_id, cooking_time, recipeId]
            );

            if (result.rowCount === 0) {
                return res.status(404).json({ error: "Recipe not found" });
            }

            let ingredients;

            if (!newIngredients || newIngredients.length === 0) {
                const oldIngredients = await db.query(
                    `SELECT ingredient_id FROM recipe_ingredients WHERE recipe_id = $1`,
                    [recipeId]
                );

                const existingIngredientIds = oldIngredients.rows.map(
                    (row) => row.ingredient_id
                );

                if (existingIngredientIds.length === 0) {
                    return res
                        .status(400)
                        .json({ error: "A recipe must contain at least one ingredient" });
                }

                ingredients = existingIngredientIds;
            } else {
                ingredients = newIngredients;
            }

            await db.query(`DELETE FROM recipe_ingredients WHERE recipe_id = $1`, [
                recipeId,
            ]);

            for (let ingredientId of ingredients) {
                await db.query(
                    `INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES ($1, $2)`,
                    [recipeId, ingredientId]
                );
            }

            res.json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    //? Filter recipes by ingredients, types, dates, and cooking time
    async searchRecipes(req, res) {
        const {
            ingredient_name,
            type_ids,
            start_date,
            end_date,
            min_cooking_time,
            max_cooking_time,
            sort_order,
        } = req.query;

        try {
            let baseQuery = `
                SELECT r.id, r.title, r.content, r.person_id, r.type_id, r.creation_date, r.cooking_time,
                       rt.type_name, json_agg(json_build_object('id', i.id, 'name', i.name)) AS ingredients
                FROM recipes r
                         LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
                         LEFT JOIN ingredients i ON ri.ingredient_id = i.id
                         LEFT JOIN recipe_types rt ON r.type_id = rt.id
                WHERE 1=1
            `;

            const params = [];
            let paramIndex = 1;

            if (ingredient_name) {
                baseQuery += ` AND i.name ILIKE $${paramIndex}`;
                params.push(`%${ingredient_name}%`);
                paramIndex++;
            }

            if (type_ids) {
                baseQuery += ` AND r.type_id = ANY($${paramIndex}::int[])`;
                params.push(type_ids.split(",").map(Number));
                paramIndex++;
            }

            if (start_date && end_date) {
                baseQuery += ` AND r.creation_date BETWEEN $${paramIndex} AND $${
                    paramIndex + 1
                }`;
                params.push(start_date, end_date);
                paramIndex += 2;
            } else if (start_date) {
                baseQuery += ` AND r.creation_date >= $${paramIndex}`;
                params.push(start_date);
                paramIndex++;
            } else if (end_date) {
                baseQuery += ` AND r.creation_date <= $${paramIndex}`;
                params.push(end_date);
                paramIndex++;
            }

            // Add filter for minimum cooking time
            if (min_cooking_time) {
                baseQuery += ` AND r.cooking_time >= $${paramIndex}`;
                params.push(Number(min_cooking_time));
                paramIndex++;
            }

            // Add filter for maximum cooking time
            if (max_cooking_time) {
                baseQuery += ` AND r.cooking_time <= $${paramIndex}`;
                params.push(Number(max_cooking_time));
                paramIndex++;
            }

            baseQuery += ` GROUP BY r.id, rt.type_name`;

            if (sort_order) {
                baseQuery += ` ORDER BY r.cooking_time ${
                    sort_order === "asc" ? "ASC" : "DESC"
                }`;
            }

            const recipes = await db.query(baseQuery, params);
            res.json(recipes.rows);
        } catch (error) {
            console.error("Error while searching recipes:", error);
            res.status(500).json({ error: error.message });
        }
    }

    //? Delete a recipe by ID
    async deleteRecipe(req, res) {
        const recipeId = req.params.id;

        try {
            await db.query(`DELETE FROM recipe_ingredients WHERE recipe_id = $1`, [
                recipeId,
            ]);

            const result = await db.query(
                `DELETE FROM recipes WHERE id = $1 RETURNING *`,
                [recipeId]
            );

            if (result.rowCount === 0) {
                return res.status(404).json({ error: "Recipe not found" });
            }

            res.json({ message: "Recipe deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    //? Get all ingredients
    async getAllIngredients(req, res) {
        try {
            const ingredients = await db.query(`SELECT * FROM ingredients`);
            res.json(ingredients.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    //? Get the fastest and slowest recipe, as well as stats by type
    async getRecipesStats(req, res) {
        try {
            const { rows: fastestRecipe } = await db.query(
                `SELECT r.*, rt.type_name as "typeName"
                 FROM recipes r
                          JOIN recipe_types rt ON r.type_id = rt.id
                 ORDER BY r.cooking_time ASC LIMIT 1`
            );

            const { rows: slowestRecipe } = await db.query(
                `SELECT r.*, rt.type_name as "typeName"
                 FROM recipes r
                          JOIN recipe_types rt ON r.type_id = rt.id
                 ORDER BY r.cooking_time DESC LIMIT 1`
            );

            const { rows: typeStats } = await db.query(
                `SELECT rt.type_name as "typeName", COUNT(*) as count
                 FROM recipes r
                     JOIN recipe_types rt ON r.type_id = rt.id
                 GROUP BY rt.type_name`
            );

            res.json({
                fastestRecipe: fastestRecipe[0],
                slowestRecipe: slowestRecipe[0],
                typeStats,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new RecipeController();
