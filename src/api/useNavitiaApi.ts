import { useApi } from "./useApi";
import L from "leaflet";

export function useNavitiaApi() {
  const api = useApi("gares");

  function getIsochroneData({
    location,
    maxDuration,
  }: {
    location: L.LatLngExpression;
    maxDuration: number;
  }) {
    const payload = { location, maxDuration };
    return api.post(`/isochrone`, payload);
  }

  function getItineraire({
    from,
    to,
  }: {
    from: L.LatLngExpression;
    to: L.LatLngExpression;
  }) {
    const payload = { from, to };
    return api.post(`/itineraire`, payload);
  }

  return {
    getIsochroneData,
    getItineraire,
  };
}
