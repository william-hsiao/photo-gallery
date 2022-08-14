<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { getPhotoList, type Photos } from "@/apiClient";
import SlideshowPlayer from "@/components/SlideshowPlayer/SlideshowPlayer.vue";

const photoUrls = ref<Photos>([]);

onBeforeMount(async () => {
  photoUrls.value = await getPhotoList();
});
</script>

<template>
  <div class="slideshow-container">
    <SlideshowPlayer :photoUrls="photoUrls" />
  </div>
</template>

<style lang="scss" scoped>
.slideshow-container {
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
}
</style>
