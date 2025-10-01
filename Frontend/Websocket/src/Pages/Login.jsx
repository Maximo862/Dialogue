import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/Authcontext'

export function Login() {
  
const navigate = useNavigate()

const {isautenthicated, HandleLogin} = useContext(AuthContext)

useEffect(() => {
if (isautenthicated === true) navigate("/chatweb")
}, [isautenthicated])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const user = {
    email,
    password
  }

async function Handlesubmit(e) {
    e.preventDefault()
await HandleLogin(user)
}

    return (
    <section>
<div>
    <form onSubmit={Handlesubmit}>
        <div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
        </div>
<button type='submit'>send</button>
    </form>
</div>

    </section>
  )
}

