<script setup lang="ts">
import { computed, ref } from "vue";
import Dialog from "primevue/dialog";

import type { Place } from "../../types";

const props = defineProps<{
  visible: boolean;
  data: Place;
}>();

const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
}>();

const open = ref(false);

const dialogVisible = computed({
  get: () => props.visible,
  set: (value) => emit("update:visible", value),
});

const hasValue = (val?: string) => {
  return val !== undefined;
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
        <h2 class="text-2xl font-bold text-gray-800">
          A propos de cette place
        </h2>
      </div>
    </template>

    <div class="space-y-3">
      <h3 class="font-bold text-gray-800">
        {{ data.nom }}
      </h3>

      <!-- TYPE -->
      <p v-if="hasValue(data.type)" class="text-sm text-gray-500">
        {{ data.type }}
      </p>

      <div class="space-y-3">
        <div v-if="hasValue(data.adresse)" class="flex gap-3">
          <span>📍</span>
          <p class="text-gray-700">{{ data.adresse }}</p>
        </div>

        <div v-if="hasValue(data.email)" class="flex gap-3">
          <span>✉️</span>
          <p class="text-gray-700">{{ data.email }}</p>
        </div>

        <div v-if="hasValue(data.telephone)" class="flex gap-3">
          <span>📞</span>
          <p class="text-gray-700">{{ data.telephone }}</p>
        </div>

        <div v-if="hasValue(data.site_internet)" class="flex gap-3">
          <span>🌐</span>
          <a :href="data.site_internet" class="text-blue-600 hover:underline">
            {{ data.site_internet }}
          </a>
        </div>

        <div v-if="hasValue(data.site_satisfaction)" class="flex gap-3">
          <span>📊</span>
          <a
            :href="data.site_satisfaction"
            class="text-blue-600 hover:underline"
          >
            {{ data.site_satisfaction }}
          </a>
        </div>

        <!-- GRID INFOS -->
        <div class="grid grid-cols-2 gap-4 mt-4">
          <div
            v-if="hasValue(data.envergure)"
            class="bg-gray-50 p-3 rounded-lg"
          >
            <p class="text-xs text-gray-500">Envergure</p>
            <p class="font-medium">{{ data.envergure }}</p>
          </div>

          <div
            v-if="hasValue(data.discipline)"
            class="bg-gray-50 p-3 rounded-lg"
          >
            <p class="text-xs text-gray-500">Discipline</p>
            <p class="font-medium">{{ data.discipline }}</p>
          </div>

          <div
            v-if="hasValue(data.periode)"
            class="bg-gray-50 p-3 rounded-lg col-span-2"
          >
            <p class="text-xs text-gray-500">Période</p>
            <p class="font-medium">{{ data.periode }}</p>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>
