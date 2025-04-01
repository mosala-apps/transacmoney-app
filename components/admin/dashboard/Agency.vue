<template>
  <div>
    <v-container fluid>
      <div id="statistic" class="">
        <v-row class="row text-center" align="center">
          <v-col class="col-6 col-sm-6 col-md-3">
            <div class="pie-chart-item">
          <h3 class="text-center">Répartition des Dépôts en moyenne</h3>
          <VueApexCharts type="pie" :options="depositChartOptions" :series="depositSeries" height="350" />
        </div>
          </v-col>
         
         
          <v-col class="col-6 col-sm-6 col-md-3">
            <div class="pie-chart-item">
          <h3 class="text-center">Répartition des Rétraits en moyenne</h3>
          <VueApexCharts type="pie" :options="withdrawalChartOptions" :series="withdrawalSeries" height="350" />
        </div>
          </v-col>
        </v-row>
      </div>

    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useTransactionStore } from "~/store/transaction";

const route = useRoute();
const isLoading = ref(false);
const { getTransactionStatsByAgency } = useTransactionStore();
const { transactionsCountByAgency } = storeToRefs(useTransactionStore());

const fetchData = async () => {
  isLoading.value = true;
  try {
    await getTransactionStatsByAgency();
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchData);
watch(() => route.fullPath, fetchData);

// Pie chart for Dépôts
const depositSeries = computed(() => [
  transactionsCountByAgency.value?.depositCdfCountAvg ?? 0,
  transactionsCountByAgency.value?.depositCfaCountAvg ?? 0,
  transactionsCountByAgency.value?.depositEuroCountAvg ?? 0,
  transactionsCountByAgency.value?.depositUSDCountAvg ?? 0,
]);

const depositChartOptions = ref({
  labels: ["Dépôt CDF", "Dépôt CFA", "Dépôt EURO", "Dépôt USD"],
  title: { text: "Répartition des Dépôts par Devise", align: "center" },
  colors: ["#28a745", "#ffc107", "#007bff", "#dc3545"],
  legend: {
    position: "bottom",
    horizontalAlign: "center",
    offsetX: 0,
    offsetY: -10,
  },
});

// Pie chart for Retraits
const withdrawalSeries = computed(() => [
  transactionsCountByAgency.value?.withdrawalCdfCountAvg ?? 0,
  transactionsCountByAgency.value?.withdrawalCfaCountAvg ?? 0,
  transactionsCountByAgency.value?.withdrawalEuroCountAvg ?? 0,
  transactionsCountByAgency.value?.withdrawalUSDCountAvg ?? 0,
]);

const withdrawalChartOptions = ref({
  labels: ["Retrait CDF", "Retrait CFA", "Retrait EURO", "Retrait USD"],
  title: { text: "Répartition des Retraits par Devise", align: "center" },
  colors: ["#20c997", "#fd7e14", "#6f42c1", "#e83e8c"],
  legend: {
    position: "bottom",
    horizontalAlign: "center",
    offsetX: 0,
    offsetY: -10,
  },
});
</script>

<style lang="scss">
@import "@/assets/components/dashboard";

// Style pour organiser les Pie Charts côte à côte avec un gap
.pie-charts-container {
  display: flex;
  gap: 30px;
  margin-top: 2rem;
 //flex-wrap: wrap;
}

.pie-chart-item {
  justify-content: center;
  background-color: $white-color;
  padding: 2rem;
  border-radius: 10px;
 // width: 50%; /* Pour occuper la moitié de l'espace dans un conteneur flex */
  min-width: 48.5%;
  text-align: center;
}
@media (max-width: 768px) {
  .pie-charts-container{
    flex-wrap: wrap;
  }
  .pie-chart-item {
    min-width: 100%;
  }
}
</style>
