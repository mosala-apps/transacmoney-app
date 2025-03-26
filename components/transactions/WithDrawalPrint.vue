<template>
    <v-container class="py-8">
      <v-card max-width="700" class="mx-auto py-6 px-4" elevation="0">
        <v-row justify="space-between">
          <v-btn color="primary" @click="generatePDF">Télécharger PDF</v-btn>
          <v-btn color="secondary" @click="printContent">Aperçu avant impression</v-btn>
        </v-row>
      </v-card>
  
      <!-- Contenu à exporter/imprimer -->
      <v-card max-width="700" class="mx-auto pa-4 shadow-xl" ref="pdfContent">
        <TransactionsReceiptPrintSection
          :formatted-date="formattedDate"
          :transaction="transactionState"
        />
        <v-divider class="hr"></v-divider>
        <TransactionsReceiptPrintSection
          :formatted-date="formattedDate"
          :transaction="transactionState"
        />
      </v-card>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { jsPDF } from 'jspdf';
  import html2canvas from 'html2canvas';
  import { useTransactionStore } from '~/store/transaction';
  import { storeToRefs } from 'pinia';
  
  const { transactionState } = storeToRefs(useTransactionStore());
  const formattedDate = computed(() => getDateFormatted(transactionState.value.createAt));
  
  const pdfContent = ref<HTMLElement | null>(null);
  
  // Télécharger en PDF
  const generatePDF = async () => {
    const element = pdfContent.value;
  
    if (!element) {
      alert("Aucun contenu détecté pour le PDF.");
      return;
    }
  
    await nextTick();
    const canvas = await html2canvas(element, { scale: 2 });
  
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("transaction.pdf");
  };
  
  // Aperçu avant impression
  const printContent = () => {
    const element = pdfContent.value;
  
    if (!element) {
      alert("Aucun contenu détecté pour l'impression.");
      return;
    }
  
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      const content = element.outerHTML;
      printWindow.document.write(`
        <html>
          <head><title>Aperçu Impression</title></head>
          <body>${content}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };
  </script>
  
  <style scoped>
  .text-primary {
    color: #007bff;
  }
  .hr {
    border: 2px dashed rgba(12, 47, 100, 0.8);
    width: 100%;
    display: block;
  }
  
  @media print {
    .shadow-xl {
      box-shadow: none;
    }
  }
  </style>
  