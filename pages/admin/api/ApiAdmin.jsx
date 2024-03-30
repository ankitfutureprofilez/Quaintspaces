import axios from 'axios';

const API_URL =  process.env.NEXT_PUBLIC_APP_BASE_URL;

function getToken() {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('Admintoken');
    return data;
  }
  return null;
}

let ApiAdmin = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

ApiAdmin.interceptors.request.use(
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

export default ApiAdmin;
