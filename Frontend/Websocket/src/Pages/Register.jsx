import { useContext } from "react";
import { AuthContext } from "../Context/Authcontext";
import { useRedirect } from "../Hooks/useRedirect";
import { useHandleForm } from "../Hooks/useHandleForm";
import { FormCard } from "../Components/FormCard";

export function Register() {
  const { isautenthicated } = useContext(AuthContext);

  useRedirect({
    condition: isautenthicated === true,
    path: "/chatweb",
    conditionRender: isautenthicated,
  });

  const { Handlesubmit, setUser, user } = useHandleForm("register");

  return (
    <FormCard
      Handlesubmit={Handlesubmit}
      tittle={"Sign up"}
      inputs={
        <>
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
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
        submit: "Sign up",
        textRedirect: "acount?",
        redirect: "Sign in",
      }}
      path={"/login"}
    />
  );
}
