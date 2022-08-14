<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import SlideshowPlayerControls from "./SlideshowPlayerControls.vue";

const CONTROLS_TIMEOUT = 1500;

const root = ref<HTMLElement>();
const isFullscreen = ref(false);
const showControls = ref(true);
const freezeControls = ref(false);
const mouseActivityTimeoutId = ref<number | null>(null);

onMounted(() => {
  root.value?.addEventListener("fullscreenchange", exitFullscreenHandler);
  root.value?.addEventListener("mousemove", mouseMoveHandler);
});

onBeforeUnmount(() => {
  root.value?.removeEventListener("fullscreenchange", exitFullscreenHandler);
  root.value?.removeEventListener("mousemove", mouseMoveHandler);
});

// Minimize/Maximise
const exitFullscreenHandler = () => {
  if (document.fullscreenElement) return;
  isFullscreen.value = false;
};

const toggleMaximise = async () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    return;
  }

  try {
    await root.value?.requestFullscreen();
    isFullscreen.value = true;
  } catch (err) {
    console.error("Unable to enter fullscreen mode");
  }
};

// Control Visiblity
const hideControlsTimeout = () => {
  if (freezeControls.value) return;
  showControls.value = false;
};
const mouseMoveHandler = () => {
  showControls.value = true;

  if (mouseActivityTimeoutId.value) {
    clearTimeout(mouseActivityTimeoutId.value);
  }
  mouseActivityTimeoutId.value = setTimeout(
    hideControlsTimeout,
    CONTROLS_TIMEOUT
  );
};
const freezeControlsHandler = (state: boolean) => {
  freezeControls.value = state;
};
</script>

<template>
  <div ref="root" class="slideshow-player">
    <SlideshowPlayerControls
      :visible="showControls"
      @toggleMaximise="toggleMaximise"
      @freezeControls="freezeControlsHandler"
    />
  </div>
</template>

<style lang="scss" scoped>
.slideshow-player {
  background: #000;
  height: 100%;
  width: 100%;
}
</style>
