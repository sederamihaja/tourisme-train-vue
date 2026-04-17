<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/vue-query";
import dayjs from "dayjs";

import { useInstitutionApi } from "../api/useInstitutionApi";
import { useGareApi } from "../api/useGareApi";
import { useNavitiaApi } from "../api/useNavitiaApi";
import { useImpactApi } from "../api/useImpactApi";
import { InputSearch, InputRange, InfoCard, ItineraryModal } from "./ui";
import { NearbyLocations } from "./modules";

import { getJourneyDistance } from "@/utils/distance";
import { formatHours } from "@/utils/hours";
import type { Gare } from "@/types";

const mapContainer = ref<HTMLDivElement | null>(null);
const map = ref<L.Map | null>(null);
const polygonLayer = ref<L.GeoJSON | null>(null);
const markersLayer = ref(L.layerGroup());
const isItinerary = ref(false);
const nearByInstitutions = ref([]);
const departureGare = ref<Gare>(null);
const departureMarker = ref<L.Marker | null>(null);
const destinationGare = ref<Gare>(null);
const destinationMarker = ref<L.Marker | null>(null);
const query = ref("");
const distance = ref(null);
const impact = ref(null);
const itineraire = ref(null);
const journey = ref(null);
const journeyPolyline = ref(null);
const showMoreItinerary = ref(false);

// Au début, centrer la carte sur la Gare du Nord (Paris)
const center = ref<L.LatLngExpression>([48.880185, 2.355151]);
const hours = ref(1);

const gareApi = useGareApi();
const institutionApi = useInstitutionApi();
const navitiaApi = useNavitiaApi();
const impactApi = useImpactApi();
const {
  data: gares,
  isSuccess,
  refetch,
} = useQuery({
  queryKey: ["gares", query.value],
  queryFn: async () => {
    if (query.value.length < 2) return [];
    return await gareApi.search(query.value);
  },
  enabled: false,
});

watch(query, () => {
  if (query.value.length >= 2) {
    refetch();
  }
});

const updateIsochrone = async () => {
  if (!map.value) return;

  if (polygonLayer.value) {
    polygonLayer.value.remove();
  }

  const isochroneData = await navitiaApi.getIsochroneData({
    location: center.value,
    maxDuration: hours.value * 3600,
  });

  const geojsonData = {
    type: "Feature",
    geometry: {
      type: "MultiPolygon",
      coordinates: isochroneData.isochrones[0].geojson.coordinates,
    },
    properties: {},
  } as const;

  polygonLayer.value = L.geoJSON(geojsonData, {
    style: {
      color: "#2563eb",
      fillColor: "#3b82f6",
      fillOpacity: 0.3,
    },
  }).addTo(map.value);

  if (hours.value > 0.5) {
    map.value.fitBounds(polygonLayer.value.getBounds());
  }
};

onMounted(() => {
  if (!mapContainer.value) return;

  map.value = L.map(mapContainer.value).setView(center.value, 8);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map.value);

  map.value.createPane("markersPane");
  map.value.getPane("markersPane").style.zIndex = 650;

  markersLayer.value.addTo(map.value);

  updateIsochrone();
});

// Recalcul si hours change
watch(hours, () => {
  updateIsochrone();
});

// Recalcul si center change
watch(destinationGare, () => {
  updateIsochrone();
});

// Recalcul l'itinéraire et l'impact
watch(journey, () => {
  showItinerary();
  calculateImpactCO2();
});

function createMarker(gare: Gare) {
  const [lon, lat] = gare.location.coordinates;

  return L.marker([lat, lon]).bindPopup(`<b>${gare.nom}</b>`);
}

function addMarker() {
  if (!map.value || !destinationGare.value) return;

  // Centrage intelligent
  const [destLon, destLat] = destinationGare.value.location.coordinates;

  if (departureGare.value) {
    const [depLon, depLat] = departureGare.value.location.coordinates;

    const bounds = L.latLngBounds([destLat, destLon], [depLat, depLon]);

    map.value.fitBounds(bounds, { padding: [50, 50] });
  } else {
    map.value.setView([destLat, destLon], 13);
    center.value = [destLat, destLon];
  }
}

const fetchGares = (query: string) => {
  return gareApi.search(query);
};

const onSelectDepartureGare = async (gare: Gare) => {
  departureGare.value = gare;

  if (departureMarker.value) {
    map.value.removeLayer(departureMarker.value);
  }

  departureMarker.value = createMarker(departureGare.value);
  departureMarker.value.addTo(map.value);

  if (polygonLayer.value) {
    map.value?.removeLayer(polygonLayer.value);
    polygonLayer.value = null;
  }

  addMarker();

  const [depLon, depLat] = departureGare.value.location.coordinates;
  const [destLon, destLat] = destinationGare.value.location.coordinates;

  // Calculer l'itinéraire
  itineraire.value = await navitiaApi.getItineraire({
    from: [depLon, depLat],
    to: [destLon, destLat],
  });

  // Afficher l'itinéraire
  const firstJourney = itineraire.value.journeys[0];
  if (firstJourney) {
    journey.value = firstJourney;
  }
};

const chooseItinerary = (payload) => {
  journey.value = payload;
  showMoreItinerary.value = false;
};

const showItinerary = () => {
  drawJourneyOnMap(journey.value);
  distance.value = getJourneyDistance(journey.value);
};

const calculateImpactCO2 = async () => {
  impact.value = await impactApi.getImpact({ distance: distance.value });
};

