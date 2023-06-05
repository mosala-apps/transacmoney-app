<template>
  <sharedAdminContainer :subMenus="subMenus">
    <div class="pa-12">
      <shared-admin-data-table
        :data="users"
        :headers="headers"
        titleSection="Liste des utilisateurs"
        :entityToCrud="entityToCrud"
        :formFields="formFields"
        @handleSubmit="handleSubmit"
      />
    </div>
  </sharedAdminContainer>
</template>
<script lang="ts" setup>
import { FormType } from '~/types/form.type';
import { IEntityCrud } from '~/types/user.interface';
import {API_URL} from '~/config/ApiURL'

let  reload = ref(false);
const { data:users, error, execute, refresh } = await useFetch(`${API_URL}/users`,{
  watch:[reload]
})
const validate = useFormRules()

let entityToCrud: IEntityCrud = reactive({
  name: "user",
  formTitle: "Créer un utilisateur",
  btnTitle: "Enregistrer",
})
const formFields:FormType[] = reactive<FormType[]>([
  {
    name: "username",
    type: "text",
    id: "name",
    label: "Nom de l'utilisateur",
    rules: [validate.required]
  },
  {
    name: "email",
    type: "select",
    id: "email",
    label: "Email",
    rules: [validate.required, validate.email]
  },
  {
    name: "password",
    type: "text",
    id: "location",
    label: "Mot de passe",
    rules: [validate.required]
  },
]);
const subMenus = reactive([
  {
    name: "Agents",
  },
  {
    name: "Sous-Agents",
    path: "/admin/agencies/sub-agencies",
  },
]);
definePageMeta({
  layout: "admin",
});
const headers = reactive([
  {
    title: "Nom",
    align: "start",
    sortable: false,
    key: "username",
  },
  {
    title: "Email",
    align: "start",
    sortable: false,
    key: "email",
  },
  { title: "Agence", align: "end", key: "agency.name" },
  { title: "Adresse", align: "end", key: "address" },
  { title: "actions", align: "end", key: "actions" },
]);
const handleSubmit =(value:any)=>{
  reload.value = true;
}
</script>
