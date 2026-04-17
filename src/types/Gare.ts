export interface Gare {
  _id: string;
  nom: string;
  libellecourt: string;
  segment_drg: string;
  location: {
    type: "Point";
    coordinates: [number, number]; // [latitude, longitude]
  };
  codeinsee: string;
  codes_uic: string;
}