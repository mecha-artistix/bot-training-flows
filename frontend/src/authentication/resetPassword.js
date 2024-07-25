const USERS_API = import.meta.env.VITE_NODE_BASE_API + 'users';

export const forgotPassword = async function (email) {
  try {
    const response = await fetch(USERS_API + '/forgotPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(response || 'Failed to send request');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { message: response };
  }
};

export const resetPassword = async function (token, body) {
  try {
    const response = await fetch(USERS_API + `/resetPassword/${token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(response || 'Failed to send request');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { message: response };
  }
};
