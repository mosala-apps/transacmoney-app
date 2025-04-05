import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
export default defineNuxtPlugin((app) => {
    return {
        provide: {
          swal: Swal, // Utilisé pour accéder à Swal dans les composants
        },
      };
  });
  