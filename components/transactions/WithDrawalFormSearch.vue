<template>
  <div>
    <v-divider color="primary"></v-divider>
    <div>
      <h4
        class="ma-6 text-center text-uppercase text-h5"
        v-if="Object.keys(transactionState).length !== 0 && isSearched"
      >
        Information sur la transaction
      </h4>
      <h4 class="ma-6 text-center text-uppercase text-h5" v-else>
        Vérification du Code
      </h4>
    </div>
    <v-overlay :model-value="isLoading" class="align-center justify-center">
      <div class="lds-ripple">
        <div>verifiction</div>
        <div></div>
      </div>
    </v-overlay>
    <transactions-with-drawal-preview
      v-if="Object.keys(transactionState).length !== 0 && isSearched"
    />
    <div v-else>
      <v-form
        v-model="isValid"
        ref="Form"
        lazy-validation
        @submit.prevent.stop="onSubmit"
        class="pa-12 d-flex justify-center"
      >
        <div>
          <div>
            <v-alert variant="success" color="error">{{ errorMessage }}</v-alert>
            <label class="label text-grey-darken-2" for="password">Code</label>
            <v-textField
              :rules="[validate.required, validate.string]"
              v-model="completedFormField.transactionCode"
              id="formField.name"
              name="transactionCode"
              type="text"
            />
          </div>
          <shared-button
            btn-class="btn-primary"
            label="Verifier"
            class="mb-2"
            type="submit"
            :loading="isLoading"
            :disabled="!isValid"
            width="500"
          />
        </div>
      </v-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormType } from "~/types/form.type";
import { IAgency, IEntityCrud } from "~/types/user.interface";
import { API_URL } from "~/config/ApiURL";
import { useAuthStore } from "~/store/auth";
import { getDateFormatted } from "@/utils/global";
import { useTransactionStore } from "~/store/transaction";
import { storeToRefs } from "pinia";
const { user } = useAuthStore();
const { setTransaction } = useTransactionStore();
const { transactionState } = storeToRefs(useTransactionStore());
const validate = useFormRules();
const router = useRouter();
const toast = useToast();
const isLoading = ref<boolean>(false);
let isSearched = ref<boolean>(false);
let errorMessage = ref<string>("");
let transaction = ref<any>([]);
const emit = defineEmits<{
  (e: "handleClose", value: boolean): void;
  (e: "handleSubmit", value: any): void;
}>();

const completedFormField: any = reactive<any>({});
let isValid = ref<boolean>(false);
let method = ref<string>("");

const onSubmit = async () => {
  let uri = "transactions/search-code";
  const transactionPayload = {
    code: completedFormField.transactionCode,
  };
  isLoading.value = true;
  isSearched.value = false;
  errorMessage.value = "";
  try {
    const { data, error } = await useFetch(`${API_URL}/${uri}`, {
      method: "POST",
      body: { ...transactionPayload },
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (data.value) {
      toast.success("Operation reussi avec succès!");
      transaction.value = { ...data?.value };
      setTransaction(data?.value);
      //router.push(`/transactions/with-drawal/${completedFormField.transactionCode}`)
    } else {
      errorMessage.value = error?.value?.data.message;
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
</script>
