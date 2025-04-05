<template>
  <sharedAdminContainer :showSubMenus="false">
    <!-- Header -->
    <div class="d-flex flex-column flex-sm-row justify-space-between pa-12">
      <h2 class="text-slate">Gestion des comptes</h2>
      <v-btn color="primary" @click="loadAccounts" >
        <v-icon left>mdi-refresh</v-icon> Rafraîchir
      </v-btn>
    </div>

    <!-- Skeleton de chargement -->
    <div v-if="isLoading" class="skeleton-container">
      <div class="skeleton-header"></div>
      <div v-for="i in 4" :key="i" class="skeleton-row"></div>
    </div>

    <!-- Liste des comptes -->
   <accounts-list-view
      v-else
      :accounts="accounts"
      @handleSubmit="handleSubmit"
    />

  </sharedAdminContainer>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAccountStore } from "~/store/accountStore";

const {  getAccountsByAgency: loadAccounts } = useAccountStore();
const route = useRoute();
let isLoading = ref(false);
const { accounts, loading } = storeToRefs(useAccountStore());

definePageMeta({
  title: "Gestion des comptes",
  meta: [
    {
      name: "description",
      content: "Gestion des comptes de l'agence",
    },
  ],
  layout: "admin",
});

const fetchData = async () => {
  isLoading.value = true;
  try {
    await  loadAccounts();
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchData);

watch(() => route.fullPath, fetchData);

</script>

<style scoped>
.skeleton-container {
  padding: 20px;
}

.skeleton-header {
  height: 40px;
  background-color: #e0e0e0;
  margin-bottom: 10px;
  border-radius: 4px;
}

.skeleton-row {
  height: 150px;
  background-color: #e0e0e0;
  margin-bottom: 10px;
  border-radius: 4px;
}
</style>
