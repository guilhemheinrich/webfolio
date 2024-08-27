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
                <!-- <ExperienceForm :initial_content="content"></ExperienceForm>  -->
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
            <div
              class="row no-wrap items-center justify-between tw-h-[15dvh] tw-gap-8"
            >
              <figure style="height: 100%" class="col-grow q-mx-xl row">
                <router-link to="/" class="no-decoration">
                  <q-img
                    src="~assets/logo_lite.png"
                    class="img-circle"
                    alt="Profil's picture"
                  ></q-img>
                </router-link>

                <figcaption class="img-caption">
                  <p class="text-secondary text-italic full-width">
                    &ldquo; {{ quoteSection?.content }} &rdquo;
                  </p>
                </figcaption>
              </figure>

              <div class="column justify-between col-2 tw-h-full">
                <socials-component></socials-component>
              </div>
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
import { updateSection, createOneSection } from 'api-service';
import { useSections } from '../../sections/composables';

import { computed, ref } from 'vue';

const editionStore = useEditionStore();

const { data: sections, refetch } = useSections();

const quoteSection = computed(() => {
  const section = sections.value?.find(
    (section) => section.section_slug === 'quotation',
  );
  if (section === undefined) initSection();
  return section;
});

const initSection = () => {
  createOneSection(supabase)
    .call({
      section_slug: 'quotation',
      content: 'Profil quote : Tell something quick about you',
      language_code: 'fr',
    })
    .then(() => console.log('created quote section'));
};

const quoteDialogVisible = ref(false);
const onValidateQuote = async (value: string) => {
  if (quoteSection.value === undefined) {
  } else {
    quoteDialogVisible.value = false;
    const success = await updateSection(supabase).call({
      section_slug: quoteSection.value.section_slug,
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

.img-caption {
  text-align: left;
  padding-left: $square-profil-dimension * 0.4;
}
</style>
