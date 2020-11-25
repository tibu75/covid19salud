import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { debounceTime, groupBy, map } from "rxjs/operators";
import { ExporterService } from "src/app/services/settings.service.index";
import { Reg0800Service } from "../../services/reg0800/reg0800.service";
import { LocalidadesService } from "../../services/localidades/localidades.service";
import { Localidades } from "../models/localidades";
import { FormsLlamada } from "../models/form0800covid2";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
import { FiltroService } from "../../services/filtro/filtro.service";

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
  exportar: any = {};
  resFiltro: any = [];
  public cargando: boolean;

  constructor(
    private excelExports: ExporterService,
    private reg0800: Reg0800Service,
    private filtro: FiltroService,
    private localidadesService: LocalidadesService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private toast: ToastrService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.reset();
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
        this.exportar = registros;
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

  async filtrar() {
    const time = "T03:00:00.000Z";
    let consulta = this.queryForm.value;
    let loc = this.queryForm.value.localidad;
    // console.log("loc", loc);
    let fd = this.queryForm.value.fechaDesde + time;
    let fh = this.queryForm.value.fechaHasta + time;

    this.reg0800.queryXls(consulta).subscribe((data: any) => {
      const persona = data.map((item) => {
        const nombre = { nombre: item.persona.nombre };
        const apellido = { apellido: item.persona.apellido };
        const documento = { documento: item.persona.documento };
        const fechaNacimiento = {
          fechaNacimiento: item.persona.fechaNacimiento,
        };
        const edad = { edad: item.persona.edad };
        const localidad = { localidad: item.persona.localidad };
        const telefono = { telefono: item.persona.telefono };
        const per = Object.assign(
          nombre,
          apellido,
          documento,
          fechaNacimiento,
          edad,
          localidad,
          telefono
        );
        return per;
      });

      const llamada = data.reduce(
        (obj, value, i) => ({
          ...obj,
          [i]: value.llamada.reduce(
            (obj, item, i) => ({
              ...obj,
              [i]: item,
            }),
            0
          ),
        }),
        0
      );
      const call = [Object.values(llamada)];

      const exportConsulta = (obj1: any, obj2: any) => {
        let acc = 0;
        let consulta = [];
        obj1.forEach((i) => {
          obj2.forEach((y) => {
            const llamadas2 = [Object.values(y[acc])];
            llamadas2.forEach((x) => {
              x.forEach((z) => {
                let val = Object.assign({}, i, z);
                consulta.push(val);
                //console.log("consulta", val);
              });
              acc++;
            });
          });
        });
        return consulta;
      };
      const obj = exportConsulta(persona, call);
      // console.log("obj", obj);
      const resultado = obj.filter((elm) => {
        if (loc != null && fd !== "nullT03:00:00.000Z") {
          const fec_loc =
            elm.fecha >= fd && elm.fecha <= fh && elm.localidad === loc;
          return fec_loc;
        }
        if (fd !== "nullT03:00:00.000Z" && fh !== "nullT03:00:00.000Z") {
          const fec = elm.fecha >= fd && elm.fecha <= fh;
          return fec;
        }
        const lc = elm.localidad === loc;
        return lc;
      });
      //console.log("filtro", resultado);

      this.exportar = resultado;
      this.form = data;
      this.cdr.markForCheck();
    });
  }

  reset() {
    this.queryForm.reset();
    this.cdr.markForCheck();
    this.cargarForms();
    this.cargarLocalidades();
  }

  exportarXls() {
    let xls = this.exportar;
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
        //        console.log(value);
      });
  }
}
