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
}


export interface IAgency{
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
