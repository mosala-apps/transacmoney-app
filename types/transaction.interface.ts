import { ICity } from "./city.interface";
import { ICurrency } from "./currency.interface";
import { DestinationTypeEnum, StatusTransaction, TransactionEnum } from "./transaction.enum";
import { IReceiver, ISender, IExecutor, IUser } from "./user.interface";

 
  
  
  // Transaction sans 'id'
  export interface ITransaction {
    createAt: string; // Date de création
    updatedAt: string; // ISO string pour la date
    type: "DEPOSIT" | "WITHDRAWAL"; // Possible à remplacer par un enum pour les types de transaction
    amount: number;
    status: string; // Possible à remplacer par un enum pour les statuts
    amountWithCommission: number;
    transactionCode?: string;
    destinationType: string;
    receiver: IUser;
    sender: IUser;
    executor: IUser;
    originCity: ICity;
    destinationCity: ICity;
    currency: ICurrency;
  }
  
  export interface ITransactionPayload {
    type: TransactionEnum;
    senderId: number;
    receiverId: number;
    amount: number;
    amountWithCommission: number;
    executorId: number;
    currencyId: number;
    originCityId: number;
    destinationCityId: number;
    destinationType: DestinationTypeEnum;
    status: StatusTransaction;
    transactionCode?: string;
  }

  export interface ITransactionUpdatePayload {
    /** Montant de la transaction */
    amount: number;
  
    currencyId: number;
    
    /** ID du destinataire (facultatif) */
    receiverId?: number;
  
    /** Type d'identité du destinataire */
    receiverIdentityType: any;
  
    /** Numéro d'identité associé au type d'identité du destinataire */
    receiverIdentityTypeNumber: string;
  
    /** ID du validateur final de la transaction */
    finalValidatorId: number;
  
    /** Code unique de la transaction */
    transactionCode: string;
  }
  
  export interface ICalculateCommission{
    amount: number;
    currencyId: number
    destinationType: DestinationTypeEnum; 
  }