<script lang="ts" setup>
import { FormType } from "~/types/form.type";
import { IEntityCrud } from "~/types/user.interface";
import { API_URL } from "~/config/ApiURL";
import { useTransactionStore } from "~/store/transaction";
import { storeToRefs } from "pinia";


const route = useRoute();
let reload = ref(false);
const {getAllTransactions} = useTransactionStore()
const {transactions,isLoading, error} = storeToRefs(useTransactionStore())
const { data: users } = await useFetch(`${API_URL}/users`);
const validate = useFormRules();

definePageMeta({
  layout: "admin",
  middleware: "admin",
});
let entityToCrud: IEntityCrud = reactive({
  name: "Operation",
  formTitle: "Créer une nouvelle operation",
  btnTitle: "Enregistrer",
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
    key: "amount",
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

onMounted( async ()=>{
  await getAllTransactions(reload.value)
})
watch(() => route.fullPath, async () => {
  reload.value = true;
  await getAllTransactions(reload.value)
});
const handleSubmit = (value: any) => {
  reload.value = true;
};
</script>

<template>
  <sharedAdminContainer :showSubMenus="false">
    <div>
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
