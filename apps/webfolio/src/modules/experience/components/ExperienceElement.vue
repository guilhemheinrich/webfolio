<template>
  <q-card class="card-desktop gt-sm">
    <div class="row">
      <q-card-section class="q-pa-none border-radius-inherit col-6">
        <div class="border-radius-inherit">
          <q-img
            class="border-radius-inherit image tw-rounded-r-none"
            :src="experiencePicture"
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
          </div>
        </div>
      </q-card-section>
      <q-card-section class="col-6 q-pa-none">
        <div class="column" style="height: 100%">
          <div class="row items-center q-pa-sm">
            <span class="col-4 text-weight-medium text-subtitle text-italic">
              {{ dateStringDisplay }}
            </span>

            <h2 class="col-8">
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
            </div>
          </div>

          <div class="q-pa-sm tw-mt-auto">
            <q-btn
              color="secondary"
              class="full-width"
              :to="`/experience/${experience.slug}`"
            >
              En savoir plus
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </div>
  </q-card>

  <q-card class="lt-md" style="width: 100dvw">
    <div class="column">
      <q-card-section>
        <div>
          <h2>{{ experience.title }}</h2>

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
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-py-md">
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
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pa-none border-radius-inherit">
        <div class="no-border-radius relative-position">
          <q-img
            class="border-radius-inherit image tw-rounded-r-none"
            :src="experiencePicture"
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
          </div>
          <q-btn
            color="secondary"
            class="more-button"
            :to="`/experience/${experience.slug}`"
          >
            En savoir plus
          </q-btn>
        </div>
      </q-card-section>
    </div>
  </q-card>

  <q-dialog v-model="dialogPictureVisible">
    <div class="tw-w-[700px]">
      <PictureInput
        @upload="onUpload"
        @cancel="dialogPictureVisible = false"
      ></PictureInput>
    </div>
  </q-dialog>

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

<script setup lang="ts">
import { computed, ref } from 'vue';
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
import { dateAsString, capitalizeWordsPipe } from 'shared-utilities';
import { Config } from 'src/modules/configuration';

const experiencePicture = computed(() => {
  if (props.experience.picture)
    return `${props.experience.picture}${Config.ADMIN ? '?' + new Date().toISOString() : ''}`;
  return 'src/assets/logo_lite.png';
});

const dateDisplayConficguration: Intl.DateTimeFormatOptions = {
  month: 'long',
  year: 'numeric',
};

const dateStringDisplay = computed(() => {
  const startDate = dateAsString(
    new Date(props.experience.start_date ?? ''),
    'fr',
    dateDisplayConficguration,
  );
  const endDate = dateAsString(
    new Date(props.experience.end_date ?? ''),
    'fr',
    dateDisplayConficguration,
  );

  let formattedDate = startDate;
  if (props.experience.end_date) {
    formattedDate += ` - ${endDate}`;
  }
  return capitalizeWordsPipe(formattedDate);
});

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
  console.log('value', value);
  await uploadExperienceMainPicture(supabase).call({
    experience_slug: props.experience.slug,
    file: value,
  });
  refetch();
};
</script>

<style scoped>
.more-button {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translate(-50%, 0);
  box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.3);
}

.card-desktop {
  width: var(--main-width);
  max-width: var(--main-maxwidth);
}

span {
  text-wrap: balance;
}

h2 {
  text-wrap: balance;
}

.image {
  height: var(--experience-height);
}
</style>
