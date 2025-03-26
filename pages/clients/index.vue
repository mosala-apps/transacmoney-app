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

let reload = ref(false);
let  items = ref([
        {
          title: 'Depot',
          disabled: false,
          href: '/transactions/deposit',
        },
        {
          title: 'Retraits',
          disabled: false,
          href: '/transactions/with-drawal',
        },
        {
          title: 'Créer un client(Expediteur ou Bénéficiaire)',
          disabled: true,
          href: 'breadcrumbs_link_1',
        },
        
      ])
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
const {withdrawals, getAgencyTransactionsByType, isLoading, error} = useTransactionStore()
const {users , getAllUsers} = useUsersStore()
const { currencies, getAllCurrencies} = useCurrencyStore()
const { cities, getAllCities}= useCityStore()
getAllUsers()
getAllCurrencies()
getAllCities()


const validate = useFormRules();

definePageMeta({
  layout: "admin",
});


const handleSubmit = (value: any) => {
  getAgencyTransactionsByType(TransactionEnum.WITHDRAWAL, reload)
};

</script>

<template>
  <sharedAdminContainer :showSubMenus="false">
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <div>
    <clients-form-create/>
    </div>
  </sharedAdminContainer>
</template>
