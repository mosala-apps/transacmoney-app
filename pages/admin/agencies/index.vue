
<script lang="ts" setup>
import { FormType } from '~/types/form.type';
import { IEntityCrud } from '~/types/user.interface';
import {API_URL} from '~/config/ApiURL'
import { useACLRole } from '~/composables/aclRole';
import { useAgencyStore } from '~/store/agencies';
let  reload = ref(false);
const { data, error, execute, refresh } = await useFetch(`${API_URL}/agency`,{
  watch:[reload]
})
const { agencies, getAllAgencies} = useAgencyStore()
const validate = useFormRules();

definePageMeta({
  layout: "admin",
  middleware:'admin'
});
let entityToCrud: IEntityCrud = reactive({
  name: "Agency",
  formTitle: "Créer une agence",
  btnTitle: "Enregistrer",
})
const formFields:FormType[] = reactive<FormType[]>([
  {
    name: "name",
    type: "text",
    id: "name",
    label: "Nom de l'agence",
    rules: [validate.required]
  },
  {
    name: "email",
    type: "email",
    id: "email",
    label: "Email de l'agence",
    rules: [validate.required, validate.email]
  },
  {
    name: "phone",
    type: "text",
    id: "phone",
    label: "Telephone de l'agence",
    rules: [validate.required]
  },
  {
    name: "address",
    type: "text",
    id: "location",
    label: "Lieu",
    rules: [validate.required]
  },
  {
    name: "location",
    type: "text",
    id: "location",
    label: "Ville",
    rules: [validate.required]
  },
]);

const subMenus = reactive([
  {
    name: "Agences",
    path: "/admin/agencies",
  },
  {
    name: "Sous-Agences",
    path: "/admin/agencies/sub-agencies",
  },
]);

const headers = reactive([
  {
    title: "Nom",
    align: "start",
    sortable: false,
    key: "name",
  },
  { title: "solde", align: "end", key: "balance" },
  { title: "Responsable", align: "end", key: "users" },
  { title: "Adresse", align: "end", key: "address" },
  { title: "actions", align: "end", key: "actions" },
]);

const handleSubmit =(value:any)=>{
  reload.value = true;
}
</script>

<template>
  <sharedAdminContainer :subMenus="subMenus">
    <div>
      <shared-admin-data-table
        :data="data"
        :headers="headers"
        titleSection="Liste des Agences"
        :entityToCrud="entityToCrud"
        :formFields="formFields"
        @handleSubmit="handleSubmit"
      />
    </div>
  </sharedAdminContainer>
</template>
