import { ChangeDetectorRef, Component, OnInit, AfterViewInit } from "@angular/core";
import { Localidades } from "../models/localidades";
import { LocalidadesService } from "../../services/localidades/localidades.service";
import { MostrarService } from "src/app/services/mostrar/mostrar.service";
import { Reg0800Service } from "src/app/services/reg0800/reg0800.service";
import { FormsLlamada } from "../models/form0800covid2";
import { Form0800Service } from "../../services/form0800/form0800.service";
import * as moment from "moment";
import { SocketService } from "src/app/services/socket/socket.service";
import filter from "../../../assets/plugins/formvalidation/src/js/core/filter";
import lessThan from "../../../assets/plugins/formvalidation/src/js/validators/lessThan";
import stringLength from "../../../assets/plugins/formvalidation/src/js/validators/stringLength";

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
  public cargado: boolean = false;
  public formtemp: FormsLlamada[] = [];
  public form: any[] = [];
  public cantRegistros: number = 0;
  soloLectura: boolean;
  data: any = [];
  dni: any = [];
  public conSintomas: number = 0;
  public sinSintomas: number = 0;
  public sintomas: boolean = false;

  public persona: any[];
  public labelsLoc: string[];
  public labelsFec: string[];
  public datosLoc: number[];
  public datosFec: number[];

  constructor(
    public reg0800Service: Reg0800Service,
    private localidadesService: LocalidadesService,
    private cdr: ChangeDetectorRef,
    public f: Form0800Service,
    private wsService: SocketService
  ) {
    this.cargarLocalidades();
  }

  ngOnInit(): void {
    // Conexion al Socket

    this.cargarForms();
  }
  ngAfterViewInit(): void {
    this.wsService.listen("dataUpdate").subscribe((data) => {
      console.log("Inicia Indicadores AfterInit: ", data);
      this.cargarForms();
    });
  }
  cargarLocalidades() {
    this.localidadesService.getLocalidades().subscribe((data: any) => {
      this.localidades = data;
      this.cdr.markForCheck();
    });
  }

  cargarForms() {
    this.cargando = true;
    this.reg0800Service.getRegistrosTodos(10000).subscribe(({ total, registros }) => {
      console.log("cargarForms: Registros ", registros);
      console.log("Total de Personas: ", total);
      this.form = registros;
      this.filtrar();
      this.filtrarUlt7();
      this.BuscarRegSintomas();
      this.totalForm = total;
      this.cdr.markForCheck();

      this.cargando = false;
      this.soloLectura = true;
    });
    this.cdr.markForCheck();
  }

  filtrar() {
    let datosLocTemp: number[] = [];
    let labelsLocTemp: string[] = [];
    const time = "T03:00:00.000Z";
    let fd = "2020-10-22" + time;
    let fh = moment().format("YYYY-MM-DD") + time;
    this.persona = this.form.map((item) => {
      const documento = { documento: item.persona.documento };
      const edad = { edad: item.persona.edad };
      const localidad = { localidad: item.persona.localidad };
      const per = Object.assign(documento, edad, localidad);
      return per;
    });

    const llamada = this.form.reduce(
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
    const obj = exportConsulta(this.persona, call);
    const resultado = obj.filter((elm) => {
      const fil = elm.fecha >= fd && elm.fecha <= fh;
      return fil;
    });
    this.localidades.forEach((labelLoc) => {
      let acuLoc = 0;
      resultado.forEach((busLoc) => {
        if (busLoc.localidad === labelLoc.nombre) {
          acuLoc = acuLoc + 1;
        }
      });
      if (acuLoc > 0) {
        labelsLocTemp.push(labelLoc.nombre);
        datosLocTemp.push(acuLoc);
      }
    });
    this.labelsLoc = labelsLocTemp;
    this.datosLoc = datosLocTemp;
    this.cdr.markForCheck();
  }
  filtrarUlt7() {
    let datosFecTemp: number[] = [];
    let labelsFecTemp: string[] = [];
    const time = "T03:00:00.000Z";
    const acu = 1;
    let fd = moment(Date.now() - 6 * 24 * 3600 * 1000).format("YYYY-MM-DD") + time;
    let fh = moment().format("YYYY-MM-DD") + time;
    let f7: any[] = [];
    for (let dia = 6; dia >= 0; dia--) {
      f7.push(moment(Date.now() - dia * 24 * 3600 * 1000).format("YYYY-MM-DD") + time);
    }
    const llamada = this.form.reduce(
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
    const obj = exportConsulta(this.persona, call);
    const resultado = obj.filter((elm) => {
      const fil = elm.fecha >= fd && elm.fecha <= fh;
      return fil;
    });
    console.log("RESULTADO: ", resultado);
    f7.forEach((porFec) => {
      const totalFechas = resultado.filter((busFec) => busFec.fecha === porFec).length;
      datosFecTemp.push(totalFechas);
    });
    f7.forEach((porFec) => {
      let temp = porFec.substring(5);
      temp = temp.split("T", 1);
      labelsFecTemp.push(...temp);
    });

    this.datosFec = datosFecTemp;
    this.labelsFec = labelsFecTemp;
    console.log("Los datos a pasar son Por Fecha : ", this.labelsFec, this.datosFec);
    console.log("filtro Paso Por Fecha", resultado);
    this.cdr.markForCheck();
  }

  BuscarRegSintomas() {
    let acum = 0;
    this.conSintomas = 0;
    this.sinSintomas = 0;
    this.cantRegistros = 0;
    this.form.forEach((x) => {
      this.sintomas = false;
      x.llamada.forEach((y) => {
        if (y.sintomas === "Si") {
          this.sintomas = true;
        }
        acum++;
      });
      if (this.sintomas) {
        this.conSintomas++;
      } else {
        this.sinSintomas++;
      }
    });
    this.cantRegistros = acum; /* 
    console.log("Registros totales: ", this.cantRegistros);
    console.log("Registros con sintomas: ", this.conSintomas);
    console.log("Registros sin sintomas: ", this.sinSintomas); */
    this.cargado = true;
  }
}
