// tslint:disable-next-line: quotemark

export class UserModel {
  public nombre: string;
  public apellido: string;
  public documento: string;
  public password: string;
  public organismo: string;
  public interno: string;
  public box: string;
  public signupDate?: Date;
  public lastLogin?: Date;
  public role?: string;
  // tslint:disable-next-line: variable-name
  public _id?: string;

  setUser(user: any) {
    // tslint:disable-next-line: quotemark
    this.nombre = user.nombre || " ";
    // tslint:disable-next-line: quotemark
    this.apellido = user.apellido || "";
    // tslint:disable-next-line: quotemark
    this.documento = user.documento || "";
    // tslint:disable-next-line: quotemark
    this.password = user.password || "";
    // tslint:disable-next-line: quotemark
    this.organismo = user.organismo || "";
    // tslint:disable-next-line: quotemark
    this.interno = user.interno || "";
    // tslint:disable-next-line: quotemark
    this.signupDate = user.signupDate || "";
    // tslint:disable-next-line: quotemark
    this.lastLogin = user.lastLogin || "";
    // tslint:disable-next-line: quotemark
    this.box = user.box || "";
    // tslint:disable-next-line: quotemark
    this.role = user.role || "";
    // tslint:disable-next-line: quotemark
    this._id = user.id;
  }
}
