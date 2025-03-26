<template>
  <v-navigation-drawer
    v-model="isOpen"
    temporary
    location="right"
    width="500"
    flat
    style="top: 0; height: 100%"
  >
    <v-divider color="primary"></v-divider>
    <h4 class="ma-6 text-center text-uppercase">{{ entityToCrud.formTitle }}</h4>
    <v-divider color="primary"></v-divider>
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
        type="submit"
        :disabled="!isValid"
        width="500"
      />
    </v-form>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { FormType } from "~/types/form.type";
import { IEntityCrud } from "~/types/user.interface";
import { API_URL } from "~/config/ApiURL";
import { useAgencyStore } from "~/store/agencies";
import { useCityStore } from "~/store/cities";
import { useCurrencyStore } from "~/store/currency";

const roles = useRoles();
type Props = {
  isOpenDrawer: boolean;
  entityToCrud: IEntityCrud;
};

const emit = defineEmits<{
  (e: "handleClose", value: boolean): void;
  (e: "handleSubmit", value: any): void;
}>();

const props = defineProps<Props>();
const { currencies, getAllCurrencies } = useCurrencyStore();
const { agencies, getAllAgencies } = useAgencyStore();
const { cities, getAllCities } = useCityStore();
getAllCurrencies();
getAllCities();
const validate = useFormRules();

const formFields: FormType[] = reactive<FormType[]>([
  {
    name: "name",
    type: "text",
    id: "name",
    label: "Nom de l'agence",
    rules: [validate.required],
  },
  {
    name: "email",
    type: "email",
    id: "email",
    label: "Email de l'agence",
    rules: [validate.required, validate.email],
  },
  {
    name: "phone",
    type: "text",
    id: "phone",
    label: "Telephone de l'agence",
    rules: [validate.required],
  },

  {
    name: "address",
    type: "text",
    id: "location",
    label: "Adresse",
    rules: [validate.required],
  },
  {
    name: "accountSold",
    type: "number",
    id: "accountSold",
    label: "Solde",
    rules: [validate.required, validate.numbers],
  },
  {
    name: "currencyId",
    type: "select",
    id: "currencyId",
    label: "Devise",
    itemValue: "id",
    itemTitle: "name",
    rules: [validate.required],
    values: currencies,
  },
  {
    name: "cityId",
    type: "select",
    id: "cityId",
    label: "Ville",
    itemValue: "id",
    itemTitle: "name",
    rules: [validate.required],
    values: cities,
  },
]);

let isOpen = ref<boolean>(props.isOpenDrawer);

const completedFormField: any = reactive<any>({});
let isValid = ref<boolean>(false);
let method = ref<string>("");

watch(
  () => props.isOpenDrawer,
  (valueselection) => {
    isOpen.value = valueselection;
  }
);

watch(isOpen, (valueselection) => {
  emit("handleClose", valueselection);
});

const onSubmit = async () => {
  method.value = `store`;
  isOpen.value = false;
  let uri = props.entityToCrud.name;
  await $fetch(`${API_URL}/${uri}/${method.value}`, {
    method: "POST",
    body: { ...completedFormField },
  });
  emit("handleSubmit", completedFormField);
};
</script>
