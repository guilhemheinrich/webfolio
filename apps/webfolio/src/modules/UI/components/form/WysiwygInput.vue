<template>
  <q-card>
    <q-card-section>
      <q-form ref="form" @submit="onSubmit">
        <q-editor :height="props.height" v-model="content" />
      </q-form>
    </q-card-section>
    <q-card-actions align="around">
      <q-btn color="secondary" @click="emit('cancel')"> Cancel </q-btn>
      <q-btn color="primary" @click="validateForm"> Validate </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { QForm, QEditorProps } from 'quasar';
import { onMounted, ref } from 'vue';

const content = ref<string>('');

const props = withDefaults(
  defineProps<
    Omit<QEditorProps, 'modelValue'> & {
      field_label: string;
      initial_content: string;
    }
  >(),
  { initial_content: '' },
);

onMounted(() => {
  content.value = props.initial_content ?? 'This is a test';
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
