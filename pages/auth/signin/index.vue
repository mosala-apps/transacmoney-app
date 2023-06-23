<template>
  <v-main no-gutters>
    <VRow>
      <VCol class="hidden-md-and-down fill-height" md="6" lg="6">
        <VImg src="/images/hiro.jpeg" cover class="d-flex align-center justify-center" width="100%">
          <div class="text-center w-50 text-white mx-auto">
            <h2 class="mb-4">Start your journey today</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores, inventore quia.
              Dolorum dolores ad ipsum voluptatum rem, hic placeat, odio, odit numquam quod
              veritatis accusantium assumenda! Sequi, provident in! Iure!
            </p>
          </div>
        </VImg>
      </VCol>
      <VCol cols="12" md="6" lg="6" sm="6" align-self="center">
        <VRow no-gutters align="center" justify="center">
          {{ JSON.stringify(status) }}
          <VCol cols="12" md="6">
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
                <VBtn type="submit" block min-height="44" class="gradient primary"
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
      </VCol>
    </VRow>
  </v-main>
</template>

<script setup>
let form = reactive({});

const validate = useFormRules();
const { status, data, signIn, signOut } = useAuth();

const loginUser = async () => {
  try {
    await signIn(form);
    navigateTo("/admin");
  } catch (error) {
    console.log(error);
  }
};

const submit = async () => {};
</script>
