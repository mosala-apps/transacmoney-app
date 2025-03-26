<template>
    <div>
      <v-container>
        <v-card class="pa-5">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <p class="py-2"><strong>Date :</strong> {{ formattedDate }}</p>
                <p class="py-2">
                  <strong>Expéditeur :</strong> {{ transactionState.sender.firstName }}
                  {{ transactionState.sender.lastName }}
                </p>
                <p class="py-2">
                  <strong>Agence :</strong> {{ transactionState.executor.firstName }}
                  {{ transactionState.executor.lastName }}
                </p>
                <p class="py-2">
                  <strong>Ville d'origine:</strong> {{ transactionState.originCity.name }}
                </p>
              </v-col>
              <v-col cols="12" md="6">
                <p class="py-2">
                  <strong>Bénéficiaire :</strong> {{ transactionState.receiver.firstName }}
                  {{ transactionState.receiver.lastName }}
                </p>
                <p class="py-2">
                  <strong>Ville de destination:</strong> {{ transactionState.destinationCity.name }}
                </p>
                <p class="py-2">
                  <strong>Code :</strong>
                  <span class="text-danger font-weight-bold">
                    {{ transactionState.transactionCode }}
                  </span>
                </p>
                <p class="py-2">
                  <strong>Montant :</strong> {{ transactionState.amount }}
                  {{ transactionState.currency.code }}
                </p>
              </v-col>
            </v-row>
            <v-row>
            </v-row>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <shared-button
              btn-class="btn-primary"
              label="Effectuer le retrait"
              class="mb-2 px-12"
              @click="
                router.push(`/transactions/with-drawal/${transactionState.transactionCode}`)
              "
            />
          
          </v-card-actions>
        </v-card>
      </v-container>
      <v-dialog v-model="showPrintDialog" max-width="600">
        <transactions-with-drawal-print
          :formatted-date="formattedDate"
          :transaction-state="transactionState"
          @close="showPrintDialog = false"
        />
      </v-dialog>
    </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTransactionStore } from '~/store/transaction';
import { ITransaction } from '~/types/transaction.interface';

const router = useRouter()
const { transactionState } = storeToRefs(useTransactionStore());
const formattedDate = computed(() => getDateFormatted(transactionState.value.createAt));
const showPrintDialog = ref(false);
</script>