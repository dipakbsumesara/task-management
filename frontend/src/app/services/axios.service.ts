import axios from 'axios';

const _axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

_axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error status', error.response.status);
      console.error('Error data', error.response.data);
      console.error('Error headers', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request', error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Error message', error.message);
    }

    // If you want to handle errors based on their status code, you can do it here
    if (error?.response?.status === 401) {
      // Redirect to login or do something else
      console.log('Unauthorized, redirecting...');
    }

    return Promise.reject(error);
  }
);

export const getApi = async (url: string) => {
  try {
    return await _axios.get(url);
  } catch (error) {
    throw error;
  }
};

export const postApi = async (url: string, payload: any) => {
  try {
    return await _axios.post(url, payload);
  } catch (error) {
    throw error;
  }
};

export const patchApi = async (url: string, payload: any) => {
  try {
    return await _axios.patch(url, payload);
  } catch (error) {
    throw error;
  }
};

export const removeApi = async (url: string) => {
  try {
    return await _axios.delete(url);
  } catch (error) {
    throw error;
  }
};
