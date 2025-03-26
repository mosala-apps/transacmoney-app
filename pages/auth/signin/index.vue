<template>
  <v-main
    no-gutters
    style="background-color: aliceblue; height: 100%"
    class="d-flex justify-content-center"
  >
    <VRow no-gutters align="center" justify="center">
      <VCol cols="12" md="3" style="background-color: white" class="pa-6 rounded-xl">
        <div v-show="isError">{{ error }}</div>
        <h1 class="text-center">Se Connecter</h1>
        <p class="text-medium-emphasis text-center">Saisissez vos coordonnées pour commencer</p>

        <v-form 
        @submit.prevent="loginUser" 
        class="mt-7" 
        type="POST"
        v-model="isValid"
         >
          <div class="mt-1">
            <label class="label text-grey-darken-2" for="email">Username ou Email ou Téléphone</label>
            <VTextField
              :rules="[validate.required, validate.validateIdentifier]"
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
              :disabled="!isValid"
              :loading="isAuthenticating"
              >Se connecter</VBtn
            >
          </div>
        </v-form>
      
        <p class="text-body-2 mt-4">
          <span
            >Mot de passe oublié?
            <NuxtLink to="/auth/reset-password" class="font-weight-bold text-primary"
              >Reinitialiser</NuxtLink
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
const { login} = useAuthStore();
const { isAuthenticated,statusCode,error } = storeToRefs(useAuthStore());
let isAuthenticating = ref(false);
let isError= ref(false);
let isValid = ref(false);
const router = useRouter();
const user = reactive({});

watch(isValid,(newValue)=>{
  if (newValue) {
    isAuthenticating.value = false;
  }
})
const loginUser = async () => {
  try {
    isAuthenticating.value = true;
    await login(form);
    if (isAuthenticated.value) {
      router.push("/admin");
    }
    else if(statusCode.value !== 200){
      toast.error(error,{
      // delay:3000
      });
    }
    isAuthenticating.value = false;
  } catch (error) {
    console.log(error)
    toast.error("");
  }
};

const submit = async () => {};
definePageMeta({
    // middleware: 'auth'
})
</script>
