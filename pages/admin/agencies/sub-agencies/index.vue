<template>
  <sharedAdminContainer :subMenus="subMenus">
    <div class="pa-12">
      <admin-agency-data-table 
       :data="agences"
        titleSection="Liste des sous Agences"
       :formFields="formFields"
       />
    </div>
  </sharedAdminContainer>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "admin",
});
const subMenus = reactive([
  {
    name: "Agences",
    path: "/admin/agencies",
  },
  {
    name: "Sous-Agences",
    path: "/admin/agencies/sub-agencies",
  },
]);

const formFields = reactive([{
    name: 'name',
    type: 'text',
    id: 'name',
    label:"Nom de la sous agence"
}])

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
