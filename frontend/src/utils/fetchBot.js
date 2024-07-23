import Cookies from 'js-cookie';
const token = Cookies.get('bearer_token');

export const postBot = async function (body) {
  try {
    const response = await fetch(`${import.meta.env.VITE_NODE_BASE_API}bots/generate-bot`, {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body,
    });
    if (!response.ok) return new Error('error occured while posting');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getBot = async function (id) {
  try {
    const response = await fetch(`${import.meta.env.VITE_NODE_BASE_API}bots/${id}`, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) return new Error('error occured while posting');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
