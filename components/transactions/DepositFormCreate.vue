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
    <v-icon
      size="30"
      color="primary"
      class="d-lg-none d-xl-none d-xxl-none d-sm-flex"
      @click="isOpen = !isOpen"
      >mdi-arrow-left</v-icon
    >
    <h4 class="ma-6 text-center text-uppercase">EFFECTUER UN DEPOT</h4>
    <v-divider color="primary"></v-divider>
    <v-overlay :model-value="isProcessCommission" class="align-center justify-center">
      <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
    </v-overlay>
    <v-form
      v-model="isValid"
      ref="Form"
      lazy-validation
      @submit.prevent.stop="onSubmit"
      class="pa-6"
    >
      <div class="mt-1" v-for="(formField, index) in props.formFields" :key="index">
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
            :readonly="formField.readonly"
            :disabled="formField.disabled"
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
        i
      />
    </v-form>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { FormType } from "~/types/form.type";
import { IAgency, IEntityCrud } from "~/types/user.interface";
import { API_URL } from "~/config/ApiURL";
import { useAuthStore } from "~/store/auth";
import { ICalculateCommission, ITransactionPayload } from "~/types/transaction.interface";
import { DestinationTypeEnum, StatusTransaction, TransactionEnum } from "~/types/transaction.enum";
import { processCommissions } from "~/services/transactionService";
const { user } = useAuthStore();
const toast = useToast();
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
let isProcessCommission = ref<boolean>(false);

watch(
  () => props.isOpenDrawer,
  (valueselection) => {
    isOpen.value = valueselection;
  }
);

watch(isOpen, (valueselection) => {
  emit("handleClose", valueselection);
});
watch(
  () => completedFormField,
  (newValue:any, oldValue) => {
    console.log(newValue);
    if (
      newValue.destinationType !== "" &&
      newValue.amount !== undefined &&
      newValue.currencyId !== undefined
    ) {
      calculateCommissions();
    }
  },
  { deep: true }
);

const calculateCommissions = () => {
  const payload: ICalculateCommission = {
    amount: Number(completedFormField.amount),
    destinationType: completedFormField.destinationType,
    currencyId: completedFormField.currencyId,
  };
  isProcessCommission.value = true;
  processCommissions(completedFormField, user.accessToken)
    .then((data: any) => {
      console.log(data);
      if (data) {
        completedFormField.commission =
          `${data?.commission} ${data?.currency}` || data?.commission;
        completedFormField.amountWithCommission =
          `${data?.amountWithCommission} ${data?.currency}` ||
          data?.amountWithCommission;
      }

      toast.success("Le montant, incluant la commission, a été correctement calculé.!", {
        delay: 3000,
      });
    })
    .catch((error: any) => {
      console.log(error);
      toast.error(error.message, {
        delay: 3000,
      });
    })
    .finally(() => {
      isProcessCommission.value = false;
    });
};
const onSubmit = async () => {
  let uri = "transactions/create";
  const transactionPayload: ITransactionPayload = {
    type: TransactionEnum.DEPOSIT,
    senderId: completedFormField.senderId,
    receiverId: completedFormField.receiverId,
    amount: Number(completedFormField.amount),
    amountWithCommission: Number(completedFormField.amountWithCommission),
    executorId: user.id,
    currencyId: completedFormField.currencyId,
    originCityId: user?.agency?.id as number,
    destinationCityId: completedFormField.destinationCityId,
    destinationType: completedFormField.destinationType,
    status: StatusTransaction.IN_PROGRESS,
  };

  try {
    await $fetch(`${API_URL}/${uri}`, {
      method: "POST",
      body: { ...transactionPayload },
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    toast.success("Le depot été effectué avec succès!", {
      delay: 3000,
    });
    emit("handleSubmit", transactionPayload);
    isOpen.value = false;
  } catch (error) {
    //ts-ignore
    toast.error("Echec lors de la creation d'un depot", {
      delay: 3000,
    });
  }
};
</script>
