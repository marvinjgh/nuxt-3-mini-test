<script setup lang="ts">
import type { Post } from '~/models/post.model'

interface Props { post: Post }

const { post } = defineProps<Props>()
</script>

<template>
  <Card class="flex flex-col w-80">
    <div class="flex flex-row items-center h-16 w-80">
      <Avatar class="mx-4">
        <AvatarImage :src="post.user.avatar" :alt="`avatar of ${post.user.firstName} ${post.user.lastName}`.trim()" />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
      <div>
        <p class="flex-1 truncate font-semibold">{{ `${post.user.firstName} ${post.user.lastName}` }}</p>
        <p class="flex-1 truncate font-light">@{{ post.user.username }}</p>
      </div>
    </div>
    <div>
      <img :src="post.image" :alt="post.description" class="w-80 h-80 object-cover rounded-b-lg">
    </div>
  </Card>
</template>