import { Injectable } from "@angular/core";
import { FormsLlamada } from "../../pages/models/form0800covid2";

@Injectable({
  providedIn: "root",
})
export class MostrarService {
  registro: FormsLlamada;
  public ultimoReg: number = 0;
  public tipo_llamada: string = "Entrada";
  public opc_form: String;
  public hizo_hisopado: boolean = true;
  public con_sintomas: boolean = true;
  public cargar_datos: boolean = true;

  constructor() {}
}
