import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
      <header className="bg-perfect-purple p-6 py-8 text-white">
        <nav>
          <ul className="flex justify-between items-center">
            {/* Left section with center-aligned navigation items */}
            <div className="flex space-x-14 ml-[20vw]">
              <li>
                <Link to="/main" className="font-montserratRegular text-l">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/add-recipe" className="font-montserratRegular text-l">
                  Add Recipe
                </Link>
              </li>
              <li>
                <Link to="/stats" className="font-montserratRegular text-l">
                  Statistics
                </Link>
              </li>
              <li>
                <Link to="/types" className="font-montserratRegular text-l">
                  Types
                </Link>
              </li>
              {/* Link to statistics added */}
            </div>

            {/* Right section for right-aligned elements */}
            {/*<div className="flex space-x-14 mr-[5vw]">*/}
            {/*  <li>*/}
            {/*    <Link to="/login" className="font-montserratRegular text-l">*/}
            {/*      Login*/}
            {/*    </Link>*/}
            {/*  </li>*/}
            {/*  <li>*/}
            {/*    <Link*/}
            {/*      to="/registration"*/}
            {/*      className="bg-dark-purple px-5 py-3 rounded-full font-montserratRegular text-l"*/}
            {/*    >*/}
            {/*      Register*/}
            {/*    </Link>*/}
            {/*  </li>*/}
            {/*</div>*/}
          </ul>
        </nav>
      </header>
  );
};

export default Header;