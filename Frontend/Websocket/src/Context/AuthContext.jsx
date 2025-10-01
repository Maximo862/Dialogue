import {createContext, useState} from 'react'
import { loginReq, logoutReq, modifyUser, registerReq, verifyReq } from "../Api/apiRequest";
import { useEffect } from 'react';

export const AuthContext = createContext()

export function AuthProvider({children}) {

const [user, setUser] = useState(null)
const [isautenthicated, setIsautenthicated] = useState(false)
const [loading, setLoading] = useState(true)

async function HandleRegister(user) {
  try {
  const res = await registerReq(user)
  console.log("registerRes: ", res)
  setIsautenthicated(true)
   setUser(res.user)
  } catch (err) {
    setIsautenthicated(false)
    setUser(null)
    throw err
  }  
}


async function HandleLogin(user) {
  try {
  const res = await loginReq(user)
  console.log("LoginRes: ", res)
  setIsautenthicated(true)
  setUser(res.user)
  } catch (err) {
    setIsautenthicated(false)
     setUser(null)
    throw err
  }
}

useEffect(() => {
async function Check() {
  try {
    const res = await verifyReq()
  console.log("responseverify: ", res)
  setIsautenthicated(true) 
  setUser(res.validateduser)
  } catch (error) {
    console.log("responseverifyerror : ", error)
    setIsautenthicated(false)
    setUser(null)
  } finally {
    setLoading(false)
    console.log("Authenticated: ", isautenthicated)
  }
}
Check()
}, [])

async function handleModify(id,user,icon) {
  try {
    const res = await modifyUser(id,user,icon)
    console.log(res)
    setUser((prev) => ({
  ...prev,
  ...res.newUser,
}));
  } catch (error) {
    console.error(error)
    return
  }
}

async function handleLogout() {
  try {
    const res = await logoutReq()
    console.log(res)
  } catch (error) {
    console.error(error)
    return
  }
}

  return (
    <AuthContext.Provider value={{
      HandleRegister,
      HandleLogin,
      handleLogout,
      isautenthicated,
      loading,
      handleModify,
user
    }}> 
        {children}
    </AuthContext.Provider>
  )
}

