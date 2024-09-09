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
          v-if="presentationSection"
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
import { useSection } from '../composables';
import { saveExperienceMarkdownFile } from 'src/modules/experience/functions/saveExperienceMarkdownFile';
import { ref } from 'vue';

const editionStore = useEditionStore();

const {
  section: presentationSection,
  refetch,
  onValidate,
} = useSection('presentation');

const presentationDialogVisible = ref(false);

const onValidateDescription = async (value: string) => {
  if (presentationSection.value === undefined) {
  } else {
    presentationDialogVisible.value = false;
    onValidate(value);
  }
  refetch();
};
</script>

<style scoped>
section {
  min-height: 50dvh;
}
</style>
