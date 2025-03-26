
  import { API_URL } from "~/config/ApiURL";

   
export const useCurrencyStore = defineStore("currency", {
  state: () => ({
    currencies: [] as any,
    isLoading: false,
    token: useCookie('access_token')
   // reload: false,
  }),
  actions: {
  
    async getAllCurrencies(){
      try {
       const { data, error, execute, refresh } = await useFetch(`${API_URL}/currencies`)
       if (data.value) {
           this.currencies = data.value

       }
      } catch (error) {
       
      }

   },
  }
});
