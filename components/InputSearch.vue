<script setup lang="ts">
import { useAttrs } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const { class: className, ...rest } = useAttrs()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

</script>

<template>
  <div :class="cn('relative', className ?? '')">
    <i class="material-icons absolute left-2.5 top-2 text-muted-foreground">search</i>
    <input type="text" v-model="modelValue" v-bind="rest" class="flex h-10 w-full rounded-md border border-input bg-background \
    px-3 pl-10 pr-2 text-sm ring-offset-background \
    placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 \
    focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
    " />
  </div>
</template>

<style>
/*
flex h-10 w-full rounded-md border border-input bg-background \
px-3 py-2 text-sm ring-offset-background 
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 
focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50

*/
</style>