<template>
  <sharedAdminContainer :subMenus="subMenus">
    <div class="pa-12">
      <shared-admin-data-table
        :data="agences"
        :headers="headers"
        titleSection="Liste des Agences"
        :entityToCrud="entityToCrud"
        :formFields="formFields"
      />
    </div>
  </sharedAdminContainer>
</template>
<script lang="ts" setup>
import { FormType } from '~/types/form.type';
import { IEntityCrud } from '~/types/user.interface';
const validate = useFormRules();
definePageMeta({
  layout: "admin",
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
    name: "telephone",
    type: "text",
    id: "phone",
    label: "Telephone de l'agence",
    rules: [validate.required]
  },
  {
    name: "location",
    type: "text",
    id: "location",
    label: "Lieu",
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
const agences = [
  {
    name: "Frozen Yogurt",
    responsible: "rosaire",
    address: "Kinshasa",
    balance: 24,
  },
  {
    name: "Frozen Yogurt",
    responsible: "rosaire",
    address: "Kinshasa",
    balance: 24,
  },
  {
    name: "Frozen Yogurt",
    responsible: "rosaire",
    address: "Kinshasa",
    balance: 24,
  },
  {
    name: "Frozen Yogurt",
    responsible: "rosaire",
    address: "Kinshasa",
    balance: 24,
  },
];
</script>
