// Permet d'ajouter le type pour `$swal`
declare module '#app' {
    interface NuxtApp {
      $swal: typeof import('sweetalert2').default;
    }
  }
  
  declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
      $swal: typeof import('sweetalert2').default;
    }
  }
  