import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not_found">
      <h1>404</h1>
      <h3>page not found</h3>
      <Link to="/">Go Back To ContactList Page</Link>
    </div>
  );
};

export default NotFound;
