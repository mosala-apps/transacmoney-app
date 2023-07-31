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
        <shared-admin-form-create
          :isOpenDrawer="isOpenDrawer"
          :formFields="formFields"
          :entityToCrud="entityToCrud"
          @handleClose="close"
          @handleSubmit="handleSubmit"
        />
      </template>
    </v-data-table>
  </div>
</template>
<script setup lang="ts">
type Headers = InstanceType<typeof VDataTable>["headers"];
import type { Header, Item } from "vue3-easy-data-table";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { useACLRole } from "~/composables/aclRole";
import { FormType } from "~/types/form.type";
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
const handlePagination = () => {};
const close = (value: boolean) => {
  isOpenDrawer.value = value;
};
</script>
