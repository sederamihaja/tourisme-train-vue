import { useApi } from "./useApi";

export function useImpactApi() {
  const api = useApi("gares");

  function getImpact({ distance }: { distance: number }) {
    const payload = { distance };
    return api.get(`/impact`, payload);
  }

  return {
    getImpact,
  };
}
