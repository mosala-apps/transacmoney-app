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

const { getAgencyTransactionsByType } = useTransactionStore();
const { deposits } = storeToRefs(useTransactionStore());
const { users, getAllUsers } = useUsersStore();
const { currencies, getAllCurrencies } = useCurrencyStore();
const { cities, getAllCities } = useCityStore();

const validate = useFormRules();

definePageMeta({ layout: "admin" });

let entityToCrud: IEntityCrud = reactive({
  name: "Operation",
  formTitle: "Effectuer un nouveau dépot",
  btnTitle: "Enregistrer",
});

const formFields: FormType[] = reactive([
  {
    name: "destinationType",
    type: "select",
    id: "destinationType",
    label: "Type de transfert",
    itemValue: "id",
    itemTitle: "name",
    rules: [validate.required],
    values: [
      { id: DestinationTypeEnum.LOCAL, name: "Locale" },
      { id: DestinationTypeEnum.INTERNATIONAL, name: "Internationale" },
    ],
  },
  {
    name: "amount",
    type: "number",
    id: "amount",
    label: "Montant",
    rules: [validate.required, validate.numbers],
  },
  {
    name: "currencyId",
    type: "select",
    id: "currencyId",
    label: "Devise",
    itemValue: "id",
    itemTitle: "name",
    rules: [validate.required],
    values: currencies,
  },
{
    name: "commission",
    type: "text",
    id: "amount",
    label: "Frais de la commission",
    readonly: true,
    disabled: true,
    rules: [],
  },
  {
    name: "amountWithCommission",
    type: "text",
    id: "amount",
    label: "Montant Avec commission",
    readonly: true,
    disabled: true,
    rules: [],
  },
  {
    name: "senderId",
    type: "select",
    id: "phone",
    label: "Expéditeur",
    itemValue: "id",
    itemTitle: "userSearchTerm",
    rules: [validate.required],
    values: users,
  },
  {
    name: "receiverId",
    type: "select",
    id: "phone",
    label: "Bénéficiaire",
    itemValue: "id",
    itemTitle: "userSearchTerm",
    rules: [validate.required],
    values: users,
  },
  {
    name: "destinationCityId",
    type: "select",
    id: "destinationCityId",
    label: "Ville de destination",
    itemValue: "id",
    itemTitle: "name",
    rules: [validate.required],
    values: cities,
  },
]);

const headers = reactive([
  { title: "Montant", align: "start", key: "amount" },
  { title: "Code", align: "end", key: "transactionCode" },
  { title: "Devise", align: "end", key: "currency.name" },
  { title: "Expéditeur", align: "end", key: "sender.fullName" },
  { title: "Bénéficiaire", align: "end", key: "receiver.fullName" },
  { title: "Origine", align: "end", key: "originCity.name" },
  { title: "Destination", align: "end", key: "destinationCity.name" },
  { title: "Statut", align: "end", key: "status" },
  { title: "Date", align: "end", key: "updatedAt" },
  { title: "Actions", align: "end", key: "actions" },
]);

const fetchData = async () => {
  isLoading.value = true;
  try {
    await Promise.all([getAllUsers(), getAllCurrencies(), getAllCities()]);
    await getAgencyTransactionsByType(TransactionEnum.DEPOSIT, reload.value);
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
  } finally {
    isLoading.value = false;
  }
};

const handleSubmit = async () => {
  reload.value = true;
  isLoading.value = true;
  await getAgencyTransactionsByType(TransactionEnum.DEPOSIT, reload.value);
  isLoading.value = false;
};

onMounted(fetchData);

watch(() => route.fullPath, fetchData);
</script>

<template>
  <sharedAdminContainer :showSubMenus="false">
  <div  v-if="isLoading" class="pa-6">

      <div class="skeleton-container">
        <div class="skeleton-header"></div>
        <div class="skeleton-row" v-for="i in 14" :key="i"></div>
      </div>

  </div>

    <transactions-data-table
      v-else
      :showMenus="false"
      :data="deposits"
      :headers="headers"
      :type="TransactionEnum.DEPOSIT"
      titleSection="Liste des opérations"
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