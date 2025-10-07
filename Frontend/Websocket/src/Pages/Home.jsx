import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export function Home() {
  const { user, isautenthicated } = useContext(AuthContext);

  if (isautenthicated === true && user)
    return <Navigate to={"/chatweb"} replace />;

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="card shadow-lg p-4 text-center bg-dark">
        <h1 className="mb-4 text-white">Welcome to Dialogue</h1>
        <p className="text-home">Join the conversation or log in to continue</p>
        <div className="links-container-home d-flex gap-5 justify-content-center mt-3">
          <Link to="/register" className="btn link-home">
            Register
          </Link>
          <Link to="/login" className="btn link-home">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
