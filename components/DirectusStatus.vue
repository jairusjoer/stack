<script setup lang="ts">
import { PublicClient } from '../directus/interface/public';
import { serverHealth } from '@directus/sdk'

const health = await PublicClient.request(serverHealth());
</script>

<template>
    <div class="inline-flex text-xs font-medium font-mono  bg-zinc-100 border border-zinc-200 leading-6 rounded">
        <span class="px-2">Directus Status</span>
        <span :class="{
            'px-2 rounded-[3px] uppercase': true,
            'bg-green-600 text-green-100': health.status === 'ok',
            'bg-yellow-600 text-yellow-100': health.status === 'warn',
            'bg-red-600 text-red-100': health.status === 'error',
        }">{{ health.status }}</span>
    </div>
</template>

<style scoped></style>