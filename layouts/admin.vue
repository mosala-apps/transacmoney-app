<template>
  <div>
    <div v-if="showHideSpinner">
      <v-overlay 
      :model-value="showHideSpinner" 
      class="align-center justify-center">
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </v-overlay>
    </div>
    <v-app id="inspire" v-else>
      <AdminSideBar>
        <slot />
      </AdminSideBar>
    </v-app>
  </div>
</template>
<script setup lang="ts">
const showHideSpinner = ref<boolean>(true);
onBeforeMount(() => {
  showHideSpinner.value = true;
});
onMounted(() => {
  setTimeout(()=>{
    showHideSpinner.value = false;
  },2000)
});
</script>
<style lang="scss">
@use "@/assets/main";
@use "@/assets/abstracts/_variables";

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  & div {
    position: absolute;
    border: 4px solid variables.$primary-color !important;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  & div:nth-child(2) {
    animation-delay: -0.5s;
  }
}

@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }

  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }

  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }

  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>