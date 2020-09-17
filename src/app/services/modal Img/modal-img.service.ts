import { Injectable, EventEmitter } from '@angular/core';
import { url_servicios } from '../../config/config';



@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo: 'usuarios'|'personas'|'edificios';
  public id: string;
  public img: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal( 
      tipo: 'usuarios'|'personas'|'edificios',
      id: string,
      img: string = 'no-img'
    ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
   
      if ( img.includes('https') ) {
        this.img = img;
      } else {
        this.img = `${ url_servicios }/upload/${ tipo }/${ img }`;
      }
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() { }
}
