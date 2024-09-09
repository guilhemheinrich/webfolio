<template>
  <q-card class="card">
    <div class="row">
      <q-card-section class="q-pa-none border-radius-inherit col-6">
        <div class="border-radius-inherit">
          <q-img
            v-if="experience.picture"
            class="border-radius-inherit image tw-rounded-r-none"
            :src="experience.picture"
            spinner-color="white"
            fit="cover"
          >
          </q-img>
          <q-img
            v-else
            class="border-radius-inherit image tw-rounded-r-none"
            src="~assets/logo_lite.png"
            spinner-color="white"
            fit="cover"
          >
          </q-img>
          <div
            v-if="editionStore.editable"
            class="absolute-top-right edit-button"
          >
            <q-btn
              class="tw-mx-4"
              @click="dialogPictureVisible = true"
              color="warning"
            >
              Edit Picture
            </q-btn>

            <q-dialog v-model="dialogPictureVisible">
              <div class="tw-w-[700px]">
                <PictureInput
                  @upload="onUpload"
                  @cancel="dialogPictureVisible = false"
                ></PictureInput>
              </div>
            </q-dialog>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="col-6 q-pa-none">
        <div class="column">
          <div class="row items-center q-pa-sm">
            <p class="col-2 text-weight-medium text-subtitle text-italic">
              {{
                dateAsString(
                  new Date(experience.start_date ?? ''),
                  'fr',
                  dateDisplayConficguration,
                )
              }}{{
                experience.end_date
                  ? ` - ${dateAsString(new Date(experience.end_date), 'fr', dateDisplayConficguration)}`
                  : ''
              }}
            </p>

            <h2 class="col-10">
              {{ experience.title }}
            </h2>
          </div>
          <div
            v-if="editionStore.editable"
            class="absolute-top-right edit-button"
          >
            <q-btn
              class="tw-mx-4"
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
          </div>
          <q-separator />

          <div class="relative-position q-pa-sm">
            <p class="short-description">
              {{ experience.short_description ?? '' }}
            </p>
            <div
              v-if="editionStore.editable"
              class="absolute-top-right edit-button"
            >
              <q-btn
                class="tw-mx-4"
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
            </div>
          </div>
        </div>
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useExperiences } from '../composables';
import {
  updateExperienceShortDescription,
  updateExperienceTitle,
  uploadExperienceMainPicture,
} from 'api-service';
import { supabase } from 'src/modules/supabase';
import { useEditionStore } from 'src/stores/edition';
import TextInput from 'src/modules/UI/components/form/TextInput.vue';
import PictureInput from 'src/modules/UI/components/form/PictureInput.vue';
import { ComputedExperienceType } from '../model';
import { dateAsString } from 'shared-utilities';

const dateDisplayConficguration: Intl.DateTimeFormatOptions = {
  month: 'long',
  year: 'numeric',
};

const props = defineProps<{
  experience: ComputedExperienceType;
}>();

const editionStore = useEditionStore();

const { refetch } = useExperiences();

const dialogTitleVisible = ref(false);
const onValidateTitle = async (value: string) => {
  if (props.experience === undefined) return;
  dialogTitleVisible.value = false;
  await updateExperienceTitle(supabase).call({
    experience_slug: props.experience.slug,
    content: value,
    lang: 'fr',
  });
  refetch();
};

const dialogShortDescriptionVisible = ref(false);
const onValidateShortDescription = async (value: string) => {
  if (props.experience === undefined) return;
  dialogShortDescriptionVisible.value = false;
  await updateExperienceShortDescription(supabase).call({
    experience_slug: props.experience.slug,
    content: value,
    lang: 'fr',
  });
  refetch();
};

const dialogPictureVisible = ref(false);
const onUpload = async (value: File) => {
  if (props.experience === undefined) return;
  dialogPictureVisible.value = false;
  await uploadExperienceMainPicture(supabase).call({
    experience_slug: props.experience.slug,
    file: value,
  });
  refetch();
};
</script>

<style scoped>
.card {
  width: var(--main-width);
  max-width: var(--main-maxwidth);
}

.image {
  height: var(--experience-height);
}
</style>
