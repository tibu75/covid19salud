import { Component, OnInit, ChangeDetectorRef, NgModule } from "@angular/core";
import { FormsLlamada } from "../models/form0800covid2";
import { Localidades } from "../models/localidades";
import { LocalidadesService } from "../../services/localidades/localidades.service";
import { BusquedasService } from "src/app/services/busqueda/busquedas.service";
import { MostrarService } from "src/app/services/mostrar/mostrar.service";
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
  Showllamadas: boolean;
  data: any = [];
  dni: any = [];

  constructor(
    private reg0800Service: Reg0800Service,
    private localidadesService: LocalidadesService,
    private busquedaService: BusquedasService,
    private cdr: ChangeDetectorRef,

    private mostrarForm: MostrarService
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
  reset() {
    this.cargarForms();
    this.cdr.markForCheck();
  }

  cargarForms() {
    this.cargando = true;
    this.reg0800Service
      .getRegistros(this.paginaD)
      .subscribe(({ total, registros }) => {
        //   console.log(registros);
        //debugger
        this.form = registros;
        this.formtemp = registros;
        this.totalForm = total;
        this.cdr.markForCheck();

        this.cargando = false;
        this.soloLectura = true;
      });
    this.cdr.markForCheck();
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
    // console.log("mostrar", idform);
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
}
