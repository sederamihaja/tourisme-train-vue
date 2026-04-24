<script setup lang="ts">
import { ref } from "vue";

import type { Place } from "../../types";
import { PlaceModal } from "./index";

const props = defineProps<{
  places: Place[];
}>();

const showDetails = ref(false);
const selectedPlace = ref<Place | null>(null);

const scrollContainer = ref<HTMLUListElement | null>(null);

const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -200, behavior: "smooth" });
  }
};

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 200, behavior: "smooth" });
  }
};

const selectPlace = (place: Place) => {
  selectedPlace.value = place;
  showDetails.value = true;
};
</script>

<template>
  <div class="relative bg-white p-4">
    <!-- Bouton gauche -->
    <button
      @click="scrollLeft"
      class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 size-14 rounded-full z-10"
    >
      <i class="icn-arrow-prev" />
    </button>

    <!-- Bouton droit -->
    <button
      @click="scrollRight"
      class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 size-14 rounded-full z-10"
    >
      <i class="icn-arrow-next" />
    </button>

    <ul ref="scrollContainer" class="flex space-x-4 overflow-x-auto pb-3">
      <li
        v-for="pl in places"
        :key="pl._id"
        class="flex-shrink-0 w-64 border border-gray-200 rounded p-3 hover:bg-gray-50"
        @click="selectPlace(pl)"
      >
        <h3 class="font-semibold">{{ pl.nom }}</h3>
        <p class="text-sm text-gray-600">
          <strong>Type : </strong>{{ pl.type }}
        </p>
        <p class="text-sm text-gray-600">
          <strong>Adresse : </strong>{{ pl.adresse }}
        </p>
      </li>
    </ul>

    <PlaceModal
      v-if="selectedPlace"
      v-model:visible="showDetails"
      :data="selectedPlace"
    />
  </div>
</template>
