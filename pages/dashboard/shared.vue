<template>
  <div>
    <h1 class="text-blue-900">Images shared with me</h1>
  </div>
  <div
    class="my-4 grid grid grid-cols-1 min-[912px]:grid-cols-2 min-[1248px]:grid-cols-3 min-[1584px]:grid-cols-4 min-[1920px]:grid-cols-5 min-[2256px]:grid-cols-6 gap-y-4">
    <PostShared :post="post" :onShare="onShare" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
})

import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()

const post = {
  "id": "71b00dcb-e6ba-427b-b68f-4034e90f7f86",
  "image": "https://singlecolorimage.com/get/48a3dc/64x64",
  "description": "Sint ea consequat anim nostrud. Eiusmod incididunt sint quis nostrud exercitation amet magna.",
  "user": {
    "firstName": "lvuoq",
    "lastName": "jlvb",
    "username": "pkbw",
    "avatar": "https://singlecolorimage.com/get/65a861/64x64"
  }
}

function onShare(post) {
  toast({
    title: 'Share',
    description: 'TODO',
  });
}

</script>

<style lang="scss" scoped></style>