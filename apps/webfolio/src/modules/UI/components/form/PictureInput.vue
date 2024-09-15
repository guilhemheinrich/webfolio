<template>
  <q-card>
    <q-card-section>
      <q-carousel
        class="tw-h-auto tw-w-full"
        ref="carouselRef"
        :padding="false"
        v-model="step"
        :autoplay="false"
        transition-prev="slide-left"
        transition-next="slide-right"
        aria-hidden="true"
      >
        <q-carousel-slide name="select" key="select">
          <q-uploader
            ref="uploader"
            class="tw-w-full"
            label="Download picture"
            accept="image/*"
            :auto-upload="false"
            :hide-upload-btn="true"
          />
        </q-carousel-slide>

        <q-carousel-slide name="crop" key="crop">
          <Cropper
            ref="cropper"
            class="cropper"
            :src="img"
            :stencil-component="
              cropperProps?.stencil ? CircleStencil : RectangleStencil
            "
            :stencil-props="{
              aspectRatio: props.cropperProps?.aspectRatio ?? 500 / 300,
            }"
          ></Cropper>
        </q-carousel-slide>
      </q-carousel>
    </q-card-section>
    <q-card-actions align="around">
      <!-- First step : load picture -->
      <q-btn
        v-if="step === 'select'"
        color="secondary"
        @click="emit('cancel')"
        :loading="loading"
      >
        Cancel
      </q-btn>
      <q-btn
        v-if="step === 'select'"
        color="primary"
        @click="loadPicture"
        :loading="loading"
      >
        Next
      </q-btn>

      <!-- Second step : crop it and save -->
      <q-btn
        v-if="step === 'crop'"
        color="secondary"
        @click="carouselRef?.previous()"
        :loading="loading"
      >
        Back
      </q-btn>
      <q-btn
        v-if="step === 'crop'"
        color="primary"
        @click="savePicture"
        :loading="loading"
      >
        Validate
      </q-btn>
    </q-card-actions>
  </q-card>
</template>
<script setup lang="ts">
import { DefineComponent, Ref, ref } from 'vue';
import { QCarousel, QUploader } from 'quasar';
import { Cropper, CircleStencil, RectangleStencil } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import Compressor from 'compressorjs';

//* Uncomment when needed
type UploaderProps = InstanceType<typeof QUploader>['$props'];
type CropperProps = InstanceType<typeof Cropper>['$props'];

const props = defineProps<{
  uploaderProps?: Partial<UploaderProps>;
  cropperProps?: Partial<{
    aspectRatio: string;
    stencil: 'rectangle' | 'circle';
  }>;
  compressorOptions?: Compressor.Options;
}>();

const carouselRef = ref();
const step: Ref<'select' | 'crop'> = ref('select');
const loading = ref<boolean>(false);

const uploader = ref();
const emit = defineEmits<{
  (e: 'upload', value: File): void;
  (e: 'cancel'): void;
}>();

type ExtractMethods<T> =
  T extends DefineComponent<unknown, infer Methods> ? Methods : never;

type CropperMethods = ExtractMethods<typeof Cropper>;
const cropper: Ref<CropperMethods | null> = ref(null);

const loadPicture = () => {
  // Here use
  if (uploader.value && uploader.value.files.length > 0) {
    const files = uploader.value ? uploader.value.files : []; // Récupérer les fichiers

    if (files.length > 0) {
      img.value = URL.createObjectURL(files[0]);
    }
  }
  if (carouselRef.value) carouselRef.value.next();
};

const img = ref(
  'https://images.pexels.com/photos/226746/pexels-photo-226746.jpeg',
);

const savePicture = () => {
  if (cropper.value) {
    const canvas = cropper.value.getResult().canvas;
    if (canvas) {
      loading.value = true;
      canvas.toBlob((blob) => {
        if (!blob) return;
        new Compressor(blob, {
          convertSize: 5000000 / 25,
          success(result) {
            loading.value = false;
            emit('upload', result as File);
          },
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.stencil {
  border-radius: 50%;
}
</style>
