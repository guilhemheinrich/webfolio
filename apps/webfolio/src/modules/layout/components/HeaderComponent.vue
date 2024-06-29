<template>
  <q-toolbar>
    <q-toolbar-title>
      <div class="row no-wrap gt-sm items-center justify-between tw-h-[15vh]">
        <div class="text-brand tw-w-2/12">
          {{ add2(3) }}

          My Webfolio
        </div>
        <q-img
          src="~assets/logo_lite.png"
          fit="scale-down"
          class="tw-w-8/12"
        ></q-img>
        <div v-if="Config.DEV" class="tw-w-2/12">
          <q-btn
            class="tw-w-full"
            color="brand"
            v-if="!editionStore.editable"
            @click="editionStore.editable = true"
          >
            Toggle Admin Mode
          </q-btn>
          <q-btn
            class="tw-w-full"
            color="brand"
            v-if="editionStore.editable"
            @click="editionStore.editable = false"
          >
            Toggle User View
          </q-btn>
        </div>
      </div>
    </q-toolbar-title>
  </q-toolbar>
</template>

<script setup lang="ts">
import { Config } from 'src/modules/configuration';
import { add2 } from 'shared-utilities';
import { useEditionStore } from 'src/stores/edition';
const editionStore = useEditionStore();
add2(3);
</script>

<style lang="scss" scoped></style>
