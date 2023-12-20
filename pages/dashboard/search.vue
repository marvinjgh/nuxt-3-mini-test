<template>
  <div class="w-full">

    <Form :validation-schema="schema" class="flex flex-row items-center" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="text" onchange="">
        <FormItem class="flex-1">
          <FormControl>
            <InputSearch placeholder="Let the AI create wonderful images for you" class="flex-1"
              v-bind="componentField" />
          </FormControl>
        </FormItem>
      </FormField>
      <Button variant="circle" size="icon" class="bg-green-700 hover:bg-green-700/90 mx-4">
        <i class="material-icons">search</i>
      </Button>
    </Form>
  </div>
  <div
    class="my-4 grid grid grid-cols-1 min-[912px]:grid-cols-2 min-[1248px]:grid-cols-3 min-[1584px]:grid-cols-4 min-[1920px]:grid-cols-5 min-[2256px]:grid-cols-6 gap-y-4"
    :class="!postsResult ? 'noPosts' : ''">
    <p class="mt-28" v-if="loading">Loading</p>
    <p class="mt-28" v-else-if="errorMessage">{{ errorMessage }}</p>
    <p class="mt-28" v-else-if="!postsResult">Start searching for images, your AI is waiting for you!</p>
    <PostSearch v-else v-for="post in postsResult" :key="post.id" :post="post" :onBookmark="onBookmark"/>

  </div>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
})

import { Form } from 'vee-validate';
import * as yup from 'yup';
const config = useRuntimeConfig()
const authStore = useAuthStore();
const loading = ref(false);
const errorMessage = ref('');
const postsResult = ref(null);

const schema = yup.object({
  text: yup.string().required(),
});

async function onSubmit(values) {

  errorMessage.value = '';
  loading.value = true;
  postsResult.value = null;

  const { data, pending, error } = await useFetch(
    '/api/posts/search',
    {
      method: 'get',
      baseURL: config.public.apiBase,
      headers: { Authorization: `Bearer ${authStore.token}` },
      query: values
    }
  );

  loading.value = false;
  if (!pending.value && !error.value) {
    const { posts } = data.value;
    postsResult.value = posts;
  } else {
    if (error.value.data) {
      errorMessage.value = error.value.data.message;
    } else {
      errorMessage.value = "Error";
    }
  }
}

function onBookmark(post) {
  // TODO save the post
}

</script>

<style scoped>
.noPosts {
  grid-template-columns: repeat(1, minmax(0, 1fr));
  text-align: center;
}
</style>