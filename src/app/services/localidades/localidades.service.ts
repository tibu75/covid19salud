import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Localidades } from "../../pages/models/localidades";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";

const API_USERS_URL = `${environment.apiUrl}/localidades`;

@Injectable({
  providedIn: "root",
})
export class LocalidadesService {
  constructor(private http: HttpClient) {}

  getLocalidades() {
    return this.http
      .get(API_USERS_URL)
      .pipe(
        map(
          (resp: { ok: boolean; localidades: Localidades[] }) =>
            resp.localidades
        )
      );
  }
}
