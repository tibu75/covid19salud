import {
  ChangeDetectorRef,
  Component,
  OnInit,
  AfterViewInit,
} from "@angular/core";
import { Localidades } from "../models/localidades";
import { LocalidadesService } from "../../services/localidades/localidades.service";
import { MostrarService } from "src/app/services/mostrar/mostrar.service";
import { Reg0800Service } from "src/app/services/reg0800/reg0800.service";
import { FormsLlamada } from "../models/form0800covid2";
import { Form0800Service } from "../../services/form0800/form0800.service";

@Component({
  selector: "app-indicadores",
  templateUrl: "./indicadores.component.html",
  styleUrls: [],
})
export class IndicadoresComponent implements OnInit, AfterViewInit {
  public localidades: Localidades[] = [];
  public paginaD: number = 0;
  public totalForm: number = 0;
  public cargando: boolean = true;
  public formtemp: FormsLlamada[] = [];
  public form: FormsLlamada[] = [];
  public cantRegistros: number = 0;
  soloLectura: boolean;
  data: any = [];
  dni: any = [];
  conSintomas = 0;
  sinSintomas = 0;

  constructor(
    public reg0800Service: Reg0800Service,
    private localidadesService: LocalidadesService,
    private cdr: ChangeDetectorRef,
    public f: Form0800Service
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
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
    this.reg0800Service
      .getRegistrosTodos(1000)
      .subscribe(({ total, registros }) => {
        console.log(registros);
        console.log("Total de Personas: ", total);
        this.form = registros;
        this.BuscarRegSintomas(); /* 
        this.BuscarRegSintomasFecha(); */
        this.totalForm = total;
        this.cdr.markForCheck();

        this.cargando = false;
        this.soloLectura = true;
      });
    this.cdr.markForCheck();
  }

  BuscarRegSintomas() {
    this.form.forEach((x) => {
      x.llamada.forEach((y) => {
        if (y.sintomas === "No") {
          this.sinSintomas = this.sinSintomas + 1;
        }
        this.cantRegistros = this.cantRegistros + 1;
      });
    });
    this.f.conSintomas = this.cantRegistros - this.sinSintomas;
    this.f.sinSintomas = this.sinSintomas;
    console.log("Registros totales: ", this.cantRegistros);
    console.log("Registros con sintomas: ", this.f.conSintomas);
    console.log("Registros sin sintomas: ", this.f.sinSintomas);
  }

  BuscarRegSintomasFecha() {
    this.form.forEach((x) => {
      x.llamada.forEach((y) => {
        if (y.sintomas === "No" && y.fecha === "2020-10-22") {
        }
        this.cantRegistros = this.cantRegistros + 1;
      });
    });
    this.f.conSintomas = this.cantRegistros - this.sinSintomas;
    this.f.sinSintomas = this.sinSintomas;
    console.log("Registros totales: ", this.cantRegistros);
    console.log("Registros con sintomas: ", this.f.conSintomas);
    console.log("Registros sin sintomas: ", this.f.sinSintomas);
  }
}
