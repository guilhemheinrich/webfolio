<template>
  <header class="bg-primary text-white">
    <q-toolbar class="no-padding">
      <q-toolbar-title>
        <RelativeOverlay position="top-right">
          <template #overlay v-if="editionStore.editable">
            <q-btn
              class="tw-maxw-[200px] tw-mx-4 tw-w-[15vw]"
              @click="quoteDialogVisible = true"
              color="warning"
            >
              Edit Quotation
            </q-btn>

            <q-dialog v-model="quoteDialogVisible" full-width>
              <div class="tw-max-w-[900px]! tw-w-[900px]">
                <TextInput
                  :initial_content="
                    (quoteSection && quoteSection.content) || ''
                  "
                  field_label="Quotation"
                  @form-validated="onValidateQuote"
                  @cancel="quoteDialogVisible = false"
                ></TextInput>
              </div>
            </q-dialog>
          </template>

          <template #foreground>
            <!--
  _____            _    _
 |  __ \          | |  | |
 | |  | | ___  ___| | _| |_ ___  _ __
 | |  | |/ _ \/ __| |/ / __/ _ \| '_ \
 | |__| |  __/\__ \   <| || (_) | |_) |
 |_____/ \___||___/_|\_\\__\___/| .__/
                                | |
                                |_|
           -->

            <div
              class="full-width row inline wrap items-center content-center gt-sm"
            >
              <router-link to="/" class="col-2 q-pl-xl">
                <q-img
                  src="~assets/logo_lite.png"
                  class="img-circle"
                  alt="Profil's picture"
                ></q-img>
              </router-link>

              <a class="quote col-8 tw-text-center" style="height: 100%">
                &ldquo; {{ quoteSection?.content }} &rdquo;
              </a>

              <socials-component class="col-2"></socials-component>
            </div>

            <!--
  __  __       _     _ _
 |  \/  |     | |   (_) |
 | \  / | ___ | |__  _| | ___
 | |\/| |/ _ \| '_ \| | |/ _ \
 | |  | | (_) | |_) | | |  __/
 |_|  |_|\___/|_.__/|_|_|\___|

           -->

            <div class="lt-md tw-flex-col">
              <router-link to="/" class="q-pt-xl tw-block tw-text-center">
                <q-img
                  src="~assets/logo_lite.png"
                  class="img-circle tw-justify-self-center"
                  alt="Profil's picture"
                ></q-img>
              </router-link>

              <a class="quote q-py-xl tw-block" style="height: 100%">
                &ldquo; {{ quoteSection?.content }} &rdquo;
              </a>
            </div>
          </template>
        </RelativeOverlay>
      </q-toolbar-title>
    </q-toolbar>
  </header>
</template>

<script setup lang="ts">
import SocialsComponent from './SocialsComponent.vue';
import { useEditionStore } from 'src/stores/edition';
import TextInput from 'src/modules/UI/components/form/TextInput.vue';

import RelativeOverlay from 'src/modules/UI/components/RelativeOverlay.vue';
import { supabase } from 'src/modules/supabase';
import { createOneSection, updateSectionContent } from 'api-service';
import { useSections } from '../../sections/composables';

import { computed, ref } from 'vue';

const editionStore = useEditionStore();

const { data: sections, refetch } = useSections();

const quoteSection = computed(() => {
  const section = sections.value?.find(
    (section) => section.slug === 'quotation',
  );
  if (section === undefined) initSection();
  return section;
});

const initSection = () => {
  createOneSection(supabase)
    .call({
      section_slug: 'quotation',
    })
    .then(() => console.log('created quote section'));
};

const quoteDialogVisible = ref(false);
const onValidateQuote = async (value: string) => {
  if (quoteSection.value === undefined) {
  } else {
    quoteDialogVisible.value = false;
    const success = await updateSectionContent(supabase).call({
      section_slug: quoteSection.value.slug,
      content: value,
      lang: 'fr',
    });
    if (success) console.log('Successfully run update');
  }
  refetch();
};
</script>

<style lang="scss" scoped>
$square-profil-dimension: 110px;

.img-container {
  min-width: $square-profil-dimension; /* La largeur de l'image */
  height: $square-profil-dimension; /* La hauteur est égale à la */
}

.img-circle {
  width: $square-profil-dimension; /* La largeur de l'image */
  height: $square-profil-dimension; /* La hauteur est égale à la largeur pour un ratio carré */
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
