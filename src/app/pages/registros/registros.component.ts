import { Component, OnInit, ChangeDetectorRef, NgModule } from "@angular/core";
import { Form0800Service } from "../../services/form0800/form0800.service";
import { FormsLlamada } from "../models/form0800covid2";
import { Localidades } from "../models/localidades";
import { LocalidadesService } from "../../services/localidades/localidades.service";
import { ExporterService } from "../../services/exporter/exporter.service";
import { BusquedasService } from "src/app/services/busqueda/busquedas.service";
import { MostrarService } from "src/app/services/mostrar/mostrar.service";
import { Router } from "@angular/router";

import { Reg0800Service } from "src/app/services/reg0800/reg0800.service";

@Component({
  selector: "app-registros",
  templateUrl: "./registros.component.html",
  styleUrls: [],
})
export class RegistrosComponent implements OnInit {
  public cargando: boolean = true;
  public formtemp: FormsLlamada[] = [];
  public form: FormsLlamada[] = [];
  //public xls: Forms[] = [];
  public localidades: Localidades[] = [];
  public paginaD: number = 0;
  public totalForm: number = 0;
  soloLectura: boolean;
  data: any = [];
  dni: any = [];

  constructor(
    private form0800Service: Form0800Service,
    private reg0800Service: Reg0800Service,
    private localidadesService: LocalidadesService,
    private busquedaService: BusquedasService,
    private cdr: ChangeDetectorRef,
    private excelExports: ExporterService,
    private mostrarForm: MostrarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarForms();
    this.cargarLocalidades();
    //this.cargarXls();
  }

  cargarLocalidades() {
    this.localidadesService.getLocalidades().subscribe((data: any) => {
      this.localidades = data;
      this.cdr.markForCheck();
    });
  }

  cargarForms() {
    this.cargando = true;
    this.reg0800Service
      .getRegistros(this.paginaD)
      .subscribe(({ total, registros }) => {
        console.log(registros);
        //debugger
        this.form = registros;
        this.formtemp = registros;
        this.totalForm = total;
        this.cdr.markForCheck();

        this.cargando = false;
        this.soloLectura = true;
      });
  }

  buscarDocumento(dni: string) {
    if (dni.length === 0) {
      return (this.form = this.formtemp);
    }
    this.busquedaService.buscarDni(dni).subscribe((resp: FormsLlamada[]) => {
      //  //console.log(resp);
      this.form = resp;
      this.cdr.markForCheck();
    });
  }
  Mostrar(idform) {
    //console.log(idform);
    this.mostrarForm.registro = idform;

    this.cdr.markForCheck();
  }

  paginacion(valor: number) {
    this.paginaD += valor;
    if (this.paginaD < 0) {
      this.paginaD = 0;
    } else if (this.paginaD >= this.totalForm) {
      this.paginaD -= valor;
    }

    this.cdr.markForCheck();
    this.cargarForms();
  }

  /* cargarXls() {
    this.form0800Service.getXls().subscribe((Xls: any) => {
      this.xls = Xls.Xls;
      this.cdr.markForCheck();
    });
  } */

  exportAsXlsx(): void {
    // //console.log("export", this.xls);
    this.excelExports.getXlsx().subscribe((resp: any) => {
      console.log(resp);
    });
  }
}
