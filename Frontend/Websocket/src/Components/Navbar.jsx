import { useContext } from "react";
import { AuthContext } from "../Context/Authcontext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const { user, loading, handleLogout } = useContext(AuthContext);

  const navigate = useNavigate();

  function Onlogout() {
    handleLogout();
    navigate("/");
  }

  return (
    <nav className="navbar bg-dark text-light d-flex justify-content-between px-3">
      <span>Dialogue</span>
      {loading === false && user ? (
        <div className="dropdown">
          <img
            src={`/Icons/${user?.icon}`}
            alt="user"
            className="rounded-circle"
            width="40"
            height="40"
            role="button"
            data-bs-toggle="dropdown"
          />
          <ul className="dropdown-menu dropdown-menu-end">
            <Link className="dropdown-item" to="/chatweb">
              Home
            </Link>
            <Link className="dropdown-item" to="/profile">
              Profile
            </Link>
            <button className="dropdown-item" onClick={() => Onlogout()}>
              Logout
            </button>
          </ul>
        </div>
      ) : (
        <span></span>
      )}
    </nav>
  );
}
