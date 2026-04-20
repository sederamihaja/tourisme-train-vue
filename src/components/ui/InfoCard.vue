<script setup lang="ts">
import { computed } from "vue";

type InfoCardValue =
  | number
  | string
  | {
      differenceAvion: number;
      differenceThermique: number;
    };

const props = defineProps<{
  label: string;
  value: InfoCardValue;
  isImpact?: boolean;
}>();

const emit = defineEmits<{
  (e: "click"): void;
}>();

const diffAvion = computed(() => {
  return typeof props.value === "object" && props.value !== null
    ? (props.value.differenceAvion ?? 0)
    : 0;
});

const diffThermique = computed(() => {
  return typeof props.value === "object" && props.value !== null
    ? (props.value.differenceThermique ?? 0)
    : 0;
});
</script>

<template>
  <div
    class="flex-1 bg-white border-2 border-[#b01678] text-center text-[#b01678] rounded-xl p-4 cursor-pointer select-none transition-all duration-200 hover:bg-gray-100 hover:shadow-xl hover:-translate-y-1 hover:border-[#8a125f]"
    @click="emit('click')"
  >
    <h3>
      <strong>{{ label }}</strong>
    </h3>
    <div v-if="isImpact" class="flex justify-center items-center">
      <div><i class="icn-car mr-2 align-middle"></i></div>
      <div>
        <span>{{ Math.round(diffThermique * 100) / 100 }}</span>
      </div>
      <div class="ml-4"><i class="icn-plane mr-2 align-middle"></i></div>
      <div>
        <span>{{ Math.round(diffAvion * 100) / 100 }}</span>
      </div>
    </div>
    <span v-else>
      {{ value }}
    </span>
  </div>
</template>
