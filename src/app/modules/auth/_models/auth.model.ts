import { UserModel } from "./user.model";

export class AuthModel extends UserModel {
  token: string;
  usuario: UserModel;
  role: any;
  menu: string;

  /* setAuth(auth: any) {
    this.token = auth.token;
    this.id = auth.id;
  } */
}
