import { useApi } from './useApi';

export function useGareApi() {
  const api = useApi('gares');

  function getAll() {
    const payload = {};
    return api.get(`/gares`, payload);
  }

  function search(query: string) {
    if (!query || query.length < 2) return Promise.resolve([]);
    return api.get(`/gares/search?q=${query}`);
  }

  return {
    getAll,
    search,
  };
}