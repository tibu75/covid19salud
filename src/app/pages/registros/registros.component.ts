import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Form0800Service } from "../../services/form0800/form0800.service";
import { Forms } from "../models/form0800covid";
import { Localidades } from "../models/localidades";
import { LocalidadesService } from "../../services/localidades/localidades.service";

@Component({
  selector: "app-registros",
  templateUrl: "./registros.component2.html",
  styleUrls: [],
})
export class RegistrosComponent implements OnInit {
  public cargando: boolean = true;
  public form: Forms[] = [];
  public localidades: Localidades[] = [];
  soloLectura: boolean;
  data: any = {};

  constructor(
    private form0800Service: Form0800Service,
    private localidadesService: LocalidadesService,
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
    this.form0800Service.getForms().subscribe((data: any) => {
      //debugger
      this.form = data.forms;
      this.cdr.markForCheck();
    });
    this.soloLectura = true;
  }
}
