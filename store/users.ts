
  import { API_URL } from "~/config/ApiURL";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [] as any,
    isLoading: false,
    reload: false,
  }),
  actions: {
    async getAllUsers(){
       try {
        const {
            data,
            pending
          } = await useFetch(`${API_URL}/users`);
          this.isLoading = pending.value
        if (data.value) {
            this.users = data.value

        }
       } catch (error) {
        
       }

    },
  }
});
