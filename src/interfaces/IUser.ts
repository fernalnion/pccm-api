export interface IUser {
  _id?: string | any;
  email: string;
  password: string;
  firstname: string;
  lastname?: string;
  role: string | any;
}
