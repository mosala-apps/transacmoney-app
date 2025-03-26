import { API_URL } from "~/config/ApiURL"

export const useFetchTransactions = async()=>{
    const token = useCookie('access_token');
        
         const { data, error, execute, refresh,pending } = await useFetch(`${API_URL}/transactions`, {
           watch: [],
           headers: {
               Authorization: `Bearer ${token}`
           }
         })
         return {
            transactions:data
          }
        
  
}