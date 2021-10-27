<template>
  <div class="header pt-3 px-4 flex justify-between items-center">
    <button @click="$emit('prev')" class="rounded-full">
      <span
        class="iconify w-8 h-8"
        data-icon="heroicons-solid:chevron-left"
      ></span>
    </button>
    <span class="text-xl">{{ display }}</span>
    <button @click="$emit('next')" class="rounded-full">
      <span
        class="iconify w-8 h-8"
        data-icon="heroicons-solid:chevron-right"
      ></span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { format } from "date-fns";

const props = defineProps<{
  date: Date;
}>();

const display = computed(() => format(props.date, "MMM y"));
</script>
