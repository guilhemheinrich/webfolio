<template>
  <div v-if="Config.DEV" class="tw-h-[700px]">
    <VMarkdownEditor
      v-model="content"
      locale="en"
      :upload-action="saveMarkdown"
    ></VMarkdownEditor>
  </div>
  <div v-else>Go Outta there little hackey !</div>
</template>

<script setup lang="ts">
import { Config } from 'src/modules/configuration';
import { ref } from 'vue';
import { VMarkdownEditor } from 'vue3-markdown';

const content = ref('');

const saveMarkdown = (file: string) => {
  console.log(file);
};
</script>

<style scoped></style>
