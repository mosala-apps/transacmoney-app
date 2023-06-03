<template>
  <sharedAdminContainer :subMenus="subMenus">
    <div class="pa-12">
      <admin-agency-data-table :data="agences"/>
    </div>
  </sharedAdminContainer>
</template>
<script lang="ts" setup>
const subMenus = reactive(["Agences", "Sous-Agences"]);
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
