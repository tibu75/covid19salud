import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, repeat } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Form0800 } from "../../interfaces/form0800Interface";
import { Router } from "@angular/router";
import { AuthService } from "../../modules/auth/_services/auth.service";
import { Observable } from "rxjs";
import { FormsLlamada } from "src/app/pages/models/form0800covid2";

const API_USERS_URL = `${environment.apiUrl}/form`;

@Injectable({
  providedIn: "root",
})
export class Form0800Service {
  static getForms(params: any) {
    throw new Error("Method not implemented.");
  }

  form: FormsLlamada;

  constructor(
    private http: HttpClient,
    public router: Router,
    public authService: AuthService
  ) {}

  getForms(desde: number): Observable<Form0800> {
    let url = `${API_USERS_URL}/?desde=${desde}`;
    return this.http.get<Form0800>(url);
  }

  crearForm(formData: Form0800) {
    return this.http.post(API_USERS_URL, formData);
  }

  getXls(): Observable<Form0800> {
    let url = `${API_USERS_URL}/xls`;
    return this.http.get<Form0800>(url);
  }
}
