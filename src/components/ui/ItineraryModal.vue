<script setup lang="ts">
import { computed, ref } from "vue";
import Dialog from "primevue/dialog";
import dayjs from "dayjs";

import { getJourneyDistance } from "../../utils/distance";
import { formatHours } from "../../utils/hours";

import type { Gare, Itineraire, Journey, Horaire } from "../../types";

const props = defineProps<{
  visible: boolean;
  data: Itineraire | null;
  departureGare: Gare | null;
}>();

const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
  (e: "choose-itinerary", value: Journey): void;
}>();

const open = ref(false);

const dialogVisible = computed({
  get: () => props.visible,
  set: (value) => emit("update:visible", value),
});

const ordreJours = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

const trierHoraires = (horaires: Horaire[]) => {
  return [...horaires].sort(
    (a, b) => ordreJours.indexOf(a.jour) - ordreJours.indexOf(b.jour),
  );
};

const chooseItinerary = (itinerary: Journey) => {
  emit("choose-itinerary", itinerary);
};
</script>

<template>
  <Dialog
    v-model:visible="dialogVisible"
    modal
    :style="{ width: '32rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '95vw' }"
  >
    <template #header>
      <div class="flex align-items-center gap-2">
        <i class="pi pi-exclamation-triangle text-orange-500"></i>
        <span class="font-semibold">Autre itinéraires disponibles</span>
      </div>
    </template>

    <table class="w-full">
      <thead>
        <tr>
          <th class="px-6 py-3 text-center">Départ</th>
          <th class="px-6 py-3 text-center">Distance</th>
          <th class="px-6 py-3 text-center">Durée</th>
          <th class="px-6 py-3 text-center"></th>
        </tr>
      </thead>

      <tbody v-if="data">
        <tr v-for="(journey, index) in data.journeys" :key="index">
          <td class="py-3 text-center">
            {{ dayjs(journey.departure_date_time).format("DD/MM/YYYY HH:mm") }}
          </td>
          <td class="py-3 text-center">
            {{ Math.round(getJourneyDistance(journey)) }} km
          </td>
          <td class="py-3 text-center">
            {{ formatHours(Math.round(journey.duration)) }}
          </td>
          <td class="py-3 text-center">
            <button
              class="text-[#b01678] hover:text-[#7d206f] hover:underline"
              @click="chooseItinerary(journey)"
            >
              Afficher
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div
      class="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-6 mb-8"
    ></div>

    <!-- HEADER COLLAPSE -->
    <button
      @click="open = !open"
      class="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition"
    >
      <span class="font-semibold text-left">
        Horaire d'ouverture de la gare :
        <strong>{{ departureGare?.nom }}</strong>
      </span>

      <svg
        class="w-5 h-5 transform transition-transform duration-200"
        :class="{ 'rotate-180': open }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <!-- CONTENT COLLAPSE -->
    <transition name="fade">
      <div v-show="open" class="p-4 bg-white">
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm text-left">
            <thead>
              <tr class="text-gray-500 text-xs uppercase tracking-wider">
                <th class="pb-3">Jour</th>
                <th class="pb-3 text-right">Horaire normal</th>
                <th class="pb-3 text-right">Horaire férié</th>
              </tr>
            </thead>

            <tbody class="text-gray-700">
              <tr
                v-for="h in trierHoraires(departureGare?.horaires ?? [])"
                :key="h._id"
                class="hover:bg-gray-50 transition rounded-lg"
              >
                <td class="py-3 font-medium">
                  {{ h.jour }}
                </td>

                <td class="py-3 text-right">
                  <span class="px-2 py-1 bg-gray-100 rounded-md">
                    {{ h.horaire_normal || "-" }}
                  </span>
                </td>

                <td class="py-3 text-right">
                  <span class="px-2 py-1 bg-gray-100 rounded-md">
                    {{ h.horaire_ferie || "-" }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </transition>
  </Dialog>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
