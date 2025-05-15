// axios/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers':
      'Origin,Authorization,Content-Type,Accept,User-Agent,Cache-Control,Keep-Alive,X-Requested-With,If-Modified-Since',
  },
});

api.interceptors.request.use(config => {
  const userInfo = localStorage.getItem('userInfo');
  const accessToken = userInfo ? JSON.parse(userInfo).accessToken : null;

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use(
  response => response?.data || response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await api.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/refresh-token`,
          { withCredentials: true }
        );

        const newToken = res.data.accessToken;
        const userInfo = localStorage.getItem('userInfo');
        const user = userInfo ? JSON.parse(userInfo) : null;
        user.accessToken = newToken;

        localStorage.setItem('userInfo', JSON.stringify(user));
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch {
        localStorage.removeItem('userInfo');
        window.location.href = '/auth/login';
      }
    }

    if (error.response?.status === 403) {
      localStorage.removeItem('userInfo');
      window.location.href = '/auth/login';
    }

    const errResponse = error.response;
    return Promise.reject(errResponse);
  }
);

export default api;
