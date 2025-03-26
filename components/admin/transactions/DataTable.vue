
<script setup lang="ts">
type Headers = InstanceType<typeof VDataTable>["headers"];
import {getDateFormatted , getFormattedTransactionStatus ,getFormattedTransactionType , getTransactionStatusColor}  from "@/utils/global"
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { useACLRole } from "~/composables/aclRole";
import { FormType } from "~/types/form.type";
import { StatusTransaction, TransactionEnum } from "~/types/transaction.enum";
import { ITransaction } from "~/types/transaction.interface";
import { IEntityCrud } from "~/types/user.interface";
const { pagination, rowsPerPageItems } = usePagination();
const { canAdminsView } = useACLRole();
export type Props = {
  data: any[];
  headers: any[];
  formFields: Array<FormType> | [];
  titleSection: String | "";
  entityToCrud: IEntityCrud;
};
const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "handleSubmit", value: any): void;
}>();
const formattedHeaders =computed(()=>props.headers.map((h)=>({...h, title: h?.title?.toUpperCase()})))

const total = 100;
let loading = ref(false);
let isOpenDrawer = ref<boolean>(false);
let searchTerm = ref("");
const deposits = computed(()=> props.data)
const handleSubmit = (value: any) => {
  emit("handleSubmit", value);
};


const getFormattedDate = (date:string) => {
  return getDateFormatted(date);
}
const handlePagination = () => {};
const close = (value: boolean) => {
  isOpenDrawer.value = value;
};
</script>

<template>
  <div>
    <div class="d-flex flex-column flex-sm-row justify-space-between pa-12">
      <h2 class="text-slate">{{ props.titleSection }}</h2>
    </div>
    <v-divider color="primary"></v-divider>
    <v-data-table
      :headers="formattedHeaders"
      :items="deposits"
      :page="pagination.page"
      :items-per-page="pagination.itemsPerPage"
      :server-items-length="total"
      :loading="loading"
      class="elevation-0 mt-5"
      loading-text="Chargement... Veuillez patienter."
      no-data-text="Aucune donnée disponible."
      :footer-props="{
        itemsPerPageText: 'Ligne par Page',
        itemsPerPageOptions: rowsPerPageItems,
      }"
      @pagination="handlePagination"
    >
      <template #[`item.type`]="{ item }">
        <v-chip size="small" color="green">
          <span class="text-blue-500"> {{ getFormattedTransactionType(item.selectable) }}</span>
        </v-chip>
      </template>
      <template #[`item.updatedAt`]="{ item }">
       
          <span class="text-blue-500"> {{ getFormattedDate(item.selectable?.updatedAt) }}</span>
        
      </template>
      <template #[`item.status`]="{ item }">
        <v-chip size="small" :color="getTransactionStatusColor(item.selectable?.status)">
          <span class="text-blue-500"> {{ getFormattedTransactionStatus(item.selectable?.status) }}</span>
        </v-chip>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-btn variant="outlined" color="red">Rejecter</v-btn>
      </template>
    </v-data-table>
  </div>
</template>