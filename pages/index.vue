<script setup lang="ts">
const variants = ['bold', 'subtle', 'outlined', 'ghost'];
const colors = ['brand', 'neutral', 'informative', 'successful', 'cautionary', 'destructive'];
</script>

<template>
  <!-- <WelcomeSplash /> -->
<div class="p-2">
  <div v-for="variant in variants" class="p-2 space-x-4">
    <Button
      v-for="color in colors"
      :variant
      :color
      disabled
    >
      Button Label
    </Button>
  </div>
</div>
</template>
