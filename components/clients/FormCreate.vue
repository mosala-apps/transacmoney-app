<template>
  <div>
    <v-divider color="primary"></v-divider>
    <h4 class="pt-3 text-center text-uppercase">{{ entityToCrud.formTitle }}</h4>
    <div class="d-flex justify-center">
      <v-form
        v-model="isValid"
        ref="Form"
        lazy-validation
        @submit.prevent.stop="onSubmit"
        class="pa-6"
      >
        <div class="mt-1" v-for="(formField, index) in formFields" :key="index">
          <v-autocomplete
            v-if="formField.type === 'select'"
            v-model="completedFormField[formField.name]"
            chips
            :label="formField.label"
            :items="formField.values"
            :item-value="formField.itemValue"
            :item-title="formField.itemTitle"
            :rules="formField.rules"
            variant="outlined"
          ></v-autocomplete>
          <div v-else>
            <!-- <label class="label text-grey-darken-2" for="password">{{ formField["label"] }}</label> -->
            <v-textField
              :label="formField.label"
              :rules="formField.rules"
              v-model="completedFormField[formField.name]"
              :id="formField.name"
              :name="formField.name"
              :type="formField.type"
            />
          </div>
        </div>
        <shared-button
          btn-class="btn-primary"
          :label="entityToCrud.btnTitle"
          class="mb-2"
          :disabled="!isValid"
          :loading="isCreating"
          type="submit"
          width="500"
        />
      </v-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormType } from "~/types/form.type";
import { IEntityCrud } from "~/types/user.interface";
import { API_URL } from "~/config/ApiURL";
import { UserRoleEnum } from "~/types/role.enum";
const validate = useFormRules();
const toast = useToast();
const isCreating = ref<boolean>(false);
let entityToCrud: IEntityCrud = reactive({
  name: "client",
  formTitle: "Enregistrer un nouveau client",
  btnTitle: "Enregistrer",
});
const roles = useRoles();
const formattedRoles = computed(() =>
  roles.filter(
    (role) =>
      role.slug.includes(UserRoleEnum.EXPERDITOR) || role.slug.includes(UserRoleEnum.RECIPIENT)
  )
);
const genders = useGenders();

const formFields: FormType[] = reactive<FormType[]>([
  {
    name: "name",
    type: "text",
    id: "name",
    label: "Nom ",
    rules: [validate.required],
  },
  {
    name: "lastName",
    type: "text",
    id: "lastName",
    label: "Postnom",
    rules: [],
  },
  {
    name: "firstName",
    type: "text",
    id: "firstName",
    label: "Prenom",
    rules: [validate.required],
  },
  {
    name: "email",
    type: "text",
    id: "email",
    label: "Email",
    rules: [],
  },
  {
    name: "phone",
    type: "text",
    id: "phone",
    label: "Telephone",
    rules: [validate.required],
  },

  {
    name: "gender",
    type: "select",
    id: "genderId",
    label: "Sexe",
    itemValue: "slug",
    itemTitle: "name",
    rules: [validate.required],
    values: genders,
  },
  {
    name: "role",
    type: "select",
    id: "roleId",
    label: "Role",
    itemValue: "slug",
    itemTitle: "name",
    rules: [validate.required],
    values: formattedRoles.value,
  },
]);

const emit = defineEmits<{
  (e: "handleClose", value: boolean): void;
  (e: "handleSubmit", value: any): void;
}>();

const completedFormField: any = reactive<any>({});

let isValid = ref<boolean>(false);
let method = ref<string>("");

const onSubmit = async () => {
  isCreating.value = true;
  method.value = `store`;
  let uri = "users";
  try {
    await $fetch(`${API_URL}/${uri}/${method.value}`, {
      method: "POST",
      body: { ...completedFormField, password: "123456789" },
    });
    toast.success("Enregistrement reusi avec succès!");
  } catch (error) {
    toast.error("Echec lors de la creation d'un client");
  } finally {
    isCreating.value = false;
  }
};
</script>
