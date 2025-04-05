<template>
  <div>
    
    <div class="d-flex flex-column flex-sm-row justify-space-between pt-12 px-12">
      <h2 class="text-slate">{{ props.titleSection }}</h2>
      <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    </div>
    <div class="d-flex flex-column px-12 pb-6">
      <p><strong>Numero du compte:</strong> {{ account.accountNumber }}</p>
      <p><strong>Balance:</strong> {{ account.amount }} {{ account?.currency?.code }}</p>
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
      <template #[`item.label`]="{ item }">
        <v-chip size="small" :color="item.selectable?.label === 'credit' ? 'success' : 'blue'">
          <span class="text-blue-500"> {{ item.selectable?.label }}</span>
        </v-chip>
      </template>
    </v-data-table>
  </div>
</template>
  <script setup lang="ts">
type Headers = InstanceType<typeof VDataTable>["headers"];
import { getDateFormatted, getFormattedCommissionStatus } from "@/utils/global";
import { storeToRefs } from "pinia";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { useACLRole } from "~/composables/aclRole";
import { useAccountStore } from "~/store/accountStore";
import { TransactionEnum } from "~/types/transaction.enum";

const { pagination, rowsPerPageItems } = usePagination();
const { canAdminsView } = useACLRole();
const { account } = storeToRefs(useAccountStore());
export type Props = {
  data: any[];
  headers: any[];
  titleSection: String | "";
};
let items = ref([
  {
    title: "Mes comptes",
    disabled: false,
    href: "/accounts",
  },
  {
    title: "Historique",
    disabled: true,
    href: "breadcrumbs_link_1",
  },
]);

const props = defineProps<Props>();
const route = useRoute();
const total = 100;
let loading = ref(false);
let isOpenDrawer = ref<boolean>(false);
const router = useRouter();
let searchTerm = ref("");
const deposits = computed(() => props.data);

const getFormattedDate = (date: string) => {
  return getDateFormatted(date);
};
const handlePagination = () => {};
const close = (value: boolean) => {
  isOpenDrawer.value = value;
};
</script>
  