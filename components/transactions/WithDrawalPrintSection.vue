<template>
    <v-card max-width="650" class="mx-auto pa-4 shadow-xl">
      <h2 class="text-center font-weight-bold text-primary mb-4">TRANSAC-MONEY</h2>
      
      <v-divider class="mb-4"></v-divider>
      
      <section class="agency-info text-body-2 mb-3">
        <p class="font-weight-medium">Agence: <span class="font-weight-bold">{{ agency.name }}</span></p>
        <p class="font-weight-medium">Adresse: <span class="font-weight-bold">{{ agency.address }}</span></p>
      </section>
  
      <v-card-text ref="pdfContent" class="transaction-section">
        <v-row class="py-4">
          <v-col cols="12" md="6">
            <p class="py-1"><strong>Expéditeur :</strong> {{ transactionState.sender.firstName }} {{ transactionState.sender.lastName }}</p>
            <p class="py-1"><strong>Tél :</strong> {{ transactionState.sender.phone }}</p>
            <p class="py-1"><strong>Ville :</strong> {{ transactionState.originCity.name }}</p>
          </v-col>
          <v-col cols="12" md="6">
            <p class="py-1"><strong>Bénéficiaire :</strong> {{ transactionState.receiver.firstName }} {{ transactionState.receiver.lastName }}</p>
            <p class="py-1"><strong>Tél :</strong> {{ transactionState.receiver.phone }}</p>
            <p class="py-1"><strong>Ville :</strong> {{ transactionState.destinationCity.name }}</p>
          </v-col>
        </v-row>
        
        <v-divider class="my-3"></v-divider>
        
        <v-sheet color="#f3f4f6" class="pa-4">
          <v-row>
            <v-col cols="12">
              <p><strong>Nom / Description</strong></p>
              <v-divider></v-divider>
              <div class="d-flex justify-space-between">
                <span>Montant :</span>
                <span class="font-weight-bold">{{ transactionState.amount }} USD</span>
              </div>
              <div class="d-flex justify-space-between">
                <span>Commission :</span>
                <span class="font-weight-bold">{{ transactionState.commission }} USD</span>
              </div>
              <div class="d-flex justify-space-between">
                <span>Montant Retiré :</span>
                <span class="font-weight-bold text-success">{{ transactionState.finalAmount }} USD</span>
              </div>
            </v-col>
          </v-row>
        </v-sheet>
  
        <p class="text-right mt-4 text-secondary">Fait à Kinshasa, le {{ formattedDate }}</p>
  
        <v-row justify="space-between" class="mt-4">
          <div>
            <p>Nom et Signature du Bénéficiaire</p>
            <span>.............................................</span>
          </div>
          <div>
            <p>Nom et Signature de l’Agent</p>
            <span>{{ transactionState.executor.firstName }} {{ transactionState.executor.lastName }}</span>
          </div>
        </v-row>
      </v-card-text>
  
      <v-divider class="mt-6 mb-4"></v-divider>
  
      <v-row justify="space-between">
        <v-btn color="primary" @click="generatePDF">Télécharger PDF</v-btn>
        <v-btn color="secondary" @click="printFrame">Aperçu avant impression</v-btn>
      </v-row>
  
      <iframe ref="printFrameRef" style="display: none;"></iframe>
    </v-card>
  </template>
  
  <script setup>
  const props = defineProps({
    agency: Object,
    transactionState: Object,
    formattedDate: String,
  });
  
  function generatePDF() {
    // Logique pour générer un PDF
    console.log("Génération du PDF...");
  }
  
  function printFrame() {
    // Logique pour l'impression
    console.log("Aperçu avant impression...");
  }
  </script>
  
  <style scoped>
  .text-primary {
    color: #1a73e8;
  }
  .text-secondary {
    color: #6c757d;
  }
  .shadow-xl {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  </style>
  