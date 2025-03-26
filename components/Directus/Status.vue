<script setup lang="ts">
import { serverHealth } from '@directus/sdk';

const { interval = 60 * 1000 } = defineProps<{
  interval?: number;
}>();

const { $directus } = useNuxtApp();
const health = useState(() => ({ status: 'pending' }));

const refreshHealth = async () => {
  health.value = { status: 'pending' };
  await Sleep(300);

  try {
    health.value = await $directus.publicClient.request(serverHealth());
  } catch (error) {
    health.value = { status: 'error' };
    console.error(error);
  }
};
const refreshInterval = ref<NodeJS.Timeout>();

onMounted(async () => {
  await refreshHealth();
  refreshInterval.value = setInterval(async () => await refreshHealth(), interval);
});

onUnmounted(() => clearInterval(refreshInterval.value));
</script>

<template>
  <button
    class="flex rounded-lg p-1"
    :title="`Status: ${health?.status}`"
    @click="refreshHealth"
  >
    <div
      :class="{
        'size-4 rounded transition-colors': true,
        'bg-informative-subtle': health?.status === 'pending',
        'bg-successful-subtle': health?.status === 'ok',
        'bg-cautionary-subtle': health?.status === 'warn',
        'bg-destructive-subtle': health?.status === 'error',
      }"
    >
      <div
        :class="{
          'm-1 size-2 animate-pulse rounded-full transition-colors': true,
          'bg-informative': health?.status === 'pending',
          'bg-successful': health?.status === 'ok',
          'bg-cautionary': health?.status === 'warn',
          'bg-destructive': health?.status === 'error',
        }"
      />
    </div>
  </button>
</template>
