<template>
  <div v-if="experiences" class="tw-w-full">
    <q-list class="tw-flex tw-flex-col tw-items-center">
      <div class="tw-relative tw-w-[800px] !tw-max-w-[80vw]">
        <q-btn
          v-if="editionStore.editable"
          class="tw-absolute tw-h-[45px]"
          style="transform: translateX(-100%)"
        >
          Edit
        </q-btn>
        <q-expansion-item
          v-for="(experience, index) in experiences"
          :key="index"
          icon="explore"
          :label="experience.title"
          class="gt-sm tw-inline"
        >
          <!-- <ExperienceDisplayer v-bind:experience="experience" ></ExperienceDisplayer> -->
          <q-card style="border-left-color: red; border-left-width: 4px">
            <q-card-section>
              <VMarkdownView
                mode="lihgt"
                :content="experience.description"
              ></VMarkdownView>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat :to="['experience', experience._id].join('/')"
                >Voir plus</q-btn
              >
            </q-card-actions>
          </q-card>
        </q-expansion-item>
      </div>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { useEditionStore } from 'src/stores/edition';
import { useExperiences } from '../composables';
import { VMarkdownView } from 'vue3-markdown';

import 'vue3-markdown/dist/style.css';
const { data: experiences } = useExperiences();
const editionStore = useEditionStore();
</script>

<style scoped></style>
