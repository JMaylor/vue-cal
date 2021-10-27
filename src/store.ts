const today = new Date();
today.setHours(0, 0, 0, 0);

export const state = reactive({
  activeDate: today,
  selectedDate: null as Date | null,
  arrowNav: false,
});
