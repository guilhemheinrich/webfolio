<template>
  <!-- <div class="flex column content-center justify-center tw-w-[900px] !tw-max-w-[80vw]"> -->

  <div
    v-if="experience"
    class="flex column content-center justify-center item-center tw-gap-8"
  >
    <div class="tw-maxw-[700px] tw-w-[60vw] tw-text-lg">
      <RelativeOverlay
        position="outside-top-right"
        position2="outside-top-left"
      >
        <template #overlay v-if="editionStore.editable">
          <q-btn
            class="tw-maxw-[200px] tw-mx-4 tw-w-[15vw]"
            @click="dialogTitleVisible = true"
            color="warning"
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
        <template #overlay2 v-if="editionStore.editable">
          <q-btn
            class="tw-maxw-[200px] tw-mx-4 tw-w-[15vw]"
            @click="onDeleteExperience(experience.slug)"
            color="negative"
          >
            Delete Experience
          </q-btn>
        </template>
        <template #foreground>
          <h1>
            {{ experience.title }}
          </h1>
        </template>
      </RelativeOverlay>
    </div>

    <div v-if="editionStore.editable" class="tw-maxw-[700px] tw-w-[60vw]">
      <RelativeOverlay position="outside-top-right">
        <template #overlay v-if="editionStore.editable">
          <q-btn
            class="tw-maxw-[200px] tw-mx-4 tw-w-[15vw]"
            @click="dialogShortDescriptionVisible = true"
            color="warning"
          >
            Edit Short Description
          </q-btn>

          <q-dialog v-model="dialogShortDescriptionVisible">
            <div class="tw-w-[700px]">
              <TextInput
                :initial_content="experience.short_description"
                :input-props="{ type: 'textarea' }"
                field_label="Short Description"
                @form-validated="onValidateShortDescription"
                @cancel="dialogShortDescriptionVisible = false"
              ></TextInput>
            </div>
          </q-dialog>
        </template>
        <template #foreground>
          <p class="short-description">
            {{ experience.short_description }}
          </p>
        </template>
      </RelativeOverlay>
    </div>

    <div class="tw-maxw-[700px] tw-w-[60vw]">
      <RelativeOverlay position="outside-top-right">
        <template #overlay v-if="editionStore.editable">
          <q-btn
            class="tw-maxw-[200px] tw-mx-4 tw-w-[15vw]"
            @click="dialogDescriptionVisible = true"
            color="warning"
          >
            Edit Description
          </q-btn>

          <q-dialog v-model="dialogDescriptionVisible" full-width>
            <div class="tw-max-w-[900px]! tw-w-[900px]">
              <!-- <ExperienceForm :initial_content="content"></ExperienceForm>  -->
              <MarkdownInput
                :initial_content="experience.description"
                field_label="Description"
                :file_upload="saveMarkdownFile(experience.slug)"
                @form-validated="onValidateDescription"
                @cancel="dialogDescriptionVisible = false"
              ></MarkdownInput>
            </div>
          </q-dialog>
        </template>
        <template #foreground>
          <!-- mode="custom" utilise les styles globaux (comme n'importe quoi d'autre que "light" et "dark") -->
          <VMarkdownView
            mode="custom"
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
import { useRoute, useRouter } from 'vue-router';
import RelativeOverlay from 'src/modules/UI/components/RelativeOverlay.vue';
import { supabase } from 'src/modules/supabase';
import DeleteExperienceModal from 'src/modules/experience/components/DeleteExperienceModal.vue';
import { useQuasar } from 'quasar';
import {
  updateExperienceDescription,
  updateExperienceShortDescription,
  updateExperienceTitle,
  uploadMarkdownFile,
} from 'api-service';

const editionStore = useEditionStore();
const route = useRoute();
const router = useRouter();
const { data: experiences, refetch } = useExperiences();

const experience: Ref<ComputedExperienceType | undefined> = computed(() => {
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

const dialogShortDescriptionVisible = ref(false);
const onValidateShortDescription = async (value: string) => {
  if (experience.value === undefined) return;
  console.log('Validating');
  dialogShortDescriptionVisible.value = false;
  const success = await updateExperienceShortDescription(supabase).call({
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
  const success = await updateExperienceDescription(supabase).call({
    experience_slug: experience.value.slug,
    content: value,
    lang: 'fr',
  });
  if (success) console.log('Successfully run update');
  await refetch();
};

const saveMarkdownFile = (experience_slug: string) => {
  return async (file: File) => {
    console.log(file);
    const fileOutput = await uploadMarkdownFile(supabase).call({
      experience_slug: experience_slug,
      file: file,
    });
    return fileOutput.publicUrl;
  };
};

const $ = useQuasar();
const onDeleteExperience = async (experience_slug: string) => {
  $.dialog({
    component: DeleteExperienceModal,
    componentProps: { experience_slug: experience_slug },
  }).onOk(async () => {
    await refetch();
    router.push('/experience');
  });
};
</script>

<style scoped></style>
