<script lang="ts" setup>
import { FormType } from "~/types/form.type";
import { IEntityCrud } from "~/types/user.interface";
import { API_URL } from "~/config/ApiURL";
import { useACLRole } from "~/composables/aclRole";
import { useAgencyStore } from "~/store/agencies";
let reload = ref(false);
const { data, error, execute, refresh } = await useFetch(`${API_URL}/agency`, {
  watch: [reload],
});
const { agencies, getAllAgencies } = useAgencyStore();
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
    name: "Libelle",
    type: "text",
    id: "name",
    label: "Nom de l'agence",
    rules: [validate.required],
  },
 
  {
    name: "Type Operation",
    type: "text",
    id: "phone",
    label: "Type Operation",
    rules: [validate.required],
  },
  {
    name: "address",
    type: "text",
    id: "location",
    label: "Lieu",
    rules: [validate.required],
  },
  {
    name: "location",
    type: "text",
    id: "location",
    label: "Ville",
    rules: [validate.required],
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
      <shared-admin-data-table
        :data="[
          {
            type:'Depot',
            experitor:'rkota',recepient:'Ngoy',
            operationDate:'28/06/2023'
          },
          {
            type:'Depot',
            experitor:'rkota',recepient:'Ngoy',
            operationDate:'28/07/2023'
          },
          {
            type:'Retrait',
            experitor:'rkota',recepient:'Ngoy',
            operationDate:'30/06/2023'
          },
          {
            type:'Depot',
            experitor:'rkota',recepient:'Ngoy',
            operationDate:'28/36/2023'
          }
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
