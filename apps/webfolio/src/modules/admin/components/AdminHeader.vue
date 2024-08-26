<template>
  <div>
    <q-btn
      class="tw-w-full"
      color="brand"
      v-if="!editionStore.editable"
      @click="editionStore.editable = true"
    >
      Toggle Admin Mode
    </q-btn>
    <q-btn
      class="tw-w-full"
      color="brand"
      v-if="editionStore.editable"
      @click="editionStore.editable = false"
    >
      Toggle User View
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { useEditionStore } from 'src/stores/edition';
const editionStore = useEditionStore();
</script>

<style scoped></style>
