<template>
  <v-app  class="elevation-0 border-0 admin-panel__sidebar">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      class="admin-panel"
    >
      <v-list>
        <v-toolbar-title class="admin-panel__title">{{ title }}</v-toolbar-title>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          color="white"
          class="flex"
        >
         
          <v-list-item-content class="d-flex gap-6">
            <v-list-item-action>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-action>
            <v-list-item-title class="ml-3">{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <admin-menu-profile />
    </v-app-bar>
    <slot />
  </v-app>
</template>
<script lang="ts" setup>
import { AdminMenusType } from "~/types/admin-menu.type";
import { useACLRole } from "~/composables/aclRole";
const { canAgenciesView, canAdminsView } = useACLRole();
const links = reactive<string[]>(["Dashboard", "Messages", "Profile", "Updates"]);
const title = ref<string>("Transacmoney");
const miniVariant = ref<boolean>(false);
const clipped = ref<boolean>(false);
const drawer = ref<boolean>(true);
const items: AdminMenusType[] = reactive<AdminMenusType[]>([
  {
    name: "Dashboard",
    to: "/admin/",
    icon: "mdi-view-dashboard",
    isSubMenus: false,
    canView: true,
  },
  {
    name: "Agences",
    to: "/admin/agencies",
    icon: "mdi-home",
    isSubMenus: false,
    canView: canAdminsView.value,
  },
  {
    name: "Recharge",
    to: "/admin/matching",
    icon: "mdi-currency-usd",
    isSubMenus: true,
    canView: canAdminsView.value,
  },
  {
    name: "Utilisateurs",
    to: "/admin/users",
    icon: "mdi-account-group",
    isSubMenus: false,
    canView: canAdminsView.value,
  },
  {
    name: "Transaction",
    to: "/admin/transactions",
    icon: "mdi-bank-transfer",
    isSubMenus: false,
    canView: canAgenciesView.value,
  },
  {
    name: "Parametres",
    to: "/admin/settings",
    icon: "mdi-cog",
    isSubMenus: false,
    canView: canAdminsView.value,
  },
]);
</script>
<style lang="scss" scoped>
@import "@/assets/main";

.admin-panel {
  background-color: $primary-color;
  color: $white-color !important;
}
.admin-panel__title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2rem;
  font-family: $font-bold;
  font-weight: 400;
}
.cursor-pointer {
  cursor: pointer;
}
.rounded {
  border-top-right-radius: 50%;
}
</style>
