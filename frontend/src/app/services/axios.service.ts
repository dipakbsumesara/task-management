import axios from 'axios';
import { LOCAL_STORAGE_KEYS } from '../helpers/constants';
import { toast } from 'react-toastify';

const _axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

_axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN); // Retrieve the token from storage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Append token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error?.response?.data?.message || "something went wrong";
    toast.error(errorMessage);
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
    return await _axios.post(url, payload).then((resp) => resp.data);
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

export const removeApi = async (url: string, payload: any = null) => {
  try {
    return payload
      ? await _axios.delete(url, {
          data: payload,
        })
      : await _axios.delete(url);
  } catch (error) {
    throw error;
  }
};
