import React from "react";
import ThemeContext from "../contexts/theme";
import { FaLightbulb } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const activeStyle = {
  color: "rgb(187, 46, 31)",
};

export default function Nav({ toggleTheme }) {
  const theme = React.useContext(ThemeContext);
  return (
    <nav className="row space-between">
      <ul className="row nav">
        <li className="nav__item">
          <NavLink
            // exact
            style={({ isActive }) => (isActive ? activeStyle : null)}
            className="nav__link"
            to="/"
          >
            Popular
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : null)}
            className="nav__link"
            to="/battle"
          >
            Battle
          </NavLink>
        </li>
      </ul>
      <button className="btn--clear" onClick={toggleTheme}>
        {theme === "light" ? (
          <FaLightbulb color="rgb(0,0,0)" size={30} />
        ) : (
          <FaLightbulb color="rgb(255, 191, 116)" size={30} />
        )}
      </button>
    </nav>
  );
}
