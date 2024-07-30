export async function getUser(id) {
  try {
    const response = await fetch(`${import.meta.env.VITE_NODE_BASE_API}users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) throw new Error(response);
    const data = await response.json();
    const user = data.data.data;
    return user;
  } catch (error) {
    return error;
  }
}

export async function updateUser(id, body) {
  try {
    const response = await fetch(`${import.meta.env.VITE_NODE_BASE_API}users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(response);
    const data = await response.json();
    const user = data.data.data;
    return user;
  } catch (error) {
    return error;
  }
}

export async function updatePassword(body) {
  try {
    const response = await fetch(`${import.meta.env.VITE_NODE_BASE_API}users/updateMyPassword`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(response);
    const data = await response.json();
    const user = data.data.data;
    return user;
  } catch (error) {
    return error;
  }
}
