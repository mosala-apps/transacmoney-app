import { defineStore } from 'pinia';
export const authStore = defineStore('auth',()=>{
    let user= reactive({})
    let isAuthenticated = ref(false);
    let isError = ref(false);
    let isLoading = ref(false);

    return { user, isAuthenticated, isLoading };

})