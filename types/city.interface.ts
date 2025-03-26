export interface ICity {
    name: string;
    code: string;
    agencies: any | null; // Si vous avez une structure d'agences, remplacez `any` par le type correct
  }