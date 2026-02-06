<template>
    <UInput icon="i-lucide-search" size="md" :trailing="false" color="primary" variant="outline"
        placeholder="Carii..." :ui="{ rounded: 'rounded-full' }" v-model="query" />
</template>

<script setup>

const query = ref('');

</script>