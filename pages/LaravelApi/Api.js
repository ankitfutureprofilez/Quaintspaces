import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_APP_BASE_URL
console.log("App_url",APP_URL)
function getToken() {
  const token = typeof window !== 'undefined' && localStorage.getItem("token");
  return token; 
}

let Api = axios.create({
  baseURL: APP_URL,
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
