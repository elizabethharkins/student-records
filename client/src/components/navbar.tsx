import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
 
export default function Navbar() {
  return (
    <div>
      <nav className="navbar header">
        <NavLink className="navbar-brand" to="/">
          <h2 className="primary">Student Records</h2>
        </NavLink>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/create">
              Create Record
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}