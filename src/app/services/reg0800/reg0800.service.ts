import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Reg0800 } from "../../interfaces/reg0800Interfaces";
import { Observable } from "rxjs";

const API_USERS_URL = `${environment.apiUrl}/llamada`;

@Injectable({
  providedIn: "root",
})
export class Reg0800Service {
  constructor(private http: HttpClient) {}

  createRegistro(formData: Reg0800) {
    return this.http.post(API_USERS_URL, formData);
  }

  getRegistros(desde: number): Observable<Reg0800> {
    let url = `${API_USERS_URL}/?desde=${desde}`;
    return this.http.get<Reg0800>(url);
  }

  getOneRegistro(doc: string) {
    let Url = `${API_USERS_URL}/doc`;
    return this.http.get(Url + `/?doc=${doc}`);
  }
}
