const URL = "https://dialogue-production.up.railway.app/";

export async function registerReq(user) {
  try {
    const res = await fetch(`${URL}/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (!res.ok) throw data;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function loginReq(user) {
  try {
    const res = await fetch(`${URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (!res.ok) throw data;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function verifyReq() {
  try {
    const res = await fetch(`${URL}/verify`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) throw data;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function modifyUser(id, username, icon) {
  const res = await fetch(`${URL}/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ username, icon }),
  });

  const data = await res.json();

  if (!res.ok) throw data;

  return data;
}

export async function logoutReq() {
  const res = await fetch(`${URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) throw data;

  return data;
}
