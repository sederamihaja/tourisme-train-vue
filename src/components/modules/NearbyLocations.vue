<script setup lang="ts">
import { ref } from "vue";

import { Location } from "./index";

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

const isOpen = ref(true);
</script>

<template>
  <div
    class="fixed bottom-0 left-0 w-full shadow-lg overflow-y-auto z-50 select-none"
  >
    <div
      class="flex justify-center w-80 ml-1 p-2 bg-[#b01678] text-white rounded-t-lg cursor-pointer"
      @click="isOpen = !isOpen"
    >
      <h2 class="text-xl font-bold">Points d'intérêt à proximité</h2>
    </div>

    <transition
      enter-active-class="transition-transform duration-300"
      leave-active-class="transition-transform duration-300"
      enter-from-class="translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-full opacity-0"
    >
      <div v-show="isOpen" class="bg-white h-50 p-4">
        <Location :locations="locations" />
      </div>
    </transition>
  </div>
</template>
