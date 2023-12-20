<template>
  <div>
    <h1 class="text-blue-900">Lastest Feed</h1>
    <div
      class="my-4 grid grid grid-cols-1 min-[912px]:grid-cols-2 min-[1248px]:grid-cols-3 min-[1584px]:grid-cols-4 min-[1920px]:grid-cols-5 min-[2256px]:grid-cols-6 gap-y-4">
      <p v-if="pending">Loading</p>
      <p v-else-if="error">Error fetching</p>
      <PostHome v-else v-for="post in data.posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
});

const config = useRuntimeConfig();
const authStore = useAuthStore();

const { data, pending, error } = await useFetch(
  '/api/posts',
  {
    method: 'get',
    baseURL: config.public.apiBase,
    headers: { Authorization: `Bearer ${authStore.token}` }
  }
)

</script>

<style lang="scss" scoped></style>