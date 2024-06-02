<template>
  <q-toolbar>
    <q-toolbar-title>
      <div class="row no-wrap gt-sm items-center justify-between tw-h-[15vh]">

        <div class="text-brand">
          {{ add2(3) }}
          <q-btn color="brand">
            Hello
          </q-btn>
          My Webfolio
        </div>
        <q-img src="~assets/logo_lite.png" fit="scale-down"></q-img>
      </div>
    </q-toolbar-title>
  </q-toolbar>
</template>

<script setup lang="ts">
import { add2 } from 'shared-utilities';
add2(3)
</script>

<style lang="scss" scoped></style>
