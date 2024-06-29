<template>
  <div>
    <VMarkdownView mode="light" :content="mkdTestString"></VMarkdownView>
  </div>
</template>

<script setup lang="ts">
import { VMarkdownView } from 'vue3-markdown';
const mkdTestString = `
# Mathématique fondamentale et appliquée

Pendant que Mimsette est parfaite

## Soutitre
![Markdown Logo](https://markdown-here.com/img/icon256.png)
`;
</script>

<style scoped></style>
