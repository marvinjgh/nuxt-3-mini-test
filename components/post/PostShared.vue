<script setup lang="ts">
import type { Post } from '~/models/post.model'

interface Props { post: Post, onShare: Function }

const { post, onShare } = defineProps<Props>()

function onClick(event: MouseEvent) {
  if (onShare) {
    onShare(post);
  }
}
</script>

<template>
  <Card class="flex flex-col w-80">
    <div>
      <img :src="post.image" :alt="post.description" class="w-80 h-80 object-cover rounded-t-lg">
    </div>
    <p class="p-2 w-80 h-24">{{ post.description }}</p>
    <div class="bg-teal-200 h-12 flex flex-row items-center justify-center">
      <Button variant="ghost" @click="onClick" class="bg-transparent hover:bg-transparent p-0 h-12 w-12 text-violet-700">
        <p class="flex items-center"><i class="material-icons mr-2">send</i>POST</p>
      </Button>
    </div>
  </Card>
</template>