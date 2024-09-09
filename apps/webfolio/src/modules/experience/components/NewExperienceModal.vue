<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="tw-w-[600px] !tw-max-w-[90vw]">
      <q-card-section class="tw-flex tw-flex-row tw-items-center">
        <q-carousel
          class="tw-h-auto tw-w-full"
          ref="carouselRef"
          :padding="false"
          v-model="step"
          :autoplay="false"
          transition-prev="slide-left"
          transition-next="slide-right"
          aria-hidden="true"
        >
          <q-carousel-slide name="slug" key="slug">
            <div>
              <q-form ref="slugForm" @submit="onCheckSlug">
                Pick a relevant slug, uniquely identifying the experience:
                <q-input
                  filled
                  v-model="slug"
                  ref="slugInput"
                  label="Slug"
                  autofocus
                  :rules="[
                    (val) =>
                      (val && val.length > 3) ||
                      'Slug must be at least 3 character long',
                    (val) =>
                      /^[a-zA-Z0-9_\-]*$/.test(val) ||
                      'Slug must contain only non-accented letters and numbers',
                  ]"
                />
              </q-form>
            </div>
          </q-carousel-slide>

          <q-carousel-slide name="title" key="title">
            <div>
              <q-form ref="titleForm" @submit="onCheckTitle">
                Write a short title:
                <q-input
                  filled
                  v-model="title"
                  label="Title"
                  autofocus
                  :rules="[
                    (val) =>
                      (val && val.length > 3) ||
                      'Title must be at least 3 character long',
                  ]"
                />
              </q-form>
            </div>
          </q-carousel-slide>

          <q-carousel-slide name="period" key="period">
            <div class="w-full">
              When does the experience starts, and possibly when does it ends ?
              <q-form
                ref="periodForm"
                @submit="onCheckPeriod"
                class="tw-flex tw-flex-col tw-items-center"
              >
                <q-date
                  v-model="period"
                  falt
                  :range="isRange"
                  default-view="Years"
                  years-in-month-view
                  :landscape="$q.screen.gt.xs"
                  today-btn
                  :navigation-max-year-month="max_year_mounth"
                />
              </q-form>
              <q-toggle
                v-model="isRange"
                label="Is this experience a period ?"
                left-label
              />
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-card-section>
      <q-card-actions class="text-primary" align="between">
        <q-btn
          v-if="step === 'slug'"
          icon="close"
          flat
          round
          dense
          @click="onDialogCancel"
          :loading="loading"
        />
        <q-btn
          v-if="step === 'title' || step === 'period'"
          label="Go back"
          flat
          dense
          @click="carouselRef?.previous()"
          :loading="loading"
        />

        <q-btn
          v-if="step === 'slug'"
          type="submit"
          flat
          label="Next"
          @click="onCheckSlug"
          :loading="loading"
        />
        <q-btn
          v-if="step === 'title'"
          type="submit"
          flat
          label="Next"
          @click="onCheckTitle"
          :loading="loading"
        />
        <q-btn
          v-if="step === 'period'"
          type="submit"
          flat
          label="Finalize"
          @click="onCheckPeriod"
          :loading="loading"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import {
  updateExperienceDate,
  UpdateDateInputType,
  updateExperienceTitle,
} from 'api-service';
import { createOneExperience } from 'api-service/src/client/Experience/createOne';
import { QForm, QInput, useDialogPluginComponent } from 'quasar';
import { QCarousel } from 'quasar';
import { supabase } from 'src/modules/supabase';
import { computed, Ref, ref } from 'vue';

defineEmits(useDialogPluginComponent.emits);
const { dialogRef, onDialogHide, onDialogCancel, onDialogOK } =
  useDialogPluginComponent();

const carouselRef = ref<QCarousel | null>(null);
const step: Ref<'slug' | 'title' | 'period'> = ref<'slug' | 'title' | 'period'>(
  'slug',
);
const loading = ref<boolean>(false);
const slug: Ref<string> = ref('');
const slugForm = ref<QForm>();
const onCheckSlug = async () => {
  if (slugForm.value !== undefined) {
    slugForm.value.validate().then(async (valid) => {
      if (valid && carouselRef.value !== null) {
        loading.value = true;
        await createOneExperience(supabase).call({
          experience_slug: slug.value,
        });
        loading.value = false;
        carouselRef.value.next();
      }
    });
  }
  // onDialogOK(selectedItems.value);
};

const title: Ref<string> = ref('');
const titleForm = ref<QForm>();

const onCheckTitle = async () => {
  if (titleForm.value !== undefined) {
    titleForm.value.validate().then(async (valid) => {
      if (valid && carouselRef.value !== null) {
        loading.value = true;
        await updateExperienceTitle(supabase).call({
          experience_slug: slug.value,
          content: title.value,
          lang: 'fr',
        });
        loading.value = false;
        carouselRef.value.next();
      }
    });
  }
  // onDialogOK(selectedItems.value);
};

type PeriodType = { from: string; to: string };
const period: Ref<string | PeriodType> = ref('');
const periodForm = ref<QForm>();
const isRange = ref<boolean>(true);
const max_year_mounth = computed(() => {
  let max_date = new Date();
  max_date.setFullYear(max_date.getFullYear() + 3);
  return `${max_date.getFullYear()}/${(max_date.getMonth() + 1).toString().padStart(2, '0')}`;
});

const onCheckPeriod = async () => {
  if (periodForm.value !== undefined) {
    periodForm.value.validate().then(async (valid) => {
      if (valid && carouselRef.value !== null) {
        loading.value = true;
        if (period.value !== undefined) {
          const payload: UpdateDateInputType = {
            experience_slug: slug.value,
            start_date: undefined,
            end_date: undefined,
          };
          if (typeof period.value === 'string') {
            payload.start_date = period.value;
          } else {
            payload.start_date = period.value.from;
            payload.end_date = period.value.to;
          }

          await updateExperienceDate(supabase).call(payload);
        }
        loading.value = false;
        onDialogOK();
      }
    });
  }
  // onDialogOK(selectedItems.value);
};
</script>

<style scoped></style>
