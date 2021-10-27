<script lang="ts" setup>
import { AttributeModel } from "./types/types";
const attributes: AttributeModel[] = [
  {
    date: new Date(),
    text: "Tax Deadline",
    color: "deeppink",
  },
  {
    date: new Date(),
    text: "Mum Visiting",
    color: "teal",
  },
];

const myDate = ref(new Date());
</script>

<template>
  <VueCal :attributes="attributes" v-model="myDate" />
  {{ myDate }}
</template>
