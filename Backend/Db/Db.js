const sqlite = require("sqlite3")
const {open} = require("sqlite")

async function InitDb() {
    const db = await open({
        filename : ".Portfolio.db",
        driver : sqlite.Database
    })

await db.exec(`
    CREATE TABLE IF NOT EXSITS users (
    id PRIMARY KEY AUTOINCREMENT, 
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
    )
    `)

return db;
}

module.exports = {
    InitDb
}