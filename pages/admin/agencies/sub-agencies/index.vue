<template>
  <sharedAdminContainer :subMenus="subMenus">
    <div v-if="!error && data && data.length> 0">
      <shared-admin-data-table 
       :data="data"
       :headers="headers"
        titleSection="Liste des sous Agences"
       :formFields="formFields"
       :entityToCrud="entityToCrud"
       @handleSubmit="handleSubmit"
       />
    </div>
    <div v-else>
       {{ error }}
    </div>
  </sharedAdminContainer>
</template>
<script lang="ts" setup>
import { API_URL } from '~/config/ApiURL';
import { FormType } from '~/types/form.type';
import { IEntityCrud } from '~/types/user.interface';
const validate = useFormRules();

let  reload = ref(false);
const { data, error, execute, refresh } = await useFetch(`${API_URL}/subAgency`,{
  watch:[reload]
})
definePageMeta({
  layout: "admin",
  middleware:'admin'
});
let entityToCrud: IEntityCrud = reactive({
  name: "subAgency",
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
    name: "phone",
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


const handleSubmit = (value:any) => {
  reload.value = true;
};
</script>
