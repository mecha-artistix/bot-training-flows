const USERS_API = import.meta.env.VITE_NODE_BASE_API + 'users';
async function verifyToken(token) {
  try {
    const response = await fetch(USERS_API + '/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(token),
    });
    const resData = await response.json();
    return response.data.user;
  } catch (error) {
    return false;
  }
}
export default verifyToken;
