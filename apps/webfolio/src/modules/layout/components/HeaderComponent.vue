<template>
  <header class="bg-primary text-white row no-wrap">
    <q-toolbar class="no-padding col-10">
      <q-toolbar-title>
        <QuotationSection></QuotationSection>
      </q-toolbar-title>
    </q-toolbar>
    <q-toolbar class="gt-sm col-grow tw-relative">
      <div class="absolute-bottom-right q-pa-sm">
        <socials-component></socials-component>
      </div>
    </q-toolbar>
  </header>
</template>

<script setup lang="ts">
import SocialsComponent from './SocialsComponent.vue';
import QuotationSection from 'src/modules/sections/components/QuotationSection.vue';
</script>

<style lang="scss" scoped></style>
