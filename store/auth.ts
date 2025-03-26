import { useToast } from './../composables/toast';
import { API_URL } from "~/config/ApiURL";
import { IAuthPayload, IUserResponse } from "../types/user.interface"
const user: IUserResponse = {} as IUserResponse;
export const useAuthStore = defineStore('auth', {
    state: () => ({
      isAuthenticated: false,
      loading: false,
      statusCode: null,
      error: null,
      user,
    }),
    actions: {
      async login({ identifier, password }: IAuthPayload) {
      
        try {
          const { data, pending, error }: any = await useFetch(`${API_URL}/auth/login`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: {
              identifier,
              password,
            },
          });
          this.loading = pending;
    
          if (data.value) {
            const token = useCookie('access_token'); 
            token.value = data?.value?.access_token; // set token to cookie
            this.isAuthenticated = true; 
            
            this.user = {...data?.value?.user, accessToken: token?.value, agency:data?.value?.agency} 
          }
          else{
            this.error= error?.value?.data.message
            this.statusCode =error?.value?.data.statusCode
          }
          //return this.statusCode
        } catch (error) {
        }
       
      },
      logout() {
        const token = useCookie('access_token');
        const auth= useCookie('auth') // useCookie new hook in nuxt 3
        this.isAuthenticated = false; // set authenticated  state value to false
        token.value = null; // clear the token cookie
        auth.value = null; // clear the auth cookie
      },
    },
    persist: {
      storage: persistedState.cookiesWithOptions({
        sameSite: 'strict',
      }),
    },
  });