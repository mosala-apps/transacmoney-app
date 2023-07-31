<template>
  <v-main
    no-gutters
    style="background-color: aliceblue; height: 100%"
    class="d-flex justify-content-center"
  >
    <VRow no-gutters align="center" justify="center">
      <VCol cols="12" md="3" style="background-color: white" class="pa-6 rounded-xl">
        <div v-show="isError">erurrr</div>
        <h1 class="text-center">Se Connecter</h1>
        <p class="text-medium-emphasis text-center">Saisissez vos coordonnées pour commencer</p>

        <v-form @submit.prevent="loginUser" class="mt-7">
          <div class="mt-1">
            <label class="label text-grey-darken-2" for="email">Email</label>
            <VTextField
              :rules="[validate.required, validate.email]"
              v-model="form.identifier"
              prepend-inner-icon="fluent:mail-24-regular"
              id="email"
              name="email"
              type="email"
            />
          </div>
          <div class="mt-1">
            <label class="label text-grey-darken-2" for="password">Mot de passe</label>
            <VTextField
              :rules="[validate.required]"
              v-model="form.password"
              prepend-inner-icon="fluent:password-20-regular"
              id="password"
              name="password"
              type="password"
            />
          </div>
          <div class="mt-5">
            <VBtn
              type="submit"
              block
              min-height="44"
              class="gradient primary"
              :disabled="isError"
              :loading="isAuthenticating"
              >Se connecter</VBtn
            >
          </div>
        </v-form>
        <p class="text-body-2 mt-10">
          <NuxtLink to="/reset-password" class="font-weight-bold text-primary"
            >Mot de passe oublié?</NuxtLink
          >
        </p>
        <p class="text-body-2 mt-4">
          <span
            >Vous n'avez pas de compte ?
            <NuxtLink to="/signup" class="font-weight-bold text-primary"
              >Inscrivez-vous</NuxtLink
            ></span
          >
        </p>
      </VCol>
    </VRow>
  </v-main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
 const toast = useToast()
let form = reactive({});

const validate = useFormRules();
const { login ,error} = useAuthStore();
const { isAuthenticated } = storeToRefs(useAuthStore());
let isAuthenticating = ref(false);
let isError= ref(false);
const router = useRouter();
const user = reactive({});

const loginUser = async () => {
  try {
    isAuthenticating.value = true;
    await login(form);
    if (isAuthenticated) {
      isAuthenticating.value = false;
      router.push("/admin");
    }
  } catch (error) {
    toast.error("Oups! une erreur s'est produite");
  }
};

const submit = async () => {};
definePageMeta({
    // middleware: 'auth'
})
</script>
