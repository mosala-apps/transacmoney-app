<template>
  <div>
    <v-container>
      <v-card class="pa-5" max-width="700" elevation="1" outlined>
    <!-- Header avec les informations principales -->
    <v-card-title class="d-flex align-center">
      <v-avatar class="mr-4" color="primary" size="80">
        <span class="text-white text-h5 text-uppercase">{{ transactionState.sender.firstName.charAt(0) }}</span>
      </v-avatar>
      <div>
        <p class="mb-1 text-h6">
          <strong>{{ transactionState.sender.firstName }} {{ transactionState.sender.lastName }}</strong>
        </p>
        <p class="mb-0 text-subtitle-2">
          <strong>Agence:</strong> {{ transactionState.executor.firstName }} {{ transactionState.executor.lastName }}
        </p>
      </div>
    </v-card-title>

    <v-divider></v-divider>

    <!-- Contenu avec la liste des informations -->
    <v-card-text>
      <v-list dense>
        <v-list-item>
          <v-list-item-icon><v-icon>mdi-calendar</v-icon></v-list-item-icon>
          <v-list-item-content>
            <!-- <v-list-item-title><strong>Date :</strong> {{ formattedDate }}</v-list-item-title> -->
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon><v-icon>mdi-map-marker</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <strong>Ville d'origine :</strong> {{ transactionState.originCity.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <strong>Bénéficiaire :</strong> {{ transactionState.receiver.firstName }}
              {{ transactionState.receiver.lastName }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon><v-icon>mdi-city</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <strong>Ville de destination :</strong> {{ transactionState.destinationCity.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon><v-icon color="red">mdi-lock</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <strong>Code :</strong>
              <span class="text-danger font-weight-bold">{{ transactionState.transactionCode }}</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon><v-icon>mdi-cash</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <strong>Montant :</strong> {{ transactionState.amount }} {{ transactionState.currency.code }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
    </v-container>

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
const route = useRoute();
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

const formattedDate = computed(() => getDateFormatted(transactionState.value.createdAt));
onMounted( ()=>{
  fetchTransaction();
})
watch(() => route.fullPath, () => {
  fetchTransaction();
});

const fetchTransaction = async () => {
  let uri = "transactions/search-code";
  const transactionPayload = {
    code: route.params.transactionCode,
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