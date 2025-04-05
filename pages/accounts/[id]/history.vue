<template>
  <sharedAdminContainer :showSubMenus="false">
    <div v-if="loadingAccountHistory" class="pa-6">
      <div class="skeleton-container">
        <div class="skeleton-header"></div>
        <div class="skeleton-row" v-for="i in 14" :key="i"></div>
      </div>
    </div>
    <accounts-account-history-list
      v-else
      :showMenus="false"
      :data="accountHistory"
      :headers="headers"
      :titleSection="titleSection"
    />
  </sharedAdminContainer>
</template>

<script lang="ts" setup>
import { useTransactionStore } from "~/store/transaction";
import { storeToRefs } from "pinia";
import { useAccountStore } from "~/store/accountStore";

const route = useRoute();
let reload = ref(false);
let isLoading = ref(true);

const { getAccountHistory } = useAccountStore();
const { loadingAccountHistory, accountHistory } = storeToRefs(useAccountStore());

const validate = useFormRules();

definePageMeta({
  title: "Gestion des comptes",
  meta: [
    {
      name: "description",
      content: "Historique des comptes de l'agence",
    },
  ],
  layout: "admin",
});

const headers = reactive([
  { title: "Montant", align: "start", key: "amount" },
  { title: "Devise", align: "end", key: "account.currency.name" },
  { title: "Libelle", align: "end", key: "label" },
  { title: "Date", align: "end", key: "createdAt" },
  //{ title: "Actions", align: "end", key: "actions" },
]);
let titleSection = ref<string>("Historique du compte");

const fetchData = async () => {
  isLoading.value = true;
  try {
    await getAccountHistory(route.params.id!);
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
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton-header {
  height: 30px;
  background: #ddd;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

.skeleton-row {
  height: 20px;
  background: #eee;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>