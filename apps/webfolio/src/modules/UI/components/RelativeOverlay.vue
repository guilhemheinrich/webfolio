<template>
  <div class="tw-relative">
    <div class="tw-absolute tw-z-10" :class="overlayClass">
      <slot name="overlay"> </slot>
    </div>
    <div v-if="position2" class="tw-absolute tw-z-10" :class="overlayClass2">
      <slot name="overlay2"> </slot>
    </div>
    <div v-if="position3" class="tw-absolute tw-z-10" :class="overlayClass3">
      <slot name="overlay3"> </slot>
    </div>
    <div v-if="position4" class="tw-absolute tw-z-10" :class="overlayClass4">
      <slot name="overlay4"> </slot>
    </div>
    <slot name="foreground"></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Position =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'center'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'above'
  | 'beneath'
  | 'outside-top-left'
  | 'outside-top-right'
  | 'outside-bottom-left'
  | 'outside-bottom-right';

const props = defineProps<{
  position: Position;
  position2?: Position;
  position3?: Position;
  position4?: Position;
}>();

// Générer la classe CSS à partir de la position
const overlayClass = computed(() => {
  return `overlay-${props.position}`;
});
const overlayClass2 = computed(() => {
  return `overlay-${props.position2}`;
});
const overlayClass3 = computed(() => {
  return `overlay-${props.position3}`;
});
const overlayClass4 = computed(() => {
  return `overlay-${props.position4}`;
});
</script>

<style scoped>
/* Classes pour les positions */
.overlay-top {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.overlay-bottom {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.overlay-left {
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

.overlay-right {
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}

.overlay-center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.overlay-top-left {
  top: 0;
  left: 0;
}

.overlay-top-right {
  top: 0;
  right: 0;
}

.overlay-bottom-left {
  bottom: 0;
  left: 0;
}

.overlay-bottom-right {
  bottom: 0;
  right: 0;
}

.overlay-above {
  top: 0;
  left: 50%;
  transform: translate(-50%, -100%);
}

.overlay-beneath {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.overlay-outside-top-left {
  top: 0;
  left: 0;
  transform: translateX(-100%);
}

.overlay-outside-top-right {
  top: 0;
  right: 0;
  transform: translateX(100%);
}

.overlay-outside-bottom-left {
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
}

.overlay-outside-bottom-right {
  bottom: 0;
  right: 0;
  transform: translateX(100%);
}
</style>
