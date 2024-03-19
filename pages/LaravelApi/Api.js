import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

function getToken() {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('token');
    return data;
  }
  return null;
}

let Api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

Api.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Api;
