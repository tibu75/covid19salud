import { Injectable, ɵallowSanitizationBypassAndThrow } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { HttpClient } from '@angular/common/http';
import { url_servicios } from '../../config/config';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivosService } from '../subirArchivo/subir-archivos.service';
import { UsuarioService } from '../usuario/usuario.service';
import { personaForm } from 'src/app/interfaces/personaForm.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  persona: Persona;
  totalPersonas: number = 0;

  constructor(
    public http: HttpClient,
    public router: Router,
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService, // lo importo para obtener la funcion del token . token
    public _subirArchivoService: SubirArchivosService
  ) { }
  

cargarPersonas(){
  let url = url_servicios + '/persona'; // es lo mismo de postman para realizar las pruebas
  return this.http.get(url)// retorna un observable con los mismos resultados del potman
            .pipe(map((resp: any ) => {
              this.totalPersonas = resp.total;
              return resp.personas;
            }));
 }



borrarPersona(_id: string){

let url = url_servicios + '/persona/' + _id;
url += '?token=' + this._usuarioService.token; // a la url se le tiene que concatenar el token para poder obetener acceso
return this. http.delete(url)
        .pipe(map(resp => swal('Se elimino correctamente la persona', 'Eliminado correctamente', 'succes'))
        
        );


}

crearPersona(formData: personaForm ){
  let url = url_servicios + '/persona';
  url += '?token=' + this._usuarioService.token;
  return this. http.post(url, formData );
}

buscarPersona( _id: string ) {

  let url =  url_servicios + '/persona/' + _id;
  return this.http.get( url )
              .pipe(map( (resp: any) => resp.persona ));

}
actualizarPersona( persona: Persona ) {

  let url = url_servicios + '/persona/' + persona._id;
  url += '?token=' + this._usuarioService.token;

  return this.http.put( url, persona )
              .pipe(map( (resp: any) => { 
                swal('Los datos fueron actualizados',persona.nombre, 'success' );
                return resp.persona;
              }));

}

}
