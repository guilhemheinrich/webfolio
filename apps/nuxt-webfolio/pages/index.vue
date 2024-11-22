<template>
    <div>
        <h1>Hello world</h1>
        Here is my mail: {{ Config.public.CONTACT_MAIL }}

        Full Config: {{ Config.public }}
    </div>
</template>

<script setup lang="ts">
const Config = useRuntimeConfig();
</script>

<style scoped></style>
