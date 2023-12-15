<template>
  <div>
  </div>
</template>

<script setup>
const authStore = useAuthStore();

if (authStore.isAuthenticated) {
  await navigateTo('/dashboard')
}else{
  await navigateTo('/login')
}
</script>

