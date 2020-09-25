import { Injectable } from "@angular/core";
import { Forms } from "../../pages/models/form0800covid";

@Injectable({
	providedIn: "root",
})
export class MostrarService {
	registro: Forms;

	public hizo_hisopado: boolean = true;
	public con_sintomas: boolean = true;
	public cargar_datos: boolean = true;

	constructor() {}
}
