<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white" height-hint="98">
      <webfolio-header></webfolio-header>
    </q-header>

    <q-page-container class="tw-h-[100dvh]">
      <router-view />
    </q-page-container>

    <webfolio-footer></webfolio-footer>
  </q-layout>
</template>
<script setup lang="ts">
import WebfolioHeader from 'src/modules/layout/components/HeaderComponent.vue';
import WebfolioFooter from 'src/modules/layout/components/FooterComponent.vue';
</script>
