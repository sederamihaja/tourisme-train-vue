import axios from 'axios';

function handleError(error: any) {
  throw error;
}

const api_host = import.meta.env.VITE_API_URL;

export function useApi(resource: string) {
  const instance = axios.create({
    baseURL: api_host,
    proxy: false,
    headers: {}
  });

  async function post(url: string, payload: {} = {}, headers: {} = {}) {
    try {
      const mergedHeaders = { ...headers };

      const { data } = await instance.post(`${url}`, payload, { headers: mergedHeaders });
      return data;
    } catch (error) {
      handleError(error);
    }
  }

  async function get(url: string, params: {} = {}, headers: {} = {}) {
    try {
      const mergedHeaders = { ...headers };
      
      const { data } = await instance.get(`${url}`, { params, headers: mergedHeaders });
      return data;
    } catch (error) {
      handleError(error);
    }
  }

  return { post, get }
}