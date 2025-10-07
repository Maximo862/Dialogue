import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export function FormCard({ Handlesubmit, button, tittle, inputs, path }) {
  const { errors } = useContext(AuthContext);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form className="form" onSubmit={Handlesubmit}>
        <p className="form-title">{tittle}</p>
        {inputs}
        {errors && <p className="text-center text-danger">{errors}</p>}
        <button type="submit" className="form-submit">
          {button.submit}
        </button>
        <p className="signup-link">
          {button.textRedirect}
          <Link to={path}>{button.redirect}</Link>
        </p>
      </form>
    </div>
  );
}
