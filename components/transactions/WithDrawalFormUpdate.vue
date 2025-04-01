<template>
  <div>
    <v-divider color="primary"></v-divider>
    <h4 class="ma-6 text-center text-uppercase text-h5">VALIDATION DE LA TRANSACTION</h4>
    <v-overlay :model-value="isLoading" class="align-center justify-center">
      <div class="lds-ripple">
        <div>verifiction</div>
        <div></div>
      </div>
    </v-overlay>
    <div class="d-flex justify-center pa-6">
      <v-form v-model="isValid" ref="Form" lazy-validation @submit.prevent.stop="onSubmit">
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
            :readonly="formField.readonly"
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
              :readonly="formField.readonly"
            />
          </div>
        </div>
        <ui-modal
          :isOpen="showModal"
          title="Question"
          message="Voulez-vous valider cette transaction ?"
          btnCancelText="Annuler"
          btnConfirmText="Confirmer"
          btnCancelColor="dark"
          btnConfirmColor="primary"
          @onCancel="showModal = !showModal"
          @onConfirm="onConfirm"
        />
        <shared-button
          btn-class="btn-primary"
          label="Valider"
          class="mb-2"
          type="submit"
          :disabled="!isValid"
          width="500"
        />
      </v-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { FormType } from "~/types/form.type";
import { IAgency, IEntityCrud } from "~/types/user.interface";
import { API_URL } from "~/config/ApiURL";
import { useAuthStore } from "~/store/auth";
import { ITransactionPayload, ITransactionUpdatePayload } from "~/types/transaction.interface";
import { DestinationTypeEnum, StatusTransaction, TransactionEnum } from "~/types/transaction.enum";
import { useTransactionStore } from "~/store/transaction";
import { useCurrencyStore } from "~/store/currency";
const router = useRouter();
const { user } = storeToRefs(useAuthStore());
const identityTypes = useIdentityTypes();
const app = useAppConfig();

const { currencies, getAllCurrencies} = useCurrencyStore()
getAllCurrencies()
const { setTransaction } = useTransactionStore();
const { transactionState } = storeToRefs(useTransactionStore());
const validate = useFormRules();
const route = useRoute();
const toast = useToast();
const showModal = ref(false);
const isLoading = ref<boolean>(false);
let isSearched = ref<boolean>(false);
let errorMessage = ref<string>("");
let transaction = ref<any>([]);
const emit = defineEmits<{
  (e: "handleClose", value: boolean): void;
  (e: "handleSubmit", value: any): void;
}>();
const formFields: FormType[] = reactive<FormType[] | any[]>([
  {
    name: "amount",
    type: "number",
    id: "amount",
    label: "Montant",
    rules: [validate.required, validate.numbers],
    readonly: true,
  },
  
  {
    name: "currencyId",
    type: "select",
    id: "currencyId",
    label: "Devise",
    rules: [validate.required],
    readonly: true,
    itemValue:'id',
    itemTitle:'name',
    values: currencies,
  },
  {
    name: "identityType",
    type: "select",
    id: "identityType",
    label: "Type d'identité",
    itemValue: "slug",
    itemTitle: "name",
    rules: [validate.required],
    readonly: false,
    values: identityTypes,
  },
  {
    name: "identityTypeNumber",
    type: "text",
    id: "identityTypeNumber",
    label: "Numero carte d'identité",
    readonly: false,
    rules: [validate.required, validate.numbers],
  },
]);
const completedFormField: any = reactive<any>({});
let isValid = ref<boolean>(false);
let method = ref<string>("");
onMounted(() => {
  completedFormField.amount = transactionState.value.amount;
  completedFormField.currencyId = transactionState.value.currency.id;
  completedFormField.transactionCode = transactionState.value.transactionCode;
  completedFormField.finalValidatorId = user?.value?.id;
  completedFormField.receiverId = transactionState?.receiver?.id;
});
const onConfirm = () => {
  onUpdate();
  showModal.value = false;
};
const onUpdate = async () => {
  let uri = `transactions/complete/${transactionState.value?.id}`;
  const transactionPayload: ITransactionUpdatePayload = {
    amount: completedFormField.amount,
    transactionCode: completedFormField.transactionCode,
    currencyId: completedFormField.currencyId,
    finalValidatorId: completedFormField.finalValidatorId,
    receiverId: completedFormField.receiverId,
    receiverIdentityType: completedFormField.identityType,
    receiverIdentityTypeNumber: completedFormField.identityTypeNumber,
  };
  isLoading.value = true;
  isSearched.value = false;
  errorMessage.value = "";
  try {
    const { data, error } = await useFetch(`${API_URL}/${uri}`, {
      method: "PATCH",
      body: { ...transactionPayload },
      headers: {
        Authorization: `Bearer ${user.value.accessToken}`,
      },
    });
    if (data.value) {
      toast.success("Operation reussi avec succès!");
      router.push(`/transactions/with-drawal/print/${transactionState.value?.transactionCode}`)
    } else {
      errorMessage.value = error?.value?.data.message;
      //router.push(`/transactions/with-drawal/print/${transactionState.value?.transactionCode}`)
      toast.error(errorMessage.value);
    }
  } catch (error) {
    console.log(error);
    toast.error("Echec lors de la verifiction d'une transaction");
  } finally {
    isLoading.value = false;
    isSearched.value = true;
  }
};
const onSubmit = () => {
  showModal.value = true;
};
</script>
