<template>
  <v-menu transition="slide-x-transition">
    <template #activator="{ props }">
      <v-list-item-avatar class="cursor-pointer d-flex justify-space-between  align-center grandiant primary" v-bind="props">
        <span class="mr-4">Bonjour {{ user.username }} <span class="mx-3">|</span>{{ getUserFormattedRole }}</span>
        <v-avatar color="info">
        <v-img
          alt="Avatar"
          src="/images/profile.png"
        ></v-img>
        </v-avatar>
      </v-list-item-avatar>
    </template>
    <v-list>
      <v-list-item v-for="(item, i) in menus" :key="i" link :to="item.to">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
      <v-btn @click="handleLogout">Deconnexion</v-btn>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth";
const { hashAdminRole, hashSuperAdminRole, hashAgencyRole,canSubAgencyView } = useACLRole();
const { user, isAuthenticated, logout } = useAuthStore();


const getUserFormattedRole = computed(()=>{
  if (canSubAgencyView.value) {
    return "SOUS-AGENT"
  }
  if (hashAgencyRole.value) {
    return "AGENT"
  }
  if (hashAdminRole.value) {
    return "ADMIN"
  }
  if (hashSuperAdminRole.value) {
    return "ROOT"
  }
  return "CLIENT"
})
const menus = [
  {
    icon: "mdi-home",
    title: `Rôle: ${getUserFormattedRole.value}`,
    to: "#",
  },
  {
    icon: "mdi-home",
    title: "Paramètres",
    to: "/profile",
  },
];
const handleLogout = () => {
  logout();
  navigateTo('/auth/signin')
};
</script>
<style lang="scss" scoped>
.profile-menu__auth-action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
