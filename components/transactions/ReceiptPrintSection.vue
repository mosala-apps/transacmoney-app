<template>
  <v-card-text ref="pdfContent" class="transaction-section">
   <v-sheet >
    <h2 class="text-center font-weight-bold text-primary mb-4">TRANSAC-MONEY</h2>
   </v-sheet>
      <v-divider class="mb-4"></v-divider>
      <section class="agency-info text-body-2 mb-3">
        <p class="font-weight-medium">Agence: <span class="font-weight-bold">{{ transaction.executor.firstName }} {{ transaction.executor.lastName }}</span></p>
        <p class="font-weight-medium">Adresse: <span class="font-weight-bold">{{ transaction.executor.address }}</span></p>
      </section>
    <v-row class="py-4">
      <v-col cols="12" md="6">
        <p class="py-1"><strong>Expéditeur :</strong> {{ transaction.sender.firstName }} {{ transaction.sender.lastName }}</p>
        <p class="py-1"><strong>Tél :</strong> {{ transaction.sender.phone }}</p>
        <p class="py-1"><strong>Ville :</strong> {{ transaction.originCity.name }}</p>
      </v-col>
      <v-col cols="12" md="6">
        <p class="py-1"><strong>Bénéficiaire :</strong> {{ transaction.receiver.firstName }} {{ transaction.receiver.lastName }}</p>
        <p class="py-1"><strong>Tél :</strong> {{ transaction.receiver.phone }}</p>
        <p class="py-1"><strong>Ville :</strong> {{ transaction.destinationCity.name }}</p>
      </v-col>
    </v-row>
   

    <!-- Transaction Summary -->
    <v-sheet color="#f3f4f6" class="pa-4">
      <v-row>
        <v-col cols="12">
          <p><strong>Transaction</strong></p>
          <v-divider></v-divider>
          <div class="d-flex justify-space-between">
            <span>Montant :</span>
            <span class="font-weight-bold">{{ transaction.amount }} USD</span>
          </div>
          <div class="d-flex justify-space-between">
            <span>Commission :</span>
            <span class="font-weight-bold">{{ transaction.commission }} USD</span>
          </div>
          <div class="d-flex justify-space-between">
            <span>Montant Retiré :</span>
            <span class="font-weight-bold text-success">{{ transaction.finalAmount }} USD</span>
          </div>
        </v-col>
      </v-row>
    </v-sheet>

    <p class="text-right mt-4 text-secondary">Fait à Kinshasa, le {{ formattedDate }}</p>

    <!-- Signature Section -->
    <v-row justify="space-between" class="mt-4">
      <div>
        <p>Nom et Signature du Bénéficiaire</p>
        <span>.............................................</span>
      </div>
      <div>
        <p>Nom et Signature de l’Agent</p>
        <span>{{ transaction.executor.firstName }} {{ transaction.executor.lastName }}</span>
      </div>
    </v-row>
  </v-card-text>
</template>

<script setup lang="ts">
const props = defineProps({
  formattedDate: String,
  transaction: Object,
});
</script>

<style scoped>
.text-success {
  color: #28a745;
}
.text-secondary {
  color: #6c757d;
}
</style>
