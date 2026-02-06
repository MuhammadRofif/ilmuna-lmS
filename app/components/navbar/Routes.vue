<template>
    <div class="flex items-center w-full">
        <div class="hidden md:block" v-if="isSearchPage">
            <NavbarInput></NavbarInput>

        </div>
        <div class="flex gap-x-2 ml-auto">
            <UButton v-if="isTeacherMode || isCoursePage" to="/" label="Exit" icon="i-lucide-github" size="sm" variant="ghost">
            </UButton>
            <UButton v-else to="/teacher" label="Teacher Mode" icon="i" size="sm" variant="ghost">
            </UButton>
            <NavbarUserProfile></NavbarUserProfile>


        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const route = useRoute();

const isTeacherMode = computed(() => route.fullPath.startsWith('/teacher'));
const isCoursePage = computed(() => route.fullPath.includes('/course'));
const isSearchPage = computed(() => route.fullPath.includes('/search'));
</script>