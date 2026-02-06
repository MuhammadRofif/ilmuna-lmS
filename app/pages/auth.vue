<script setup lang="ts">
import type { FormSubmitEvent, TabsItem } from "@nuxt/ui";
import { handleError } from "~/utils/error";
import { loginSchema, registerSchema } from "~/utils/schemas";
import type { LoginSchema, RegisterSchema } from "~/utils/schemas";
const items = [
  {
    label: "Login",
    description: "Enter your credentials to access your account.",
    icon: "i-lucide-user",
    slot: "login" as const,
  },
  {
    label: "Register",
    description: "Create a new account by providing your details.",
    icon: "i-lucide-lock",
    slot: "register" as const,
  },
] satisfies TabsItem[];

const state = reactive({
  email: "",
  password: "",
  name: "",
});

const { isLoading, toggleLoading, showMessage, showError } = useStore();

const { fetch: refreshSession } = useUserSession();

async function login(event: FormSubmitEvent<LoginSchema>) {
  try {
    toggleLoading(true);

    const response = await $fetch("/api/auth/login", {
      method: "POST",
      body: event.data,
    });
    showMessage({ title: "Login Berhasil", description: "Selamat datang!" });
    await refreshSession();
    await navigateTo("/");
    console.log("Login success:", response);
    // Redirect atau tampilkan success message
  } catch (error: any) {
    const err = handleError(error);
    showError(err);
  } finally {
    toggleLoading(false);
  }
}

async function register(event: FormSubmitEvent<RegisterSchema>) {
  try {
    toggleLoading(true);

    const response = await $fetch("/api/auth/register", {
      method: "POST",
      body: event.data,
    });
    showMessage({
      title: "Daftar Berhasil",
      description: "Akun Anda telah dibuat",
    });
    await navigateTo("/");
    console.log("Register success:", response);
    // Redirect atau tampilkan success message
  } catch (error: any) {
    const err = handleError(error);
    showError(err);
  } finally {
    toggleLoading(false);
  }
}

definePageMeta({
  layout: "auth",
});
</script>

<template>
  <UTabs
    :items="items"
    variant="link"
    :ui="{ trigger: 'grow' }"
    class="gap-4 w-full max-w-md"
  >
    <!-- login -->
    <template #login="{ item }">
      <p class="text-muted mb-4">
        {{ item.description }}
      </p>

      <UForm
        :schema="loginSchema"
        :state="state"
        @submit="login"
        class="flex flex-col gap-4"
      >
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" type="email" class="w-full" />
        </UFormField>
        <UFormField label="Password" name="password">
          <UInput v-model="state.password" type="password" class="w-full" />
        </UFormField>

        <UButton
          block
          label="Login"
          type="submit"
          variant="soft"
          class="self-end"
          :loading="isLoading"
          :disabled="isLoading"
        />
      </UForm>
    </template>

    <!-- register -->
    <template #register="{ item }">
      <p class="text-muted mb-4">
        {{ item.description }}
      </p>

      <UForm
        :schema="registerSchema"
        :state="state"
        @submit="register"
        class="flex flex-col gap-4"
      >
        <UButton
          block
          icon="i-lucide-github"
          type="button"
          variant="soft"
          class="self-end"
        />

        <UFormField label="Name" name="name" required>
          <UInput v-model="state.name" type="text" required class="w-full" />
        </UFormField>
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" type="email" class="w-full" />
        </UFormField>
        <UFormField label="Password" name="password">
          <UInput v-model="state.password" type="password" class="w-full" />
        </UFormField>

        <UButton
          block
          label="Register"
          type="submit"
          variant="soft"
          class="self-end"
        />
      </UForm>
    </template>
  </UTabs>
</template>
