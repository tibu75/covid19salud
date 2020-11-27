import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GeolocationService {
  private mostrarGeolocation: boolean = true;

  get ocultarMap() {
    return this.mostrarGeolocation;
  }

  openGeolocation() {
    this.mostrarGeolocation = false;
  }

  closeGeolocation() {
    this.mostrarGeolocation = true;
  }
  constructor() {}
}
