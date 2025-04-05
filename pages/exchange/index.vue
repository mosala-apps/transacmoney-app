<template>
  <sharedAdminContainer :showSubMenus="false">
    <v-tabs v-model="tab" color="deep-purple-accent-4" fixed-tabs>
      <v-tab :value="1">Taux de change</v-tab>
      <v-tab :value="2">Débuter un compte</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item :value="1">
        <exchange-rates-list v-if="tab === 1" />
      </v-tabs-window-item>

      <v-tabs-window-item :value="2" >
        <accounts-open-account v-if="tab === 2" />
      </v-tabs-window-item>
    </v-tabs-window>
  </sharedAdminContainer>
</template>

<script lang="ts" setup>
definePageMeta({
  title: "Bureau de change",
  meta: [
    {
      name: "description",
      content: "Bureau de change",
    },
  ],
  layout: "admin",
})

const tab = ref(1)
</script>
