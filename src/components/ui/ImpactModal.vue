<script setup lang="ts">
import { computed, ref } from "vue";
import Dialog from "primevue/dialog";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import type { TooltipItem } from "chart.js";
import { Bar } from "vue-chartjs";

import type { TransportEmission } from "../../types";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const props = defineProps<{
  visible: boolean;
  data: TransportEmission[];
}>();

const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
}>();

const open = ref(false);

const dialogVisible = computed({
  get: () => props.visible,
  set: (value) => emit("update:visible", value),
});

const sorted = computed(() =>
  [...props.data].sort((a, b) => b.value - a.value),
);

const chartData = computed(() => ({
  labels: sorted.value.map((item) => item.name),
  datasets: [
    {
      label: "Émissions CO₂ (kg/km)",
      data: sorted.value.map((item) => Math.round(item.value * 100) / 100),
      backgroundColor: sorted.value.map((item) =>
        item.value > 50 ? "#ff4d4f" : item.value > 20 ? "#faad14" : "#52c41a",
      ),
    },
  ],
}));

const chartOptions = {
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context: TooltipItem<"bar">) =>
          `${context.raw as number} kgCO₂/km`,
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "kgCO₂ / km",
      },
    },
  },
} as const;
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
        <span class="font-semibold"
          >Impact CO₂e sur les différents types de tranport</span
        >
      </div>
    </template>

    <div style="height: 500px">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </Dialog>
</template>
