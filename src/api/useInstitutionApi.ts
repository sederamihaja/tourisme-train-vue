import { useApi } from "./useApi";

export function useInstitutionApi() {
  const api = useApi("institutions");

  function getNearBy({ location }: { location: Object }) {
    return api.post(`/institutions/near-by`, {
      location,
    });
  }

  return {
    getNearBy,
  };
}
