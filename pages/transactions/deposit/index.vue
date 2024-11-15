
<script lang="ts" setup>
import { FormType } from '~/types/form.type';
import { IEntityCrud } from '~/types/user.interface';
import {API_URL} from '~/config/ApiURL'
import { useACLRole } from '~/composables/aclRole';
import { useAgencyStore } from '~/store/agencies';
import { useCityStore } from '~/store/cities';
let  reload = ref(false);
const { data, error, execute, refresh } = await useFetch(`${API_URL}/agencies`,{
  watch:[reload]
})

const { agencies, getAllAgencies} = useAgencyStore()
const { cities, getAllCities}= useCityStore()
const validate = useFormRules();

definePageMeta({
  layout: "admin",
 // middleware:'admin'
});
let entityToCrud: IEntityCrud = reactive({
  name: "deposit",
  formTitle: "Créer un depot",
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
    name: "accountSold",
    type: "number",
    id: "accountSold",
    label: "Solde",
    rules: [validate.required, validate.numbers]
  },
  // {
  //   name: "cityId",
  //   type: "select",
  //   id: "cityId",
  //   label: "Ville",
  //   values:citiesData.value as any,
  //   rules: [validate.required]
  // },
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
  { title: "solde", align: "end", key: "account.amount" },
  { title: "Responsable", align: "end", key: "users" },
  { title: "Telephone", align: "end", key: "phone" },
  { title: "actions", align: "end", key: "actions" },
]);

const handleSubmit =(value:any)=>{
  
  reload.value = true;
}
</script>

<template>
  <sharedAdminContainer :subMenus="subMenus">
    <div>
      <transactions-deposit-data-table
        :data="data"
        :headers="headers"
        titleSection="Liste des depots"
        :entityToCrud="entityToCrud"
        :formFields="formFields"
        @handleSubmit="handleSubmit"
      />
    </div>
  </sharedAdminContainer>
</template>
