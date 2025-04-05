
import { API_URL } from "~/config/ApiURL";
import { findCommissionsByAgencyId } from "~/services/transactionService";
import { TransactionEnum } from "~/types/transaction.enum";
import { ITransaction } from "~/types/transaction.interface";


export const useTransactionStore = defineStore("transactionStore", {
  state: () => ({
    transactions: [] as ITransaction[],
    deposits: [],
    withdrawals: [],
    isLoading: false,
    error: null,
    countAllEntities: null,
    transactionsCountByAgency: null,
    transactionState: {} as ITransaction,
    token: useCookie('access_token'),
    commissionsByAgencyId: [],
    loadingCommissionsAgencyId: false,
    // reload: false,
  }),
  actions: {
    async getAgencyTransactionsByType(TransactionType: TransactionEnum, reload: any) {
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
          console.log("Tr:", TransactionType, result)
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
    async getAllTransactions(reload: any) {
      try {
        const { data, error, execute, refresh, pending } = await useFetch(`${API_URL}/transactions`, {
          key: 'transactions-key',
          immediate: true,
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        // this.isLoading = pending.value
        console.log("transactions ref", data);
        if (data && data?.value !== undefined) {
          console.log("transactions ref2:", data)
          console.log("transactions data:", data.value)
          this.transactions = data.value;
        }
      } catch (error) {

      }

    },
    async getAllEntitiesCount(reload: any) {
      try {
        const { data, error, execute, refresh, pending } = await useFetch(`${API_URL}/transactions/entities-count`, {
          key: 'transactions-key',
          immediate: true,
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        // this.isLoading = pending.value
        console.log("transactions ref", data);
        if (data && data?.value !== undefined && data?.value?.statusCode === 200) {
          console.log("transactions ref2:", data)
          console.log("transactions data:", data.value)
          this.countAllEntities = data.value?.data;
        }
      } catch (error) {

      }

    },
    async getTransactionStatsByAgency(reload: any) {
      try {
        const { data, error, execute, refresh, pending } = await useFetch(`${API_URL}/transactions/count-by-agency`, {
          key: 'transactions-key2',
          immediate: true,
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        // this.isLoading = pending.value
        console.log("transactions ref", data);
        if (data && data?.value !== undefined && data?.value?.statusCode === 200) {
          console.log("transactions ref2:", data)
          console.log("transactions data:", data.value)
          this.transactionsCountByAgency = data.value?.data;
        }
      } catch (error) {

      }

    },
    async getCommissionsByAgencyId(id: any) {
      this.loadingCommissionsAgencyId = true
      try {
        const data = await findCommissionsByAgencyId(this.token)
        if (data && data !== undefined && data.length > 0) {
        
          this.commissionsByAgencyId = data;
        }
      } catch (error) {

      }
      finally {
        this.loadingCommissionsAgencyId = false
      }

    },

    setTransaction(transaction: any) {
      try {

        this.transactionState = transaction
      } catch (error) {

      }

    },

  }
});
