<template>
    <v-app-bar flat color="primary">
      <v-container class="fill-height d-flex align-center">
        <v-btn 
        v-for="(item, index) in adminMenus" 
        :key="index" variant="text"
        @click="$router.push(item.to)"
        >
          {{ item.name }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260"> </v-responsive>
      </v-container>
      <v-avatar class="me-10 ms-4" color="primary" size="32"></v-avatar>
    </v-app-bar>
</template>

<script lang="ts" setup>
import { AdminMenusType } from "~/types/admin-menu.type";

const links = reactive<string[]>(["Dashboard", "Messages", "Profile", "Updates"]);
const adminMenus: AdminMenusType[] = reactive<AdminMenusType[]>([
  {
    name: "Dashboard",
    to: "/admin/",
    icon: "fas fa-dashboard",
    isSubMenus: false,
  },
  {
    name: "Agences",
    to: "/admin/agencies",
    icon: "fas fa-dashboard",
    isSubMenus: false,
  },
  {
    name: "Recharge",
    to: "/admin/matching",
    icon: "fas fa-dashboard",
    isSubMenus: true,
    subMenus: [
      {
        name: "Transaction",
        to: "/admin/matching/dev",
        icon: "fas fa-dashboard",
      },
    ],
  },
  {
    name: "Utilisateurs",
    to: "/admin/users",
    icon: "fa-solid fa-user",
    isSubMenus: false,
  },
  {
    name: "Transaction",
    to: "/admin/users",
    icon: "fa-solid fa-user",
    isSubMenus: false,
  },
]);
</script>
