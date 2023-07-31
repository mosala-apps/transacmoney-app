<template>
    <div>
      <v-container fluid>
        <div id="statistic" class="statistic-section one-page-section">
          <v-row class="row text-center" align="center">
            <v-col class="col-6 col-sm-6 col-md-3">
              <div class="card-kpi">
                <i class="fa fa-archive fa-2x stats-icon"></i>
                <p class="stats-text">Sous-Agences</p>
                <div class="stats-line-black"></div>
                <h2 class="timer count-title count-number">
                2
                </h2>
               
              </div>
            </v-col>
            <v-col class="col-6 col-sm-6 col-md-3">
              <div class="card-kpi">
                <i class="fa fa-user fa-2x stats-icon"></i>
                 <p class="stats-text">Utilisateurs</p>
                   <div class="stats-line-black"></div>
                <h2 class="timer count-title count-number">
                 25
                </h2>
             
               
              </div>
            </v-col>
            <v-col class="col-6 col-sm-6 col-md-3">
              <div class="card-kpi">
                <i class="fa fa-users fa-2x stats-icon"></i>
                <p class="stats-text">Transaction Moyenne de depots</p>
                  <div class="stats-line-black"></div>
                <h2 class="timer count-title count-number">
                  10
                </h2>
               
              </div>
            </v-col>
            <v-col class="col-6 col-sm-6 col-md-3">
              <div class="card-kpi">
                <i class="fa fa-university fa-2x stats-icon"></i>
                <p class="stats-text">Transaction Moyenne de Retraits</p>
                 <div class="stats-line-black"></div>
                <h2 class="timer count-title count-number">
                 25
                </h2>
              
              </div>
            </v-col>
          </v-row>
        </div>
        <client-only placeholder="Loading...">
          chart
        </client-only>
      </v-container>
    </div>
  </template>
  
  <script setup lang="ts">
 // const { data, error, execute, refresh } = await useFetch(`${API_URL}/agency`,{
//   watch:[reload]
// })
  </script>
  <style lang="scss">
  @import '@/assets/components/dashboard';
</style>
 