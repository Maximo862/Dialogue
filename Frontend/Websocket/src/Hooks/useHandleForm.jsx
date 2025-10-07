import { useContext, useState } from "react";
import { AuthContext } from "../Context/Authcontext";

export function useHandleForm(mode = "register") {
  const { HandleRegister, HandleLogin } = useContext(AuthContext);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  async function Handlesubmit(e) {
    e.preventDefault();

    if (mode === "register") {
      await HandleRegister(user);
    } else {
      await HandleLogin(user);
    }
  }

  return {
    Handlesubmit,
    user,
    setUser,
  };
}
