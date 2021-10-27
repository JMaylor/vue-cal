<script lang="ts" setup>
import { AttributeModel } from "@/types/types";
import { getDate, isSameDay } from "date-fns";
import { state } from "@/store";

const props = defineProps<{
  day: Date;
  attributes: AttributeModel[];
}>();
const emit = defineEmits(["arrowPress"]);

const display = computed(() => getDate(props.day));
const isFocusable = (date: Date): boolean => isSameDay(date, state.activeDate);

const root = ref();

watch(
  () => state.activeDate,
  (value) => {
    if (state.arrowNav && isSameDay(value, props.day)) {
      nextTick(() => root.value.focus());
      state.arrowNav = false;
    }
  },
  { immediate: true }
);

const selectDate = () => {
  state.selectedDate = props.day;
  console.log(state);
};
</script>

<template>
  <button
    :tabindex="isFocusable(day) ? 0 : -1"
    ref="root"
    @keydown.left="emit('arrowPress', $event)"
    @keydown.right="emit('arrowPress', $event)"
    @keydown.up="emit('arrowPress', $event)"
    @keydown.down="emit('arrowPress', $event)"
    @click="selectDate"
    class="
      relative
      flex
      items-center
      justify-center
      w-10
      h-10
      cursor-pointer
      rounded-full
      cursor
      outline-none
      focus:bg-zinc-200
      hover:bg-zinc-100
      group
    "
  >
    {{ display }}
    <div
      v-if="attributes.length > 0"
      class="absolute flex space-x-0.5 bottom-1"
    >
      <div
        v-for="{ color } in attributes"
        class="bottom-1 h-1.5 w-1.5 rounded-full"
        :style="{ backgroundColor: color }"
      />
    </div>
    <ul
      v-if="attributes.length > 0"
      class="
        absolute
        w-32
        max-w-xs
        px-2
        py-0.5
        leading-tight
        top-10
        text-sm
        left-1/2
        transform
        -translate-x-1/2
        hidden
        group-focus:block
        group-hover:block
        rounded
        border
      "
    >
      <li
        v-for="{ text, color } in attributes"
        class="flex space-x-1 items-center whitespace-nowrap"
      >
        <div
          class="h-1.5 w-1.5 rounded-full"
          :style="{ backgroundColor: color }"
        />
        <span>{{ text }}</span>
      </li>
    </ul>
  </button>
</template>
