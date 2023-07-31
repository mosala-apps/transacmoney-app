<template>
  <sharedAdminContainer :sub-menus="subMenus" :is-dashboard="true">
    <admin-dashboard-agency v-if="canAgenciesView" />
    <admin-dashboard-manager v-if="canAdminsView" />
  </sharedAdminContainer>
</template>
<script lang="ts" setup>
import { useACLRole } from "~/composables/aclRole";
import { IEntityCrud } from "~/types/user.interface";
const { canAdminsView, canAgenciesView } = useACLRole();
definePageMeta({
  layout: "admin",
});

let entityToCrud: IEntityCrud = reactive({
  name: "user",
  formTitle: "Créer un utilisateur",
  btnTitle: "Enregistrer",
});

const subMenus = reactive([
  {
    name: "Dépots",
  },
  {
    name: "Rétraits",
    path: "/admin/agencies/sub-agencies",
  },
]);

const headers = reactive([
  {
    title: "Nom",
    align: "start",
    sortable: false,
    key: "username",
  },
  {
    title: "Email",
    align: "start",
    sortable: false,
    key: "email",
  },
  { title: "Agence", align: "end", key: "agency.name" },
  { title: "Adresse", align: "end", key: "address" },
  { title: "actions", align: "end", key: "actions" },
]);
</script>
<style lang="scss">
@import "@/assets/main";
.event-data-table__action {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 1.5rem;
}
.card-kpi {
  background-color: $white-color;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  height: 200px;
  &:hover {
    transform: scale(1.09);
  }
}
.participants-link {
  &:hover {
    text-decoration: underline !important;
    color: $secondary-color !important;
  }
}

.statistic-section {
  padding-top: 70px;
  padding-bottom: 70px;
}

.count-title {
  font-size: 50px;
  margin-top: 10px;
  margin-bottom: 0;
  text-align: center;
  font-weight: bold;
}

.stats-text {
  font-size: 15px;
  margin-top: 15px;
  margin-bottom: 0;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
}

.stats-line-black {
  margin: 12px auto 0;
  width: 55px;
  height: 2px;
}
.stats-icon {
  font-size: 35px;
  margin: 0 auto;
  float: none;
  display: table;
  color: $secondary-color;
}
</style>
