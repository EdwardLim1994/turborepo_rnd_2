<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
    {{ data }}
    {{ error }}
  </div>
</template>

<script setup lang="ts">
import { gql } from "nuxt-graphql-request/utils";

const { $graphql } = useNuxtApp();

const query = gql`
  query getBlog {
    getBlog {
      title
    }
  }
`;

const { data, error } = await useAsyncData("getblog", async () => {
  const data = await $graphql.default.request(query);
  return data.getBlog;
});
</script>
