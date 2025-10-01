import { Link } from "react-router-dom";

export function Home() {
  return (
    <div>
        <h2>LINKS</h2>
        <div>
            <Link to={"/register"}>Register</Link>
            <Link to={"/login"}>Login</Link>
        </div>
    </div>
  )
}
