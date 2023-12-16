<script setup lang="ts">
import type { Person } from '~/models/people.model'

interface Props { person: Person }

const { person } = defineProps<Props>()
</script>

<template>
  <Card class="flex flex-row w-80 h-16 items-center">
    <Avatar class="mx-4">
      <AvatarImage :src="person.avatar" :alt="'avatar of ' + person.name" />
      <AvatarFallback>{{ person.name.substring(0, 2).toUpperCase() }}</AvatarFallback>
    </Avatar>
    <p class="flex-1 truncate">{{ person.name }}</p>
    <i class="material-icons mx-4 text-green-500" v-if="!person.following">person_add</i>
  </Card>
</template>