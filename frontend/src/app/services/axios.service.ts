import axios from 'axios';

const _axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

console.log({ baseURL: process.env.REACT_APP_API_URL });

export const getApi = async (url: string) => {
  return await _axios.get(url);
};

export const postApi = async (url: string, payload: any) => {
  return await _axios.post(url, payload);
};

export const patchApi = async (url: string, payload: any) => {
  return await _axios.patch(url, payload);
};

export const removeApi = async (url: string) => {
  return await _axios.delete(url);
};
