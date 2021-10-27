<script lang="ts" setup>
import { AttributeModel } from "@/types/types";
import { getMonth, getDaysInMonth, setDate, add, sub } from "date-fns";
import { state } from "@/store";

const props = defineProps<{
  attributes: AttributeModel[];
  modelValue?: Date;
}>();

const emit = defineEmits(["update:modelValue"]);
provide("selectedDate", props.modelValue);

function genMonth(date: Date): Date[] {
  const numDaysInMonth = getDaysInMonth(date);
  const dateArray = [];
  for (let i = 1; i <= numDaysInMonth; i++) {
    dateArray.push(setDate(date, i));
  }
  return dateArray;
}

watch(
  () => state.selectedDate,
  (val) => emit("update:modelValue", val)
);

const prevMonth = ref(genMonth(sub(state.activeDate, { months: 1 })));
const currentMonth = ref(genMonth(state.activeDate));
const nextMonth = ref(genMonth(add(state.activeDate, { months: 1 })));

const prevMonthNumber = computed(() =>
  getMonth(sub(state.activeDate, { months: 1 }))
);
const currentMonthNumber = computed(() => getMonth(state.activeDate));
const nextMonthNumber = computed(() =>
  getMonth(add(state.activeDate, { months: 1 }))
);

watch(currentMonthNumber, () => {
  prevMonth.value = genMonth(sub(state.activeDate, { months: 1 }));
  currentMonth.value = genMonth(state.activeDate);
  nextMonth.value = genMonth(add(state.activeDate, { months: 1 }));
});

const onPrev = () => (state.activeDate = sub(state.activeDate, { months: 1 }));
const onNext = () => (state.activeDate = add(state.activeDate, { months: 1 }));
</script>

<template>
  <div class="rounded-xl border w-72">
    <CalHeader :date="state.activeDate" @prev="onPrev" @next="onNext" />
    <div class="p-1 grid grid-cols-7">
      <div
        class="
          flex
          items-center
          justify-center
          w-10
          h-10
          text-zinc-400
          font-medium
        "
        v-for="day in ['S', 'M', 'T', 'W', 'T', 'F', 'S']"
      >
        {{ day }}
      </div>
      <CalMonth
        hidden
        :month="prevMonth"
        :key="prevMonthNumber"
        :attributes="attributes"
      ></CalMonth>
      <CalMonth
        :month="currentMonth"
        :key="currentMonthNumber"
        :attributes="attributes"
      ></CalMonth>
      <CalMonth
        hidden
        :month="nextMonth"
        :key="nextMonthNumber"
        :attributes="attributes"
      ></CalMonth>
    </div>
  </div>
</template>
