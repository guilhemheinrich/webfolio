<template>
  <router-view />
</template>

<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query';
defineOptions({
  name: 'App'
});

const queryClient = useQueryClient();
</script>
