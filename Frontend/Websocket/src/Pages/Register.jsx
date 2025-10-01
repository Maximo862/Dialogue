import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/Authcontext'
import { useNavigate } from "react-router-dom";

export function Register() {
    const navigate = useNavigate()
  const {HandleRegister, isautenthicated} = useContext(AuthContext)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

useEffect(() => {
if (isautenthicated === true) navigate("/chatweb")
}, [isautenthicated])


  const user = {
    username,
    email,
    password
  }

async function Handlesubmit(e) {
    e.preventDefault()

await HandleRegister(user)
}

    return (
    <section>
<div>
    <form onSubmit={Handlesubmit}>
        <div>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username'/>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
        </div>
<button type='submit'>send</button>
    </form>
</div>

    </section>
  )
}

