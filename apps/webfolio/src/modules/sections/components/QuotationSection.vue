<template>
  <div class="tw-relative">
    <div class="row wrap items-center content-center gt-sm">
      <router-link to="/" class="col-3 q-pl-xl tw-relative">
        <q-img
          v-if="quoteSection?.picture"
          :src="quoteSection.picture"
          class="img-circle tw-justify-self-center"
          alt="Profil's picture"
        ></q-img>
        <q-img
          v-else
          src="~assets/logo_lite.png"
          class="img-circle tw-justify-self-center"
          alt="Profil's picture"
        ></q-img>

        <div
          v-if="editionStore.editable"
          class="absolute-top-right edit-button"
        >
          <q-btn @click="dialogPictureVisible = true" color="warning">
            Edit Picture
          </q-btn>
        </div>
      </router-link>

      <div class="col-9 tw-text-center">
        <span class="quote"> &ldquo; {{ quoteSection?.content }} &rdquo; </span>

        <div
          v-if="editionStore.editable"
          class="absolute-top-right edit-button"
        >
          <q-btn @click="quoteDialogVisible = true" color="warning">
            Edit Quotation
          </q-btn>
        </div>
      </div>
    </div>

    <div class="lt-md tw-flex-col">
      <router-link to="/" class="q-pt-xl tw-relative tw-block tw-text-center">
        <q-img
          v-if="quoteSection?.picture"
          :src="quoteSection.picture"
          class="img-circle tw-justify-self-center"
          alt="Profil's picture"
        ></q-img>
        <q-img
          v-else
          src="~assets/logo_lite.png"
          class="img-circle tw-justify-self-center"
          alt="Profil's picture"
        ></q-img>

        <div
          v-if="editionStore.editable"
          class="absolute-top-right edit-button"
        >
          <q-btn @click="dialogPictureVisible = true" color="warning">
            Edit Picture
          </q-btn>
        </div>
      </router-link>
      <div class="q-pt-xl q-pb-md tw-relative tw-block tw-text-center">
        <span class="quote q-py-xl">
          &ldquo; {{ quoteSection?.content }} &rdquo;
        </span>

        <div
          v-if="editionStore.editable"
          class="absolute-top-right edit-button"
        >
          <q-btn @click="quoteDialogVisible = true" color="warning">
            Edit Quotation
          </q-btn>
        </div>
      </div>
    </div>

    <q-dialog v-model="quoteDialogVisible" full-width>
      <div class="tw-max-w-[900px]! tw-w-[900px]">
        <TextInput
          :initial_content="(quoteSection && quoteSection.content) || ''"
          field_label="Quotation"
          @form-validated="onValidateQuote"
          @cancel="quoteDialogVisible = false"
        ></TextInput>
      </div>
    </q-dialog>

    <q-dialog v-model="dialogPictureVisible">
      <div class="tw-w-[700px]">
        <PictureInput
          @upload="onUpload"
          @cancel="dialogPictureVisible = false"
        ></PictureInput>
      </div>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { useEditionStore } from 'src/stores/edition';

import { useSection } from '../composables';
import TextInput from 'src/modules/UI/components/form/TextInput.vue';
import PictureInput from 'src/modules/UI/components/form/PictureInput.vue';
import { ref } from 'vue';
import { uploadSectionMainPicture } from 'api-service';
import { supabase } from 'src/modules/supabase';

const editionStore = useEditionStore();
const { section: quoteSection, refetch, onValidate } = useSection('quotation');

const quoteDialogVisible = ref(false);
const onValidateQuote = async (value: string) => {
  if (quoteSection.value === undefined) {
  } else {
    quoteDialogVisible.value = false;
    onValidate(value);
  }
  refetch();
};

const dialogPictureVisible = ref(false);
const onUpload = async (value: File) => {
  dialogPictureVisible.value = false;
  await uploadSectionMainPicture(supabase).call({
    section_slug: 'quotation',
    file: value,
  });
  refetch();
};
</script>

<style lang="scss" scoped>
$square-profil-dimension: 140px;

.img-container {
  min-width: $square-profil-dimension; /* La largeur de l'image */
}

.img-circle {
  width: $square-profil-dimension; /* La largeur de l'image */
  height: $square-profil-dimension;
  object-fit: contain;
  border-radius: 50%; /* Cela transforme l'image en cercle */
  background-color: white;
  transform: scale(1.4);
}

.img-circle:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.6); /* Ombre plus intense au hover */
}

.quote {
  text-wrap: balance;
  text-align: center;
  word-wrap: break-word;
  color: $secondary;
  font-style: italic;
}
</style>
