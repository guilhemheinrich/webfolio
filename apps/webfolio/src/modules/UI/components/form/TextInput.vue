<template>
  <q-card>
    <q-card-section>
      <q-form ref="form" @submit="onSubmit">
        <q-input
          filled
          v-model="content"
          v-bind="inputProps"
          :label="field_label"
          autofocus
        />
      </q-form>
    </q-card-section>
    <q-card-actions align="around">
      <q-btn color="secondary" @click="emit('cancel')"> Cancel </q-btn>
      <q-btn color="primary" @click="validateForm"> Validate </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { QForm, QInputProps } from 'quasar';
import { onMounted, ref, type PropType } from 'vue';

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
  // Déclaration des props que vous souhaitez transmettre à q-input
  inputProps: {
    type: Object as PropType<Omit<QInputProps, 'modelValue'>>,
    default: () => ({}),
  },
});

const emit = defineEmits<{
  (e: 'formValidated', value: string): void;
  (e: 'cancel'): void;
}>();

const content = ref('');
const form = ref<QForm | null>(null);

onMounted(() => {
  content.value = props.initial_content;
});

const onSubmit = () => {
  emit('formValidated', content.value);
  return true;
};

const validateForm = () => {
  console.log('onSubmit');
  if (form.value) {
    form.value.submit();
  }
};
</script>

<style scoped></style>
