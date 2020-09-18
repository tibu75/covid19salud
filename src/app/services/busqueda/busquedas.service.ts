import { Injectable } from '@angular/core';
import { url_servicios } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BusquedasService {



  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
  ) { }


  buscarElementos(
    tabla:'personas'|'edificios'|'registros'|'usuarios',
    termino: string ) {
    let url =  url_servicios + `/busqueda/${tabla}/` + termino;
    url += '?token=' + this._usuarioService.token;
    return this.http.get<any[]>( url )
                 .pipe(map( (resp: any) => resp.resultados ));

   }

   buscarDni (dni:string){
    let url = url_servicios + '/busqueda/'+dni
    url += '?token='+ this._usuarioService.token;
    return this.http.get<any[]>(url)
         .pipe (map((resp:any)=> resp.results))

   }

}
