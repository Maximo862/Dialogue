import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { FormCard } from "../Components/FormCard";
import { useHandleForm } from "../Hooks/useHandleForm";
import { useRedirect } from "../Hooks/useRedirect";

export function Login() {
  const { isautenthicated } = useContext(AuthContext);

  useRedirect({
    condition: isautenthicated === true,
    path: "/chatweb",
    conditionRender: isautenthicated,
  });

  const { Handlesubmit, setUser, user } = useHandleForm("login");

  return (
    <FormCard
      Handlesubmit={Handlesubmit}
      tittle={"Sign in to your account"}
      inputs={
        <>
          <div className="input-container">
            <input
              type="email"
              placeholder="Enter email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Enter password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
        </>
      }
      button={{
        submit: "Sign in",
        textRedirect: "No account?",
        redirect: "Sign up",
      }}
      path={"/register"}
    />
  );
}
