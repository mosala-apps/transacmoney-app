import { API_URL } from "~/config/ApiURL";

export const useAgencyStore = defineStore("agency", {
  state: () => ({
    agencies: [] as any,
    isLoading: false,
    agencyWithCount: null,
    reload: false,
  }),
  actions: {
    async getAllAgencies(){
       try {
        const { data, error, execute, refresh } = await useFetch(`${API_URL}/agency`)
        if (data.value) {
            this.agencies = data.value
        }
       } catch (error) {
        
       }

    },
  }
});
