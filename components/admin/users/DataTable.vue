<template>
  <div>
    <div class="d-flex justify-space-between">
      <h2>{{ props.titleSection}}</h2>
      <shared-button
        btn-class="btn-primary"
        label="Nouvelle agence"
        class="mb-2"
        @onClick="isOpenDrawer=!isOpenDrawer"
      />
    </div>
   
    <v-data-table
      :headers="headers"
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
      <admin-users-form-create :isOpenDrawer="isOpenDrawer" @handleClose="close"/>
    </template>
    </v-data-table>
  </div>
</template>
<script setup lang="ts">
type Headers = InstanceType<typeof VDataTable>["headers"];
import type { Header, Item } from "vue3-easy-data-table";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
const { pagination, rowsPerPageItems } = usePagination();

const props = defineProps({
  data: {
    type: Array,
    default: () => {},
  },
  titleSection: {
    type: String,
    default: () => "",
  },
});
const total = 100;
let loading = ref(false);
let isOpenDrawer = ref<boolean>(false);
let searchTerm = ref("");
const headers = reactive([
  {
    title: "Nom",
    align: "start",
    sortable: false,
    key: "name",
  },
  { title: "solde", align: "end", key: "sold" },
  { title: "Responsable", align: "end", key: "fat" },
  { title: "Adresse", align: "end", key: "address" },
  { title: "actions", align: "end", key: "carbs" },
]);
const handleOpenModal = () => {};
const handlePagination = () => {};
const close =(value: boolean)=>{
  isOpenDrawer.value = value;
}
</script>
