const PORT = 3000

export async function registerReq(user) {
    try {
        const res = await fetch(`http://localhost:${PORT}/register`, {
            method: "POST",
            credentials: "include",
            headers: {"Content-type" : "application/json"},
            body : JSON.stringify(user)
        })

const data = await res.json()

if (!res.ok) throw data 

return data;

    } catch (error) {
        throw error
    }
}

export async function loginReq(user) {
    try {
        const res = await fetch(`http://localhost:${PORT}/login`, {
            method: "POST",
            credentials: "include",
            headers: {"Content-type" : "application/json"},
            body : JSON.stringify(user)
        })

const data = await res.json()

if (!res.ok) throw data 

return data;

    } catch (error) {
        throw error
    }
}


export async function verifyReq() {
    try {
        const res = await fetch(`http://localhost:${PORT}/verify`, {
            method: "GET",
            credentials: "include",
        })

const data = await res.json()

if (!res.ok) throw data 

return data;

    } catch (error) {
        throw error
    }
}

export async function modifyUser(id, username, icon) {
        const res = await fetch(`http://localhost:${PORT}/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {"Content-type" : "application/json"},
            body : JSON.stringify({username, icon})
        })

const data = await res.json()

if (!res.ok) throw data 

return data;

}

export async function logoutReq() {
        const res = await fetch(`http://localhost:${PORT}}`, {
            method: "POST",
            credentials: "include",
        })

const data = await res.json()

if (!res.ok) throw data 

return data;
}