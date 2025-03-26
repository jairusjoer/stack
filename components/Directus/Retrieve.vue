<script setup lang="ts">
const retrieve = async () => await $fetch('/api/directus/retrieveSchemaSnapshot');
</script>

<template>
  <button
    class="flex rounded-lg p-1"
    title="Retrieve schema snapshot"
    @click="retrieve"
  >
  <div class="bg-background-subtle size-4 rounded">&darr;</div>
  </button>
</template>
