<template>
  <!-- <div class="flex column content-center justify-center tw-w-[900px] !tw-max-w-[80vw]"> -->
  <div
    class="flex column content-center justify-center item-center tw-gap-8"
    v-if="experience"
  >
    <div class="tw-w-[700px] tw-text-lg">
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
          <h1>
            {{ experience.title }}
          </h1>
        </template>
      </RelativeOverlay>
    </div>

    <div class="tw-w-[700px]">
      <RelativeOverlay position="outside-top-right">
        <template #overlay v-if="editionStore.editable">
          <q-btn
            class="tw-mx-4 tw-w-[200px]"
            @click="dialogDescriptionVisible = true"
          >
            Edit Description
          </q-btn>

          <q-dialog v-model="dialogDescriptionVisible" full-width>
            <div class="tw-max-w-[900px]! tw-w-[900px]">
              <!-- <ExperienceForm :initial_content="content"></ExperienceForm>  -->
              <MarkdownInput
                :initial_content="experience.description"
                field_label="Description"
                @form-validated="onValidateDescription"
                @cancel="dialogDescriptionVisible = false"
              ></MarkdownInput>
            </div>
          </q-dialog>
        </template>
        <template #foreground>
          <VMarkdownView
            mode="light"
            :content="experience.description"
          ></VMarkdownView>
        </template>
      </RelativeOverlay>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditionStore } from 'src/stores/edition';
import TextInput from 'src/modules/UI/components/form/TextInput.vue';
import MarkdownInput from 'src/modules/UI/components/form/MarkdownInput.vue';
import { ComputedExperienceType, useExperiences } from '../../home/composables';
import { VMarkdownView } from 'vue3-markdown';
import 'vue3-markdown/dist/style.css';
import { computed, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import RelativeOverlay from 'src/modules/UI/components/RelativeOverlay.vue';
import { supabase } from 'src/modules/supabase';
import { updateDescription, updateExperienceTitle } from 'api-service';

const editionStore = useEditionStore();
const route = useRoute();
const { data: experiences, refetch } = useExperiences();

const experience: Ref<ComputedExperienceType> = computed(() => {
  return experiences.value?.find((experience) => {
    const slug = route.path.split('experience/')[1];
    return experience.slug === slug;
  });
});

const dialogTitleVisible = ref(false);
const onValidateTitle = async (value: string) => {
  if (experience.value === undefined) return;
  console.log('Validating');
  dialogTitleVisible.value = false;
  const success = await updateExperienceTitle(supabase).call({
    experience_slug: experience.value.slug,
    content: value,
    lang: 'fr',
  });
  if (success) console.log('Successfully run update');
  refetch();
};

const dialogDescriptionVisible = ref(false);
const onValidateDescription = async (value: string) => {
  if (experience.value === undefined) return;
  console.log('Validating');
  dialogDescriptionVisible.value = false;
  const success = await updateDescription(supabase).call({
    experience_slug: experience.value.slug,
    content: value,
    lang: 'fr',
  });
  if (success) console.log('Successfully run update');
  refetch();
};
</script>

<style scoped></style>
