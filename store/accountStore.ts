import { defineStore } from "pinia";
import { fetchAccountHistory, fetchAccountsByAgency } from "~/services/accountService";
import { IAccount } from "~/types/account";


export const useAccountStore = defineStore("accountStore", {
  state: () => ({
    accounts: [] as IAccount[],
    accountHistory: [] as IAccount[],
    account: {} as IAccount,
    loadingAccountHistory: false,
    isLoading: false,
    error: null,
    token: useCookie("access_token"),
  }),

  actions: {
    async getAccountsByAgency() {
      this.isLoading = true;
      try {
        const data = await fetchAccountsByAgency(this.token);
        this.accounts = data;
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    },
    async getAccountHistory(accountId: number) {
      this.loadingAccountHistory = true;
      try {
        const response = await fetchAccountHistory(accountId, this.token);
        this.accountHistory = response?.data;
        this.account = response?.account;
      } catch (error) {
        this.error = error;
      } finally {
        this.loadingAccountHistory = false;
      }
    },
  },
});
