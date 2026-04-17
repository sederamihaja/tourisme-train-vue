export interface Coordinates {
  type: "Point";
  coordinates: [number, number]; // [lon, lat]
}

export interface Horaire {
  _id: string;
  uic: string;
  jour: string;
  horaire_normal: string;
  horaire_ferie: string;
  __v: number;
}

export interface Gare {
  _id: string;
  location: Coordinates;
  nom: string;
  libellecourt: string;
  segment_drg: string;
  codeinsee: string;
  codes_uic: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  horaires: Horaire[];
}
