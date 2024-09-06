<template>
  <section id="presentation">
    <RelativeOverlay position="top-right">
      <template #overlay v-if="editionStore.editable">
        <q-btn
          class="tw-maxw-[200px] tw-mx-4 tw-w-[15vw]"
          @click="presentationDialogVisible = true"
          color="warning"
        >
          Edit Description
        </q-btn>

        <q-dialog v-model="presentationDialogVisible" full-width>
          <div class="tw-max-w-[900px]! tw-w-[900px]">
            <!-- <ExperienceForm :initial_content="content"></ExperienceForm>  -->
            <MarkdownInput
              :initial_content="
                (presentationSection && presentationSection.content) || ''
              "
              field_label="Description"
              :file_upload="
                saveExperienceMarkdownFile(presentationSection?.slug || '')
              "
              @form-validated="onValidateDescription"
              @cancel="presentationDialogVisible = false"
            ></MarkdownInput>
          </div>
        </q-dialog>
      </template>
      <template #foreground>
        <!-- mode="custom" utilise les styles globaux (comme n'importe quoi d'autre que "light" et "dark") -->
        <VMarkdownView
          class="q-ma-md"
          aria-label="Long presentation"
          mode="custom"
          :content="(presentationSection && presentationSection.content) || ''"
        ></VMarkdownView>
      </template>
    </RelativeOverlay>
  </section>
</template>

<script setup lang="ts">
import { useEditionStore } from 'src/stores/edition';
import MarkdownInput from 'src/modules/UI/components/form/MarkdownInput.vue';
import { VMarkdownView } from 'vue3-markdown';
import 'vue3-markdown/dist/style.css';
import RelativeOverlay from 'src/modules/UI/components/RelativeOverlay.vue';
import { supabase } from 'src/modules/supabase';
import { updateSectionContent, createOneSection } from 'api-service';
import { useSections } from '../composables';
import { saveExperienceMarkdownFile } from 'src/modules/experience/functions/saveExperienceMarkdownFile';

import { computed, ref } from 'vue';

const editionStore = useEditionStore();

const { data: sections, refetch } = useSections();

const presentationSection = computed(() => {
  const section = sections.value?.find(
    (section) => section.slug === 'presentation',
  );
  if (section === undefined) initSection();
  return section;
});

const initSection = () => {
  createOneSection(supabase)
    .call({
      section_slug: 'presentation',
    })
    .then(() => console.log('created quote section'));
};

const presentationDialogVisible = ref(false);
const onValidateDescription = async (value: string) => {
  console.log('before', presentationSection.value);
  if (presentationSection.value === undefined) {
  } else {
    presentationDialogVisible.value = false;
    const success = await updateSectionContent(supabase).call({
      section_slug: presentationSection.value.slug,
      content: value,
      lang: 'fr',
    });
    if (success) console.log('Successfully run update');
  }
  refetch();
};
</script>

<style scoped>
section {
  min-height: 50dvh;
}
</style>
