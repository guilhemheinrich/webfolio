<template>
  <q-layout view="hHh lpR fFf">
    <q-header height-hint="98">
      <div v-if="Config.DEV">
        <admin-header></admin-header>
      </div>
    </q-header>

    <q-page-container class="tw-min-h-[100dvh]">
      <webfolio-header></webfolio-header>
      <router-view />
    </q-page-container>

    <webfolio-footer></webfolio-footer>
  </q-layout>
</template>
<script setup lang="ts">
import WebfolioHeader from 'src/modules/layout/components/HeaderComponent.vue';
import WebfolioFooter from 'src/modules/layout/components/FooterComponent.vue';
import AdminHeader from 'src/modules/admin/components/AdminHeader.vue';

import { Config } from 'src/modules/configuration';
</script>
