<script lang="ts" setup>
import { FormType } from "~/types/form.type";
import { ITransaction } from "~/types/transaction.interface";
import { IEntityCrud } from "~/types/user.interface";
import { API_URL } from "~/config/ApiURL";
import { useACLRole } from "~/composables/aclRole";
import { useAgencyStore } from "~/store/agencies";
import { useAuthStore } from "~/store/auth";
import { DestinationTypeEnum, StatusTransaction, TransactionEnum } from "~/types/transaction.enum";
import { useUsersStore } from "~/store/users";
import { useTransactionStore } from "~/store/transaction";
import { useCurrencyStore } from "~/store/currency";
import { useCityStore } from "~/store/cities";
import { storeToRefs } from "pinia";

const route = useRoute();
let reload = ref(false);
let isLoading = ref(true);

const { getCommissionsByAgencyId } = useTransactionStore();
const { loadingCommissionsAgencyId, commissionsByAgencyId } = storeToRefs(useTransactionStore());

const validate = useFormRules();

definePageMeta({ layout: "admin" });

let entityToCrud: IEntityCrud = reactive({
  name: "Operation",
  formTitle: "Effectuer un nouveau dépot",
  btnTitle: "Enregistrer",
});


const headers = reactive([
  { title: "Montant", align: "start", key: "amount" },
  { title: "Devise", align: "end", key: "currency.name" },
  { title: "Statut", align: "end", key: "isPaid" },
  { title: "Date", align: "end", key: "createdAt" },
  //{ title: "Actions", align: "end", key: "actions" },
]);


const fetchData = async () => {
  isLoading.value = true;
  try {
    await getCommissionsByAgencyId();
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
  } finally {
    isLoading.value = false;
  }
};

const handleSubmit = async () => {
  reload.value = true;
  isLoading.value = true;
  await getCommissionsByAgencyId()
  isLoading.value = false;
};

onMounted(fetchData);

watch(() => route.fullPath, fetchData);
</script>

<template>
  <sharedAdminContainer :showSubMenus="false">
  <div  v-if="loadingCommissionsAgencyId" class="pa-6">

      <div class="skeleton-container">
        <div class="skeleton-header"></div>
        <div class="skeleton-row" v-for="i in 14" :key="i"></div>
      </div>

  </div>

    <transactions-commissions-commission-list
      v-else
      :showMenus="false"
      :data="commissionsByAgencyId"
      :headers="headers"
      :type="TransactionEnum.DEPOSIT"
      titleSection="Mes commissions"
      :entityToCrud="entityToCrud"
      :formFields="formFields"
      @handleSubmit="handleSubmit"
    />
  </sharedAdminContainer>
</template>

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
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>