import { format } from "date-fns"
import { fr } from 'date-fns/locale';
export const getDateFormatted = (newDate: string) => {
    return format(new Date(newDate), "dd/MM/yyyy 'à' HH'h'mm'", { locale: fr })
  }
  