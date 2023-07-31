<template>
  <v-app-bar elevation="0" style="z-index: 2" flat>
    <v-container class="fill-height d-flex align-center">
      <v-list-item
        v-for="(item, index) in adminMenus"
        :key="index"
        :to="item.to"
        v-show="item.canView"
        color="primary"
        rounded="lg"
      >
        <v-list-item-title v-if="item.canView"> {{ item.name }} </v-list-item-title>
      </v-list-item>
      <v-spacer></v-spacer>

      <v-responsive max-width="200"> </v-responsive>
    </v-container>
    <div class="pa-12">
      <admin-menu-profile />
    </div>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { AdminMenusType } from "~/types/admin-menu.type";
import { useACLRole } from "~/composables/aclRole";
const { canAgenciesView, canAdminsView } = useACLRole();
const links = reactive<string[]>(["Dashboard", "Messages", "Profile", "Updates"]);

const adminMenus: AdminMenusType[] = reactive<AdminMenusType[]>([
  {
    name: "Dashboard",
    to: "/admin/",
    icon: "fas fa-dashboard",
    isSubMenus: false,
    canView: true,
  },
  {
    name: "Agences",
    to: "/admin/agencies",
    icon: "fas fa-dashboard",
    isSubMenus: false,
    canView: canAdminsView.value,
  },
  {
    name: "Recharge",
    to: "/admin/matching",
    icon: "fas fa-dashboard",
    isSubMenus: true,
    canView: canAdminsView.value,
  },
  {
    name: "Utilisateurs",
    to: "/admin/users",
    icon: "fa-solid fa-user",
    isSubMenus: false,
    canView: canAdminsView.value,
  },
  {
    name: "Transaction",
    to: "/admin/transactions",
    icon: "fa-solid fa-user",
    isSubMenus: false,
    canView: canAgenciesView.value,
  },
]);
</script>
