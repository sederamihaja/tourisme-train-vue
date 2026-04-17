<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  modelValue: Number,
  min: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    default: 5,
  },
  label: {
    type: String,
    default: "",
  },
  unit: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const rangeStyle = computed(() => {
  const percent =
    ((props.modelValue - props.min) / (props.max - props.min)) * 100;
  return {
    background: `linear-gradient(to right, #b01678 0%, #b01678 ${percent}%, #e5e7eb ${percent}%, #e5e7eb 100%)`,
  };
});

const formatHours = (value: number) => {
  let hours = Math.floor(value);
  let minutes = Math.round((value - hours) * 60);

  if (minutes === 60) {
    hours++;
    minutes = 0;
  }

  if (minutes === 0) return `${hours}h`;
  if (hours === 0) return `${minutes}min`;

  return `${hours}h ${minutes}min`;
};

function updateValue(event) {
  emit("update:modelValue", Number(event.target.value));
}
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <label class="text-sm font-semibold text-gray-700">
      {{ label }}
      <span class="text-[#7d206f]">{{ formatHours(modelValue) }}</span>
    </label>

    <input
      type="range"
      :min="min"
      :max="max"
      step="1"
      :value="modelValue"
      @input="updateValue"
      class="slider-input w-full"
      :style="rangeStyle"
    />
  </div>
</template>

<style>
.slider-input {
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  border-radius: 9999px;
  outline: none;
}

/* Chrome / Safari */
.slider-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #7d206f;
  cursor: pointer;
  margin-top: -6px;
  transition: transform 0.2s;
}
.slider-input::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

/* Firefox */
.slider-input::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #7d206f;
  cursor: pointer;
  border: none;
}
</style>
