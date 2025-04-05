<script lang="ts" setup>
import { FormType } from "~/types/form.type";
import { IEntityCrud } from "~/types/user.interface";
import { API_URL } from "~/config/ApiURL";
import { useTransactionStore } from "~/store/transaction";
import { storeToRefs } from "pinia";

const route = useRoute();
let reload = ref(false);
let isLoading = ref(false);

const { getAllTransactions } = useTransactionStore();
const { transactions, error } = storeToRefs(useTransactionStore());
const { data: users } = await useFetch(`${API_URL}/users`, {
  key: "users2-key",
  immediate: true,
});
const validate = useFormRules();

definePageMeta({
  layout: "admin",
  middleware: "admin",
});
let entityToCrud: IEntityCrud = reactive({
  name: "Operation",
  formTitle: "Créer une nouvelle operation",
  btnTitle: "Rafraichir",
});
const formFields: FormType[] = reactive<FormType[] | any[]>([
  {
    name: "name",
    type: "text",
    id: "name",
    label: "Libelle",
    rules: [validate.required],
  },

  {
    name: "operationTypeId",
    type: "select",
    id: "phone",
    label: "Types Operation",
    itemValue: "id",
    itemTitle: "name",
    rules: [validate.required],
    values: [
      {
        id: "DEPOSIT",
        name: "Depot",
      },
      {
        id: "WITHDRAWAL",
        name: "Transfert",
      },
    ],
  },
  {
    name: "agencyId",
    type: "select",
    id: "agencyId",
    label: "Agence Beneficiaire",
    itemValue: "id",
    itemTitle: "name",
    rules: [validate.required],
    values: [],
  },
  {
    name: "recipients",
    type: "select",
    id: "phone",
    label: "Beneficiaire",
    itemValue: "id",
    itemTitle: "name",
    rules: [validate.required],
    values: users,
  },
  {
    name: "expeditor",
    type: "select",
    id: "phone",
    label: "Expediteur",
    itemValue: "id",
    itemTitle: "name",
    rules: [validate.required],
    values: users,
  },
  {
    name: "amount",
    type: "text",
    id: "amount",
    label: "Montant",
    rules: [validate.required, validate.numbers],
  },
]);

const headers = reactive([
  {
    title: "Montant",
    align: "start",
    sortable: false,
    key: "amountWithCommission",
  },
  {
    title: "Frais",
    align: "start",
    sortable: false,
    key: "commission",
  },
  { title: "Devise", align: "end", key: "currency.name" },
  { title: "type", align: "end", key: "type" },
  { title: "Expediteur", align: "end", key: "sender.fullName" },
  { title: "Beneficiaire", align: "end", key: "receiver.fullName" },
  { title: "Origine", align: "end", key: "originCity.name" },
  { title: "Destination", align: "end", key: "destinationCity.name" },
  { title: "Statut", align: "end", key: "status" },
  { title: "Date", align: "end", key: "updatedAt" },
  { title: "actions", align: "end", key: "actions" },
]);

const fetchData = async () => {
  isLoading.value = true;
  try {
    await Promise.all([getAllTransactions()]);
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
  } finally {
    isLoading.value = false;
  }
};

const handleSubmit = async () => {
  reload.value = true;
  isLoading.value = true;
  await getAllTransactions();
  isLoading.value = false;
};

onMounted(fetchData);

watch(() => route.fullPath, fetchData);
</script>

<template>
  <sharedAdminContainer :showSubMenus="false">
    <div v-if="isLoading" class="pa-6">
      <div class="skeleton-container">
        <div class="skeleton-header"></div>
        <div class="skeleton-row" v-for="i in 14" :key="i"></div>
      </div>
    </div>
    <div v-else>
      <admin-transactions-data-table
        :showMenus="false"
        :data="transactions"
        :headers="headers"
        titleSection="Liste des operations"
        :entityToCrud="entityToCrud"
        :formFields="formFields"
        @handleSubmit="handleSubmit"
      />
    </div>
  </sharedAdminContainer>
</template>
