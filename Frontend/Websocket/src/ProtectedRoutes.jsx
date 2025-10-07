import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "./Context/AuthContext";

export function Protectedroutes() {
  const { isautenthicated, loading } = useContext(AuthContext);

  if (loading === true) return <p>Loading..</p>;
  if (!isautenthicated) return <Navigate to={"/"} />;

  return <Outlet />;
}
