<script setup lang="ts">
import type { Post } from '~/models/post.model'

interface Props { post: Post, onShare: Function, onSend: Function }

const { post, onSend, onShare } = defineProps<Props>()

function onClick1(event: MouseEvent) {
  if (onShare) {
    onShare(post);
  }
}
function onClick2(event: MouseEvent) {
  if (onSend) {
    onSend(post);
  }
}
</script>

<template>
  <Card class="flex flex-col w-80">
    <div>
      <img :src="post.image" :alt="post.description" class="w-80 h-80 object-cover rounded-t-lg">
    </div>
    <p class="p-2 w-80 h-24">{{ post.description }}</p>
    <div class="bg-teal-200 h-12 flex flex-row items-center justify-end">
      <Button variant="ghost" @click="onClick1" class="bg-transparent hover:bg-transparent p-0 h-12 w-12">
        <i class="material-icons text-violet-700">share</i>
      </Button>
      <Button variant="ghost" @click="onClick2" class="bg-transparent hover:bg-transparent p-0 h-12 w-12">
        <i class="material-icons text-blue-500">send</i>
      </Button>
    </div>
  </Card>
</template>