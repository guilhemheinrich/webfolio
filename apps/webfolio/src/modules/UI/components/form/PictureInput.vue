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

      <Cropper
        ref="cropper"
        class="cropper"
        :src="img"
        :stencil-props="{
          aspectRatio: 500 / 300,
        }"
      ></Cropper>
    </q-card-section>
    <q-card-actions align="around">
      <q-btn color="secondary" @click="emit('cancel')"> Cancel </q-btn>
      <q-btn color="primary" @click="pictureValidated"> Validate </q-btn>
    </q-card-actions>
  </q-card>
</template>
<script setup lang="ts">
import { DefineComponent, Ref, ref } from 'vue';
import { QCarousel } from 'quasar';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const uploader = ref();
const emit = defineEmits<{
  (e: 'upload', value: File): void;
  (e: 'cancel'): void;
}>();

type ExtractMethods<T> =
  T extends DefineComponent<unknown, infer Methods> ? Methods : never;

type CropperMethods = ExtractMethods<typeof Cropper>;
const cropper: Ref<CropperMethods | null> = ref(null);
const croppedImage: Ref<string | null> = ref(null);

// Fonction pour récupérer l'image à l'intérieur du stencil
const cropImage = () => {
  if (cropper.value) {
    const canvas = cropper.value.getResult().canvas;
    // croppedImage.value = canvas.toDataURL('image/jpeg');
  }
};

const pictureValidated = () => {
  cropImage();
  console.log(croppedImage.value);
  // Here use
  if (uploader.value && uploader.value.files.length > 0) {
    const files = uploader.value ? uploader.value.files : []; // Récupérer les fichiers

    if (files.length > 0) {
      emit('upload', uploader.value.files[0]);
    }
  }
};

const img = ref(
  'https://images.pexels.com/photos/226746/pexels-photo-226746.jpeg',
);

// const change = (parameters: { coordinates: any; canvas: any }) => {
//   console.log(parameters.coordinates, parameters.canvas);
// };
</script>
