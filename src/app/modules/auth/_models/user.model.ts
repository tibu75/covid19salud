// tslint:disable-next-line: quotemark

export class UserModel {
  public nombre: string;
  public apellido: string;
  public documento: string;
  public password: string;
  public organismo: string;
  public active: string;
  public picture?: string;
  public signupDate?: Date;
  public lastLogin?: Date;
  public role?: "ADMIN_ROLE" | "USER_ROLE" | "SYSTEM_ROLE";
  // tslint:disable-next-line: variable-name
  public id?: string;

  setUser(USER: any) {
    // tslint:disable-next-line: quotemark
    this.nombre = USER.nombre || " ";
    // tslint:disable-next-line: quotemark
    this.apellido = USER.apellido || "";
    // tslint:disable-next-line: quotemark
    this.documento = USER.documento || "";
    // tslint:disable-next-line: quotemark
    this.password = USER.password || "";
    // tslint:disable-next-line: quotemark
    this.organismo = USER.organismo || "";
    // tslint:disable-next-line: quotemark
    this.active = USER.active || "";
    // tslint:disable-next-line: quotemark
    this.signupDate = USER.signupDate || "";
    // tslint:disable-next-line: quotemark
    this.lastLogin = USER.lastLogin || "";
    this.picture = USER.picture || "";
    // tslint:disable-next-line: quotemark
    this.role = USER.role || "";
    // tslint:disable-next-line: quotemark
    this.id = USER.id;
  }
}
