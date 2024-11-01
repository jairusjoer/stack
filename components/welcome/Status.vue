<script setup lang="ts">
import { serverHealth } from '@directus/sdk';

const { $publicClient } = useNuxtApp();
const { data: health } = await useAsyncData('health', async () => {
  return $publicClient.request(serverHealth());
});
</script>

<template>
  <div class="inline-flex rounded border font-mono text-xs font-medium leading-6">
    <span class="px-2">Directus Status</span>
    <span
      :class="{
        'rounded-[3px] px-2 uppercase': true,
        'bg-successful text-successful-subtle': health?.status === 'ok',
        'bg-cautionary text-cautionary-subtle': health?.status === 'warn',
        'bg-destructive text-destructive-subtle': !health?.status || health?.status === 'error',
      }"
      >{{ health?.status || 'unreachable' }}</span
    >
  </div>
</template>
