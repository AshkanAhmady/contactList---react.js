import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h2>Contact App</h2>
      <ul>
        <li>
          <NavLink exact={true} activeClassName="activePage" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="activePage" to="/add-contact">
            Add Contact
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
