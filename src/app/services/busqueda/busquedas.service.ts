import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";

const API_USERS_URL = `${environment.apiUrl}/busqueda`;

@Injectable({
  providedIn: "root",
})
export class BusquedasService {
  constructor(public http: HttpClient) {}

  buscarElementos(
    tabla: "personas" | "edificios" | "registros" | "usuarios" | "form0800",
    termino: string
  ) {
    let url = API_USERS_URL + `${tabla}/` + termino;

    return this.http.get<any[]>(url).pipe(map((resp: any) => resp.resultados));
  }

  buscarDni(dni: string) {
    let url = API_USERS_URL + "/+dnif";
    return this.http.get<any[]>(url).pipe(map((resp: any) => resp.results));
  }
}
