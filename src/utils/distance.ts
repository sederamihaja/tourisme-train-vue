export function getJourneyDistance(journey: any) {
  if (!journey.sections) return 0;

  let totalMeters = 0;

  journey.sections.forEach((section: any) => {
    if (
      section.geojson?.coordinates &&
      section.geojson.coordinates.length > 1
    ) {
      const coords = section.geojson.coordinates;
      for (let i = 1; i < coords.length; i++) {
        const [lon1, lat1] = coords[i - 1];
        const [lon2, lat2] = coords[i];
        totalMeters += haversineDistance(lat1, lon1, lat2, lon2);
      }
    }
  });

  return totalMeters;
}

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceMeters = R * c;
  return distanceMeters / 1000;
}
