export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface IEntityCrud {
  method?: string;
  name: string;
  formTitle: string;
  btnTitle: string;
}
