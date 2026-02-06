<template>
  <div>
    <pre>
      {{ user }}

      
    </pre>

    <UButton @click="logout"> Logout</UButton>

    <UButton @click="navigateTo('/teacher')"> Teacher Page</UButton>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "protected",
});

const { user, clear } = useUserSession();

const logout = async () => {
  await clear;
  await navigateTo("/auth");
};
</script>

<style scoped></style>
