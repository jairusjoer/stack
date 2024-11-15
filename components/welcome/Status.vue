<script setup lang="ts">
import { serverHealth } from '@directus/sdk';

const { $publicClient } = useNuxtApp();

const { data: health } = await useAsyncData('health', async () => {
  return await $publicClient.request(serverHealth());
});

const refresh = async () => {
  try {
    health.value = await $publicClient.request(serverHealth());
    console.log(...ConsoleBadge('status', '#00BCD4'), 'Refreshed directus status');
  } catch (error) {
    health.value = null;
    console.error(...ConsoleBadge('status', '#c0392b'), 'Failed to refresh directus status');
  }
};
</script>

<template>
  <div class="inline-flex overflow-hidden rounded border font-mono text-xs font-medium leading-6">
    <span class="px-2">Directus Status</span>
    <button
      @click="refresh"
      title="Click to refresh"
      :class="{
        'group flex items-center gap-2 rounded-[3px] px-2 uppercase': true,
        'bg-successful text-successful-subtle': health?.status === 'ok',
        'bg-cautionary text-cautionary-subtle': health?.status === 'warn',
        'bg-destructive text-destructive-subtle': health?.status === 'error' || !health?.status,
      }"
    >
      {{ health?.status || 'unreachable' }}
      <svg
        fill="none"
        height="12px"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        stroke="currentColor"
        viewBox="0 0 24 24"
        width="12px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Refresh</title>
        <path d="M21.1679 8C19.6247 4.46819 16.1006 2 11.9999 2C6.81459 2 2.55104 5.94668 2.04932 11"></path>
        <path d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3"></path>
        <path d="M2.88146 16C4.42458 19.5318 7.94874 22 12.0494 22C17.2347 22 21.4983 18.0533 22 13"></path>
        <path d="M7.04932 16H2.64932C2.31795 16 2.04932 16.2686 2.04932 16.6V21"></path>
      </svg>
    </button>
  </div>
</template>
