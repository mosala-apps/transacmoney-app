<template>
  <v-navigation-drawer v-model="isOpen" temporary location="right" width="500" flat  style="top: 0; height: 100%;" >
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
      <v-autocomplete
          v-model="completedFormField.cityId"
          
          label="Ville"
          :items="citiesData"
          item-value="id"
          item-title="name"
          variant="outlined"
        ></v-autocomplete>
      <shared-button
        btn-class="btn-primary"
        :label="entityToCrud.btnTitle"
        class="mb-2"
        type="submit"
        width="500"
      />
    </v-form>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { FormType } from "~/types/form.type";
import { IEntityCrud } from "~/types/user.interface";
import { API_URL } from "~/config/ApiURL";
let  reload = ref(false);
const { data:citiesData, error, execute, refresh } = await useFetch(`${API_URL}/cities`,{
  watch:[reload]
})
const operations = reactive([
  {
    id:1,
    name:'Depot'
  },
  {
    id:2,
    name:'Retrait'
  },
  
  
])
const roles = useRoles();
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
  let uri =props.entityToCrud.name
  await $fetch(`${API_URL}/${uri}/${method.value}`, {
    method: "POST",
    body: { ...completedFormField },
  });
  emit("handleSubmit", completedFormField);
};
</script>
