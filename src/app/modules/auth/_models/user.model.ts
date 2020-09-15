import { AuthModel } from './auth.model';

export class UserModel extends AuthModel {

        public nombre: string;
        public apellido: string;
        public documento: string;
        public password: string;
        public organismo: string;
        public interno: string;
        public box: string;
        public signupDate?: Date;
        public lastLogin?:Date;
        public role?: string;
        public _id?: string;


  setUser(user: any) {
    this.nombre = user.nombre || '';
    this.apellido = user.apellido || '';
    this.documento = user.documento || '';
    this.password = user.password || '';
    this.organismo = user.organismo || '';
    this.interno = user.interno || '';
    this.signupDate = user.signupDate;
    this.lastLogin = user.lastLogin;
    this.box = user.box || '';
    this.role = user.role ||'';
    this._id = user.id;

  }
}
