<script setup lang="ts">
import { ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { debounce } from "lodash";

interface Props {
  placeholder?: string;
  fetchFn: (query: string) => Promise<any[]>;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "select", item: any): void;
}>();

const query = ref("");
const results = ref<any[]>([]);

const { refetch } = useQuery({
  queryKey: ["search", query.value],
  queryFn: async () => {
    if (query.value.length < 2) return [];
    return await props.fetchFn(query.value);
  },
  enabled: false,
});

const debouncedRefetch = debounce(() => {
  if (query.value.length >= 2)
    refetch().then((res) => {
      results.value = res.data;
    });
}, 300);

const onInput = () => {
  results.value = [];
  debouncedRefetch();
};

const select = (item: any) => {
  emit("select", item);
  query.value = item.nom || item.label;
  results.value = [];
};
</script>

<template>
  <div class="relative w-full">
    <!-- Input -->
    <div class="relative">
      <input
        type="text"
        v-model="query"
        :placeholder="placeholder"
        @input="onInput"
        class="w-full rounded-lg border border-gray-200 bg-white px-10 py-2 shadow-sm outline-none transition focus:outline-none"
      />

      <!-- Icône -->
      <i
        class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 icn-search"
      />
    </div>

    <!-- Results -->
    <ul
      v-if="results.length"
      class="absolute mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg z-50"
    >
      <li
        v-for="item in results"
        :key="item._id || item.id"
        @click="select(item)"
        class="cursor-pointer px-4 py-2 transition hover:bg-blue-50"
      >
        <slot name="item" :item="item">
          {{ item.nom || item.label }}
        </slot>
      </li>
    </ul>
  </div>
</template>
