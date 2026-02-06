// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/ui", "nuxt-auth-utils", "@nuxt/icon"],

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  routeRules: {
    "/": { prerender: false },
  },

  nitro: {
    precompile: [],
    prerender: {
      crawlLinks: false,
      enabled: false,
      routes: [],
      ignore: ["/api"],
      noRoutes: true,
    },
    serverAssets: [],
  },

  hooks: {
    "nitro:prerender:route": (route) => {
      return false;
    },
    "nitro:init": (nitro) => {
      // Sepenuhnya disable prerendering
      nitro.options.prerender = { enabled: false, routes: [] };
    },
  },

  compatibilityDate: "2025-01-15",

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
});
