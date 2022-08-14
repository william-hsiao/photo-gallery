<script setup lang="ts">
import { defineProps, ref, watch, type PropType } from "vue";

const FADE_IN_TIMEOUT = 1000;
const FADE_OUT_TIMEOUT = 1000;

const props = defineProps({
  photoUrls: { type: Array as PropType<string[]>, required: true },
  activeIndex: { type: Number, required: true },
});

const root = ref<HTMLElement>();
const activeImageElement = ref<HTMLElement>();

const fadeElements = (
  fadeInElement: HTMLElement,
  fadeOutElement?: HTMLElement
) => {
  fadeInElement.classList.add("fade-in");
  setTimeout(() => {
    fadeInElement.classList.add("active");
    fadeInElement.classList.remove("fade-in");
  }, FADE_IN_TIMEOUT);

  if (fadeOutElement) {
    fadeOutElement.classList.add("fade-out");
    fadeOutElement.classList.remove("active");
    setTimeout(() => {
      fadeOutElement.remove();
    }, FADE_OUT_TIMEOUT);
  }

  activeImageElement.value = fadeInElement;
};

const loadPhoto = () => {
  if (props.photoUrls.length < props.activeIndex) return;

  const imageElement = document.createElement("img");
  imageElement.src = props.photoUrls[props.activeIndex];
  imageElement.classList.add("photo");
  imageElement.onload = () =>
    fadeElements(imageElement, activeImageElement.value);
  root.value?.appendChild(imageElement);
};

watch(() => props.activeIndex, loadPhoto);
watch(() => props.photoUrls, loadPhoto);
</script>

<template>
  <div ref="root" class="slideshow-canvas"></div>
</template>

<style lang="scss" scoped>
.slideshow-canvas {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
}

:deep(.photo) {
  max-height: 100%;
  max-width: 100%;
  opacity: 0;
  position: absolute;

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes fade-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  &.active {
    opacity: 1;
    z-index: 5;
  }
  &.fade-in {
    animation: 1s fade-in forwards;
    z-index: 10;
  }
  &.fade-out {
    animation: 1s fade-out forwards;
  }
}
</style>
