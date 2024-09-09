<template>
  <q-card>
    <q-card-section>
      <q-uploader
        ref="uploader"
        class="tw-w-full"
        label="Download picture"
        accept="image/*"
        :auto-upload="false"
        :hide-upload-btn="true"
      />

      <!-- Afficher l'aperçu de l'image sélectionnée -->
      <!-- <div v-if="imageSrc" class="q-mt-md">
        <q-img :src="imageSrc" :alt="imageName" style="max-width: 300px" />
      </div> -->
    </q-card-section>
    <q-card-actions align="around">
      <q-btn color="secondary" @click="emit('cancel')"> Cancel </q-btn>
      <q-btn color="primary" @click="pictureValidated"> Validate </q-btn>
    </q-card-actions>
  </q-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const uploader = ref();
const emit = defineEmits<{
  (e: 'upload', value: File): void;
  (e: 'cancel'): void;
}>();

// Déclaration des variables réactives

const pictureValidated = () => {
  if (uploader.value && uploader.value.files.length > 0) {
    const files = uploader.value ? uploader.value.files : []; // Récupérer les fichiers

    if (files.length > 0) {
      emit('upload', uploader.value.files[0]);
    }
  }
};
</script>
