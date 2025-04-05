export interface IAuthPayload{
  id: number;
  identifier: string;
  email: string;
  password: string;
}

export interface IUserResponse {
  id: number;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  token: any;
  agency?: IAgency;
  subAgency?: ISubAgency;
  accessToken: string;
}


export interface IAgency{
  id: number
  name: string;
}
export interface ISubAgency{
  name: string;
}
export interface IEntityCrud {
  method?: string;
  name: string;
  formTitle: string;
  btnTitle: string;
}


export interface IExecutor {
  email: string;
  role: string; // Possible à remplacer par un enum pour les rôles
}

// Exports des interfaces
export interface IReceiver {
  email: string;
  role: string; // Possible à remplacer par un enum pour les rôles
}

export interface ISender {
  email: string;
  role: string; // Possible à remplacer par un enum pour les rôles
}
export interface IUser {
  createdAt: string; // Date de création
  updatedAt: string; // Date de mise à jour
  deletedAt: string | null; // Date de suppression (si applicable)
  id: number; // Identifiant unique
  name: string; // Nom de l'utilisateur
  lastName: string; // Nom de famille
  firstName: string; // Prénom
  identityType: string | null; // Type d'identité (ex. Passeport, CNI, etc.)
  identityTypeNumber: string | null; // Numéro du document d'identité
  gender: "M" | "F"; // Genre (Masculin ou Féminin)
  username: string; // Nom d'utilisateur
  phone: string; // Numéro de téléphone
  email: string; // Adresse e-mail
  password: string; // Mot de passe haché
  salt: string; // Sel pour le mot de passe haché
  role: string; // Rôle de l'utilisateur (ex. expeditor, agency, etc.)
  isActive: boolean; // Indique si l'utilisateur est actif
  resetPasswordCode: string | null; // Code de réinitialisation du mot de passe (si applicable)
  resetPasswordDate: string | null; // Date de réinitialisation du mot de passe
}
