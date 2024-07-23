import Cookies from 'js-cookie';
const token = Cookies.get('bearer_token');

export const postFlowchart = async function (body) {
  try {
    const response = await fetch(`${import.meta.env.VITE_NODE_BASE_API}flowcharts/`, {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: body,
    });
    if (!response.ok) return new Error('error occured while posting');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const createFlowchart = async function (body) {
  try {
    const response = await fetch(`${import.meta.env.VITE_NODE_BASE_API}flowcharts/`, {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: body,
    });
    if (!response.ok) return new Error('error occured while posting');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateFlowchart = async function (id, body) {
  try {
    const response = await fetch(`${import.meta.env.VITE_NODE_BASE_API}flowcharts/${id}`, {
      method: 'PATCH',
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

export const fetchFlowcharts = async function () {
  try {
    const response = await fetch(`${import.meta.env.VITE_NODE_BASE_API}flowcharts/`, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + token,
      },
    });
    if (!response.ok) return new Error('error occured while fetching');
    const data = await response.json();
    return data.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFlowchart = async function (id) {
  try {
    const response = await fetch(`${import.meta.env.VITE_NODE_BASE_API}flowcharts/${id}`, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + token,
      },
    });
    if (!response.ok) return new Error('error occured while fetching');
    const data = await response.json();
    return data.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDeleteFlowchart = async function (id) {
  try {
    const response = await fetch(`${import.meta.env.VITE_NODE_BASE_API}flowcharts/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: 'Bearer ' + token,
      },
    });
    if (!response.ok) return new Error('error occured while making request');
    const isDeleted = response.status === 204;
    console.log(isDeleted);
    return isDeleted;
  } catch (error) {
    console.log(error);
  }
};
