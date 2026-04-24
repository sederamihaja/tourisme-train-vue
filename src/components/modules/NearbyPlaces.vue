<script setup lang="ts">
import { ref } from "vue";

import { Place as PlaceModel } from "./index";
import type { Place } from "../../types";

const props = defineProps<{
  places: Place[];
}>();

const isOpen = ref(true);
</script>

<template>
  <div
    class="fixed bottom-0 left-0 w-full shadow-lg overflow-y-auto z-50 select-none"
  >
    <div class="flex justify-between items-end">
      <div
        class="flex justify-center w-80 ml-1 p-2 bg-[#b01678] text-white rounded-t-lg cursor-pointer"
        @click="isOpen = !isOpen"
      >
        <h2 class="text-xl font-bold">Points d'intérêt à proximité</h2>
      </div>

      <div class="bg-white rounded-2xl shadow-lg p-4 w-50 space-y-3 m-6">
        <!-- Item -->
        <div class="flex items-center gap-3">
          <span class="w-4 h-4 rounded-full bg-blue-600 shadow"></span>
          <span class="text-gray-800">Gare</span>
        </div>

        <div class="flex items-center gap-3">
          <span class="w-4 h-4 rounded-full bg-[#c72434] shadow"></span>
          <span class="text-gray-800">Institution</span>
        </div>

        <div class="flex items-center gap-3">
          <span class="w-4 h-4 rounded-full bg-[#f59e0b] shadow"></span>
          <span class="text-gray-800">Etablissement</span>
        </div>

        <div class="flex items-center gap-3">
          <span class="w-4 h-4 rounded-full bg-[#28d1a4] shadow"></span>
          <span class="text-gray-800">Festival</span>
        </div>
      </div>
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
        <PlaceModel :places="places" />
      </div>
    </transition>
  </div>
</template>
