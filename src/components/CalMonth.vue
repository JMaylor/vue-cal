<script lang="ts" setup>
import { AttributeModel } from "@/types/types";
import { getDay, getMonth, getDate, add, sub, isSameDay } from "date-fns";
import { state } from "@/store";

interface Props {
  month: Date[];
  attributes: AttributeModel[];
  hidden?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hidden: false,
});

const getAttributes = (calDate: Date): AttributeModel[] =>
  props.attributes.filter(({ date }) => isSameDay(calDate, date));

const firstWeekDay = computed(() => getDay(props.month[0]));

const colStart = computed((): string | void => {
  if (firstWeekDay.value == 0) return "col-start-1";
  if (firstWeekDay.value == 1) return "col-start-2";
  if (firstWeekDay.value == 2) return "col-start-3";
  if (firstWeekDay.value == 3) return "col-start-4";
  if (firstWeekDay.value == 4) return "col-start-5";
  if (firstWeekDay.value == 5) return "col-start-6";
  if (firstWeekDay.value == 6) return "col-start-7";
  return;
});

function onArrowPress(e: KeyboardEvent): void {
  state.arrowNav = true;
  switch (e.key) {
    case "ArrowRight":
      state.activeDate = add(state.activeDate, { days: 1 });
      break;
    case "ArrowLeft":
      state.activeDate = sub(state.activeDate, { days: 1 });
      break;
    case "ArrowUp":
      state.activeDate = sub(state.activeDate, { days: 7 });
      break;
    case "ArrowDown":
      state.activeDate = add(state.activeDate, { days: 7 });
      break;
  }
}

const numFillerDays = computed(
  () => 42 - props.month.length - firstWeekDay.value
);
</script>

<template>
  <CalDay
    v-if="!hidden"
    v-for="(day, i) in month"
    class="w-10 h-10"
    :class="[i == 0 ? colStart : '']"
    :day="day"
    @arrowPress="onArrowPress"
    :attributes="getAttributes(day)"
  >
    {{ i }}
  </CalDay>
  <div v-if="!hidden" class="w-10 h-10" v-for="i in numFillerDays" />
</template>
