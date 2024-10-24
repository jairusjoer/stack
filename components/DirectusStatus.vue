<script setup lang="ts">
import { serverHealth } from '@directus/sdk'

const { $publicClient } = useNuxtApp();
const { data: health } = await useAsyncData('health', async () => {
    return $publicClient.request(serverHealth());
});
</script>

<template>
    <div class="inline-flex text-xs font-medium font-mono  bg-zinc-100 border border-zinc-200 leading-6 rounded">
        <span class="px-2">Directus Status</span>
        <span :class="{
            'px-2 rounded-[3px] uppercase': true,
            'bg-green-600 text-green-100': (health?.status === 'ok'),
            'bg-yellow-600 text-yellow-100': (health?.status === 'warn'),
            'bg-red-600 text-red-100': (!health?.status || health?.status === 'error'),
        }">{{ health?.status || 'unreachable' }}</span>
    </div>
</template>

<style scoped></style>