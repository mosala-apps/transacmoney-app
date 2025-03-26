
  import { API_URL } from "~/config/ApiURL";
import { TransactionEnum } from "~/types/transaction.enum";
import { ITransaction } from "~/types/transaction.interface";

   
export const useTransactionStore = defineStore("transactionStore", {
  state: () => ({
    transactions: [] as ITransaction[],
    deposits:[],
    withdrawals:[],
    isLoading: false,
    error: null,
    transactionState:{} as ITransaction,
    token: useCookie('access_token')
   // reload: false,
  }),
  actions: {
    async getAgencyTransactionsByType(TransactionType: TransactionEnum, reload:any){
       try {
        this.isLoading = true
        const TRANSACTION_TYPE = `transactions-by-type?type=${encodeURIComponent(TransactionType)}`
        const resonse = await fetch(`${API_URL}/transactions/${TRANSACTION_TYPE}`, {
          //  watch: [reload],
            headers: {
                Authorization: `Bearer ${this.token}`
            }
          })
          if (resonse.ok) {
            const result = await resonse.json()
            console.log("Tr:", TransactionType, result )
          if (TransactionType === TransactionEnum.DEPOSIT) {
            this.deposits = result
          }
          else if (TransactionType === TransactionEnum.WITHDRAWAL) {
            this.withdrawals = result
          }
        }
        this.isLoading = false
      } catch (error) {
       
       }

    },
    async getAllTransactions(reload:any){
      try {
       const { data, error, execute, refresh,pending } = await useFetch(`${API_URL}/transactions`, {
         watch: [],
         headers: {
             Authorization: `Bearer ${this.token}`
         }
       })
       this.isLoading = pending.value
       this.transactions = data as any
      } catch (error) {
       
      }

   },
   setTransaction(transaction:any){
    try {
 
     this.transactionState = transaction
    } catch (error) {
     
    }

 },
  
  }
});
