<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="tw-w-[600px] !tw-max-w-[90vw]">
      <q-card-section class="tw-flex tw-flex-row tw-items-center">
        <q-carousel
          class="tw-h-auto tw-w-full"
          ref="carouselRef"
          :padding="false"
          v-model="step"
          :infinite="false"
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
                  ]"
                />
              </q-form>
            </div>
          </q-carousel-slide>

          <q-carousel-slide name="title" key="title">
            Write a short title:
            <div class="w-full">
              <q-form ref="form" @submit="onCheckTitle">
                <q-input
                  filled
                  v-model="title"
                  label="Title"
                  autofocus
                  :rules="[
                    (val) =>
                      (val && val.length > 3) ||
                      'Title must be at least 3 character long',
                    (val) =>
                      (val && val.length < 200) ||
                      'Title must be at most 200 character long',
                  ]"
                />
              </q-form>
            </div>
          </q-carousel-slide>

          <q-carousel-slide name="period" key="title">
            When does the experience starts, and possibly when does it ends ?
            <div class="w-full">
              <q-form ref="form" @submit="onCheckTitle">
                <q-input
                  filled
                  v-model="title"
                  label="Title"
                  autofocus
                  :rules="[
                    (val) =>
                      (val && val.length > 3) ||
                      'Title must be at least 3 character long',
                    (val) =>
                      (val && val.length < 200) ||
                      'Title must be at most 200 character long',
                  ]"
                />
              </q-form>
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
        />
        <q-btn
          v-if="step === 'title'"
          label="Précédent"
          flat
          dense
          @click="carouselRef?.previous()"
        />

        <q-btn
          v-if="step === 'slug'"
          type="submit"
          flat
          label="Suivant"
          @click="onCheckSlug"
        />
        <q-btn
          v-if="step === 'title'"
          type="submit"
          flat
          label="Suivant"
          @click="onCheckTitle"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { QForm, QInput, useDialogPluginComponent } from 'quasar';
import { QCarousel } from 'quasar';
import { Ref, ref } from 'vue';

defineEmits(useDialogPluginComponent.emits);
const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent();

const carouselRef = ref<QCarousel | null>(null);
const step: Ref<'slug' | 'title' | 'period'> = ref<'slug' | 'title' | 'period'>(
  'slug',
);

const slug: Ref<string> = ref('');
const slugForm = ref<QForm>();
const onCheckSlug = () => {
  if (slugForm.value !== undefined) {
    slugForm.value.validate().then((valid) => {
      if (valid && carouselRef.value !== null) carouselRef.value.next();
    });
  }
  // onDialogOK(selectedItems.value);
};

const title: Ref<string> = ref('');
const titleForm = ref<QForm>();
const onCheckTitle = () => {
  if (titleForm.value !== undefined) {
    titleForm.value.validate().then((valid) => {
      if (valid && carouselRef.value !== null) carouselRef.value.next();
    });
  }
  // onDialogOK(selectedItems.value);
};
</script>

<style scoped></style>
