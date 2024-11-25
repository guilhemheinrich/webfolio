<template>
    <div>
        <h1>Hello world</h1>
        Here is my mail: {{ Config.CONTACT_MAIL }}

        Full Config: {{ Config }}
    </div>
</template>

<script setup lang="ts">
import { useConfig } from "@composables/configuration";

const Config = useConfig();
</script>

<style scoped></style>
