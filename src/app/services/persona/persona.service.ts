import { Injectable,} from '@angular/core';
import {Persona} from '../../pages/models/persona';
import {getPersona } from '../../interfaces/persona.Interface'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from "../../../environments/environment";
const API_USERS_URL = `${environment.apiUrl}/persona`;




@Injectable({
  providedIn: 'root'


})
export class PersonaService {
  public _getPersona : getPersona 
  constructor(
    public http: HttpClient,
    public router: Router,
  ) { }
  getPersona(persona: string){

  return this.http.get(API_USERS_URL + `/?${persona}`)// retorna un observable con los mismos resultados del potman
}


}
