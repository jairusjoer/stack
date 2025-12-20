<script setup>
import { onMounted } from 'vue';
import SwaggerUI from 'swagger-ui';
// import 'swagger-ui/dist/swagger-ui.css';

onMounted(() => {
  SwaggerUI({
    title: 'lol',
    url: `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/?apikey=${import.meta.env.VITE_SUPABASE_KEY}`,
    dom_id: '#swagger-ui',
  });
});
</script>

<template>
  <section id="swagger-ui" />
</template>
