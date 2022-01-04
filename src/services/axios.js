import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

const axiosInstance = axios.create({
  baseURL: 'https://16.ecmascript.pages.academy/cinemaddict/',
  timeout: 10000,
  headers: { 'Authorization': 'Basic nicothin' }
});

axiosInstance.interceptors.response.use((response) => {
  response.data = camelcaseKeys(response.data, { deep: true });
  return response;
}, (error) => Promise.reject(error));

export { axiosInstance as axios };
