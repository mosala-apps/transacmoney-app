import { API_URL } from "~/config/ApiURL";
import toast from "~/plugins/toast";
import { ICalculateCommission, ITransactionPayload } from "~/types/transaction.interface";

export const processCommissions = (completedFormField: any, accessToken: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const payload: ICalculateCommission = {
            amount: Number(completedFormField.amount),
            destinationType: completedFormField.destinationType,
            currencyId: completedFormField.currencyId,
        };
        $fetch(`${API_URL}/transactions/calculate-commission`, {
            method: "POST",
            body: { ...payload },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response: any) => {
                if (response.statusCode === 200) {
                    resolve(response?.data);
                } else {
                    reject(new Error("Unexpected response status"));
                }
            })
            .catch((error: any) => {
                toast.error(error.message, {
                    delay: 3000,
                });
                reject(error);
            });
    });
};
  