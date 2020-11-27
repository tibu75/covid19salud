import { Component, OnInit, ViewChild } from "@angular/core";
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Address } from "ngx-google-places-autocomplete/objects/address";
import { GeolocationService } from "../../services/geomap/geolocation.service";

@Component({
  selector: "app-geolocation",
  templateUrl: "./geolocation.component.html",
  styles: [],
})
export class GeolocationComponent implements OnInit {
  public latitud: number;
  public longitud: number;
  public zoom: number;
  public mapTypeId: string;

  constructor(public geolocationService: GeolocationService) {
    this.latitud = -38.951667;
    this.longitud = -68.074444;
    this.zoom = 9;
    this.mapTypeId = "roadmap";
  }

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;

  options = {
    types: [],
    componentRestrictions: { country: "ARG" },
  };

  ngOnInit(): void {}

  public handleAddressChange(address: Address) {
    console.log("ingrese");
    console.log(address);
    console.log("lat:" + address.geometry.location.lat());
    console.log("log:" + address.geometry.location.lng());
    this.latitud = address.geometry.location.lat();
    this.longitud = address.geometry.location.lng();
    // Do some stuff
  }

  cerrarMap() {
    this.geolocationService.closeGeolocation();
  }
}
