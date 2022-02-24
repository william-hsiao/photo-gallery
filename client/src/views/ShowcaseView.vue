<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getPhotoList } from "@/apiClient";
import Showcase from "@/components/Showcase.vue";

const photoUrls = ref([]);

onMounted(async () => {
  photoUrls.value = await getPhotoList();
});
</script>

<template>
  <showcase :photoUrls="photoUrls" />
</template>
