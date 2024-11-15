<template>
  <div>
    <div class="d-flex justify-space-between pa-12">
      <h2 class="text-slate">{{ props.titleSection }}</h2>

      <shared-button
        v-show="canAdminsView"
        btn-class="btn-primary"
        :label="entityToCrud.formTitle"
        class="mb-2"
        @onClick="isOpenDrawer = !isOpenDrawer"
      />
    </div>
    <v-divider color="primary"></v-divider>
    <v-data-table
      :headers="props.headers"
      :items="props.data"
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
      <template #top>
        <shared-admin-transactions-form-create
          :isOpenDrawer="isOpenDrawer"
          :formFields="formFields"
          :entityToCrud="entityToCrud"
          @handleClose="close"
          @handleSubmit="handleSubmit"
          style='z-index:20001;'
        />
      </template>
      <template #[`item.type`]="{ item }">
        <v-chip size="small" color="green">
          <span class="text-blue-500"> {{ getFormattedTransactionType(item.selectable) }}</span>
        </v-chip>
      </template>
      <template #[`item.updatedAt`]="{ item }">
       
          <span class="text-blue-500"> {{ getFormattedDate(item.selectable?.updatedAt) }}</span>
        
      </template>
      <template #[`item.status`]="{ item }">
        <v-chip size="small" color="green">
          <span class="text-blue-500"> {{ getFormattedTransactionStatus(item.selectable?.status) }}</span>
        </v-chip>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-btn variant="outlined" color="red">Rejecter</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script setup lang="ts">
type Headers = InstanceType<typeof VDataTable>["headers"];
import {getDateFormatted}  from "@/utils/global"
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { useACLRole } from "~/composables/aclRole";
import { FormType } from "~/types/form.type";
import { StatusTransaction, TransactionEnum } from "~/types/transaction.enum";
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
const total = 100;
let loading = ref(false);
let isOpenDrawer = ref<boolean>(false);
let searchTerm = ref("");

const handleSubmit = (value: any) => {
  emit("handleSubmit", value);
};
const getFormattedTransactionStatus = (status: string) => {
  if (status === StatusTransaction.IN_PROGRESS ) return 'En cours'
  else if (status === StatusTransaction.ACCEPTED ) return 'Traité'
  else if (status === StatusTransaction.REJECTED ) return 'Rejetée'
}
const getFormattedTransactionType = ({type, status}:any) => {
 
  if (type === TransactionEnum.TRANSFER_TO && status === StatusTransaction.ACCEPTED  ) return 'Retrait'
  else if (type === TransactionEnum.TRANSFER_TO && status === StatusTransaction.IN_PROGRESS  ) return 'Dépot'
  return 'Transfert'
}

const getFormattedDate = (date:string) => {
  return getDateFormatted(date);
}
const handlePagination = () => {};
const close = (value: boolean) => {
  isOpenDrawer.value = value;
};
</script>
