<template>
  <v-dialog v-model="open" persistent max-width="400px" >
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="btnCancelColor" dark @click="closeModal">
          {{ btnCancelText }}
        </v-btn>
        <v-btn :color="btnConfirmColor" dark @click="handleConfirm">
          {{ btnConfirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
  
  <script setup lang="ts">
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "Titre par défaut",
  },
  message: {
    type: String,
    default: "Message par défaut.",
  },
  btnCancelText: {
    type: String,
    default: "Fermer",
  },
  btnConfirmText:{
    type: String,
    default: "Confirmer",
  },
  btnConfirmColor: {
    type: String,
    default: "red",
  },
  btnCancelColor: {
    type: String,
    default: "red",
  },
});

const emit = defineEmits(["onCancel",'onConfirm']);
const open = ref<boolean>(props.isOpen);
watch(
  () => props.isOpen,
  (value) => {
    open.value = value;
  }
);
const closeModal = () => {
  emit("onCancel");
};
const handleConfirm =()=>{
  emit('onConfirm')
}
</script>
  