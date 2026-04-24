import { useApi } from "./useApi";

export function useFestivalApi() {
  const api = useApi("festivals");

  function getNearBy({ location }: { location: Object }) {
    return api.post(`/festivals/near-by`, {
      location,
    });
  }

  return {
    getNearBy,
  };
}
