<template>
  <div class="grid grid-cols-2 h-full">
    <div>
      <img
        src="https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyMDd9&s=ce40ce8b8ba365e5e6d06401e5485390"
        alt="turntable" class="rounded-r-3xl h-full w-full object-cover">
    </div>
    <div class="flex flex-col justify-center items-center">
      <Card class="w-3/4 min-w-min">
        <CardHeader>
          <img src="https://singlecolorimage.com/get/33fd8f/300x175" alt="green" class="logo">
          <div class="my-4">
            <p class="text-center">Welcome, please register for an account</p>
          </div>
        </CardHeader>
        <CardContent>
          <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ meta: form }">
            <div class="grid grid-cols-2 gap-4">
              <FormField v-slot="{ componentField }" name="firstName">
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter your first name" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="lastName">
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter your last name" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="username">
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter your Username" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your Email" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <div class="col-span-2">
                <FormField v-slot="{ componentField }" name="password">
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your Password" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>
              <div class="col-span-2 flex justify-center">
                <FormField v-slot="{ componentField }" name="avatar" v-model="avaterSel">
                  <FormItem>
                    <FormLabel class="text-center">Select your avatar</FormLabel>
                    <FormControl>
                      <Input type="hidden" placeholder="Enter your avatar" v-bind="componentField" />
                      <div class="mt-2 flex gap-x-4 h-[72px]">
                        <div class="rounded-full ring-2 p-1" v-for="avatar in avatars" :key="avatar.id"
                          :class="[avaterSel === avatar.id ? 'ring-amber-600' : 'ring-transparent']"
                          @click="avaterSel = avaterSel === avatar.id ? '' : avatar.id">
                          <Avatar size="base">
                            <AvatarImage :src="avatar.src" :alt="avatar.des" />
                            <AvatarFallback>{{ avatar.fb }}</AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage class="text-center" />
                  </FormItem>
                </FormField>
              </div>
              <div class="col-span-2 flex flex-1 flex-col items-center">
                <p class="my-2" v-if="loading">Loading</p>
                <p class="my-2 text-destructive" v-else-if="errorMessage">{{ errorMessage }}</p>
                <Button type="submit" id="submit" :disabled="!form.valid">
                  Sign Up
                </Button>
              </div>
            </div>
          </Form>
        </CardContent>
      </Card>
      <div class="card rounded-lg w-3/4 shadow-lg">

      </div>
      <p class="mt-5">
        Already have an account? <NuxtLink to="/login" class="text-red-900">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { Form } from 'vee-validate';
import * as yup from 'yup';

const config = useRuntimeConfig()
const authStore = useAuthStore();
const avaterSel = useState('avaterSel', () => '')
const loading = useState('loading', () => false);
const errorMessage = useState('errorMessage', () => null);

const schema = yup.object({
  // TODO add regex to check firstName, lastName, username
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
  avatar: yup.string().required(),
});


const avatars = [
  {
    id: '1',
    src: 'https://singlecolorimage.com/get/EFA94A/64x64',
    des: 'color Pastel yellow',
    fb: 'PW',
  },
  {
    id: '2',
    src: 'https://singlecolorimage.com/get/B5B8B1/64x64',
    des: 'color Agate grey',
    fb: 'AG',
  },
  {
    id: '3',
    src: 'https://singlecolorimage.com/get/2F4538/64x64',
    des: 'color Moss green',
    fb: 'MG',
  },
  {
    id: '4',
    src: 'https://singlecolorimage.com/get/FF2301/64x64',
    des: 'color Luminous orange',
    fb: 'LO'
  },
]

async function onSubmit(values) {

  // fetch data from backend
  // TODO apply md5 to password

  errorMessage.value = null;
  loading.value = true;
  const { data, pending, error } = await useFetch(
    '/api/register',
    {
      method: 'post', body: values, baseURL: config.public.apiBase
    }
  )
  loading.value = false;
  if (!pending && !error) {
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

<script>

</script>

<style scoped>
.logo {
  align-self: center;
  height: 175px;
  width: 300px;
  object-fit: cover;
}
</style>