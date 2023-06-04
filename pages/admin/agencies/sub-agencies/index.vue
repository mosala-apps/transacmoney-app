<template>
  <sharedAdminContainer :subMenus="subMenus">
    <div class="pa-12">
      <shared-admin-data-table 
       :data="agences"
       :headers="headers"
        titleSection="Liste des sous Agences"
       :formFields="formFields"
       :entityToCrud="entityToCrud"
       @handleSubmit="handleSubmit"
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
  formTitle: "Créer une sous-agence",
  btnTitle: "Enregistrer",
})
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

const formFields:FormType[] = reactive<FormType[]>([
  {
    name: "name",
    type: "text",
    id: "name",
    label: "Nom sous agence",
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
    label: "Telephone",
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

const headers = reactive([
  {
    title: "Nom",
    align: "start",
    sortable: false,
    key: "name",
  },
  { title: "solde", align: "end", key: "balance" },
  { title: "Sous-agent", align: "end", key: "user" },
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

const handleSubmit = (value:any) => {
  // form = value
};
</script>
