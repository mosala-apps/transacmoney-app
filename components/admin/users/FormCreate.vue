<template>
  <v-navigation-drawer v-model="isOpen" temporary location="right" width="500">
    <h4 class="ma-6 text-center text-uppercase">Créer une agence</h4>
    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
      <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
type Props = {
  isOpenDrawer: boolean,
};
const emit = defineEmits<{
  (e: "handleClose", value: boolean): void;
}>();
const props = defineProps<Props>();
let isOpen = ref<boolean>(props.isOpenDrawer);

watch(
  () => props.isOpenDrawer,
  (valueselection) => {
    isOpen.value = valueselection;
  }
);

watch(isOpen, (valueselection) => {
  emit("handleClose", valueselection);
});
</script>
