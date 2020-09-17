import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import {registroFrom} from '../../interfaces/registroFrom.interface';
import {Registro} from '../../models/registro.model';

import { UsuarioService } from '../usuario/usuario.service';
import { url_servicios } from '../../config/config';






@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

registro: Registro [] = [];

  
  constructor(

    public http: HttpClient,
    public router: Router,
    public usuarioService: UsuarioService,
  ) { }




  crearRegistro (formData :registroFrom ){
    let url = url_servicios + '/registro';
    url += '?token='+this.usuarioService.token;
    return this.http.post (url, formData)
                    .pipe (map((resp:any) => resp.registro));
      
  }

  cargarRegistro (){
    let url = url_servicios + '/registro';
    return this.http.get (url)
    .pipe(map((resp: {ok:boolean, registros:Registro []}) => resp.registros));
  }


  actualizarRegistro (formData:registroFrom){
    let url = url_servicios + '/registro'+ formData._id;
    url += '?token='+this.usuarioService.token;
    return this.http.put( url,formData )
    .pipe (map((resp:any) => resp.registro));

  }

  buscarRegistro (_id:string){
    let url = url_servicios + '/registro'+_id;
    return this.http.get (url)
    .pipe(map((resp:any) => resp.registro));
  }

  borrarRegistro (_id:string) {

     let url = url_servicios + '/registro'+_id;
     url += '?token=' + this.usuarioService.token;
     return this.http.delete (url)

  }




}

