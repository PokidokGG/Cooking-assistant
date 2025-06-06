import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import SearchIcon from "../assets/searchIcon.png";

<<<<<<< HEAD
interface SearchComponentProps {
  placeholder: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ placeholder = "Search by ingredient" }) => {
=======
const SearchComponent: React.FC = () => {
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  //? Set initial search term from URL search parameters
  useEffect(() => {
    const initialSearchTerm = searchParams.get("ingredient_name") || "";
    setSearchTerm(initialSearchTerm);
  }, [searchParams]);

<<<<<<< HEAD
  //? Clear search when navigating to home page
=======
  //? Clear search when navigating to the homepage
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
  useEffect(() => {
    if (location.pathname === "/") {
      setSearchTerm("");
      setSearchParams({});
    }
  }, [location, setSearchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchParams({ ingredient_name: searchTerm });
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setSearchParams({});
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
      <div className="flex items-center w-full bg-perfect-pink my-[3vh] rounded-full p-2 relative">
        <div className="pr-3">
          <img src={SearchIcon} alt="Search Icon" />
        </div>
        <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
<<<<<<< HEAD
            placeholder={`Search by ${placeholder}`}
=======
            placeholder="Search by ingredient"
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
            className="w-full bg-transparent text-almost-black text-montserratMedium placeholder-gray-500 focus:outline-none"
            ref={inputRef}
        />
        {searchTerm && (
            <button
                onClick={handleReset}
<<<<<<< HEAD
                className="absolute right-4 text-almost-white bg-dark-purple rounded-full p-2 text-montserratMedium"
=======
                className="absolute right-4 text-almost-black text-montserratMedium"
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d
            >
              Reset Search
            </button>
        )}
      </div>
  );
};

export default SearchComponent;
