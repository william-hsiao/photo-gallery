<script setup lang="ts">
import { ref } from "vue";
import Showcase from "@/components/Showcase.vue";

const photoUrls = ref([
  "assets/photos/logo.png",
  "assets/photos/1280px-Grafana_logo.png",
]); // TODO: Update with API call
</script>

<template>
  <showcase :photoUrls="photoUrls" />
</template>
