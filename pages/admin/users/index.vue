<template>
  <sharedAdminContainer :subMenus="subMenus">
    <div class="pa-12">
      <shared-admin-data-table
        :data="users"
        :headers="headers"
        titleSection="Liste des utilisateurs"
        :entityToCrud="entityToCrud"
        :formFields="formFields"
      />
    </div>
  </sharedAdminContainer>
</template>
<script lang="ts" setup>
import { FormType } from '~/types/form.type';
import { IEntityCrud } from '~/types/user.interface';
const validate = useFormRules()

let entityToCrud: IEntityCrud = reactive({
  name: "User",
  formTitle: "Créer un utilisateur",
  btnTitle: "Enregistrer",
})
const formFields:FormType[] = reactive<FormType[]>([
  {
    name: "name",
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
    name: "telephone",
    type: "text",
    id: "phone",
    label: "Telephone",
    rules: [validate.required]
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
    path: "/admin/agencies",
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
  { title: "solde", align: "end", key: "balance" },
  { title: "Agence", align: "end", key: "agency" },
  { title: "Adresse", align: "end", key: "address" },
  { title: "actions", align: "end", key: "actions" },
]);
const users = [
  {
    name: "Frozen Yogurt",
    responsible: "rosaire",
    address: "Kinshasa",
    sold: 24,
  },
  {
    email: "Frozen Yogurt",
    responsible: "rosaire",
    address: "Kinshasa",
    sold: 24,
  },
  {
    name: "Frozen Yogurt",
    responsible: "rosaire",
    address: "Kinshasa",
    sold: 24,
  },
  {
    name: "Frozen Yogurt",
    responsible: "rosaire",
    address: "Kinshasa",
    sold: 24,
  },
];
</script>
