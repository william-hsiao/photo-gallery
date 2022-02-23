<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as PIXI from "pixi.js";
import { PHOTO_DURATION } from "@/constants";

const props = defineProps<{
  photoUrls: string[];
}>();
const pixiCanvas = ref(null);
const pixiApp = ref(null);

const currentPhotoIndex = ref(null);
const currentPhotoSprite = ref(null);
const nextPhotoSprite = ref(null);

const getNextPhotoIndex = () => {
  if (currentPhotoIndex.value == null) return 0;
  return currentPhotoIndex.value == props.photoUrls.length - 1
    ? 0
    : currentPhotoIndex.value + 1;
};

const transitionNextPhoto = () => {
  if (currentPhotoSprite.value) {
    pixiApp.value.stage.removeChild(currentPhotoSprite.value);
    currentPhotoSprite.value.destroy();
  }
  pixiApp.value.stage.addChild(nextPhotoSprite.value);

  currentPhotoSprite.value = nextPhotoSprite.value;
  nextPhotoSprite.value = null;
  currentPhotoIndex.value = getNextPhotoIndex();

  prepareNextPhoto();
};

const prepareNextPhoto = async (timeout: number = PHOTO_DURATION) => {
  await Promise.all([
    new Promise((resolve) => setTimeout(() => resolve(), timeout)),
    new Promise((resolve) => {
      const nextImageUrl = props.photoUrls[getNextPhotoIndex()];

      if (PIXI.utils.TextureCache[nextImageUrl]) {
        nextPhotoSprite.value = new PIXI.Sprite(
          PIXI.utils.TextureCache[nextImageUrl]
        );
        resolve();
        return;
      }

      pixiApp.value.loader.add(nextImageUrl);
      pixiApp.value.loader.onComplete.add((loader, resources) => {
        nextPhotoSprite.value = new PIXI.Sprite(
          resources[nextImageUrl].texture
        );
        loader.reset();
        loader.onComplete.detachAll();
        resolve();
      });
      pixiApp.value.loader.load();
    }),
  ]);
  transitionNextPhoto();
};

onMounted(() => {
  pixiApp.value = new PIXI.Application({ resizeTo: window });
  pixiCanvas.value.appendChild(pixiApp.value.view);

  if (props.photoUrls.length > 0) {
    prepareNextPhoto(0);
  }
});
</script>

<template>
  <div ref="pixiCanvas" class="pixi-canvas" />
</template>

<style lang="scss" scoped>
.pixi-canvas {
  height: 100%;
  width: 100%;
}
</style>
