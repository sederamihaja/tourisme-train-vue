<script setup lang="ts">
interface Props {
  label: string;
  value: string | number | object;
  isImpact?: boolean;
  hasClick?: boolean;
}

defineProps<Props>();
const emit = defineEmits<{
  (e: "more-itinerary"): void;
}>();
</script>

<template>
  <div
    class="flex-1 bg-white border-2 border-[#b01678] text-center text-[#b01678] shadow rounded-xl p-4 cursor-pointer select-none"
  >
    <h3>
      <strong>{{ label }}</strong>
    </h3>
    <div v-if="isImpact" class="flex justify-center items-center">
      <div><i class="icn-car mr-2 align-middle"></i></div>
      <div>
        <span>{{ Math.round(value?.differenceThermique * 100) / 100 }}</span>
      </div>
      <div class="ml-4"><i class="icn-plane mr-2 align-middle"></i></div>
      <div>
        <span>{{ Math.round(value?.differenceAvion * 100) / 100 }}</span>
      </div>
    </div>
    <span
      v-else
      :class="hasClick && 'hover:underline'"
      @click="emit('more-itinerary')"
    >
      {{ value }}
    </span>
  </div>
</template>
