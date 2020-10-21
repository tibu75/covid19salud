import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Localidades } from "../models/localidades";
import { LocalidadesService } from "../../services/localidades/localidades.service";
import { MostrarService } from "src/app/services/mostrar/mostrar.service";
import { Reg0800Service } from "src/app/services/reg0800/reg0800.service";
import { FormsLlamada } from "../models/form0800covid2";

@Component({
  selector: "app-indicadores",
  templateUrl: "./indicadores.component.html",
  styleUrls: [],
})
export class IndicadoresComponent implements OnInit {
  public localidades: Localidades[] = [];
  public paginaD: number = 0;
  public totalForm: number = 0;
  public cargando: boolean = true;
  public formtemp: FormsLlamada[] = [];
  public form: FormsLlamada[] = [];
  soloLectura: boolean;
  data: any = [];
  dni: any = [];

  constructor(
    private reg0800Service: Reg0800Service,
    private localidadesService: LocalidadesService,
    private cdr: ChangeDetectorRef,
    private mostrarForm: MostrarService
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
    this.cdr.markForCheck();
  }
}
