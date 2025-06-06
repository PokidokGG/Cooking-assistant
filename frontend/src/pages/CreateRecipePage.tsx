import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const CreateRecipePage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
  const [allTypes, setAllTypes] = useState<RecipeType[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [typeError, setTypeError] = useState<string | null>(null);
  const [cookingTimeError, setCookingTimeError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchIngredients = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/ingredients");
      const sortedIngredients = response.data.sort(
          (a: Ingredient, b: Ingredient) => a.name.localeCompare(b.name, "uk")
      );
      setAllIngredients(sortedIngredients);
    } catch (error: unknown) {
      setError((error as Error).message);
    }
  };

  const fetchRecipeTypes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/recipe-types");
      setAllTypes(response.data);
    } catch (error: unknown) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    fetchIngredients();
    fetchRecipeTypes();
  }, []);

  const toggleIngredientSelection = (ingredientId: number) => {
    setSelectedIngredients((prevSelected) => {
      if (prevSelected.includes(ingredientId)) {
        return prevSelected.filter((id) => id !== ingredientId);
      } else {
        return [...prevSelected, ingredientId];
      }
    });
  };

  const validateForm = () => {
    let isValid = true;
    setError(null);
    setTypeError(null);
    setCookingTimeError(null);

    if (!title.trim()) {
      setError("Recipe title cannot be empty");
      isValid = false;
    }
    if (!content.trim()) {
      setError("Recipe description cannot be empty");
      isValid = false;
    }
    if (selectedIngredients.length === 0) {
      setError("Select at least one ingredient");
      isValid = false;
    }
    if (selectedTypeId === null) {
      setTypeError("Select a recipe type");
      isValid = false;
    }

    const timeParts = cookingTime.split(":");
    if (timeParts.length !== 2) {
      setCookingTimeError("Enter time in format hh:mm or 0:mm");
      isValid = false;
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
        setCookingTimeError("Enter a valid time format");
        isValid = false;
      }
    }

    return isValid;
  };

  const handleCreateRecipe = async () => {
    if (!validateForm()) return;

    const timeParts = cookingTime.split(":").map(Number);
    const totalCookingTime = (timeParts[0] || 0) * 60 + (timeParts[1] || 0);

    try {
      const recipeData = {
        title,
        content,
        person_id: 1, // Replace with actual user ID
        ingredients: selectedIngredients,
        type_id: selectedTypeId,
        cooking_time: totalCookingTime,
      };

      await axios.post("http://localhost:8080/api/recipe", recipeData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      navigate("/");
    } catch (error: unknown) {
      setError((error as Error).message);
    }
  };

  return (
      <div>
        <Header />
        <div className="mx-[15vw]">
          <h1 className="text-relative-h3 my-[7vh] font-kharkiv font-bold mb-4">
            Add New Recipe
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
                  onChange={(e) =>
                      setSelectedTypeId(
                          e.target.value === "" ? null : Number(e.target.value)
                      )
                  }
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
                        onClick={() => toggleIngredientSelection(ingredient.id)}
                        className={`py-2 px-4 rounded-full ${
                            selectedIngredients.includes(ingredient.id)
                                ? "bg-blue-700 text-white"
                                : "bg-gray-300 text-black"
                        }`}
                    >
                      {ingredient.name}
                    </button>
                ))}
              </div>
            </div>

            {error && <div className="text-red-500">{error}</div>}

            <button
                type="button"
                onClick={handleCreateRecipe}
                className="bg-green-500 text-white py-2 px-4 rounded-full"
            >
              Create Recipe
            </button>
          </form>
        </div>
      </div>
  );
};

export default CreateRecipePage;