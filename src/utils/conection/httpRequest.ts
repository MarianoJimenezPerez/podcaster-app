import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const allOriginsBaseUrl = 'https://api.allorigins.win/raw?url=';
const apiBaseUrl = import.meta.env.VITE_BASE_URL;

const http: AxiosInstance = axios.create({
  baseURL: allOriginsBaseUrl + apiBaseUrl,
  withCredentials: false
});

const httpRequest = {
  get: async (url: string, config?: AxiosRequestConfig) => {
    try {
      const response: AxiosResponse = await http.get(url, config);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

export default httpRequest;
