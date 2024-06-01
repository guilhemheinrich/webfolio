<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal class="bg-primary text-white" height-hint="98">
      <webfolio-header></webfolio-header>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>
<script setup lang="ts">
import WebfolioHeader from 'src/modules/header/component/WebfolioHeader.vue';
</script>
