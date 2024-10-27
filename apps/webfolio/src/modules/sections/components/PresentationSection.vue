<template>
  <section id="presentation">
    <div class="container">
      <RelativeOverlay position="top-right">
        <template #overlay v-if="editionStore.editable">
          <q-btn
            class="tw-maxw-[200px] tw-mx-4 tw-w-[15vw]"
            @click="presentationDialogVisible = true"
            color="warning"
          >
            Edit Description
          </q-btn>
        </template>
        <template #foreground>
          <!-- mode="custom" utilise les styles globaux (comme n'importe quoi d'autre que "light" et "dark") -->
          <div
            class="q-ma-md"
            aria-label="Long presentation"
            v-html="(presentationSection && presentationSection.content) || ''"
          ></div>
          <!-- <VMarkdownView
            v-if="presentationSection"
            class="q-ma-md"
            aria-label="Long presentation"
            mode="custom"
            :content="
              (presentationSection && presentationSection.content) || ''
            "
          ></VMarkdownView> -->
        </template>
      </RelativeOverlay>
    </div>
    <q-dialog v-model="presentationDialogVisible" full-width>
      <div class="tw-max-w-[900px]! tw-w-[900px]">
        <WysiwygInput
          height="80dvh"
          field_label="Description"
          :initial_content="
            (presentationSection && presentationSection.content) || ''
          "
          @form-validated="onValidateDescription"
          @cancel="presentationDialogVisible = false"
        ></WysiwygInput>
      </div>
    </q-dialog>
  </section>
</template>

<script setup lang="ts">
import { useEditionStore } from 'src/stores/edition';
import RelativeOverlay from 'src/modules/UI/components/RelativeOverlay.vue';
import { useSection } from '../composables';
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
  margin: 0px;
  padding: 1rem;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
