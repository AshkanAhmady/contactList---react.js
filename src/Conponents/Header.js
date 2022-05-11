import { NavLink } from "react-router-dom";
import { FcPlus } from "react-icons/fc";
import { FcViewDetails } from "react-icons/fc";

const Header = () => {
  return (
    <header>
      <h2>Contact App</h2>
      <ul>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? "activePage" : "")}
            to="/"
          >
            <FcViewDetails className="icon" />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? "activePage" : "")}
            to="/add-contact"
          >
            <FcPlus className="icon" />
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
