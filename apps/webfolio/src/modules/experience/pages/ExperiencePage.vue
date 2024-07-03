<template>
  <!-- <div class="flex column content-center justify-center tw-w-[900px] !tw-max-w-[80vw]"> -->
  <div
    class="flex column content-center justify-center item-center tw-gap-8"
    v-if="experience"
  >
    <h2 class="tw-w-[700px] tw-text-lg">
      <RelativeOverlay position="outside-top-right">
        <template #overlay v-if="editionStore.editable">
          <q-btn
            class="tw-mx-4 tw-w-[200px]"
            @click="dialogTitleVisible = true"
          >
            Edit Title
          </q-btn>
          <q-dialog v-model="dialogTitleVisible">
            <div class="tw-w-[700px]">
              <TextInput
                :initial_content="experience.title"
                field_label="Title"
                @form-validated="onValidateTitle"
                @cancel="dialogTitleVisible = false"
              ></TextInput>
            </div>
          </q-dialog>
        </template>
        <template #foreground>
          {{ experience.title }}
        </template>
      </RelativeOverlay>
    </h2>

    <div class="tw-w-[700px]">Tags</div>
    <div class="tw-w-[700px]">Languages</div>

    <div class="tw-w-[700px]">
      <RelativeOverlay position="outside-top-right">
        <template #overlay v-if="editionStore.editable">
          <q-btn class="tw-mx-4"> Edit </q-btn>
        </template>
        <template #foreground>
          <VMarkdownView mode="light" :content="mkdTestString"></VMarkdownView>
        </template>
      </RelativeOverlay>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditionStore } from 'src/stores/edition';
import { useQuasar } from 'quasar';
import TextInput from 'src/modules/UI/components/form/TextInput.vue';
import { useExperiences } from '../../home/composables';
import { VMarkdownView } from 'vue3-markdown';
import 'vue3-markdown/dist/style.css';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import RelativeOverlay from 'src/modules/UI/components/RelativeOverlay.vue';
import { supabase } from 'src/modules/supabase';

const $q = useQuasar();
const editionStore = useEditionStore();
const route = useRoute();
const mkdTestString = `
# Mathématique fondamentale et appliquée

Pendant que Mimsette est parfaite Pendant que Mimsette est parfaitePendant que Mimsette est parfaitePendant que Mimsette est parfaite

## Sous titre
![Markdown Logo](https://markdown-here.com/img/icon256.png)
`;

const experience = computed(() => {
  return experiences.value?.find((experience) => {
    const id = route.path.split('experience/')[1];
    return experience._id === id;
  });
});
const { data: experiences } = useExperiences();

const dialogTitleVisible = ref(false);
const onValidateTitle = async () => {
  console.log('Validating');
  dialogTitleVisible.value = false;
  await supabase.from('webfolio_experience_title');
};
</script>

<style scoped></style>
