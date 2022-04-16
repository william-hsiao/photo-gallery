<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import * as PIXI from "pixi.js";
import { PHOTO_DURATION } from "@/constants";

const props = defineProps<{
  photoUrls: string[];
}>();
const pixiCanvas = ref<HTMLElement>();
const pixiApp = ref<PIXI.Application>(new PIXI.Application({ resizeTo: window }));

const currentPhotoIndex = ref();
const currentPhotoSprite = ref();
const nextPhotoSprite = ref();

const getNextPhotoIndex = () => {
  if (currentPhotoIndex.value == null) return 0;
  return currentPhotoIndex.value == props.photoUrls.length - 1
    ? 0
    : currentPhotoIndex.value + 1;
};

const setSprite = (texture: PIXI.Texture) => {
  nextPhotoSprite.value = new PIXI.Sprite(texture);
};
const positionSprite = (sprite: PIXI.Sprite) => {
  sprite.anchor.set(0.5);
  sprite.scale.set(
    Math.min(
      pixiApp.value.view.width / sprite.width,
      pixiApp.value.view.height / sprite.height
    )
  );
  sprite.x = pixiApp.value.view.width / 2;
  sprite.y = pixiApp.value.view.height / 2;
};

const transitionNextPhoto = () => {
  if (currentPhotoSprite.value) {
    pixiApp.value.stage.removeChild(currentPhotoSprite.value);
    currentPhotoSprite.value.destroy({ texture: true });
  }

  positionSprite(nextPhotoSprite.value);
  pixiApp.value.stage.addChild(nextPhotoSprite.value);

  currentPhotoSprite.value = nextPhotoSprite.value;
  nextPhotoSprite.value = null;
  currentPhotoIndex.value = getNextPhotoIndex();

  prepareNextPhoto();
};

const prepareNextPhoto = async (timeout: number = PHOTO_DURATION) => {
  await Promise.all([
    new Promise<void>((resolve) => {
      setTimeout(() => resolve(), timeout);
    }),
    new Promise<void>((resolve) => {
      const nextImageUrl = props.photoUrls[getNextPhotoIndex()];

      // @ts-ignore No overload matches but this is a valid input
      pixiApp.value.loader.add(nextImageUrl);
      pixiApp.value.loader.onComplete.add((loader, resources) => {
        setSprite(resources[nextImageUrl]!.texture!);
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
  pixiCanvas.value?.appendChild(pixiApp.value.view);
});

watch(
  () => props.photoUrls,
  (photoUrls) => {
    if (props.photoUrls.length > 0) {
      prepareNextPhoto(0);
    }
  }
);
</script>

<template>
  <div ref="pixiCanvas" class="pixi-canvas" />
</template>

<style lang="scss" scoped>
.pixi-canvas {
  height: 100%;
  width: 100%;

  :deep(canvas) {
    display: block;
  }
}
</style>
