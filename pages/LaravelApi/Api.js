
import axios from 'axios';
// const URL_APP = process.env.REACT_APP_BASE_URL;
// console.log("url ",URL_APP) 

const API_URL = process.env.NEXT_PUBLIC_APP_BASE_URL

// console.log("API_URL",API_URL)

function getToken() {
  if (typeof window !== 'undefined') { // Check if window is defined (i.e., if running on the client side)
    const data = localStorage.getItem('token');
    return data;
  }
  return null; // Handle the case when running on the server side
}

let Api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
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
