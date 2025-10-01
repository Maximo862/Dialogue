import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'
import { AuthContext } from './Context/Authcontext'

export function Protectedroutes() {
  
  const {isautenthicated, loading} = useContext(AuthContext)

if (loading === true) return <p>Loading..</p> 
console.log("isauthenticatedprotectedroute: ", isautenthicated)
  if (!isautenthicated) return <Navigate to={"/"}/> 

    return (
 <Outlet/>   
)
}

