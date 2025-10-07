import { createContext, useState } from "react";
import {
  loginReq,
  logoutReq,
  modifyUser,
  registerReq,
  verifyReq,
} from "../Api/apiRequest";
import { useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isautenthicated, setIsautenthicated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  async function HandleRegister(user) {
    try {
      const res = await registerReq(user);
      setIsautenthicated(true);
      setUser(res.user);
    } catch (err) {
      setIsautenthicated(false);
      setUser(null);
      setErrors(err?.error);
      throw err;
    }
  }

  async function HandleLogin(user) {
    try {
      const res = await loginReq(user);
      setUser(res.user);
      setIsautenthicated(true);
    } catch (err) {
      setIsautenthicated(false);
      setUser(null);
      setErrors(err?.error);
      throw err;
    }
  }

  useEffect(() => {
    async function Check() {
      try {
        const res = await verifyReq();
        setIsautenthicated(true);
        setUser(res.validateduser);
      } catch (error) {
        setIsautenthicated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    Check();
  }, []);

  async function handleModify(id, user, icon) {
    try {
      const res = await modifyUser(id, user, icon);
      setUser((prev) => ({
        ...prev,
        ...res.newUser,
      }));
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async function handleLogout() {
    try {
      const res = await logoutReq();
      setIsautenthicated(false);
      setUser(null);
    } catch (error) {
      console.error(error);
      return;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        HandleRegister,
        HandleLogin,
        handleLogout,
        isautenthicated,
        loading,
        handleModify,
        user,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
