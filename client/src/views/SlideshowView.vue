<script setup lang="ts">
import SlideshowPlayer from "@/components/SlideshowPlayer/SlideshowPlayer.vue";
</script>

<template>
  <div class="slideshow-container">
    <SlideshowPlayer />
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
