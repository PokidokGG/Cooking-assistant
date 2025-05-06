import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../components/Header.tsx";
import Modal from "../components/Modal";

interface Recipe {
  id: number;
  title: string;
  content: string;
  ingredients: string[];
  type_name: string;
  cooking_time: number;
  creation_date: string;
}

const RecipeDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchRecipeDetails = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/recipe/${id}`);
      if (!response.ok) {
        throw new Error("Error fetching recipe details");
      }
      const data = await response.json();
      setRecipe(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown error");
      }
    }
  }, [id]);

  const deleteRecipe = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/recipe/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting recipe");
      }

      navigate("/main");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown error");
      }
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    deleteRecipe();
    handleCloseModal();
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, [fetchRecipeDetails]);

  const formatCookingTime = (timeInMinutes: number) => {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    const hourStr = hours > 0 ? `${hours} hr ` : "";
    const minuteStr = `${minutes} min`;
    return hourStr + minuteStr;
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const formattedDate = new Date(recipe.creation_date).toLocaleDateString("en-GB");

  return (
      <div>
        <Header />
        <div className="mx-[15vw]">
          <h1 className="text-relative-h3 my-[7vh] font-kharkiv font-bold mb-4">
            {recipe.title}
          </h1>

          <h3 className="text-relative-ps text-lg font-semibold mt-4 font-montserratMedium">
            <strong>Recipe Type:</strong> {recipe.type_name}
          </h3>

          <p className="text-relative-ps my-[3vh] font-montserratMedium font-semibold ">
            Number of ingredients - {recipe.ingredients.length}
          </p>

          <p className="text-relative-ps mt-[3vh] mb-[1vh] font-montserratMedium font-semibold ">
            <strong>Description:</strong>
          </p>
          <p className="text-relative-ps font-montserratRegular">
            {recipe.content}
          </p>

          <h3 className="text-relative-ps text-lg font-semibold mt-4 font-montserratMedium">
            Ingredients:
          </h3>
          <ul className="text-relative-ps list-disc font-montserratRegular pl-[3vw]">
            {recipe.ingredients
                .slice()
                .sort((a, b) => a.localeCompare(b))
                .map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
          </ul>

          <p className="text-relative-ps mt-4 font-montserratRegular">
            <strong>Cooking Time:</strong> {formatCookingTime(recipe.cooking_time)}
          </p>
          <p className="text-relative-ps mt-4 font-montserratRegular">
            <strong>Created At:</strong> {formattedDate}
          </p>

          <button
              onClick={handleOpenModal}
              className="mt-6 bg-red-500 text-white py-2 px-4 rounded-full"
          >
            Delete Recipe
          </button>

          <Link to={`/change-recipe/${recipe.id}`}>
            <button className="bg-yellow-500 text-white py-2 px-4 ml-[1vw] rounded-full">
              Edit Recipe
            </button>
          </Link>
        </div>

        <Modal
            isOpen={isModalOpen}
            title="Delete Confirmation"
            message="Are you sure you want to delete this recipe?"
            onClose={handleCloseModal}
            onConfirm={handleConfirmDelete}
        />
      </div>
  );
};

export default RecipeDetailsPage;