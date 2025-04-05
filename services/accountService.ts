import { API_URL } from "~/config/ApiURL";

export const fetchAccountsByAgency = (accessToken: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    $fetch(`${API_URL}/accounts/find-by-agency`, {
      method: "GET",
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
        console.error("Error fetching accounts:", error);
        reject(error);
      });
  });
};

export const fetchAccountHistory = (accountId: number, accessToken: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    $fetch(`${API_URL}/accounts/${accountId}/history`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response: any) => {
        if (response.statusCode === 200) {
          resolve({ data: response?.data, account: response?.account});
        } else {
          reject(new Error("Unexpected response status"));
        }
      })
      .catch((error: any) => {
        console.error("Error fetching account history:", error);
        reject(error);
      });
  });
};