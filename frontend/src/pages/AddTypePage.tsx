import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header.tsx";

interface RecipeType {
  type_name: string;
  description: string;
}

const AddRecipeType: React.FC = () => {
  // Use typed state for form data
  const [typeData, setTypeData] = useState<RecipeType>({
    type_name: "", // Initialize title field
    description: "", // Initialize description field
  });
  const [errors, setErrors] = useState<{
    type_name?: string; // Errors for title field
    description?: string; // Errors for description field
  }>({});

  // Handle input changes
  const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTypeData((prevData) => ({ ...prevData, [name]: value })); // Update form state
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear field error
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    // Validate required fields
    const newErrors: { type_name?: string; description?: string } = {};
    if (!typeData.type_name) {
      newErrors.type_name = "This field is required.";
    }
    if (!typeData.description) {
      newErrors.description = "This field is required.";
    }

    // If errors exist, update state and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Send data to the backend
      await axios.post("http://localhost:8080/api/recipe-types", typeData);
      window.location.href = "/types"; // Redirect after success
    } catch (error) {
      console.error("Error adding recipe type", error); // Log any error
    }
  };

  return (
      <>
        <Header />
        <div className="mx-[15vw]">
          <h1 className="text-relative-h3 my-[7vh] font-kharkiv font-bold mb-4">
            Add a New Recipe Type
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label>
                Title:
                <input
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    name="type_name"
                    value={typeData.type_name}
                    onChange={handleInputChange}
                />
              </label>
              {errors.type_name && (
                  <div className="text-red-500">{errors.type_name}</div>
              )}
            </div>
            <div>
              <label>
                Description:
                <textarea
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    name="description"
                    value={typeData.description}
                    onChange={handleInputChange}
                />
              </label>
              {errors.description && (
                  <div className="text-red-500">{errors.description}</div>
              )}
            </div>
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Add
            </button>
          </form>
        </div>
      </>
  );
};

export default AddRecipeType;
