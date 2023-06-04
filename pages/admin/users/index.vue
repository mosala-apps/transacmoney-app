<template>
    <sharedAdminContainer :subMenus="subMenus">
      <div class="pa-12">
        <admin-users-data-table :data="agences" titleSection="Liste des utilisateurs" />
      </div>
    </sharedAdminContainer>
  </template>
  <script lang="ts" setup>
  const subMenus = reactive([
    {
      name: "Agents",
      path: "/admin/agencies",
    },
    {
      name: "Sous-Agents",
      path: "/admin/agencies/sub-agencies",
    },
  
  ]);
  definePageMeta({
    layout: "admin",
  });
  const agences = [
    {
      name: "Frozen Yogurt",
      responsible: "rosaire",
      address: "Kinshasa",
      sold: 24,
    },
    {
      name: "Frozen Yogurt",
      responsible: "rosaire",
      address: "Kinshasa",
      sold: 24,
    },
    {
      name: "Frozen Yogurt",
      responsible: "rosaire",
      address: "Kinshasa",
      sold: 24,
    },
    {
      name: "Frozen Yogurt",
      responsible: "rosaire",
      address: "Kinshasa",
      sold: 24,
    },
  ];
  </script>
  