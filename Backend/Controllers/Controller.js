const {InitDb} = require("../Db/Db")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")

async function Login(req,res) {
    try {
        const { password , email } = req.body
      if ( !email || !password) return res.status(400).json({error : "Fields required"})  

const db = await InitDb()

const user = await db.get(`SELECT * FROM users WHERE email = ?`, [email])
if (!user) return res.status(400).json({error: "User not found"})

const passwordfound = await bcrypt.compare(password, user.password)
if (!passwordfound) return res.status(400).json({error: "Incorret password"})
    
    const token = jsonwebtoken.sign(
        {
            id : user.id
        },
        process.env.JWT_SECRET, 
        {
            expiresIn: "1h"
        }
    )

return res.cookie.json({ message : "Sucesfull login", user : { id : user.id, username, email }, token })
} catch (error) {
    console.log("login: ", error)
}
}

async function Register(req,res) {
    try {
    const {username, email, password} = req.body;
if (!username || !email || !password) return res.status(400).json({error : "Fields required"})

const db = await InitDb()
const user = await db.get(`SELECT * FROM users WHERE email = ?`, [email])

if (user) return res.status(400).json({error: "User already exists"})

    const hasedpassword = await bcrypt.hash(password, 10)
    
    
    const result = await db.run(`INSERT INTO users (username,email,password) VALUES ?, ?, ?`, [username,email,hasedpassword])

const token = jsonwebtoken.sign(
    {
        id : result.lastID
    },
process.env.JWT_SECRET,
{
    expiresIn: "1h"
}
)

res.cookie("token", token).json({message: "User Created", user : { id : result.lastID, username, email}, token })
    } catch (err) {
        console.log("register: ", err)
    }

}

module.exports = {
    Login, Register
}