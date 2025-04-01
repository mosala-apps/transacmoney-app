<script lang="ts" setup>
import { FormType } from "~/types/form.type";
import { ITransaction } from "~/types/transaction.interface";
import { IEntityCrud } from "~/types/user.interface";
import { API_URL } from "~/config/ApiURL";
import { useACLRole } from "~/composables/aclRole";
import { useAgencyStore } from "~/store/agencies";
import { useAuthStore } from "~/store/auth";
import { DestinationTypeEnum, StatusTransaction, TransactionEnum } from "~/types/transaction.enum";
import { useUsersStore } from "~/store/users";
import { useTransactionStore } from "~/store/transaction";
import { useCurrencyStore } from "~/store/currency";
import { useCityStore } from "~/store/cities";
import { storeToRefs } from "pinia";

let reload = ref(false);
let destinationTypes =ref<any[]>([
  {
   id: DestinationTypeEnum.LOCAL,
   name: 'Locale'
  },
  {
   id:DestinationTypeEnum.INTERNATIONAL,
   name:'Internationale' 
  }
])
const {getAgencyTransactionsByType} = useTransactionStore()
const {getAllUsers} = useUsersStore()
const { getAllCurrencies} = useCurrencyStore()
const { getAllCities}= useCityStore()

// ref
const {users } = storeToRefs(useUsersStore())
const { cities}= storeToRefs(useCityStore())
const {withdrawals ,isLoading, error} = storeToRefs(useTransactionStore())
const { currencies} =  storeToRefs(useCurrencyStore())
const validate = useFormRules();

definePageMeta({
  layout: "admin",
});
let entityToCrud: IEntityCrud = reactive({
  name: "Operation",
  formTitle: "Effectuer un nouveau retrait",
  btnTitle: "Enregistrer",
});
const formFields: FormType[] = reactive<FormType[]|any[]>([
  {
    name: "amount",
    type: "number",
    id: "amount",
    label: "Montant",
    rules: [validate.required, validate.numbers],
  },
  {
    name: "currencyId",
    type: "select",
    id: "currencyId",
    label: "Devise",
    itemValue:'id',
    itemTitle:'name',
    rules: [validate.required],
    values: currencies.value,
  },
  {
    name: "senderId",
    type: "select",
    id: "phone",
    label: "Expediteur",
    itemValue:'id',
    itemTitle:'userSearchTerm',
    rules: [validate.required],
    values: users.value,
  },
 
  {
    name: "receiverId",
    type: "select",
    id: "phone",
    label: "Beneficiaire",
    itemValue:'id',
    itemTitle:'userSearchTerm',
    rules: [validate.required],
    values: users.value,
  },
  
  {
    name: "destinationType",
    type: "select",
    id: "destinationType",
    label: "Type de transfert",
    itemValue:'id',
    itemTitle:'name',
    rules: [validate.required],
    values: destinationTypes,
  },
  {
    name: "destinationCityId",
    type: "select",
    id: "destinationCityId",
    label: "Ville de destination",
    itemValue:'id',
    itemTitle:'name',
    rules: [validate.required],
    values: cities.value,
  },
  
 
]);

const headers = reactive([
  {
    title: "Montant",
    align: "start",
    sortable: false,
    key: "amount",
  },
  { title: "Devise", align: "end", key: "currency.name" },
  { title: "Expediteur", align: "end", key: "sender.fullName" },
  { title: "Beneficiaire", align: "end", key: "receiver.fullName" },
  { title: "Origine", align: "end", key: "originCity.name" },
  { title: "Destination", align: "end", key: "destinationCity.name" },
  { title: "Statut", align: "end", key: "status" },
  { title: "Date", align: "end", key: "updatedAt" },
  //{ title: "actions", align: "end", key: "actions" },
]);

onMounted( async ()=>{
  await getAgencyTransactionsByType(TransactionEnum.WITHDRAWAL, reload)
  getAllUsers()
  getAllCurrencies()
  getAllCities()
})
const handleSubmit = (value: any) => {
  //getAgencyTransactionsByType(TransactionEnum.WITHDRAWAL, reload)
};

</script>

<template>
  <sharedAdminContainer :showSubMenus="false">
    <div v-if="isLoading">
       Chargement
    </div>
    <div v-else>
      <transactions-data-table
        :showMenus="false"
        :data="withdrawals"
        :type="TransactionEnum.WITHDRAWAL"
        :headers="headers"
        titleSection="Liste des operations"
        :entityToCrud="entityToCrud"
        :formFields="formFields"
        @handleSubmit="handleSubmit"
      />
    </div>
  </sharedAdminContainer>
</template>
