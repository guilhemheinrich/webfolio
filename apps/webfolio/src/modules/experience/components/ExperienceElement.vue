<template>
  <q-card style="border-left-color: red; border-left-width: 4px">
    <q-card-section>
      <h2 class="tw-te">
        {{ experience.title }}
      </h2>
    </q-card-section>
    <q-separator />
    <q-card-section class="short-description">
      {{ experience.short_description ?? '' }}
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

import 'vue3-markdown/dist/style.css';
defineProps<{
  experience: ComputedExperienceType;
}>();
</script>

<style scoped></style>
