<script setup lang="ts">
import { avatar } from "#build/ui";
import type { DropdownMenuItem } from "@nuxt/ui";

const items = ref<DropdownMenuItem[]>([
  {
    label: "",
    slot: "account",
    disabled: true,
  },
  {
    label: "Sign out",
    icon: "i-lucide-cog",
  },
]);

const { user, clear } = useUserSession();

const logout = async () => {
  await clear();
  await navigateTo("/auth");
};

</script>

<template>
  <UDropdownMenu :items="items" :popper="{ placement: 'bottom-start' }">
    <template #default>
      <UButton
        icon="i-lucide-user"
        size="sm"
        variant="ghost"
        color="neutral"
        aria-label="User menu"
      />
    </template>
    <template #account="{ item }">
      <div class="text-left cursor-text select-text">
        <p>Signed in as</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ user?.name }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <div @click="logout" class="flex justify-between items-center w-full">
        <span class="truncate">{{ item.label }} </span>
        <UIcon
          :name="item.icon"
          class="shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
        />
      </div>
    </template>
  </UDropdownMenu>
</template>
