import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

interface RecipeType {
  id: number;
  type_name: string;
  description: string;
}

interface RecipeTypeFilterProps {
  selectedTypes: number[]; // Array of selected recipe type IDs
<<<<<<< HEAD
  onChange: (selectedTypes: number[]) => void; // Function to handle type selection changes
=======
  onChange: (selectedTypes: number[]) => void; // Handler for type selection changes
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
}

const RecipeTypeFilter: React.FC<RecipeTypeFilterProps> = ({
                                                             selectedTypes,
                                                             onChange,
                                                           }) => {
  const [types, setTypes] = useState<RecipeType[]>([]); // State to store recipe types
<<<<<<< HEAD
  const [isOpen, setIsOpen] = useState(false); // State for opening/closing the filter dropdown
  const filterRef = useRef<HTMLDivElement>(null); // Create ref for the component

  //? Fetch the list of recipe types from the database
  useEffect(() => {
    const fetchTypes = async () => {
      const token = localStorage.getItem("authToken"); // Get token from localStorage

      try {
        const response = await axios.get(
            "http://localhost:8080/api/recipe-types",
            {
              headers: {
                Authorization: token ? `Bearer ${token}` : "", // Add token to header
              },
            }
        );
        setTypes(response.data); // Update state with recipe types
      } catch (error) {
        // Error handling
=======
  const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state
  const filterRef = useRef<HTMLDivElement>(null); // Ref for detecting outside clicks

  //? Fetch recipe types from database
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get(
            "http://localhost:8080/api/recipe-types"
        );
        setTypes(response.data); // Update state with fetched types
      } catch (error) {
        // Handle error while fetching data
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
        console.error("Error fetching recipe types:", error);
      }
    };

    fetchTypes();
  }, []);

<<<<<<< HEAD
  //? Handle type selection change
=======
  //? Handle checkbox state change
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
  const handleCheckboxChange = (id: number) => {
    let updatedSelectedTypes;
    if (selectedTypes.includes(id)) {
      updatedSelectedTypes = selectedTypes.filter((typeId) => typeId !== id); // Remove selected type
    } else {
      updatedSelectedTypes = [...selectedTypes, id]; // Add selected type
    }
<<<<<<< HEAD
    onChange(updatedSelectedTypes); // Pass updated list of selected types
  };

  //? Close filter when clicking outside of it
=======
    onChange(updatedSelectedTypes); // Notify parent with updated selection
  };

  //? Close dropdown when clicking outside
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
          filterRef.current &&
          !filterRef.current.contains(event.target as Node)
      ) {
<<<<<<< HEAD
        setIsOpen(false); // Close the filter if clicking outside
=======
        setIsOpen(false); // Close filter dropdown
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterRef]);

  //? Reset filters
  const resetFilters = () => {
<<<<<<< HEAD
    onChange([]); // Reset selected types
    setIsOpen(false); // Close the dropdown
=======
    onChange([]); // Clear selected types
    setIsOpen(false); // Close dropdown
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
  };

  return (
      <div ref={filterRef} className="relative">
        <button
            className="bg-purple-600 text-white p-2 rounded-lg"
<<<<<<< HEAD
            onClick={() => setIsOpen(!isOpen)} // Toggle filter open/close state
=======
            onClick={() => setIsOpen(!isOpen)} // Toggle dropdown
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
        >
          Filter
        </button>
        {isOpen && (
            <div className="absolute bg-white border rounded-lg p-4 mt-2 shadow-lg w-64 z-10">
              {types.map((type) => (
                  <div key={type.id} className="flex items-center">
                    <input
                        type="checkbox"
                        checked={selectedTypes.includes(type.id)} // Mark selected types
                        onChange={() => handleCheckboxChange(type.id)} // Handle selection change
                    />
                    <label className="ml-2">{type.type_name}</label>
                  </div>
              ))}
              <button
                  onClick={resetFilters}
                  className="mt-2 text-purple-600 hover:underline"
              >
<<<<<<< HEAD
                Reset filters
=======
                Reset Filters
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
              </button>
            </div>
        )}
      </div>
  );
};

<<<<<<< HEAD
export default RecipeTypeFilter;
=======
export default RecipeTypeFilter;
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
