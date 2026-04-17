<script setup lang="ts">
import { ref } from "vue";

type LocationPoint = {
  type: "Point";
  coordinates: [number, number];
};

export type NearbyLocation = {
  _id: string;
  nom: string;
  type: string;
  adresse: string;
  location: LocationPoint;
};

const props = defineProps<{
  locations: NearbyLocation[];
}>();

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
        v-for="loc in locations"
        :key="loc._id"
        class="flex-shrink-0 w-64 border border-gray-200 rounded p-3 hover:bg-gray-50"
      >
        <h3 class="font-semibold">{{ loc.nom }}</h3>
        <p class="text-sm text-gray-600">
          <strong>Type : </strong>{{ loc.type }}
        </p>
        <p class="text-sm text-gray-600">
          <strong>Adresse : </strong>{{ loc.adresse }}
        </p>
      </li>
    </ul>
  </div>
</template>
