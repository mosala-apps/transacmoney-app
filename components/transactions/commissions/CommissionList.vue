<template>
  <div>
    <div class="d-flex flex-column flex-sm-row justify-space-between pa-12">
      <h2 class="text-slate">{{ props.titleSection }}</h2>
    </div>
    <v-divider color="primary"></v-divider>
    <v-data-table
      :headers="props.headers.map((item) => ({ ...item, title: item?.title?.toUpperCase() }))"
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
      <template #top>
        <transactions-deposit-form-create
          v-if="props.type === TransactionEnum.DEPOSIT"
          :isOpenDrawer="isOpenDrawer"
          :formFields="formFields"
          :entityToCrud="entityToCrud"
          @handleClose="close"
          @handleSubmit="handleSubmit"
          style="z-index: 20001"
        />
      </template>
      <template #[`item.createdAt`]="{ item }">
        <span class="text-blue-500"> {{ getFormattedDate(item.selectable?.createdAt) }}</span>
      </template>
      <template #[`item.isPaid`]="{ item }">
        <v-chip size="small" :color="item.selectable?.isPaid? 'green' : 'red'">
          <span class="text-blue-500">
            {{ getFormattedCommissionStatus(item.selectable?.isPaid) }}</span
          >
        </v-chip>
      </template>
      <!--- 
      <template #[`item.actions`]="{ item }">
     
        <v-btn
          variant="outlined"
          color="blue"
          @click="router.push(`/transactions/deposit/${item.selectable.id}`)"
          >Details</v-btn
        >
      </template>
      -->
    </v-data-table>
  </div>
</template>
<script setup lang="ts">
type Headers = InstanceType<typeof VDataTable>["headers"];
import {
  getDateFormatted,
  getFormattedCommissionStatus
} from "@/utils/global";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { useACLRole } from "~/composables/aclRole";
import { useAuthStore } from "~/store/auth";
import type { FormType } from "~/types/form.type";
import { TransactionEnum } from "~/types/transaction.enum";
import type { IEntityCrud } from "~/types/user.interface";

const { pagination, rowsPerPageItems } = usePagination();
const { canAdminsView } = useACLRole();

export type Props = {
  data: any[];
  headers: any[];
  formFields: Array<FormType> | [];
  type: string;
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
const router = useRouter();
let searchTerm = ref("");
const deposits = computed(() => props.data);
const handleSubmit = (value: any) => {
  emit("handleSubmit", value);
};
const handleShowCreateBtn = () => {
  if (props.type === TransactionEnum.DEPOSIT) {
    isOpenDrawer.value = !isOpenDrawer.value;
  } else {
    router.push("/transactions/with-drawal/search");
  }
};
const getFormattedDate = (date: string) => {
  return getDateFormatted(date);
};
const handlePagination = () => {};
const close = (value: boolean) => {
  isOpenDrawer.value = value;
};
</script>
