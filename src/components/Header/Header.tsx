import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";

const Header: React.FC = () => {
  return (
    <header className="container border-b-[#f2f4f7] border-b border-solid flex items-center justify-between bg-[#f7f7f7]">
      <Link to="/">
        <img src={logo} alt="Logo" height={15} />
      </Link>
      <nav className="flex-grow flex justify-center mr-16">
        <ul className="flex gap-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium text-base text-center leading-normal ${
                  isActive ? "text-red-500" : ""
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/campers"
              className={({ isActive }) =>
                `font-medium text-base text-center leading-normal ${
                  isActive ? "text-red-500" : ""
                }`
              }
            >
              Catalog
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
