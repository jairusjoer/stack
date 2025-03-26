a
<script setup lang="ts">
const apply = async () => await $fetch('/api/directus/applySchemaDifference');
</script>

<template>
  <button
    class="flex rounded-lg p-1"
    title="Apply schema difference"
    @click="apply"
  >
    <div class="bg-background-subtle size-4 rounded">&uarr;</div>
  </button>
</template>