const onSelectDestinationGare = async (gare: Gare) => {
  destinationGare.value = gare;

  if (destinationMarker.value) {
    map.value.removeLayer(destinationMarker.value);
  }

  destinationMarker.value = createMarker(destinationGare.value);
  destinationMarker.value.addTo(map.value);

  // Remettre le temps max à 1h
  hours.value = 1;
  const [lat, lng] = gare.location.coordinates as [number, number];
  center.value = [lat, lng];

  addMarker();

  // Récupérer tous les institutions à proximités
  const nearByInst = await institutionApi.getNearBy({
    location: gare.location,
  });
  nearByInstitutions.value = nearByInst;
  addInstitutionsMarker(nearByInst);
};

function addInstitutionsMarker(institutions) {
  institutions.forEach(function (inst) {
    var coords = inst.location.coordinates;

    var lat = coords[1];
    var lng = coords[0];

    L.circleMarker([lat, lng], {
      radius: 6,
      color: "#fff",
      weight: 1,
      fillColor: "#7d206f",
      fillOpacity: 0.8,
      pane: "markersPane",
    }).addTo(map.value).bindPopup(`
      <div>
        <h3 style="margin:0 0 6px 0;">${inst.nom}</h3>

        <p style="margin:0;">
          <b>Type :</b> ${inst.type}
        </p>

        <p style="margin:0;">
          <b>Adresse :</b> ${inst.adresse}
        </p>
      </div>
    `);
  });
}

// Extraire les coordonnées
function getJourneyCoordinates(journey) {
  const coords = [];

  journey.sections.forEach((section) => {
    if (section.geojson?.coordinates) {
      section.geojson.coordinates.forEach(([lng, lat]) => {
        coords.push([lat, lng]);
      });
    } else if (section.from && section.to) {
      const fromLatLong = findLatLng(section.from);
      const toLatLong = findLatLng(section.to);
      coords.push([fromLatLong.lat, fromLatLong.lon]);
      coords.push([toLatLong.lat, toLatLong.lon]);
    }
  });

  return coords;
}

// Trouver la valeur de lat long
function findLatLng(obj) {
  if (typeof obj !== "object" || obj === null) return null;

  if ("lat" in obj && "lon" in obj) {
    return { lat: obj.lat, lon: obj.lon };
  }

  for (let key in obj) {
    const result = findLatLng(obj[key]);
    if (result) return result;
  }

  return null;
}

function drawJourneyOnMap(journey) {
  if (!map.value) return;

  const coords = getJourneyCoordinates(journey);

  if (journeyPolyline.value) {
    journeyPolyline.value.remove();
  }

  journeyPolyline.value = L.polyline(coords, {
    color: "blue",
    weight: 4,
  }).addTo(map.value);

  map.value.fitBounds(journeyPolyline.value.getBounds());
}

const cancelItinerary = () => {
  departureGare.value = null;
  if (departureMarker.value) {
    map.value.removeLayer(departureMarker.value);
    map.value.removeLayer(journeyPolyline.value);
  }
  isItinerary.value = false;
};
</script>

<template>
  <div class="relative w-screen h-screen">
    <!-- Map -->
    <div id="map" ref="mapContainer" class="absolute inset-0 z-0"></div>

    <!-- Controls -->
    <div class="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-1/2 space-y-4">
      <div
        class="bg-white/90 backdrop-blur rounded-xl shadow-lg p-4 space-y-4 pointer-events-auto"
      >
        <InputRange
          v-if="!isItinerary"
          v-model="hours"
          :min="0"
          :max="5"
          label="Temps max :"
          unit="h"
        />

        <div class="flex gap-4">
          <InputSearch
            v-if="isItinerary"
            placeholder="Rechercher une gare..."
            :fetchFn="fetchGares"
            @select="onSelectDepartureGare"
          >
            <template #item="{ item }">
              {{ item.nom }} ({{ item.libellecourt }})
            </template>
          </InputSearch>

          <!-- <button v-if="isItinerary" class="bg-transparent py-2 px-4 border border-[#b01678] rounded">{{ '<>' }}</button> -->

          <InputSearch
            placeholder="Rechercher une gare..."
            :fetchFn="fetchGares"
            @select="onSelectDestinationGare"
          >
            <template #item="{ item }">
              {{ item.nom }} ({{ item.libellecourt }})
            </template>
          </InputSearch>
          <button
            v-if="!isItinerary"
            class="bg-[#b01678] hover:bg-[#7d206f] text-white font-bold py-2 px-4 rounded"
            @click="isItinerary = true"
          >
            Itinéraire
          </button>
          <button
            v-else
            class="bg-[#b01678] hover:bg-[#7d206f] text-white font-bold py-2 px-4 rounded"
            @click="cancelItinerary"
          >
            Annuler
          </button>
        </div>
      </div>
      <div v-if="departureGare" class="flex gap-1">
        <InfoCard label="CO₂e evités (kg)" :value="impact" is-impact />
        <InfoCard label="Points d'intérêt" :value="nearByInstitutions.length" />
        <InfoCard
          label="Distance / Durée"
          :value="`${Math.round(distance)} km / ${formatHours(Math.round(journey?.duration))}`"
        />
        <InfoCard
          label="Départ"
          :value="`${dayjs(journey?.departure_date_time).format('DD/MM/YYYY HH:mm')}`"
          has-click
          @more-itinerary="showMoreItinerary = true"
        />
      </div>
    </div>

    <ItineraryModal
      v-model:visible="showMoreItinerary"
      :data="itineraire"
      :departure-gare="departureGare"
      @choose-itinerary="chooseItinerary"
    />

    <NearbyLocations
      v-if="nearByInstitutions.length"
      :locations="nearByInstitutions"
    />
  </div>
</template>
