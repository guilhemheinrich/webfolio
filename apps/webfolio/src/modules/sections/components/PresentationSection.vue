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
                saveMarkdownFile(presentationSection?.section_slug || '')
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
import { updateSection, createOneSection } from 'api-service';
import { useSections } from '../composables';
import { saveMarkdownFile } from 'src/modules/admin/functions/saveMarkdownFile';

import { computed, ref } from 'vue';

const editionStore = useEditionStore();

const { data: sections, refetch } = useSections();

const presentationSection = computed(() => {
  const section = sections.value?.find(
    (section) => section.section_slug === 'presentation',
  );
  if (section === undefined) initSection();
  return section;
});

const initSection = () => {
  createOneSection(supabase)
    .call({
      section_slug: 'presentation',
      content: 'Write an a moderatly long description about you !',
      language_code: 'fr',
    })
    .then(() => console.log('created quote section'));
};

const presentationDialogVisible = ref(false);
const onValidateDescription = async (value: string) => {
  console.log('before', presentationSection.value);
  if (presentationSection.value === undefined) {
  } else {
    presentationDialogVisible.value = false;
    const success = await updateSection(supabase).call({
      section_slug: presentationSection.value.section_slug,
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
