import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header.tsx";

interface Ingredient {
  id: number;
  name: string;
}

interface RecipeType {
  id: number;
  type_name: string;
}

interface Recipe {
  title: string;
  content: string;
  ingredients: string[];
  type_id: number;
  cooking_time: number;
}

const ChangeRecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
  const [allTypes, setAllTypes] = useState<RecipeType[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [ingredientError, setIngredientError] = useState<string | null>(null);
  const [typeError, setTypeError] = useState<string | null>(null);
  const [cookingTimeError, setCookingTimeError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchRecipeDetails = useCallback(async () => {
    try {
      const [recipeResponse, ingredientsResponse, typesResponse] =
          await Promise.all([
            axios.get(`http://localhost:8080/api/recipe/${id}`),
            axios.get("http://localhost:8080/api/ingredients"),
            axios.get("http://localhost:8080/api/recipe-types"),
          ]);

      const recipeData: Recipe = recipeResponse.data;

      setRecipe(recipeData);
      setTitle(recipeData.title);
      setContent(recipeData.content);

      const existingIngredients = recipeData.ingredients
          .map((name: string) => {
            const ingredient = ingredientsResponse.data.find(
                (ing: Ingredient) => ing.name === name
            );
            return ingredient ? ingredient.id : null;
          })
          .filter((id): id is number => id !== null);

      const sortedIngredients = ingredientsResponse.data.sort(
          (a: Ingredient, b: Ingredient) => a.name.localeCompare(b.name)
      );

      setSelectedIngredients(existingIngredients);
      setAllIngredients(sortedIngredients);
      setAllTypes(typesResponse.data);
      setSelectedTypeId(recipeData.type_id);
      setCookingTime(formatCookingTime(recipeData.cooking_time));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(
            error.response ? error.response.data.error : "Unknown error"
        );
      } else {
        setError("Unknown error");
      }
    }
  }, [id]);

  useEffect(() => {
    fetchRecipeDetails();
  }, [fetchRecipeDetails]);

  const formatCookingTime = (timeInMinutes: number) => {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  };

  const toggleIngredientSelection = (ingredientId: number) => {
    setSelectedIngredients(
        (prevSelected) =>
            prevSelected.includes(ingredientId)
                ? prevSelected.filter((id) => id !== ingredientId)
                : [...prevSelected, ingredientId]
    );
  };

  const handleUpdateRecipe = async () => {
    setError(null);
    setIngredientError(null);
    setTypeError(null);
    setCookingTimeError(null);

    if (!title.trim()) {
      setError("Recipe title cannot be empty");
      return;
    }
    if (!content.trim()) {
      setError("Recipe description cannot be empty");
      return;
    }
    if (selectedIngredients.length === 0) {
      setIngredientError("Select at least one ingredient");
      return;
    }
    if (selectedTypeId === null) {
      setTypeError("Select a recipe type");
      return;
    }

    const timeParts = cookingTime.split(":");
    if (timeParts.length !== 2) {
      setCookingTimeError("Enter time in format hh:mm or 0:mm.");
      return;
    } else {
      const hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);
      if (
          isNaN(hours) ||
          isNaN(minutes) ||
          hours < 0 ||
          hours > 99 ||
          minutes < 0 ||
          minutes >= 60
      ) {
        setCookingTimeError("Enter a valid time.");
        return;
      }
    }

    const validIngredients = selectedIngredients.filter((id) => id != null);

    const updatedRecipe = {
      title,
      content,
      ingredients: validIngredients,
      type_id: selectedTypeId,
      cooking_time:
          (parseInt(timeParts[0], 10) || 0) * 60 +
          (parseInt(timeParts[1], 10) || 0),
    };

    try {
      await axios.put(`http://localhost:8080/api/recipe/${id}`, updatedRecipe, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      navigate(`/main`);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (
            error.response &&
            error.response.data.error.includes("foreign key constraint")
        ) {
          setError("Select a valid recipe type");
        } else {
          setError(
              error.response ? error.response.data.error : "Unknown error"
          );
        }
      } else {
        setError("Unknown error");
      }
    }
  };

  if (!recipe || allIngredients.length === 0 || allTypes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
      <>
        <Header />
        <div className="mx-[15vw]">
          <h1 className="text-relative-h3 my-[7vh] font-kharkiv font-bold mb-4">
            Edit Recipe
          </h1>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cooking Time (hh:mm)
              </label>
              <input
                  type="text"
                  placeholder="e.g., 1:30 or 0:10"
                  value={cookingTime}
                  onChange={(e) => setCookingTime(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {cookingTimeError && (
                  <div className="text-red-500">{cookingTimeError}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Recipe Type
              </label>
              <select
                  value={selectedTypeId ?? ""}
                  onChange={(e) => setSelectedTypeId(Number(e.target.value))}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white"
                  required
              >
                <option value="" disabled>
                  Select a recipe type
                </option>
                {allTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.type_name}
                    </option>
                ))}
              </select>
              {typeError && <div className="text-red-500">{typeError}</div>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ingredients
              </label>
              <div className="flex flex-wrap gap-2">
                {allIngredients.map((ingredient) => (
                    <button
                        key={ingredient.id}
                        type="button"
                        className={`py-2 px-4 rounded-full ${
                            selectedIngredients.includes(ingredient.id)
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => toggleIngredientSelection(ingredient.id)}
                    >
                      {ingredient.name}
                    </button>
                ))}
              </div>
              {ingredientError && (
                  <div className="text-red-500">{ingredientError}</div>
              )}
            </div>

            {error && <div className="text-red-500 font-medium">{error}</div>}

            <div>
              <button
                  type="button"
                  onClick={handleUpdateRecipe}
                  className="bg-green-500 text-white py-2 px-4 rounded-full"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </>
  );
};

export default ChangeRecipePage;