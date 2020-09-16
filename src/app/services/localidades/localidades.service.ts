import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url_servicios } from '../../config/config';
import { Localidades } from '../../models/localidades.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LocalidadesService {
  constructor(private http: HttpClient) {}

  cargarLocalidades() {
    let url = url_servicios + '/localidades';
    return this.http
      .get(url)
      .pipe(
        map(
          (resp: { ok: boolean; localidades: Localidades[] }) =>
            resp.localidades
        )
      );
  }
}
