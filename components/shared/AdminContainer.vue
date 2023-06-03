<template>
     <v-main class="bg-grey-lighten-3" v-bind="props">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list rounded="lg">
                <v-list-item v-for="item in props.subMenus" :key="item" link>
                  <v-list-item-title> {{ item }} </v-list-item-title>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item link color="grey-lighten-4">
                  <v-list-item-title> Deconnexion </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <slot />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>

<script lang="ts" setup>

type AdminContainerProps={
  subMenus: Array<string>
}
const props = defineProps<AdminContainerProps>()
</script>