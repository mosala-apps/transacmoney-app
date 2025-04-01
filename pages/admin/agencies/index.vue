
<script lang="ts" setup>
import { FormType } from '~/types/form.type';
import { IEntityCrud } from '~/types/user.interface';
import {API_URL} from '~/config/ApiURL'
import { useACLRole } from '~/composables/aclRole';
import { useAgencyStore } from '~/store/agencies';
import { useCityStore } from '~/store/cities';
import { useCurrencyStore } from '~/store/currency';
let  reload = ref(false);
const { data, error, execute, refresh,pending } = await useFetch(`${API_URL}/agencies`,{
  watch:[reload],
  key: 'agencies2-key',
  immediate: true
})

definePageMeta({
  layout: "admin",
  middleware:'admin'
});
let entityToCrud: IEntityCrud = reactive({
  name: "agencies",
  formTitle: "Créer une agence",
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
  <div v-if="pending==='pending'">
     tes
  </div>
    <div v-else>
      <admin-agencies-data-table
        :data="data"
        :headers="headers"
        titleSection="Liste des Agences"
        :entityToCrud="entityToCrud"
        @handleSubmit="handleSubmit"
      />
    </div>
  </sharedAdminContainer>
</template>
