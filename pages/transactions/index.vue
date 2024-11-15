<script lang="ts" setup>
import { FormType } from "~/types/form.type";
import { IEntityCrud } from "~/types/user.interface";
import { API_URL } from "~/config/ApiURL";
import { useACLRole } from "~/composables/aclRole";
import { useAgencyStore } from "~/store/agencies";
let reload = ref(false);
const { data:agencies, error, execute, refresh } = await useFetch(`${API_URL}/agency`, {
  watch: [reload],
});
const {
  data: users,
} = await useFetch(`${API_URL}/users`);

// const { agencies, getAllAgencies } = useAgencyStore();
const validate = useFormRules();

definePageMeta({
  layout: "admin",
});
let entityToCrud: IEntityCrud = reactive({
  name: "Operation",
  formTitle: "Créer une nouvelle operation",
  btnTitle: "Enregistrer",
});
const formFields: FormType[] = reactive<FormType[]>([
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
    itemValue:'id',
    itemTitle:'name',
    rules: [validate.required],
    values: [
      {
        id: 'DEPOSIT',
        name: "Depot",
      },
      {
        id: 'TRANSFER_TO',
        name: "Transfert",
      },
    ],
  },
  {
    name: "agencyId",
    type: "select",
    id: "agencyId",
    label: "Agence Beneficiaire",
    itemValue:'id',
    itemTitle:'name',
    rules: [validate.required],
    values: agencies,
  },
  {
    name: "recipients",
    type: "select",
    id: "phone",
    label: "Beneficiaire",
    itemValue:'id',
    itemTitle:'username',
    rules: [validate.required],
    values: users,
  },
  {
    name: "expeditor",
    type: "select",
    id: "phone",
    label: "Expediteur",
    itemValue:'id',
    itemTitle:'username',
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
    title: "Nom",
    align: "start",
    sortable: false,
    key: "name",
  },
  { title: "type", align: "end", key: "type" },
  { title: "Expediteur", align: "end", key: "expeditor" },
  { title: "Beneficiaire", align: "end", key: "recipient" },
  { title: "Statut", align: "end", key: "status" },
  { title: "Date operation", align: "end", key: "operationDate" },
  { title: "actions", align: "end", key: "actions" },
]);

const handleSubmit = (value: any) => {
  reload.value = true;
};
</script>

<template>
  <sharedAdminContainer :showSubMenus="false">
    <div>
      <shared-admin-transactions-data-table
        :showMenus="false"
        :data="[
          {
            type: 'Depot',
            experitor: 'rkota',
            recepient: 'Ngoy',
            operationDate: '28/06/2023',
          },
          {
            type: 'Depot',
            experitor: 'rkota',
            recepient: 'Ngoy',
            operationDate: '28/07/2023',
          },
          {
            type: 'Retrait',
            experitor: 'rkota',
            recepient: 'Ngoy',
            operationDate: '30/06/2023',
          },
          {
            type: 'Depot',
            experitor: 'rkota',
            recepient: 'Ngoy',
            operationDate: '28/36/2023',
          },
        ]"
        :headers="headers"
        titleSection="Liste des operations"
        :entityToCrud="entityToCrud"
        :formFields="formFields"
        @handleSubmit="handleSubmit"
      />
    </div>
  </sharedAdminContainer>
</template>
