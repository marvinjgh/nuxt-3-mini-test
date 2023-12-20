<template>
  <div class="h-full w-full flex">
    <Toaster />
    <nav class="h-full bg-red-100 w-56 flex flex-col">
      <div class="flex flex-col py-4 items-center">
        <div class="rounded-full ring-2 ring-white p-1 h-[72px] w-[72px]">
          <Avatar size="base">
            <AvatarImage :src="user ? user.avatar : ''" alt="user avatar" />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
        </div>
        <p class="font-bold mt-2">{{ user ? user.fullName : '' }}</p>
        <p>@{{ user ? user.username : '' }}</p>
      </div>
      <NuxtLink to="/dashboard" active-class="bg-primary text-white" class="flex h-12 items-center">
        <i class="material-icons mx-4 text-green-800" aria-hidden="true">home</i>
        <p class="flex-1">
          Home
        </p>
      </NuxtLink>
      <NuxtLink to="/dashboard/search" active-class="bg-primary text-white" class="flex h-12 items-center">
        <i class="material-icons mx-4 text-green-800" aria-hidden="true">search</i>
        <p class="flex-1">
          Search Images
        </p>
      </NuxtLink>
      <NuxtLink to="/dashboard/saved" active-class="bg-primary text-white" class="flex h-12 items-center">
        <i class="material-icons mx-4 text-green-800" aria-hidden="true">bookmark</i>
        <p class="flex-1">
          Saved Images
        </p>
      </NuxtLink>
      <div>
        <NuxtLink to="/dashboard/shared" active-class="bg-primary text-white" class="flex h-12 items-center">
          <i class="material-icons mx-4 text-green-800" aria-hidden="true">share</i>
          <p class="flex-1">
            Shared with me
          </p>
        </NuxtLink>
      </div>
      <NuxtLink to="/dashboard/people" active-class="bg-primary text-white" class="flex h-12 items-center">
        <i class="material-icons mx-4 text-green-800" aria-hidden="true">person</i>
        <p class="flex-1">
          People
        </p>
      </NuxtLink>
      <div class="flex flex-1 items-end">
        <NuxtLink to="#" class="flex h-12 items-center" @click="logout">
          <i class="material-icons mx-4" aria-hidden="true">logout</i>
          <p class="flex-1">
            Logout
          </p>
        </NuxtLink>
      </div>
    </nav>
    <div class="flex-1">
      <div class="flex w-full h-16 bg-primary pl-4 items-center drop-shadow-lg">
        <img src="https://singlecolorimage.com/get/33fd8f/300x48" alt="green" class="logo">

      </div>
      <div class="p-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>

// TODO find how to fix error 500 when restart the server, and localstorage has data.

const authStore = useAuthStore();

if (!authStore.isAuthenticated) {
  await navigateTo('/login')
}

const { user } = authStore;

async function logout() {
  authStore.logOut()
  await navigateTo('/login')
}
</script>

<style global></style>

<style scoped></style>