<template>
  <div>
    <div class="d-flex justify-space-between pa-12">
      <h2 class="text-slate">{{ props.titleSection }}</h2>

      <shared-button v-show="canAdminsView" btn-class="btn-primary" :label="entityToCrud.formTitle" class="mb-2"
        @onClick="isOpenDrawer = !isOpenDrawer" />
    </div>
    <v-divider color="primary"></v-divider>
    <v-tabs
        v-model="tab"
        background-color="transparent"
        color="primary"
        grow
      >
        <v-tab v-for="item in tabsItems" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
   
    <v-data-table 
    :headers="props.headers" 
     :items="props.data" :page="pagination.page"
      :items-per-page="pagination.itemsPerPage" 
      :server-items-length="total" :loading="loading" class="elevation-0 mt-5"
      loading-text="Chargement... Veuillez patienter." 
      no-data-text="Aucune donnée disponible." 
      :footer-props="{
        itemsPerPageText: 'Ligne par Page',
        itemsPerPageOptions: rowsPerPageItems,
      }" @pagination="handlePagination">
      <template #top>
        <admin-users-form-create 
        :isOpenDrawer="isOpenDrawer" 
        :formFields="formFields" 
        :entityToCrud="entityToCrud"
        @handleClose="close" 
        @handleSubmit="handleSubmit" 
        style='z-index:20001;' />
        <v-toolbar flat>
              <v-toolbar-title >{{
                isActive
                  ? 'Liste des utilisateurs actifs'
                  : 'Liste des utilisateurs inactifs'
              }}</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>

              <div class="w-full px-4">
                <v-text-field
                  v-model="searchTerm"
                  append-icon="mdi-magnify"
                  dense
                  clearable
                  outlined
                  label="Recherche"
                  
                />
              </div>
            </v-toolbar>
      </template>
      <template #[`item.role`]="{ item }">
        <v-chip size="small" color="green">
          <span class="text-blue-500"> {{ getFormattedUserRole(item.selectable?.role) }}</span>
        </v-chip>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-btn variant="outlined" color="red">Désactiver</v-btn>
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
import { UserRoleEnum } from "~/types/role.enum";
import { IEntityCrud } from "~/types/user.interface";
const { pagination, rowsPerPageItems } = usePagination();
const userRole = useACLRole()
const roles = useRoles()
const { canAdminsView } = useACLRole();
let isActive = ref<boolean>(false);

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
let tabsItems= ref<any[]>(['Les Utilisateurs actifs', 'Les Utilisateurs Inactifs'])
let tab = ref(null);
const getFormattedUserRole = (role: string) => {
  if (role === UserRoleEnum.ADMIN) return 'ADMIN';
  else if (role === UserRoleEnum.AGENCY) return 'AGENT';
  else if (role === UserRoleEnum.SUB_AGENCY) return ' SOUS AGENT';
  else if (role === UserRoleEnum.EXPERDITOR) return 'EXPERDITEUR';
  else if (role === UserRoleEnum.RECIPIENT) return 'BENEFICIAIRE';
  return 'SUPER ADMIN'
};

watch(tab, (value) => {
  isActive.value = !isActive.value
});
const handleSubmit = (value: any) => {
  emit("handleSubmit", value);
};
const handlePagination = () => { };
const close = (value: boolean) => {
  isOpenDrawer.value = value;
};
</script>
