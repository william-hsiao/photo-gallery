<script setup lang="ts">
import {
  defineProps,
  onMounted,
  onBeforeUnmount,
  ref,
  type PropType,
} from "vue";
import SlideshowPlayerControls from "./SlideshowPlayerControls.vue";
import SlideshowPlayerCanvas from "./SlideshowPlayerCanvas.vue";

const CONTROLS_TIMEOUT = 1500;
const PHOTO_INTERVAL = 3000;

const props = defineProps({
  photoUrls: { type: Array as PropType<string[]>, required: true },
});

const root = ref<HTMLElement>();
const isFullscreen = ref(false);
const showControls = ref(true);
const freezeControls = ref(false);
const mouseActivityTimeoutId = ref<number | null>(null);
const activePhotoIndex = ref(0);
const photoInterval = ref<number | null>(null);

onMounted(async () => {
  root.value?.addEventListener("fullscreenchange", exitFullscreenHandler);
  root.value?.addEventListener("mousemove", mouseMoveHandler);

  photoInterval.value = setInterval(() => {
    if (props.photoUrls.length === 0) return;
    activePhotoIndex.value =
      (activePhotoIndex.value + 1) % props.photoUrls.length;
  }, PHOTO_INTERVAL);
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
  <div
    ref="root"
    class="slideshow-player"
    :class="{ 'hide-cursor': !showControls }"
  >
    <SlideshowPlayerControls
      class="slideshow-controls"
      :visible="showControls"
      @toggleMaximise="toggleMaximise"
      @freezeControls="freezeControlsHandler"
    />
    <SlideshowPlayerCanvas
      :photoUrls="props.photoUrls"
      :activeIndex="activePhotoIndex"
    />
  </div>
</template>

<style lang="scss" scoped>
.slideshow-player {
  background: #000;
  height: 100%;
  position: relative;
  width: 100%;

  &.hide-cursor {
    cursor: none;
  }
}
.slideshow-controls {
  z-index: 100;
}
</style>
