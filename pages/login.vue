<template>
  <div class="grid grid-cols-2 h-full">
    <div>
      <img
        src="https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyMDd9&s=ce40ce8b8ba365e5e6d06401e5485390"
        alt="turntable" class="rounded-r-3xl h-full w-full object-cover">
    </div>
    <div class="flex flex-col justify-center items-center">
      <Card class="w-3/4">
        <CardHeader>
          <img src="https://singlecolorimage.com/get/33fd8f/300x175" alt="green" class="logo">
          <div class="my-4">
            <p class="text-center">Welcome, please login to your account</p>
          </div>
        </CardHeader>
        <CardContent>
          <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ meta: form }">
            <FormField v-slot="{ componentField }" name="email">
              <FormItem class="mb-4">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your Email" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="password">
              <FormItem class="mb-4">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your Password" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <div class="flex flex-1 flex-col items-center">
              <p class="my-2" v-if="loading">Loading</p>
              <p class="my-2 text-destructive" v-else-if="errorMessage">{{ errorMessage }}</p>
              <Button type="submit" id="submit" :disabled="!form.valid">
                Login
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
      <p class="mt-5">
        Don't have an account? <NuxtLink to="/register" class="text-red-900">Register</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { Form } from 'vee-validate';
import * as yup from 'yup';

const config = useRuntimeConfig()
const authStore = useAuthStore();
const loading = ref(false);
const errorMessage = ref('');

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});


async function onSubmit(values) {
  // fetch data from backend

  errorMessage.value = '';
  loading.value = true;
  const { data, pending, error } = await useFetch(
    '/api/login',
    {
      method: 'post', body: values, baseURL: config.public.apiBase
    }
  )
  loading.value = false;
  if (!pending.value && !error.value) {
    const { user, token } = data.value;
    authStore.logIn(user, token);
    await navigateTo('/dashboard')
  } else {
    if (error.value.data) {
      errorMessage.value = error.value.data.message
    } else {
      errorMessage.value = "Error"
    }
  }
}
</script>

<style scoped>
.logo {
  align-self: center;
  height: 175px;
  width: 300px;
  object-fit: cover;
}
</style>