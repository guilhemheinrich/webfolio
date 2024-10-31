<template>
  <q-card>
    <div ref="outer_div">
      <q-card-section class="tw-h-[80dvh]">
        <q-form ref="form" @submit="onSubmit">
          <div v-if="isLoaded">
            <div ref="mkdEditor">
              <VMarkdownEditor
                v-model="content"
                locale="en"
                :upload-action="file_upload"
              ></VMarkdownEditor>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </div>
    <q-card-actions align="around">
      <q-btn color="secondary" @click="emit('cancel')"> Cancel </q-btn>
      <q-btn color="primary" @click="validateForm"> Validate </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { QForm } from 'quasar';
import { Component, onMounted, ref, type PropType } from 'vue';

const props = defineProps({
  field_label: {
    type: String as PropType<string>,
    default: 'Field Title',
    validator(value: string) {
      return value.length < 50;
    },
  },
  initial_content: {
    type: String as PropType<string>,
    default: '',
  },
  file_upload: {
    type: Function,
  },
});

const content = ref('');
const mkdEditor = ref<HTMLElement | null>(null);

const outer_div = ref<HTMLElement | null>(null);

// Déclarons une variable pour le composant VMarkdownView
let VMarkdownEditor: Component | null = null;
const isLoaded = ref<boolean>(false);
onMounted(async () => {
  content.value = props.initial_content;
  import('vue3-markdown').then((module) => {
    VMarkdownEditor = module.VMarkdownEditor as Component;
    isLoaded.value = true;
  });
  if (outer_div.value && mkdEditor.value) {
    const content_heigh = outer_div.value.clientHeight;
    // Vous pouvez maintenant manipuler mkdEditor

    // Accéder au webcomponent
    const webComponent = mkdEditor.value as HTMLElement;
    if (webComponent) {
      // Accéder à la deuxième div à l'intérieur du webcomponent
      const vmdBodyElement = webComponent.querySelector('.vmd-body');
      const vmdHeaderElement = webComponent.querySelector('.vmd-toolbar');
      if (vmdBodyElement) {
        (vmdBodyElement as HTMLElement).style.height =
          content_heigh - (vmdHeaderElement?.clientHeight ?? 0) - 30 + 'px';
      }
    }
  }
});
const emit = defineEmits<{
  (e: 'formValidated', value: string): void;
  (e: 'cancel'): void;
}>();

const form = ref<QForm | null>(null);

const onSubmit = () => {
  emit('formValidated', content.value);
  return true;
};

const validateForm = () => {
  if (form.value) {
    form.value.submit();
  }
};
</script>

<style scoped></style>
