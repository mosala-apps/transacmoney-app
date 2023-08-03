<template>
     <v-main class="bg-slate" v-bind="props"  elevation="0" >
      <v-container  v-if="!isDashboard">
        <v-row>
          <v-col cols="2"  v-if="showMenus">
            <v-sheet rounded="lg" elevation="0">
              <v-list rounded="sm">
                <v-list-item 
                v-for="item in props.subMenus" 
                :key="item" 
                :to="item.path"
                color="primary"
                >
                  <v-list-item-title> {{ item.name }} </v-list-item-title>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item link color="grey-lighten-4">
                  <v-list-item-title> Deconnexion </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg" elevation="0" border="0">
              <slot />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
      <v-container  v-else>
        <v-row>
          <v-col>
            <slot/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>

<script lang="ts" setup>

type AdminContainerProps={
  subMenus?: Array<string>,
  isDashboard?: false,
  showMenus?: true
}
const props = defineProps<AdminContainerProps>()
</script>