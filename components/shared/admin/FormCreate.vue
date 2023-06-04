<template>
  <v-navigation-drawer v-model="isOpen" temporary location="right" width="500">
    <h4 class="ma-6 text-center text-uppercase">{{ entityToCrud.formTitle }}</h4>
    <v-divider></v-divider>
    <v-form
      v-model="isValid"
      ref="Form"
      lazy-validation
      @submit.prevent.stop="onSubmit"
      class="pa-6"
    >
      <div class="mt-1" v-for="(form, index) in props.formFields" :key="index">
        <label class="label text-grey-darken-2" for="password">{{ form["label"] }}</label>
        <v-textField
          :rules="form.rules"
          v-model="completedFormField[form.name]"
          :id="form.name"
          :name="form.name"
          :type="form.type"
        />
      </div>
      <div v-if="entityToCrud.name === 'User'">
        <v-autocomplete
          chips
          label="Roles"
          :items="['SUPER_ADMIM', 'ADMIN', 'AGENCY', 'SUB_AGENCY']"
          variant="outlined"
        ></v-autocomplete>
        <v-autocomplete
          chips
          label="Selectionner l'agence"
          :items="['SUPER_ADMIM', 'ADMIN', 'AGENCY', 'SUB_AGENCY']"
          variant="outlined"
        ></v-autocomplete>
      </div>
      <shared-button
        btn-class="btn-primary"
        :label="entityToCrud.btnTitle"
        class="mb-2"
        type="submit"
      />
    </v-form>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { FormType } from "~/types/form.type";
import { IEntityCrud } from "~/types/user.interface";

type Props = {
  isOpenDrawer: boolean;
  formFields: FormType[];
  entityToCrud: IEntityCrud;
};
const emit = defineEmits<{
  (e: "handleClose", value: boolean): void;
  (e: "handleSubmit", value: any): void;
}>();

const props = defineProps<Props>();
let isOpen = ref<boolean>(props.isOpenDrawer);

const completedFormField: any = ref<any>({});
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

const onSubmit = () => {
  method.value = `store${props.entityToCrud.name}`;
  isOpen.value = false;
  emit("handleSubmit", completedFormField);
};
</script>
