
<template>
    <v-container fluid class="px-12">
      <v-row>
        <v-col v-for="account in accounts" :key="account.id" cols="12" sm="12" md="6">
          <v-card elevation="0">
            <v-img
              :src="getCardImage(account.currency.code)"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.4), rgba(0,0,0,.5)"
              height="200px"
              cover
            >
              <v-card-title class="text-white">
                {{ account.currency.name }} - {{ account.amount }} {{ account.currency.code }}
              </v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>
              <div class="text-center">
                <v-btn 
            
                append-icon="mdi-eye-circle" 
                variant="outlined" 
                color="primary"
                @click="viewAccountHistory(account.id)"
                >
                  <template v-slot:prepend>
                    <v-icon color="success"></v-icon>
                  </template>
                  Voir l'historique du compte
                  <template v-slot:append>
                    <v-icon color="warning"></v-icon>
                  </template>
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script lang="ts" setup>

const props = defineProps({
  accounts: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["viewAccountHistory"]);
const getCardImage = (currencyCode: string): string => {
  const images: Record<string, string> = {
    USD: "/images/moneys/money-usd.jpg",
    EURO: "/images/moneys/money-euro.jpeg",
    CDF: "/images/moneys/money-cdf.jpg",
    CFA: "/images/moneys/money-cfa.jpeg",
  };
  return images[currencyCode?.toUpperCase()] || "/images/hiro.jpeg";
};
// const viewAccountHistory = (accountId: string) => {
//   emit("viewAccountHistory", accountId);
// };
const viewAccountHistory = (accountId: number) => {
  // Redirection vers l'historique du compte
  navigateTo(`/accounts/${accountId}/history`);
};
</script>

<style>

</style>