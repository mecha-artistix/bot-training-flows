const USERS_API = import.meta.env.VITE_NODE_BASE_API + 'users';
async function verifyToken() {
  try {
    const response = await fetch(USERS_API + '/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) throw new error(response);
    const resData = await response.json();
    return resData.data.user;
  } catch (error) {
    return error;
  }
}
export default verifyToken;
