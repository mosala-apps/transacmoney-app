<template>
  <v-card elevation="0">
    <v-card-title class="text-h6">Taux de Change</v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          v-for="(rate, currency) in exchangeRates"
          :key="currency"
          cols="12"
          sm="3"
        >
          <v-card>
            <v-card-title>{{ currency }}</v-card-title>
            <v-card-subtitle>{{ rate }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">

const exchangeRates = reactive({
  USD: '1 USD = 580 CFA',
  Euro: '1 Euro = 655 CFA',
  CFD: '1 CFD = 600 CFA',
  CFA: '1 CFA = 1 CFA'
})
</script>
