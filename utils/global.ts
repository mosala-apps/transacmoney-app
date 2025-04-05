import { format } from "date-fns"
import { fr } from 'date-fns/locale';
import { StatusTransaction, TransactionEnum } from "~/types/transaction.enum";
export const getDateFormatted = (newDate: string) => {
    return format(new Date(newDate), "dd/MM/yyyy 'à' HH'h'mm'", { locale: fr })
  }
export const getTransactionStatusColor = (status: string) => {
  if (status === StatusTransaction.IN_PROGRESS ) return 'blue'
  else if (status === StatusTransaction.ACCEPTED ) return 'green'
  else if (status === StatusTransaction.REJECTED ) return 'red'
}

export const getFormattedTransactionStatus = (status: string) => {
  if (status === StatusTransaction.IN_PROGRESS ) return 'En cours'
  else if (status === StatusTransaction.ACCEPTED ) return 'Traité'
  else if (status === StatusTransaction.REJECTED ) return 'Rejetée'
}
export const getFormattedCommissionStatus = (status: boolean) => {
  if (status ) return "Payée";
  return "Non payée"
}
export const getFormattedTransactionType = ({type, status}:any) => {
 
  if (type === TransactionEnum.WITHDRAWAL && status === StatusTransaction.ACCEPTED  ) return 'Retrait'
  else if (type === TransactionEnum.DEPOSIT ) return 'Dépot'
 
}