type GeoPoint = {
  type: "Point";
  coordinates: [number, number]; // [lon, lat]
};

export type Place = {
  _id: string;
  nom: string;
  type: string;
  adresse: string;
  location: GeoPoint;
  email?: string;
  telephone?: string;
  site_internet?: string;
  site_satisfaction?: string;
  envergure?: string;
  discipline?: string;
  periode?: string;
  __v: number;
};
