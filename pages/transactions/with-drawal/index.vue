<script lang="ts" setup>
import { FormType } from "~/types/form.type";
import { IEntityCrud } from "~/types/user.interface";
import { API_URL } from "~/config/ApiURL";

definePageMeta({
  layout: "admin",
  middleware: 'admin'
});
let reload = ref(false);
const { data, error, execute, refresh } = await useFetch(`${API_URL}/users`, {
  watch: [reload]
})

const validate = useFormRules();

let entityToCrud: IEntityCrud = reactive({
  name: "users",
  formTitle: "Créer un utilisateur",
  btnTitle: "Enregistrer",
});
const formFields: FormType[] = reactive<FormType[]>([
  {
    name: "username",
    type: "text",
    id: "name",
    label: "Nom de l'utilisateur",
    rules: [validate.required],
  },
  {
    name: "email",
    type: "select",
    id: "email",
    label: "Email",
    rules: [validate.email],
  },
  {
    name: "phone",
    type: "text",
    id: "phone",
    label: "Telephone",
    rules: [validate.required],
  },
  {
    name: "password",
    type: "text",
    id: "location",
    label: "Mot de passe",
    rules: [validate.required],
  },
]);
const subMenus = reactive([
  {
    name: "Agents",
  },
  {
    name: "Sous-Agents",
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
  { title: "Role", align: "center", key: "role" },
  { title: "actions", align: "end", key: "actions" },
]);
const handleSubmit = (value: any) => {
  reload.value = true;
};

</script>
<template>
  <sharedAdminContainer :subMenus="subMenus">
    <div>
      <admin-users-data-table :data="data" :headers="headers" titleSection="Liste des utilisateurs"
        :entityToCrud="entityToCrud" :formFields="formFields" @handleSubmit="handleSubmit" />
    </div>
  </sharedAdminContainer>
</template>
<style lang="scss">
@import '@/assets/main';

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
  transition: transform .3s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  height: 200px;

  &:hover {
    transform: scale(1.09);
  }
}

.participants-link {
  &:hover {
    text-decoration: underline !important;
    // color: $secondary-color;
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
  // color: $secondary-color;
}
</style>