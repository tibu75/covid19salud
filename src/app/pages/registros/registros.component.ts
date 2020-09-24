import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Form0800Service } from "../../services/form0800/form0800.service";
import { Forms } from "../models/form0800covid";
import { Localidades } from "../models/localidades";
import { LocalidadesService } from "../../services/localidades/localidades.service";
import { ExporterService } from "../../services/exporter/exporter.service";
import { BusquedasService } from "src/app/services/busqueda/busquedas.service";

@Component({
  selector: "app-registros",
  templateUrl: "./registros.component.html",
  styleUrls: [],
})
export class RegistrosComponent implements OnInit {
  public cargando: boolean = true;
  public formtemp: Forms[] = [];
  public form: Forms[] = [];
  public localidades: Localidades[] = [];
  public paginaD: number = 0;
  public totalForm: number = 0;
  soloLectura: boolean;
  data: any = [];
  dni: any = [];

  constructor(
    private form0800Service: Form0800Service,
    private localidadesService: LocalidadesService,
    private busquedaService: BusquedasService,
    private cdr: ChangeDetectorRef,
    private excelExports: ExporterService
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
    this.form0800Service
      .getForms(this.paginaD)
      .subscribe(({ total, forms }) => {
        //   console.log(this.form);
        //debugger
        this.form = forms;
        this.formtemp = forms;
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
    this.busquedaService.buscarDni(dni).subscribe((resp: Forms[]) => {
      //  console.log(resp);
      this.form = resp;
      this.cdr.markForCheck();
    });
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
  exportAsXlsx(): void {
    console.log("export", this.form);
    this.excelExports.exportAsExcelFile(this.form, "Reporte");
  }
}
