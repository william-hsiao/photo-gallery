<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({ visible: Boolean });
const emit = defineEmits(["toggleMaximise", "freezeControls"]);

const emitToggleMaximise = () => {
  emit("toggleMaximise");
};
const emitFreezeControls = (state: boolean) => {
  emit("freezeControls", state);
};
</script>

<template>
  <div
    class="slideshow-controls"
    :class="{ visible: props.visible }"
    @mouseenter="emitFreezeControls(true)"
    @mouseleave="emitFreezeControls(false)"
  >
    <div class="slideshow-controls-bar">
      <div class="minimize-maximize-button" @click="emitToggleMaximise">
        Min/Max
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slideshow-controls {
  bottom: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;

  transition: opacity 0.5s ease;

  &.visible {
    opacity: 1;
  }
}

.slideshow-controls-bar {
  background-color: rgba(128, 128, 128, 0.1);
  bottom: 0;
  left: 0;
  padding: 24px 36px;
  pointer-events: auto;
  position: absolute;
  right: 0;
}

.minimize-maximize-button {
  cursor: pointer;
  display: inline-block;
}
</style>
