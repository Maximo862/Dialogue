import { Chatweb } from "./Pages/Chatweb";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Protectedroutes } from "./ProtectedRoutes";
import { Navbar } from "./Components/Navbar";
import { Profile } from "./Pages/Profile";

function App() {

  return (
    <>
<BrowserRouter>
<Navbar/>
<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/login" element={<Login/>}/>
<Route element={<Protectedroutes/>}>
<Route path="/profile" element={<Profile/>}/>
<Route path="/chatweb" element={<Chatweb/>}/>
</Route>
</Routes>
</BrowserRouter>
     </>
  );
}

export default App;
