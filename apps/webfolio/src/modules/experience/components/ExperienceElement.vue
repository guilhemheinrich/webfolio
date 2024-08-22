<template>
  <q-card style="border-left-color: red; border-left-width: 4px">
    <q-card-section>
      <h2 class="tw-te">
        {{ experience.title }}
      </h2>
    </q-card-section>
    <q-separator />
    <q-card-section class="short-description">
      <VMarkdownView
        mode="light"
        :content="experience.description"
      ></VMarkdownView>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat :to="['experience', experience.slug].join('/')"
        >Voir plus</q-btn
      >
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { ComputedExperienceType } from '../../home/composables';
import { VMarkdownView } from 'vue3-markdown';

import 'vue3-markdown/dist/style.css';
defineProps<{
  experience: ComputedExperienceType;
}>();
</script>

<style scoped>
.short-description {
  overflow: hidden;
  height: 8em;
}

@media (max-width: 600px) {
  /* Pour les tailles plus grandes que small (sm) */
  .short-description {
    height: 20em;
  }
}
</style>
