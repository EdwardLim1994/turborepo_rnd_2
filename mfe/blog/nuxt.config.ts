// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["nuxt-graphql-request"],
  build: {
    transpile: ["nuxt-graphql-request"],
  },
  graphql: {
    /**
     * An Object of your GraphQL clients
     */
    clients: {
      default: {
        /**
         * The client endpoint url
         */
        endpoint: "http://100.105.32.95:3000/graphql",
        /**
         * Per-client options overrides
         * See: https://github.com/prisma-labs/graphql-request#passing-more-options-to-fetch
         */
        options: {},
      },
    },
  },

  devServer: {
    host: "0.0.0.0",
    port: 2000,
  },
});
