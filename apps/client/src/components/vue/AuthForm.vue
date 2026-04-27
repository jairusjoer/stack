<script setup lang="tsx">
import { AuthStore } from "@stores/AuthStore";

async function onSubmit(event: SubmitEvent) {
  const formData = new FormData(event.target as HTMLFormElement);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await AuthStore.signIn({ email, password });
}
</script>

<template>
  <div>
   <pre>{{ JSON.stringify(AuthStore.user.value, null, 2) }}</pre>
    <form class="auth-form" @submit.prevent="onSubmit">
      <input type="email" name="email" />
      <input type="password" name="password" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
