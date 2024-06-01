<template>
  <q-toolbar>
    <q-toolbar-title>
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
      </q-avatar>
      <div class="bg-teal-500">
        My Webfolio
      </div>
    </q-toolbar-title>
  </q-toolbar>

  <q-tabs align="left">
    <q-route-tab to="/page1" label="Page One" />
    <q-route-tab to="/page2" label="Page Two" />
    <q-route-tab to="/page3" label="Page Three" />
  </q-tabs>
</template>

<script setup>
import { add2 } from 'shared-utilities';
</script>

<style lang="scss" scoped></style>
