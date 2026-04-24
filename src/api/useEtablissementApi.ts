import { useApi } from "./useApi";

export function useEtablissementApi() {
  const api = useApi("etablissements");

  function getNearBy({ location }: { location: Object }) {
    return api.post(`/etablissements/near-by`, {
      location,
    });
  }

  return {
    getNearBy,
  };
}
