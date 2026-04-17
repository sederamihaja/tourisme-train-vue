type GeoPoint = {
  type: "Point";
  coordinates: [number, number]; // [lon, lat]
};

export type Institution = {
  _id: string;
  nom: string;
  type: string;
  adresse: string;
  location: GeoPoint;
  __v: number;
};
