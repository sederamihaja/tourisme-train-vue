export type LonLat = [number, number];

export type GeoPoint = {
  lon: string;
  lat: string;
};

/* =========================
 * CO2
 * ========================= */

export type Co2Emission = {
  value: number;
  unit: string;
};

/* =========================
 * GEOJSON
 * ========================= */

export type LineStringGeoJSON = {
  type: "LineString";
  coordinates: LonLat[];
  properties?: unknown[];
};

/* =========================
 * STOP POINT
 * ========================= */

export type StopPoint = {
  id: string;
  name: string;
  label?: string;
  coord: GeoPoint;
};

/* =========================
 * ADDRESS
 * ========================= */

export type Address = {
  id: string;
  coord: GeoPoint;
  house_number?: number;
  label: string;
  name: string;
};

/* =========================
 * FROM / TO (Navitia polymorph)
 * ========================= */

export type JourneyEndpoint =
  | {
      embedded_type: "stop_point";
      id: string;
      name: string;
      stop_point: StopPoint;
    }
  | {
      embedded_type: "address";
      id: string;
      name: string;
      address: Address;
    };

/* =========================
 * SECTION
 * ========================= */

export type JourneySection = {
  id: string;

  duration: number;

  co2_emission: Co2Emission;

  departure_date_time: string;
  arrival_date_time: string;

  from: JourneyEndpoint;
  to: JourneyEndpoint;

  geojson: LineStringGeoJSON;

  mode: "walking" | "public_transport" | "transfer" | "waiting" | string;

  type: string;

  links: unknown[];
};

/* =========================
 * JOURNEY
 * ========================= */

export type Journey = {
  duration: number;
  nb_transfers: number;

  departure_date_time: string;
  arrival_date_time: string;

  type: string;
  status?: string;

  co2_emission?: Co2Emission;

  sections: JourneySection[];
};

/* =========================
 * FULL API RESPONSE (optionnel)
 * ========================= */

export type NavitiaJourneyResponse = {
  journeys: Journey[];
  links?: unknown[];
};

export interface Itineraire {
  journeys: Journey[];
  links?: any[];
}
