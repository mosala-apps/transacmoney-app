import { API_URL } from "~/config/ApiURL";

export const useCityStore = defineStore("city", {
  state: () => ({
    cities: [] as any,
    isLoading: false,
    agencyWithCount: null,
    reload: false,
  }),
  actions: {
    async getAllCities(){
       try {
        const { data, error, execute, refresh } = await useFetch(`${API_URL}/cities`)
        if (data.value) {
            this.cities = data.value
        }
       } catch (error) {
        
       }

    },
  }
});
