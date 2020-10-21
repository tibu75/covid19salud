import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { ExporterService } from "src/app/services/settings.service.index";
import { Reg0800Service } from "../../services/reg0800/reg0800.service";
import { LocalidadesService } from "../../services/localidades/localidades.service";
import { Localidades } from "../models/localidades";
import { FormsLlamada } from "../models/form0800covid2";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";

@Component({
  selector: "app-exportar",
  templateUrl: "./exportar.component.html",
  styleUrls: [],
})
export class ExportarComponent implements OnInit {
  queryForm: FormGroup;

  public fechaHasta: string = moment().format("YYYY-MM-DD");
  public fechamin: string = "2020-03-01";
  public localidades: Localidades[] = [];
  public formtemp: FormsLlamada[] = [];
  public form: FormsLlamada[] = [];
  public paginaD: number;
  public totalForm: number;
  data: any = {};
  public cargando: boolean;

  constructor(
    private excelExports: ExporterService,
    private reg0800: Reg0800Service,
    private localidadesService: LocalidadesService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private toast: ToastrService
  ) {
    this.initForm();
  }

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
    this.reg0800
      .getRegistros(this.paginaD)
      .subscribe(({ total, registros }) => {
        // console.log(registros);
        //debugger
        this.form = registros;
        this.formtemp = registros;
        this.totalForm = total;
        this.cdr.markForCheck();

        this.cargando = false;
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

  filtrar() {
    let consulta = this.queryForm.value;
    (this.cargando = true),
      this.reg0800.queryXls(consulta).subscribe((data: any) => {
        // console.log(data.data);
        this.form = data.data;
        this.cdr.markForCheck();
      });
  }
  reset() {
    this.queryForm.reset();
    this.cdr.markForCheck();
    this.cargarForms();
  }

  exportarXls() {
    let xls = this.form;
    this.excelExports.exportAsExcelFile(xls, "Informe");
  }

  initForm() {
    (this.queryForm = this.fb.group({
      fechaDesde: [""],
      fechaHasta: [""],
      localidad: [""],
      usuario: [""],
    })),
      this.queryForm.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
        console.log(value);
      });
  }
}
