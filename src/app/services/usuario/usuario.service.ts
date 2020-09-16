import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { url_servicios } from '../../config/config';
import swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivosService } from '../subirArchivo/subir-archivos.service';
import { LoginForm } from '../../interfaces/loginForm.interface';


@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivosService
  ) {
    this.cargarStorage();
  }
// tslint:disable-next-line: max-line-length
// genero un booleano para verificar si el us esta logueado si la log del token es mayor a 5 dig  es verdadero, de lo contrario es falso y se activa el serv guard!
  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  login( formData: LoginForm, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem('email', formData.email );
    }else {
      localStorage.removeItem('email');
    }

    let url = url_servicios + '/login';
    return this.http.post( url, formData )
               .pipe(map( (resp: any) => {

                  this.guardarStorage( resp.id, resp.token, resp.usuario );

                  return true;
                }));

  }
  crearUsuario( usuario: Usuario ) {

    let url = url_servicios + '/usuario';
    return this.http.post( url, usuario )
              .pipe(map( (resp: any) => {
                this.guardarStorage( resp.id, resp.token, resp.usuario );
                swal.fire('Usuario creado', usuario.email, 'success' );
                return resp.usuario;
              }));
  }
  actualizarUsuario( usuario: Usuario ) {

    let url = url_servicios + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put( url, usuario )
                .pipe(map( (resp: any) => {

                  // this.usuario = resp.usuario;
                  if ( usuario._id === this.usuario._id ) {
                    let usuarioDB: Usuario = resp.usuario;
                    this.guardarStorage( usuarioDB._id, this.token, usuarioDB );
                  }
                  swal.fire('Usuario actualizado', usuario.nombre, 'success' );

                  return true;
                }));

  }

 
  cargarUsuarios( desde: number = 0 ) {

    let url = url_servicios + '/usuario?desde=' + desde;
    return this.http.get( url );

  }

  buscarUsuarios( termino: string ) {

    let url =  url_servicios + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get( url )
                .pipe(map( (resp: any) => resp.usuarios ));

  }

  borrarUsuario( id: string ) {

    let url =  url_servicios + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url )
                .pipe(map( resp => {
                  swal.fire('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
                  return true;
                }));

  }

}


