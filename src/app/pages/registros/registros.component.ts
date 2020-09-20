import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Form0800Service } from "../../services/form0800/form0800.service";
import { Forms } from "../models/form0800covid";
import { Localidades } from "../models/localidades";
import { LocalidadesService } from "../../services/localidades/localidades.service";
import { Form0800 } from "../../interfaces/form0800Interface";
import { BusquedasService } from "src/app/services/busqueda/busquedas.service";

@Component({
  selector: "app-registros",
  templateUrl: "./registros.component2.html",
  styleUrls: [],
})
export class RegistrosComponent implements OnInit {
  public cargando: boolean = true;
  public formI: Form0800[] = [];
  public form: Forms[] = [];
  public localidades: Localidades[] = [];
  soloLectura: boolean;
  data: any = [];

  constructor(
    private form0800Service: Form0800Service,
    private localidadesService: LocalidadesService,
    private busquedaService: BusquedasService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarForms();
    this.cargarLocalidades();
  }

  cargarLocalidades() {
    this.localidadesService.getLocalidades().subscribe((data: any) => {
      this.localidades = data;
      this.cdr.markForCheck();
    });
  }

  cargarForms() {
    this.cargando = true;
    this.form0800Service.getForms().subscribe((data: any) => {
      console.log(data.forms);
      //debugger
      this.form = data.forms;
      this.cdr.markForCheck();
    });
    this.cargando = false;
    this.soloLectura = true;
  }
  buscarDoc(dni: string) {
    if (dni.length === 0) {
      return this.cargarForms();
    }
    this.busquedaService.buscarDni(dni).subscribe((resp) => {
      this.form = resp;
    });
  }
}
